export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (err) {
        // it is important to process errors to keep app from crashing
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // Ignore write errors
    }
}
