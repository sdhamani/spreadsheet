# **React Spreadsheet App**

A lightweight **Excel-like spreadsheet** built using **React, Zustand, and IndexedDB**.

## **🚀 Features**

✔ **Add/Remove Rows & Columns** dynamically.  
✔ **Cell Editing & Formulas (`=A1+B2`)** support.  
✔ **Undo & Redo** using `Cmd + Z / Ctrl + Z` & `Cmd + Shift + Z / Ctrl + Shift + Z`.  
✔ **Cell Styling** (Bold, Italics, Alignment, etc.).  
✔ **Auto Save & Load** using **IndexedDB**.  
✔ **Keyboard Navigation** (`Tab`, `Enter`).

---

## **🛠️ Setup**

### **1️⃣ Install Dependencies**

```sh
npm install
```

### **2️⃣ Start Development Server**

```sh
npm start
```

---

## **📂 Project Structure**

```
/src
 ├── components
 │   ├── Sheet.jsx        # Main Spreadsheet Component
 │   ├── SheetBody.jsx    # Renders all cells
 │   ├── Cell.jsx         # Single cell component
 │   ├── ToolBar.jsx      # Styling & Formatting toolbar
 │   ├── UndoRedo.jsx     # Undo & Redo buttons
 │   ├── styles.js        # Styled Components
 │   └── store
 │       ├── useSheetStore.js  # Zustand State Management
 │       ├── persistMiddleware.js # IndexedDB Middleware
 │       ├── evaluateFormula.js # Formula evaluation
 ├── App.js              # Root Component
 ├── index.js            # Entry File
 ├── styles.css          # Global Styles
```

---

## **🎮 Keyboard Shortcuts**

| Action        | Mac Shortcut      | Windows Shortcut   |
| ------------- | ----------------- | ------------------ |
| **Undo**      | `Cmd + Z`         | `Ctrl + Z`         |
| **Redo**      | `Cmd + Shift + Z` | `Ctrl + Shift + Z` |
| **Next Cell** | `Tab`             | `Tab`              |
| **Next Row**  | `Enter`           | `Enter`            |

---

## **🗃️ IndexedDB Persistence**

Data is automatically saved & loaded from IndexedDB.

- **Save Data:** `useSheetStore.getState().saveToIndexedDB()`
- **Load Data:** `useSheetStore.getState().loadFromIndexedDB()`

---

## **💡 Future Improvements**

✅ **Formula Auto-Suggestions**  
✅ **Column Resizing**  
✅ **Sheet Management (Multiple Tabs)**  
✅ **Export as CSV/Excel**

---
