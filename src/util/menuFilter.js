/**
 * Filters the menu based on the user's role.
 * @param {Array} menu - The complete menu array.
 * @param {string} userRole - The role of the current user.
 * @returns {Array} - The filtered menu.
 */

const filterMenuByRole = (menu, userRole) => {

    if(userRole === 'Test') return menu;

    return menu.map(section => {
        const filteredMenu = section.menu
            .map(item => {
                // Clone the item to avoid mutating the original
                const newItem = { ...item };

                if (newItem.haveSubmenu) {
                    // Filter and clone the submenu
                    newItem.submenu = newItem.submenu
                        .filter(subItem => subItem.permission.includes(userRole))
                        .map(subItem => ({ ...subItem }));

                    // Return the item only if it has submenu items left
                    return newItem.submenu.length > 0 ? newItem : null;
                }

                // Return the item only if it has the required permission
                return newItem.permission.includes(userRole) ? newItem : null;
            })
            .filter(item => item !== null); // Remove any null values from the filtered array

        // Clone the section and replace its menu with the filtered one
        return { ...section, menu: filteredMenu };
    }).filter(section => section.menu.length > 0); // Remove any sections with no menu items
};

export default filterMenuByRole;