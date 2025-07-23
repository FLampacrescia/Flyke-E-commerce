import { createContext, useContext, useState } from "react";

const PrefetchContext = createContext();

export function PrefetchProvider({ children }) {
    const [data, setData] = useState(null);

    const clearData = () => setData(null);

    return (
        <PrefetchContext.Provider value={{ data, setData, clearData }}>
            {children}
        </PrefetchContext.Provider>
    );
}

export const usePrefetch = () => useContext(PrefetchContext);