export const persistMiddleware = (config) => (set, get, api) => {
    return config(
        (args) => {
            set(args);
            get().saveToIndexedDB();
        },
        get,
        api
    );
};