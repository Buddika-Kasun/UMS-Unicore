"use client"

import { DotLoader, HashLoader, GridLoader } from "react-spinners";

const Spinner = ({color,size,type}) => {

    return(
        <>
            {type === "dot" && <DotLoader color={color} speedMultiplier={1.5} size={size} />}
            {type === "hash" && <HashLoader color={color} speedMultiplier={1.5} size={size} />}
            {type === "grid" && <GridLoader color={color} speedMultiplier={1.5} size={size} />}
        </>
    );
}

export default Spinner;
