"use client"

import Link from 'next/link';
import menu from '@/lib/menuData';
import style from './nav.module.css';
import { useEffect, useState } from 'react';
import { HiChevronDown, HiOutlineDocumentText } from "react-icons/hi";
import { usePathname } from 'next/navigation';

const Nav = ({ hamClick, clickedPath }) => {

    const pathname = usePathname();

    const [route, setRoute] = useState(pathname);
    const [openMenu, setOpenMenu] = useState(route);
    // const [openSubMenu, setOpenSubMenu] = useState(route);

    useEffect(() => {
        setRoute(pathname);
    }, [pathname]);

    const handleMenuClick = (path) => {
        setOpenMenu(openMenu === path ? '' : path);
        // setRoute(path);
        // handleLoading();
    };

    // const handleSubMenuClick = (path) => {
    //     setOpenSubMenu(openSubMenu === path ? '' : path);
    //     // setRoute(path);
    // };

    return (
        <aside className={
            `${style.container}
            ${hamClick ? style.activeContainer : style.inactiveContainer}`
            }>
            <nav className={style.nav}>
                {menu.map((section, sectionIndex) => (
                    <div className={style.section} key={sectionIndex}>
                        <div className={`${style.sectionIcon} ${hamClick ? style.inactiveName : style.activeName}`}><section.secIcon /></div>
                        <div className={`${style.title} ${hamClick ? style.activeName : style.inactiveName}`}>{section.section}</div>
                        <div className={style.itemContainer}>
                        {section.menu.map((item, itemIndex) => (
                            <div key={itemIndex}>
                                {item.submenu? (
                                    <>
                                        <div
                                        className={
                                            `${style.item} ${style.itemSub}
                                            ${route.includes(item.path) && style.subItemClicked}
                                            ${openMenu.includes(item.path) && style.subItemSelected}`
                                        }
                                        onClick={() => handleMenuClick(item.path)}
                                        >
                                            <div className={style.icon}><item.icon /></div>
                                            <div className={`${style.name} ${hamClick ? style.activeName : style.inactiveName}`}>&nbsp;{item.name}</div>
                                            <div
                                            className={
                                                `${style.arrowUp}
                                                ${openMenu !== '' && openMenu.includes(item.path) && style.arrowDown}`
                                                }
                                            >
                                                <HiChevronDown />
                                            </div>
                                        </div>
                                        {openMenu.includes(item.path) && item.haveSubmenu &&
                                            <div className={style.submenu}>
                                            {item.submenu.map((subItem, subItemIndex) => (
                                                <Link
                                                href={subItem.path}
                                                className={
                                                    `${style.submenuItem}
                                                    ${route === subItem.path && style.itemClicked}`}
                                                key={subItemIndex}
                                                onClick={() => {
                                                    handleMenuClick(subItem.path);
                                                    clickedPath(subItem.path)
                                                }}
                                                >
                                                    <div className={style.iconSub}><HiOutlineDocumentText /></div>
                                                    <div className={`${style.nameSub} ${hamClick ? style.activeName : style.inactiveName}`}>{subItem.name}</div>
                                                </Link>
                                            ))}
                                            </div>
                                        }
                                    </>
                                ):(
                                    <Link
                                        href={item.path}
                                        className={`${style.item} ${route.includes(item.path) && style.itemClicked}`}
                                        key={itemIndex}
                                        onClick={() => {
                                            handleMenuClick(item.path);
                                            clickedPath(item.path);
                                            // setRoute(item.path);
                                        }}
                                    >
                                        <div className={style.icon}><item.icon /></div>
                                        <div className={`${style.name} ${hamClick ? style.activeName : style.inactiveName}`}>&nbsp;{item.name}</div>
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

export default Nav;
