"use client"

import menu from '@/data/menuData'
import menuData from '@/data/menuData';
import filterMenuByRole from '@/util/menuFilter';
import filterRouteByRole from '@/util/routeFilter';
import React from 'react'

function page() {

  const testMenu = menuData;
  //const filterMenu = menuTest;
  const role = 'User';
  const filterMenu = filterMenuByRole(testMenu, role);

  const route = filterRouteByRole(role);

  const styles = {
    container: {
      display: 'flex',
    },
  }

  return (
    <div>
      <div>Test Page</div>

      <div style={styles.container}>

        <ol>
        {testMenu.map((section) => (
            <li>
              {section.section}
              <ol>
              {section.menu.map((menu) => (
                <li>
                  {menu.name}
                  <ol>
                    {menu.haveSubmenu && menu.submenu.map((item) => (
                      <li>
                        {item.name}
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
              </ol>
            </li>
        ))}
        </ol>

        <ol>
        {role}
        {filterMenu.map((section) => (
            <li>
              {section.section}
              <ol>
              {section.menu.map((menu) => (
                <li>
                  {menu.name}
                  <ol>
                    {menu.haveSubmenu && menu.submenu.map((item) => (
                      <li>
                        {item.name}
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
              </ol>
            </li>
        ))}
        </ol>

        <ol>
          {route.map((path => (
            <li>{path}</li>
          )))}
        </ol>

      </div>

    </div>
  )
}

export default page