"use client"

import Link from 'next/link'
import style from "./notFoundPage.module.css";

const NotFoundComp = () => {
  return (
    <div classNameName={style.page_404}>
      <div className={style.container}>
        <div className={style.row}>
          <div className={style.four_zero_four_bg}>
              <h1>404</h1>
          </div>
          <div className={style.content_box_404}>
              <h3 className={style.h2}>Looks Like You are Lost</h3>
              <p>The page you are looking for not available</p>
              <div className={style.rtnButton}>
                <Link href="/dashboard" >Return Home</Link>
              </div>
          </div>
        </div>
      </div>
   </div>
  )
}

export default NotFoundComp;