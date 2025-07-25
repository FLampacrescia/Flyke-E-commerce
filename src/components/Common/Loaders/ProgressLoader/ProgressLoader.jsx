import { useEffect, useState } from "react";
import "./ProgressLoader.css";

export default function ProgressLoader({ onFinish }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval;

        interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 90) {
                    return prev + 1;
                }
                clearInterval(interval);
                return prev;
            });
        }, 20);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (onFinish) {
            setProgress(100);
            const timeout = setTimeout(() => {
                setProgress(0);
                onFinish();
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [onFinish]);

    return (
        <div className="progress-loader-container">
            <div
                className="progress-loader"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}