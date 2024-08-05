import { useEffect, useState } from 'react';
import style from './eyeBtn.module.css';
import { IoMdEye } from "react-icons/io";

const EyeBtn = ({fun, clickStat}) => {

    const [isClicked, setIsClicked] = useState(clickStat);

    const handleClick = () => {
        setIsClicked(pre => !pre);
        fun();
    }

    useEffect(()=>{
        setIsClicked(clickStat);
    },[clickStat])
    return (
        <div className={style.eyeBtnContainer} onClick={handleClick}>
            <div className={`${style.crossLine} ${isClicked && style.clickedCrossLine}`}></div>
            <IoMdEye className={`${style.eyeBtn} ${isClicked && style.clickedEyeBtn}`} />
        </div>
    )
}

export default EyeBtn;