import { useNavigate } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";
import { usePrefetch } from "../context/PrefetchContext";
import toast from "react-hot-toast";

export const useNavigateWithPrefetch = () => {
    const { setProgressLoading, finishProgressLoader } = useLoader();
    const { setData } = usePrefetch();
    const navigate = useNavigate();

    const navigateWithPrefetch = async ({
        apiCall,
        to,
        delay = 2000,
        onError = () => toast.error("Ocurrió un error al cargar los datos.")
    }) => {
        setProgressLoading(true);
        try {
            const res = await apiCall();
            setData(res.data);

            setTimeout(() => {
                finishProgressLoader();
                navigate(to);
            }, delay);
        } catch (error) {
            console.error("Error en navigateWithPrefetch:", error);
            onError(error);
            finishProgressLoader();
        }
    };

    return navigateWithPrefetch;
};