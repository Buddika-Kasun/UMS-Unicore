
const routeData = [
    {
        path: "/dashboard",
        permission: ["System Admin", "Staff", "Library Staff", "Student", "Administrators", "Guest"]  // Assuming all roles can access Dashboard
    },
    {
        path: "/profile",
        permission: ["System Admin", "Staff", "Library Staff", "Student", "Administrators", "Guest"]
    },
    {
        path: "/gestor/master/createLocation",
        permission: ["System Admin"]
    },
    {
        path: "/gestor/master/createSubLocation",
        permission: ["System Admin"]
    },
    {
        path: "/gestor/InfraGestor/reservations",
        permission: ["Staff"]
    },
    {
        path: "/gestor/InfraGestor/cancel-reservation",
        permission: ["Staff"]
    },
    {
        path: "/gestor/InfraGestor/view-resource-utilization",
        permission: ["Administrators"]
    },
    {
        path: "/gestor/LibraryPro/register-new-users",
        permission: ["Library Staff"]
    },
    {
        path: "/gestor/LibraryPro/create-items",
        permission: ["Library Staff"]
    },
    {
        path: "/gestor/LibraryPro/catalogs",
        permission: ["Library Staff"]
    },
    {
        path: "/gestor/LibraryPro/view-catalogs",
        permission: ["Library Staff", "Student"]
    },
    {
        path: "/gestor/LibraryPro/reserve-items",
        permission: ["Student", "Staff"]
    },
    {
        path: "/gestor/LibraryPro/remove-reservation",
        permission: ["Library Staff", "Student", "Staff"]
    },
    {
        path: "/gestor/LibraryPro/view-reservations",
        permission: ["Library Staff"]
    },
    {
        path: "/gestor/LibraryPro/checkout-items",
        permission: ["Library Staff"]
    },
    {
        path: "/gestor/LibraryPro/renew-items",
        permission: ["Library Staff"]
    },
    {
        path: "/gestor/LibraryPro/checkin-items",
        permission: ["Library Staff"]
    },
    {
        path: "/gestor/LibraryPro/view-stock-count",
        permission: ["Library Staff"]
    },
    {
        path: "/gestor/LibraryPro/view-user-engagement",
        permission: ["Library Staff"]
    },
    {
        path: "/Nexus/masters",
        permission: ["System Admin"]
    },
    {
        path: "/Nexus/unicoreOpus/create-group",
        permission: ["Staff"]
    },
    {
        path: "/Nexus/unicoreOpus/view-group",
        permission: ["System Admin", "Staff", "Library Staff", "Student", "Administrators"]
    },
    {
        path: "/Nexus/unicoreSpace/create-post",
        permission: ["System Admin", "Staff", "Library Staff", "Student", "Administrators"]
    },
    {
        path: "/Nexus/unicoreSpace/create-clubs-groups",
        permission: ["System Admin", "Staff", "Library Staff", "Student", "Administrators"]
    },
    {
        path: "/Nexus/unicoreAcademia/academia-folder",
        permission: ["System Admin", "Staff", "Library Staff", "Student", "Administrators"]
    },
    {
        path: "/Nexus/unicoreAcademia/academia",
        permission: ["System Admin", "Staff", "Library Staff", "Student", "Administrators"]
    },
    {
        path: "/Nexus/unicoreForums/create-and-participate",
        permission: ["System Admin", "Staff", "Library Staff", "Student", "Administrators"]
    },
    {
        path: "/performanceInsight/masters",
        permission: ["System Admin"]
    },
    {
        path: "/performanceInsight/unicore-goals/set-goals",
        permission: ["Administrators"]
    },
    {
        path: "/performanceInsight/unicore-goals/monitor-goals",
        permission: ["Administrators"]
    },
    {
        path: "/performanceInsight/unicore-goals/update-achievements",
        permission: ["Staff"]
    },
    {
        path: "/performanceInsight/unicore-career-path/schedule-trainings",
        permission: ["Administrators"]
    },
    {
        path: "/performanceInsight/unicore-career-path/view-high-performance-members",
        permission: ["Administrators"]
    },
    {
        path: "/performanceInsight/unicore-delight/send-feedback-forms",
        permission: ["Staff"]
    },
    {
        path: "/performanceInsight/unicore-delight/analyze-student-feedbacks",
        permission: ["Administrators"]
    },
    {
        path: "/setup/createFaculty",
        permission: ["System Admin"]
    },
    {
        path: "/setup/createFaculty/listView",
        permission: ["System Admin"]
    },
    {
        path: "/setup/createCostCenter",
        permission: ["System Admin"]
    },
    {
        path: "/setup/createCostCenter/listView",
        permission: ["System Admin"]
    },
    {
        path: "/setup/createList",
        permission: ["System Admin"]
    },
    {
        path: "/setup/createList/listView",
        permission: ["System Admin"]
    },
    {
        path: "/setup/pendingUsers",
        permission: ["System Admin"]
    },
    // API's Permissions
    {
        path: "/api/pages/profile",
        permission: ["System Admin", "Staff", "Library Staff", "Student", "Administrators", "Guest"]
    },
    {
        path: "/api/pages/users",
        permission: ["Test"]
    },
    {
        path: "/api/pages/gestor/master",
        permission: ["System Admin"]
    },
    {
        path: "/api/pages/setup/createCostCenter",
        permission: ["System Admin"]
    },
    {
        path: "/api/pages/setup/createCostCenter",
        permission: ["System Admin"]
    },
    {
        path: "/api/pages/setup/createList",
        permission: ["System Admin"]
    }
];

export default routeData;