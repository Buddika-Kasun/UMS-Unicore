
const routeData = [
    {
        path: "/dashboard",
        permission: ["System Admin", "Staff", "Library Staff", "Students", "Administrators", "Guest"]  // Assuming all roles can access Dashboard
    },
    {
        path: "/profile",
        permission: ["System Admin", "Staff", "Library Staff", "Students", "Administrators", "Guest"]
    },
    {
        path: "/gestor/master",
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
        permission: ["Library Staff", "Students"]
    },
    {
        path: "/gestor/LibraryPro/reserve-items",
        permission: ["Students", "Staff"]
    },
    {
        path: "/gestor/LibraryPro/remove-reservation",
        permission: ["Library Staff", "Students", "Staff"]
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
        permission: ["User"]
    },
    {
        path: "/Nexus/unicoreSpace/create-post",
        permission: ["User"]
    },
    {
        path: "/Nexus/unicoreSpace/create-clubs-groups",
        permission: ["User"]
    },
    {
        path: "/Nexus/unicoreAcademia/academia-folder",
        permission: ["User"]
    },
    {
        path: "/Nexus/unicoreAcademia/academia",
        permission: ["User"]
    },
    {
        path: "/Nexus/unicoreForums/create-and-participate",
        permission: ["User"]
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
    // API's Permissions
    {
        path: "/api/pages/profile",
        permission: ["System Admin", "Staff", "Library Staff", "Students", "Administrators", "Guest"]
    },
    {
        path: "/api/pages/users",
        permission: ["Test"]
    },
    {
        path: "/api/pages/gestor/master",
        permission: ["System Admin"]
    }
];

export default routeData;