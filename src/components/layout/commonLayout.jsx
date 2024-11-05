"use client"

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import style from "./layout.module.css";
import scroll from '@/components/scrollBar/scrollBar.module.css'
import React, { useEffect, useRef, useState } from "react";
import Nav from "@/components/nav/Nav";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoadingComp from "@/app/(all-pages)/loadingPage/page";
import Link from "next/link";
import { toast } from "react-toastify";
import { BiSolidLock, BiSolidLockOpen } from "react-icons/bi";
import handleMiddlewareMsg from "@/util/handleMiddlewareMsg";

const CommonLayout = ({children, sessionData, sessionExpiry, userPic}) => {
    //console.log(userPic.profilePicUrl);

    const currentPath = usePathname();

    const [hamClick, setHamClick] = useState(false);
    const [clickedPath, setClickedPath] = useState(currentPath);
    const [loading, setLoading] = useState(false);
    const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
    const [autoHide, setAutoHide] = useState(true);

    const message = useSearchParams().get("message");
    const messageDisplayedRef = useRef(false);

    //toast.dismiss();
    message === null && toast.dismiss();

    useEffect(() => {
        if (sessionData) {

          // Set a timeout to show the session timeout message
          const timeout = setTimeout(() => {
            setShowTimeoutMessage(true);
          }, sessionExpiry);

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
        autoHide && !(currentPath !== clickedPath) && setHamClick(false);
    },[currentPath, clickedPath]);

    useEffect(() => {
        setLoading(false);
    },[currentPath]);

    // Handle outside click of nav bar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (hamClick && autoHide && (event.target.closest(`.${style.child}`) || event.target.closest(`.${style.header}`))) {
                setHamClick(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [hamClick,autoHide]);

    useEffect(() => {
        if (!messageDisplayedRef.current && message) {
            handleMiddlewareMsg(message);
            messageDisplayedRef.current = true; // Mark the message as displayed
        }
    }, [message]);

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

            <div className={style.header}>
                <Header hamClick={hamClick} setHamClick={setHamClick} sessionData={sessionData} clickedPath={handleClickedPath} userPic={userPic.profilePicUrl} />
            </div>

            <div
                className={`${style.lock} ${hamClick && style.lockShow}`}
                onClick={()=>setAutoHide(pre => !pre)}
            >
                {autoHide?
                    <BiSolidLockOpen size={14} />
                :
                    <BiSolidLock size={14} />
                }
                <div className={style.hint}>Auto hide {autoHide? 'enable': 'disable'}</div>
            </div>

            <div className= {style.innerContainer}>
                <Nav hamClick={hamClick} clickedPath={handleClickedPath} role={sessionData.role}/>
                <div className={`${style.child} ${scroll.container}`}>
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