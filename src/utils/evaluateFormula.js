export const evaluateFormula = (formula, cells) => {
    try {
        const expression = formula.slice(1).replace(/[A-Z]\d+/g, (match) => {
            return cells[match]?.value !== undefined ? cells[match].value : '0';
        });
        return eval(expression);
    } catch (error) {
        return 'ERROR';
    }
};
