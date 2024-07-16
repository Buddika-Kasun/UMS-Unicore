"use client"

import Link from 'next/link'
import style from "./notFoundPage.module.css";

const NotFoundComp = () => {
  return (
    <div className={style.container}>

        <div className={style.top}>
            <h2>404 Not Found</h2>
            <p>Could not find requested resource</p>
        </div>

        <div>
            මට කියොලා මරොගන්න එපා,
            හො ම ත ග යු !
        </div>

        <div>
            <Link href="/">Return Home</Link>
        </div>

    </div>
  )
}

export default NotFoundComp;