"use client"

import Link from 'next/link';
import menu from '@/lib/menuData';
import style from './nav.module.css';
import { useEffect, useRef, useState } from 'react';
import { HiChevronDown, HiOutlineDocumentText } from "react-icons/hi";
import { usePathname } from 'next/navigation';

const Nav = ({ hamClick, clickedPath }) => {

    const pathname = usePathname();

    const [route, setRoute] = useState(pathname);
    const [openMenu, setOpenMenu] = useState(route);
    const [hoverItem, setHoverItem] = useState(null);

    const leftAsideRef = useRef(null);
    const rightAsideRef = useRef(null);

    useEffect(() => {
        setRoute(pathname);
    }, [pathname]);

    const handleMenuClick = (path) => {
        setOpenMenu(openMenu === path ? '' : path);
    };

    // Sync scroll between left and right <aside> elements
    const syncScroll = (event) => {
        const scrollTop = event.target.scrollTop;
        if (rightAsideRef.current) {
            rightAsideRef.current.scrollTop = scrollTop;
        }
    };

    const handleMouseEnter = (val) => {
        setHoverItem(val);
    };

    const handleMouseLeave = () => {
        setHoverItem(null);
    };

    useEffect(() => {
        const leftAside = leftAsideRef.current;
        if (leftAside) {
            leftAside.addEventListener('scroll', syncScroll);
        }

        return () => {
            if (leftAside) {
                leftAside.removeEventListener('scroll', syncScroll);
            }
        };
    }, []);

    return (
        <>
        <aside
            ref={leftAsideRef}
            className={
                `${style.container}
                ${hamClick ? style.activeContainer : style.inactiveContainer}`
            }
        >
            <nav className={style.nav}>
                {menu.map((section, sectionIndex) => (
                    <div className={style.section} key={sectionIndex}>
                        <div onMouseEnter={() => handleMouseEnter(section.secDescription)}
                            onMouseLeave={() => handleMouseLeave()}>
                        <div className={`${style.sectionIcon} ${hamClick ? style.inactiveName : style.activeName}`}><section.secIcon /></div>
                        <div className={`${style.title} ${hamClick ? style.activeName : style.inactiveName}`}>
                            {section.section}
                        </div>
                        </div>
                        <div className={style.itemContainer}>
                        {section.menu.map((item, itemIndex) => (
                            <div key={itemIndex}>
                                {item.submenu? (
                                    <div>
                                        <div
                                        className={
                                            `${style.item} ${style.itemSub}
                                            ${route.includes(item.path) && style.subItemClicked}
                                            ${openMenu.includes(item.path) && style.subItemSelected}`
                                        }
                                        onClick={() => handleMenuClick(item.path)}
                                        onMouseEnter={() => handleMouseEnter(item.description)}
                                        onMouseLeave={() => handleMouseLeave()}
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
                                                onMouseEnter={() => handleMouseEnter(subItem.name)}
                                                onMouseLeave={() => handleMouseLeave()}
                                                >
                                                    <div className={style.iconSub}><HiOutlineDocumentText /></div>
                                                    <div className={`${style.nameSub} ${hamClick ? style.activeName : style.inactiveName}`}>{subItem.name}</div>
                                                </Link>
                                            ))}
                                            </div>
                                        }
                                    </div>
                                ):(
                                    <Link
                                        href={item.path}
                                        className={`${style.item} ${route.includes(item.path) && style.itemClicked}`}
                                        key={itemIndex}
                                        onClick={() => {
                                            handleMenuClick(item.path);
                                            clickedPath(item.path);
                                        }}
                                        onMouseEnter={() => handleMouseEnter(item.description)}
                                        onMouseLeave={() => handleMouseLeave()}
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

        <div className={style.secondContainer}>
            <div
                ref={rightAsideRef}
                className={
                    `${style.innerContainer}`
                }
            >
                <nav className={style.aaaa}>
                    {menu.map((section, sectionIndex) => (
                        <div className={style.section} key={sectionIndex}>
                            <div className={`${style.title} ${style.title1}`}>
                                <div className={`${style.trangle2} ${hoverItem === section.secDescription && style.trangleHover}`}></div>
                                <div className={`${style.hintName} ${hoverItem === section.secDescription && style.hintHover}`}>{section.secDescription}</div>
                            </div>
                            <div className={style.itemContainer}>
                            {section.menu.map((item, itemIndex) => (
                                <div key={itemIndex}>
                                    {item.submenu? (
                                        <div>
                                            <div className={`${style.item} ${style.item1}`}>
                                                <div className={`${style.trangle1} ${hoverItem === item.description && style.trangleHover}`}></div>
                                                <div className={`${style.hintName} ${hoverItem === item.description && style.hintHover}`}>{item.description}</div>
                                            </div>
                                            {openMenu.includes(item.path) && item.haveSubmenu &&
                                                <div className={`${style.submenu} ${style.submenu1}`}>
                                                {item.submenu.map((subItem, subItemIndex) => (
                                                    <div
                                                    className={`${style.submenuItem} ${style.submenuItem1}`}
                                                    key={subItemIndex}
                                                    >
                                                        <div className={`${style.trangle3} ${hoverItem === subItem.name && style.trangleHover}`}></div>
                                                        <div className={`${style.hintName} ${hoverItem === subItem.name && style.hintHover}`}>{subItem.name}</div>
                                                    </div>
                                                ))}
                                                </div>
                                            }
                                        </div>
                                    ):(
                                        <div
                                            className={`${style.item} ${style.item1}`}
                                            key={itemIndex}
                                        >
                                            <div className={`${style.trangle1} ${hoverItem === item.description && style.trangleHover}`}></div>
                                            <div className={`${style.hintName} ${hoverItem === item.description && style.hintHover}`}>{item.description}</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>
        </div>
        </>
    );
};

export default Nav;
