"use client"

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import style from "./layout.module.css";
import { useEffect, useState } from "react";
import Nav from "@/components/nav/Nav";
import { usePathname } from "next/navigation";
import LoadingComp from "@/app/(all-pages)/loadingPage/page";
import Link from "next/link";

const CommonLayout = ({children, sessionData, sessionExpiry}) => {
    //console.log(sessionData,sessionExpiry);
    const currentPath = usePathname();

    const [hamClick, setHamClick] = useState(false);
    const [clickedPath, setClickedPath] = useState(currentPath);
    const [loading, setLoading] = useState(false);
    const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);

    useEffect(() => {
        if (sessionData) {

          // Set a timeout to show the session timeout message
          const timeout = setTimeout(() => {
            setShowTimeoutMessage(true);
          }, sessionExpiry);;

          // Cleanup timeout on component unmount
          return () => {
            clearTimeout(timeout);
          };
        }
      }, [sessionData]);

    const handleClickedPath = (value) => {
        setClickedPath(value);
    }

    useEffect(() => {
        setLoading(currentPath !== clickedPath);
    },[currentPath, clickedPath]);

    return (
        <div className={style.container}>

            {showTimeoutMessage &&
                <div className={style.sessionExpiryContainer}>
                    <div className={style.card}>
                        <div className={style.message}>Your session has expired.<br/>Please log in again.</div>
                        <Link className={style.btn} href={'/authPages?mode=login'}>Ok</Link>
                    </div>
                </div>
            }

            <div className={style.header}><Header hamClick={hamClick} setHamClick={setHamClick} sessionData={sessionData} clickedPath={handleClickedPath}/></div>

            <div className= {style.innerContainer}>
                <Nav hamClick={hamClick} clickedPath={handleClickedPath} role={sessionData.role}/>
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