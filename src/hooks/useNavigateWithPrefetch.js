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
        delay = 1000,
        onError = () => toast.error("Ocurrió un error al cargar los datos.")
    }) => {
        setProgressLoading(true);
        try {
            const res = await apiCall();
            setData(res.data);

            setTimeout(() => {
                navigate(to);
                finishProgressLoader(); // finaliza animación justo al navegar
            }, delay);
        } catch (error) {
            console.error("Error en navigateWithPrefetch:", error);
            onError(error);
            finishProgressLoader(); // en caso de error, también cerrar loader
        }
    };

    return navigateWithPrefetch;
};