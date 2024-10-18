"use client"

import Spinner from "@/components/spinner/Spinner";
import style from "./loadingPage.module.css";
import { useEffect, useState } from "react";

const LoadingComp = ({color, type, size}) => {

    const [spinnerSize, setSpinnerSize] = useState(100); // Default size

    useEffect(() => {

        const handleResize = () => {
            // Example logic for determining size based on viewport dimensions
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Calculate spinner size as a percentage of viewport width or height
            const sizes = Math.min(width, height) * (size || 0.17); // 17% of the smaller dimension (width or height)

            // Set size
            setSpinnerSize(sizes);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);

    }, []);

    return (
        <div className={style.container}>
           <Spinner type={type || "hash"} color={color || "rgb(18, 102, 211)"} size={spinnerSize}/>
        </div>
    );
}

export default LoadingComp;