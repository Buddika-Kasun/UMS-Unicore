"use client"

import Spinner from "@/components/spinner/Spinner";
import style from "./loadingPage.module.css";
import { useEffect, useState } from "react";

const LoadingComp = () => {

    const [spinnerSize, setSpinnerSize] = useState(100); // Default size

    useEffect(() => {

        const handleResize = () => {
            // Example logic for determining size based on viewport dimensions
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Calculate spinner size as a percentage of viewport width or height
            const size = Math.min(width, height) * 0.17; // 17% of the smaller dimension (width or height)
            
            // Set size
            setSpinnerSize(size);
        };
  
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);

    }, []);

    return (
        <div className={style.container}>
           <Spinner type={"hash"} color={"rgb(18, 102, 211)"} size={spinnerSize}/> 
        </div>
    );
}

export default LoadingComp;