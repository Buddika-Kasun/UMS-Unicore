import filterMenuByRole from "./menuFilter";
import menuData from '@/data/menuData';

const filterRouteByRole = (userRole) => {

    const filteredMenu = filterMenuByRole(menuData, userRole);

    const route = ['/profile','/pages']; // add custome routes of API's

    filteredMenu.forEach(section => {
        section.menu.forEach(menu => {
            if(menu.haveSubmenu) {
                menu.submenu.forEach(submenu => {
                    route.push(submenu.path);
                })
            }
            else {
                route.push(menu.path);
            }
        })
    })

    return route;
}

export default filterRouteByRole;