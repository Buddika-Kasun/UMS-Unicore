import { HiOutlineCog, HiOutlineFolder, HiOutlinePresentationChartBar } from "react-icons/hi";
import { FaG, FaN, FaP } from "react-icons/fa6";

const menuData = [
    {
        section: null,
        menu: [
            {
                name: "Dashboard",
                description: "Dashboard",
                path: "/dashboard",
                icon: HiOutlinePresentationChartBar,
                haveSubmenu: false,
                permission: ["System Admin", "Staff", "Library Staff", "Student", "Administrators", "Guest"]  // Assuming all roles can access Dashboard
            },
            {
                name: "Setup",
                description: "Setup",
                path: "/setup",
                icon: HiOutlineCog,
                haveSubmenu: true,
                submenu: [
                    {
                        name: "Create Faculty",
                        path: "/setup/createFaculty",
                        permission: ["System Admin"]
                    },
                    {
                        name: "Create Cost Center",
                        path: "/setup/createCostCenter",
                        permission: ["System Admin"]
                    },
                    {
                        name: "Create Lists",
                        path: "/setup/createList",
                        permission: ["System Admin"]
                    },
                    {
                        name: "Pending Users",
                        path: "/setup/pendingUsers",
                        permission: ["System Admin"]
                    }
                ]
            }
        ]
    },
    {
        section: "Gestor",
        secDescription: "General Administration",
        secIcon: FaG,
        menu: [
            {
                name: "Masters",
                description: "General Administration Masters",
                path: "/gestor/master",
                icon: HiOutlineCog,
                haveSubmenu: true,
                submenu: [
                    {
                        name: "Create Locations",
                        path: "/gestor/master/createLocation",
                        permission: ["System Admin"]
                    },
                    {
                        name: "Create Sub Locations",
                        path: "/gestor/master/createSubLocation",
                        permission: ["System Admin"]
                    },
                ]
            },
            {
                name: "InfraGestor",
                description: "Infrastructure Management",
                path: "/gestor/InfraGestor",
                icon: HiOutlineFolder,
                haveSubmenu: true,
                submenu: [
                    {
                        name: "Reservations",
                        path: "/gestor/InfraGestor/reservations",
                        permission: ["Staff","System Admin"]
                    },
                    {
                        name: "Cancel Reservation",
                        path: "/gestor/InfraGestor/cancel-reservation",
                        permission: ["Staff","System Admin"]
                    },
                    {
                        name: "View Resource Utilization",
                        path: "/gestor/InfraGestor/view-resource-utilization",
                        permission: ["Administrators","System Admin"]
                    }
                ]
            },
            {
                name: "LibraryPro",
                description: "Library Management",
                path: "/gestor/LibraryPro",
                icon: HiOutlineFolder,
                haveSubmenu: true,
                submenu: [
                    {
                        name: "Register New Users",
                        path: "/gestor/LibraryPro/register-new-users",
                        permission: ["Library Staff","System Admin"]
                    },
                    {
                        name: "Create Items",
                        path: "/gestor/LibraryPro/create-items",
                        permission: ["Library Staff","System Admin"]
                    },
                    {
                        name: "Catalogs",
                        path: "/gestor/LibraryPro/catalogs",
                        permission: ["Library Staff","System Admin"]
                    },
                    {
                        name: "View Catalogs",
                        path: "/gestor/LibraryPro/view-catalogs",
                        permission: ["Library Staff", "Student","System Admin"]
                    },
                    {
                        name: "Reserve Items",
                        path: "/gestor/LibraryPro/reserve-items",
                        permission: ["Student", "Staff","System Admin"]
                    },
                    {
                        name: "Remove Reservation",
                        path: "/gestor/LibraryPro/remove-reservation",
                        permission: ["Library Staff", "Student", "Staff","System Admin"]
                    },
                    {
                        name: "View Reservations",
                        path: "/gestor/LibraryPro/view-reservations",
                        permission: ["Library Staff","System Admin"]
                    },
                    {
                        name: "CheckOut Items",
                        path: "/gestor/LibraryPro/checkout-items",
                        permission: ["Library Staff","System Admin"]
                    },
                    {
                        name: "Renew Items",
                        path: "/gestor/LibraryPro/renew-items",
                        permission: ["Library Staff","System Admin"]
                    },
                    {
                        name: "CheckIn Items",
                        path: "/gestor/LibraryPro/checkin-items",
                        permission: ["Library Staff","System Admin"]
                    },
                    {
                        name: "View Overdue Items",
                        path: "/gestor/LibraryPro/view-overdue-items",
                        permission: ["Library Staff","System Admin"]
                    },
                    {
                        name: "View Stock Count",
                        path: "/gestor/LibraryPro/view-stock-count",
                        permission: ["Library Staff","System Admin"]
                    },
                    {
                        name: "View User Engagement",
                        path: "/gestor/LibraryPro/view-user-engagement",
                        permission: ["Library Staff","System Admin"]
                    }
                ]
            }
        ]
    },
    {
        section: "Nexus",
        secDescription: "Student Collaboration",
        secIcon: FaN,
        menu: [
            {
                name: "Masters",
                description: "Student Collaboration Masters",
                path: "/Nexus/masters",
                icon: HiOutlineCog,
                haveSubmenu: false,
                permission: ["System Admin"]
            },
            {
                name: "UniCore Opus",
                description: "Project Collaboration",
                path: "/Nexus/unicoreOpus",
                icon: HiOutlineFolder,
                haveSubmenu: true,
                submenu: [
                    {
                        name: "Create Group",
                        path: "/Nexus/unicoreOpus/create-group",
                        permission: ["Staff","System Admin"]
                    },
                    {
                        name: "View Group",
                        path: "/Nexus/unicoreOpus/view-group",
                        permission: ["System Admin", "Staff", "Library Staff", "Student", "Administrators"]
                    }
                ]
            },
            {
                name: "UniCore Space",
                description: "Collaborative Virtual Spaces",
                path: "/Nexus/unicoreSpace",
                icon: HiOutlineFolder,
                haveSubmenu: true,
                submenu: [
                    {
                        name: "Create Post",
                        path: "/Nexus/unicoreSpace/create-post",
                        permission: ["System Admin", "Staff", "Library Staff", "Student", "Administrators"]
                    },
                    {
                        name: "Create Clubs/Groups",
                        path: "/Nexus/unicoreSpace/create-clubs-groups",
                        permission: ["System Admin", "Staff", "Library Staff", "Student", "Administrators"]
                    }
                ]
            },
            {
                name: "UniCore Academia",
                description: "Shared Academic Resources",
                path: "/Nexus/unicoreAcademia",
                icon: HiOutlineFolder,
                haveSubmenu: true,
                submenu: [
                    {
                        name: "Academia Folder",
                        path: "/Nexus/unicoreAcademia/academia-folder",
                        permission: ["System Admin", "Staff", "Library Staff", "Student", "Administrators"]
                    },
                    {
                        name: "Academia",
                        path: "/Nexus/unicoreAcademia/academia",
                        permission: ["System Admin", "Staff", "Library Staff", "Student", "Administrators"]
                    }
                ]
            },
            {
                name: "UniCore Forums",
                description: "Discussion Forums",
                path: "/Nexus/unicoreForums",
                icon: HiOutlineFolder,
                haveSubmenu: true,
                submenu: [
                    {
                        name: "Create and Participate",
                        path: "/Nexus/unicoreForums/create-and-participate",
                        permission: ["System Admin", "Staff", "Library Staff", "Student", "Administrators"]
                    }
                ]
            }
        ]
    },
    {
        section: "Performance Insight",
        secDescription: "KPI Management",
        secIcon: FaP,
        menu: [
            {
                name: "Masters",
                description: "KPI Management Masters",
                path: "/performanceInsight/masters",
                icon: HiOutlineCog,
                haveSubmenu: false,
                permission: ["System Admin"]
            },
            {
                name: "UniCore Goals",
                description: "Performance Appraisal",
                path: "/performanceInsight/unicore-goals",
                icon: HiOutlineFolder,
                haveSubmenu: true,
                submenu: [
                    {
                        name: "Set Goals",
                        path: "/performanceInsight/unicore-goals/set-goals",
                        permission: ["Administrators","System Admin"]
                    },
                    {
                        name: "Monitor Goals",
                        path: "/performanceInsight/unicore-goals/monitor-goals",
                        permission: ["Administrators","System Admin"]
                    },
                    {
                        name: "Update Achievements",
                        path: "/performanceInsight/unicore-goals/update-achievements",
                        permission: ["Staff","System Admin"]
                    }
                ]
            },
            {
                name: "UniCore Career Path",
                description: "Professional Development Planning",
                path: "/performanceInsight/unicore-career-path",
                icon: HiOutlineFolder,
                haveSubmenu: true,
                submenu: [
                    {
                        name: "Schedule Trainings",
                        path: "/performanceInsight/unicore-career-path/schedule-trainings",
                        permission: ["Administrators","System Admin"]
                    },
                    {
                        name: "View High Performance Members",
                        path: "/performanceInsight/unicore-career-path/view-high-performance-members",
                        permission: ["Administrators","System Admin"]
                    }
                ]
            },
            {
                name: "UniCore Delight",
                description: "Student Satisfaction",
                path: "/performanceInsight/unicore-delight",
                icon: HiOutlineFolder,
                haveSubmenu: true,
                submenu: [
                    {
                        name: "Send Feedback Forms",
                        path: "/performanceInsight/unicore-delight/send-feedback-forms",
                        permission: ["Staff","System Admin"]
                    },
                    {
                        name: "Analyze Student Feedbacks",
                        path: "/performanceInsight/unicore-delight/analyze-student-feedbacks",
                        permission: ["Administrators","System Admin"]
                    }
                ]
            }
        ]
    }
];

export default menuData;
