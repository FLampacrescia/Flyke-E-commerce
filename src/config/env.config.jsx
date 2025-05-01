const {
    VITE_API_URL,
    VITE_FILES_URL,
} = import.meta.env;

const config = {
    API_URL: VITE_API_URL,
    FILES_URL: VITE_FILES_URL,
};

export default config;