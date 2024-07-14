"use client"
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import style from "./layout.module.css";
import Nav from "@/components/Nav/Nav";
import { useState } from "react";

const CommonLayout = ({children}) => {
    const [showNav, setShowNav] = useState(true);
    return (
        <div>
            <Header />
            <div className= {style.innerContainer}>
                <Nav />
                <div className={style.child}>
                    {children}
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default CommonLayout;