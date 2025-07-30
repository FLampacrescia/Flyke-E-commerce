import { useNavigate } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";
import { usePrefetch } from "../context/PrefetchContext";
import toast from "react-hot-toast";

export const useNavigateWithPrefetch = () => {
    const { setProgressLoading, finishProgressLoader } = useLoader();
    const { setData } = usePrefetch();
    const navigate = useNavigate();

    const preloadImages = (urls = []) => {
        return Promise.all(
            urls.map(src => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                    img.onerror = reject;
                });
            })
        );
    };

    const navigateWithPrefetch = async ({
        apiCall = null,
        imageUrls = [],
        to,
        delay = 2000,
        onError = () => toast.error("Ocurrió un error al cargar los datos o las imágenes.")
    }) => {
        setProgressLoading(true);
        try {
            if (apiCall) {
                const res = await apiCall();
                setData(res.data);
            }

            if (imageUrls.length > 0) {
                await preloadImages(imageUrls);
            }

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