import { createContext, useContext, useState } from "react";
import ProgressLoader from "../components/Common/Loaders/ProgressLoader/ProgressLoader";
import CircleLoader from "../components/Common/Loaders/CircleLoader/CircleLoader";

const LoaderContext = createContext();

export function LoaderProvider({ children }) {
    const [progressLoading, setProgressLoading] = useState(false); // loader principal
    const [circleLoading, setCircleLoading] = useState(false); // loader secundario

    return (
        <LoaderContext.Provider value={{ progressLoading, setProgressLoading, circleLoading, setCircleLoading }}>
            {progressLoading && <ProgressLoader />}
            {circleLoading && <CircleLoader />}
            {children}
        </LoaderContext.Provider>
    );
}

export const useLoader = () => useContext(LoaderContext);