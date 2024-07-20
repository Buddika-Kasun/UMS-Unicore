"use client"
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import style from "./layout.module.css";
import { useState } from "react";
import Nav from "@/components/Nav/Nav";
import Nav2 from "@/components/Nav1/Nav2";

const CommonLayout = ({children}) => {
    const [hamClick, setHamClick] = useState(false);
    return (
        <div>
            <Header hamClick={hamClick} setHamClick={setHamClick}/>
            <div className= {style.innerContainer}>
                {/* <Nav hamClick={hamClick}/> */}
                <Nav2 hamClick={hamClick} />
                <div className={style.child}>
                    {children}
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default CommonLayout;