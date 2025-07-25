import { createContext, useContext, useState, useCallback } from "react";
import ProgressLoader from "../components/Common/Loaders/ProgressLoader/ProgressLoader";
import CircleLoader from "../components/Common/Loaders/CircleLoader/CircleLoader";

const LoaderContext = createContext();

export function LoaderProvider({ children }) {
    const [progressLoading, setProgressLoading] = useState(false);
    const [circleLoading, setCircleLoading] = useState(false);
    const [completeProgress, setCompleteProgress] = useState(false);

    const finishProgressLoader = useCallback(() => {
        setCompleteProgress(true);
    }, []);

    const handleProgressFinish = () => {
        setProgressLoading(false);
        setCompleteProgress(false);
    };

    return (
        <LoaderContext.Provider value={{
            progressLoading,
            setProgressLoading,
            finishProgressLoader,
            circleLoading,
            setCircleLoading
        }}>
            {progressLoading && (
                <ProgressLoader onFinish={completeProgress ? handleProgressFinish : null} />
            )}
            {circleLoading && <CircleLoader />}
            {children}
        </LoaderContext.Provider>
    );
}

export const useLoader = () => useContext(LoaderContext);