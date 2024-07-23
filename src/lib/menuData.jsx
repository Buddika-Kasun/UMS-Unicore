import { HiOutlineCog, HiOutlineFolder } from "react-icons/hi";
import { FaG,FaN,FaP } from "react-icons/fa6";

const menu = [
    {
      section: "Gestor",
      sectionBIKZ: "Gestor - Gen Administration",
      secIcon: FaG,
      menu: [
        {
          name: "Masters",
          path: "/gestor/master",
          icon: HiOutlineCog,
          haveSubmenu: false
        },
        {
          name: "InfraGestor",
          nameBIKZ: "Infrastructure Management - InfraGestor",
          path: "/gestor/InfraGestor",
          icon: HiOutlineFolder,
          haveSubmenu: true,
          submenu: [
            { name: "Reservations", path: "/gestor/InfraGestor/reservations" },
            { name: "Cancel Reservation", path: "/gestor/InfraGestor/cancel-reservation" },
            { name: "View Resource Utilization", path: "/gestor/InfraGestor/view-resource-utilization" }
          ]
        },
        {
          name: "LibraryPro",
          nameBIKZ: "Library Management - LibraryPro",
          path: "/gestor/LibraryPro",
          icon: HiOutlineFolder,
          haveSubmenu: true,
          submenu: [
            { name: "Register New Users", path: "/gestor/LibraryPro/register-new-users" },
            { name: "Create Items", path: "/gestor/LibraryPro/create-items" },
            { name: "Catalogs", path: "/gestor/LibraryPro/catalogs" },
            { name: "View Catalogs", path: "/gestor/LibraryPro/view-catalogs" },
            { name: "Reserve Items", path: "/gestor/LibraryPro/reserve-items" },
            { name: "Remove Reservation", path: "/gestor/LibraryPro/remove-reservation" },
            { name: "View Reservations", path: "/gestor/LibraryPro/view-reservations" },
            { name: "CheckOut Items", path: "/gestor/LibraryPro/checkout-items" },
            { name: "Renew Items", path: "/gestor/LibraryPro/renew-items" },
            { name: "CheckIn Items", path: "/gestor/LibraryPro/checkin-items" },
            { name: "View Overdue Items", path: "/gestor/LibraryPro/view-overdue-items" },
            { name: "View Stock Count", path: "/gestor/LibraryPro/view-stock-count" },
            { name: "View User Engagement", path: "/gestor/LibraryPro/view-user-engagement" }
          ]
        }
      ]
    },
    {
      section: "Nexus",
      sectionBIKZ: "Nexus - Student Collaboration",
      secIcon: FaN,
      menu: [
        {
          name: "Masters",
          path: "/Nexus/masters",
          icon: HiOutlineCog,
          haveSubmenu: false
        },
        {
          name: "UniCore Opus",
          nameBIKZ: "Project Collaboration - UniCore Opus",
          path: "/Nexus/unicoreOpus",
          icon: HiOutlineFolder,
          haveSubmenu: true,
          submenu: [
            { name: "Create Group", path: "/Nexus/unicoreOpus/create-group" },
            { name: "View Group", path: "/Nexus/unicoreOpus/view-group" }
          ]
        },
        {
          name: "UniCore Space",
          nameBIKZ: "Collaborative Virtual Spaces - UniCore Space",
          path: "/Nexus/unicoreSpace",
          icon: HiOutlineFolder,
          haveSubmenu: true,
          submenu: [
            { name: "Create Post", path: "/Nexus/unicoreSpace/create-post" },
            { name: "Create Clubs/Groups", path: "/Nexus/unicoreSpace/create-clubs-groups" }
          ]
        },
        {
          name: "UniCore Academia",
          nameBIKZ: "Shared Academic Resources - UniCore Academia",
          path: "/Nexus/unicoreAcademia",
          icon: HiOutlineFolder,
          haveSubmenu: true,
          submenu: [
            { name: "Academia Folder", path: "/Nexus/unicoreAcademia/academia-folder" },
            { name: "Academia", path: "/Nexus/unicoreAcademia/academia" }
          ]
        },
        {
          name: "UniCore Forums",
          nameBIKZ: "Discussion Forums - UniCore Forums",
          path: "/Nexus/unicoreForums",
          icon: HiOutlineFolder,
          haveSubmenu: true,
          submenu: [
            { name: "Create and Participate", path: "/Nexus/unicoreForums/create-and-participate" }
          ]
        }
      ]
    },
    {
      section: "Performance Insight",
      sectionBIKZ: "Performance Insight - KPI Management",
      secIcon: FaP,
      menu: [
        {
          name: "Masters",
          path: "/performanceInsight/masters",
          icon: HiOutlineCog,
          haveSubmenu: false
        },
        {
          name: "UniCore Goals",
          nameBIKZ: "Performance Appraisal - UniCore Goals",
          path: "/performanceInsight/unicore-goals",
          icon: HiOutlineFolder,
          haveSubmenu: true,
          submenu: [
            { name: "Set Goals", path: "/performanceInsight/unicore-goals/set-goals" },
            { name: "Monitor Goals", path: "/performanceInsight/unicore-goals/monitor-goals" },
            { name: "Update Achievements", path: "/performanceInsight/unicore-goals/update-achievements" }
          ]
        },
        {
          name: "UniCore Career Path",
          nameBIKZ: "Professional Development Planning - UniCore Career Path",
          path: "/performanceInsight/unicore-career-path",
          icon: HiOutlineFolder,
          haveSubmenu: true,
          submenu: [
            { name: "Schedule Trainings", path: "/performanceInsight/unicore-career-path/schedule-trainings" },
            { name: "View High Performance Members", path: "/performanceInsight/unicore-career-path/view-high-performance-members" }
          ]
        },
        {
          name: "UniCore Delight",
          nameBIKZ: "Student Satisfaction - UniCore Delight",
          path: "/performanceInsight/unicore-delight",
          icon: HiOutlineFolder,
          haveSubmenu: true,
          submenu: [
            { name: "Send Feedback Forms", path: "/performanceInsight/unicore-delight/send-feedback-forms" },
            { name: "Analyze Student Feedbacks", path: "/performanceInsight/unicore-delight/analyze-student-feedbacks" }
          ]
        }
      ]
    }
  ];

export default menu;