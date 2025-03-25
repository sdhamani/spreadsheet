import { create } from "zustand";
import Dexie from "dexie";
import { persistMiddleware } from "./persistMiddleware";
import { evaluateFormula } from "../utils/evaluateFormula";

const db = new Dexie("SpreadsheetDB");
db.version(1).stores({ sheets: "sheetId" });

export const useSheetStore = create(
    persistMiddleware((set, get) => ({
        cells: {},
        columns: 10,
        rows: 10,
        selectedCell: null,
        changeLog: [],
        chunks: {},

        setColumns: (newColumns) => {
            set({ columns: newColumns });
        },

        setRows: (newRows) => {
            set({ rows: newRows });
        },

        getCellChunkId: (cellId) => {
            const col = cellId.match(/[A-Z]+/)[0];
            const row = parseInt(cellId.match(/\d+/)[0]);
            const chunkSize = 100;
            const chunkX = Math.floor((col.charCodeAt(0) - 65) / chunkSize);
            const chunkY = Math.floor((row - 1) / chunkSize);
            return `${chunkX}-${chunkY}`;
        },

        setCellValue: (cellId, newValue) => {
            const chunkId = get().getCellChunkId(cellId);
            set((state) => {
                const prevCellData = state.cells[cellId] || {
                    recentValues: [],
                    usedIndex: -1,
                };
                let updatedValue = newValue;

                let recentValues = prevCellData.recentValues || [];
                let usedIndex = prevCellData.usedIndex ?? -1;

                let formulaUsed = prevCellData.formulaUsed || null;
                let dependencyGraph = prevCellData.dependencyGraph || [];

                if (typeof newValue === "string" && newValue.startsWith("=")) {
                    formulaUsed = newValue;
                    const referencedCells = newValue.match(/[A-Z][0-9]+/g) || [];
                    dependencyGraph = referencedCells;

                    if (get().hasCyclicDependency(newValue, cellId)) {
                        updatedValue = "ERROR";
                    } else {
                        try {
                            updatedValue = evaluateFormula(newValue, get().cells);
                        } catch (error) {
                            updatedValue = "ERROR";
                        }
                    }
                }

                recentValues = recentValues.slice(0, usedIndex + 1);
                recentValues.push(updatedValue);
                usedIndex = recentValues.length - 1;

                return {
                    cells: {
                        ...state.cells,
                        [cellId]: {
                            ...prevCellData,
                            value: updatedValue,
                            formulaUsed,
                            dependencyGraph,
                            recentValues,
                            usedIndex,
                        },
                    },
                    changeLog: [...state.changeLog, cellId],
                    redoStack: [],
                };
            });

            set((state) => ({
                chunks: {
                    ...state.chunks,
                    [chunkId]: {
                        ...state.chunks[chunkId],
                        [cellId]: state.cells[cellId]
                    }
                }
            }));

            get().updateDependentCells(cellId);
        },

        undo: () => {
            set((state) => {
                if (!state.changeLog.length) return state; // Nothing to undo

                const lastChangedCell = state.changeLog[state.changeLog.length - 1];
                const cellData = state.cells[lastChangedCell];

                if (
                    !cellData ||
                    !Array.isArray(cellData.recentValues) ||
                    cellData.usedIndex < 0
                ) {
                    console.warn("Undo not possible for cell:", lastChangedCell);
                    return state;
                }

                let newUsedIndex = cellData.usedIndex - 1;
                let newValue =
                    newUsedIndex >= 0 ? cellData.recentValues[newUsedIndex] : "";

                return {
                    cells: {
                        ...state.cells,
                        [lastChangedCell]: {
                            ...cellData,
                            value: newValue,
                            usedIndex: Math.max(newUsedIndex, -1),
                        },
                    },
                    changeLog: state.changeLog.slice(0, -1),
                    redoStack: [
                        ...state.redoStack,
                        { cellId: lastChangedCell, redoIndex: cellData.usedIndex },
                    ],
                };
            });
        },

        redo: () => {
            set((state) => {
                if (!state.redoStack.length) return state; // Nothing to redo

                // ✅ Take the last undone change
                const { cellId, redoIndex } =
                    state.redoStack[state.redoStack.length - 1];
                const cellData = state.cells[cellId];

                if (!cellData || !Array.isArray(cellData.recentValues)) {
                    console.warn("Redo not possible for cell:", cellId);
                    return state;
                }

                let newUsedIndex = redoIndex;
                let newValue = cellData.recentValues[newUsedIndex];

                return {
                    cells: {
                        ...state.cells,
                        [cellId]: {
                            ...cellData,
                            value: newValue,
                            usedIndex: newUsedIndex,
                        },
                    },
                    redoStack: state.redoStack.slice(0, -1),
                    changeLog: [...state.changeLog, cellId],
                };
            });
        },

        updateDependentCells: (cellId) => {
            set((state) => {
                let updatedCells = { ...state.cells };

                const updateQueue = [cellId];
                const visited = new Set();

                while (updateQueue.length) {
                    const currentCell = updateQueue.shift();
                    if (visited.has(currentCell)) continue;
                    visited.add(currentCell);

                    Object.entries(updatedCells).forEach(([key, cell]) => {
                        if (cell.dependencyGraph?.includes(currentCell)) {
                            if (cell.formulaUsed) {
                                try {
                                    const evaluatedValue = evaluateFormula(
                                        cell.formulaUsed,
                                        updatedCells
                                    );
                                    updatedCells[key] = {
                                        ...cell,
                                        value:
                                            evaluatedValue !== undefined ? evaluatedValue : "ERROR",
                                    };
                                    updateQueue.push(key);
                                } catch (error) {
                                    updatedCells[key] = {
                                        ...cell,
                                        value: "ERROR",
                                    };
                                }
                            }
                        }
                    });
                }

                return { cells: updatedCells };
            });
        },

        hasCyclicDependency: (formula, currentCell, visited = new Set()) => {
            if (visited.has(currentCell)) return true;
            visited.add(currentCell);

            const referencedCells = formula.match(/[A-Z][0-9]+/g) || [];
            if (referencedCells.includes(currentCell)) return true;

            for (let refCell of referencedCells) {
                if (
                    get().cells[refCell]?.formulaUsed &&
                    get().hasCyclicDependency(
                        get().cells[refCell].formulaUsed,
                        refCell,
                        visited
                    )
                ) {
                    return true;
                }
            }
            return false;
        },

        setCellStyle: (styleKey, styleValue) => {
            const selectedCell = get().selectedCell;
            if (!selectedCell) return;

            set((state) => {
                const currentStyles = state.cells[selectedCell]?.styling || {};
                const newStyles = {
                    ...currentStyles,
                    [styleKey]: currentStyles[styleKey] === styleValue ? "" : styleValue,
                };

                return {
                    cells: {
                        ...state.cells,
                        [selectedCell]: {
                            ...state.cells[selectedCell],
                            styling: newStyles,
                        },
                    },
                };
            });
        },

        setSelectedCell: (cellId) => {
            set({ selectedCell: cellId });
        },

        saveToIndexedDB: async () => {
            const chunks = get().chunks;
            await Promise.all(
                Object.entries(chunks).map(([chunkId, data]) =>
                    db.sheets.put({ sheetId: `chunk-${chunkId}`, data })
                )
            );
        },

        loadFromIndexedDB: async () => {
            const sheet = await db.sheets.get("main");
            if (sheet) {
                set({ cells: sheet.data });
            }
        },
    }))
);

