"use client"

import Link from 'next/link';
import menu from '@/lib/menuData';
import style from './nav1.module.css';
import { useState } from 'react';
import { HiChevronDown } from "react-icons/hi";

const Nav2 = ({ hamClick }) => {
    const [openSubMenu, setOpenSubMenu] = useState(null);

    const handleMenuClick = (path) => {
        setOpenSubMenu(openSubMenu === path ? null : path);
    };

    return (
        <aside className={style.container}>
            <nav className={style.nav}>
                {menu.map((section, sectionIndex) => (
                    <div className={style.section} key={sectionIndex}>
                        <div className={style.title}>{section.section}</div>
                        <div className={style.itemContainer}>
                        {section.menu.map((item, itemIndex) => (
                            <div key={itemIndex}>
                                {item.submenu? (
                                    <>
                                        <div
                                        className={style.item}
                                        onClick={() => handleMenuClick(item.path)}
                                        >
                                            <div className={style.icon}><item.icon /></div>
                                            <div className={style.name}>{item.name}</div>
                                            <div
                                            className={
                                                `${style.arrowUp}
                                                ${openSubMenu !== null && openSubMenu === item.path && style.arrowDown}`
                                                }
                                            >
                                                <HiChevronDown />
                                            </div>
                                        </div>
                                        {openSubMenu === item.path && item.haveSubmenu &&
                                            <div className={style.submenu}>
                                            {item.submenu.map((subItem, subItemIndex) => (
                                                <Link
                                                href={subItem.path}
                                                className={style.submenuItem}
                                                key={subItemIndex}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                            </div>
                                        }
                                    </>
                                ):(
                                    <Link
                                        href={item.path}
                                        className={style.item}
                                        key={itemIndex}
                                        onClick={() => handleMenuClick(item.path)}
                                    >
                                        <div className={style.icon}><item.icon /></div>
                                        <div className={style.name}>{item.name}</div>
                                    </Link>
                                )}
                            </div>
                        ))}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Nav2;
