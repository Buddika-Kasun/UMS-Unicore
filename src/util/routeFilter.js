//import filterMenuByRole from "./menuFilter";
//import menuData from '@/data/menuData';

import routeData from "@/data/routePermission";

const filterRouteByRole = (userRole) => {

    /* // Old Logic
    const filteredMenu = filterMenuByRole(menuData, userRole);

    const routes = ['/profile','/pages']; // add custome routes of API's

    if(userRole == "Test"){
        routes.push('/listView');
    }

    filteredMenu.forEach(section => {
        section.menu.forEach(menu => {
            if(menu.haveSubmenu) {
                menu.submenu.forEach(submenu => {
                    routes.push(submenu.path);
                })
            }
            else {
                routes.push(menu.path);
            }
        })
    });
    */

    // New Logic
    const routes = [];

    if(userRole == "Test") {
        return routeData.map(route => route.path);
    }

    routeData.forEach(route => {
        // Check if the userRole is present in the permission array
        if (Array.isArray(route.permission) && route.permission.includes(userRole)) {
            routes.push(route.path);
        }
    });

    return routes;
}

export default filterRouteByRole;