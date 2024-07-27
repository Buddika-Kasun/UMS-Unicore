"use client"

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import style from "./layout.module.css";
import { useEffect, useState } from "react";
import Nav from "@/components/Nav/Nav";
import { usePathname } from "next/navigation";
import LoadingComp from "../loadingPage/page";

const CommonLayout = ({children}) => {

    const currentPath = usePathname();

    const [hamClick, setHamClick] = useState(false);
    const [clickedPath, setClickedPath] = useState(currentPath);
    const [loading, setLoading] = useState(false);

    const handleClickedPath = (value) => {
        setClickedPath(value);
    }

    useEffect(() => {
        setLoading(currentPath !== clickedPath);
    },[currentPath, clickedPath]);

    return (
        <div className={style.container}>
            <div className={style.header}><Header hamClick={hamClick} setHamClick={setHamClick}/></div>
            <div className= {style.innerContainer}>
                <Nav hamClick={hamClick} clickedPath={handleClickedPath}/>
                <div className={style.child}>
                    {children}
                    <div className={`${style.loadingComp} ${loading && style.loadingCompHide}`}>
                        <LoadingComp color={"rgba(0, 0, 0, 0.8)"}/>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default CommonLayout;