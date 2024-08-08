"use client"

import { useEffect, useState } from "react";
import style from "./header.module.css"
import { doLogOut } from "@/app/api/action";
import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = ({hamClick, setHamClick, sessionData, clickedPath}) => {

    const handleHamburger = () => {
        setHamClick(prevClick => !prevClick);
    }

    const handleLogOut = () => {
        console.log("hi");
        doLogOut();
    }

    return (
        <div className={style.container}>
            <div className={style.innerContainer}>
            <div className={style.hamburger} onClick={handleHamburger}>
                {
                    !hamClick?
                    (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    )
                }
            </div>
            <div className={style.name}>Unicore - <span className={style.uni}>University of Sri Jayawardenapura</span></div>
            </div>
            <div>
                <form action="#" className={style.form}>
                    <input type="text" className={style.search} />
                    <button type="submit" className={style.searchBtn}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={style.icon}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </form>
            </div>
            <div className={style.bottomContainer}>
                <div>{sessionData.name}</div>
                <div className={style.logOut} onClick={handleLogOut}>LogOut</div>
                <Link onClick={() => clickedPath('/profile')} href={'/profile'} className={style.profile}><FaRegUserCircle className={style.profileIcon}/></Link>
            </div>

        </div>
    )
}

export default Header;