import { HiOutlineCog, HiOutlineFolder } from "react-icons/hi";
import { FaG,FaN,FaP } from "react-icons/fa6";

const menu = [
    {
      section: "Gestor - Gen Administration",
      secIcon: FaG,
      menu: [
        {
          name: "Masters",
          path: "/gen-admin/masters",
          icon: HiOutlineCog,
          haveSubmenu: false
        },
        {
          name: "Infrastructure Management - InfraGestor",
          path: "/gen-admin/infra-gestor",
          icon: HiOutlineFolder,
          haveSubmenu: true,
          submenu: [
            { name: "Reservations", path: "/gen-admin/infra-gestor/reservations" },
            { name: "Cancel Reservation", path: "/gen-admin/infra-gestor/cancel-reservation" },
            { name: "View Resource Utilization", path: "/gen-admin/infra-gestor/view-resource-utilization" }
          ]
        },
        {
          name: "Library Management - LibraryPro",
          path: "/gen-admin/library-pro",
          icon: HiOutlineFolder,
          haveSubmenu: true,
          submenu: [
            { name: "Register New Users", path: "/gen-admin/library-pro/register-new-users" },
            { name: "Create Items", path: "/gen-admin/library-pro/create-items" },
            { name: "Catalogs", path: "/gen-admin/library-pro/catalogs" },
            { name: "View Catalogs", path: "/gen-admin/library-pro/view-catalogs" },
            { name: "Reserve Items", path: "/gen-admin/library-pro/reserve-items" },
            { name: "Remove Reservation", path: "/gen-admin/library-pro/remove-reservation" },
            { name: "View Reservations", path: "/gen-admin/library-pro/view-reservations" },
            { name: "CheckOut Items", path: "/gen-admin/library-pro/checkout-items" },
            { name: "Renew Items", path: "/gen-admin/library-pro/renew-items" },
            { name: "CheckIn Items", path: "/gen-admin/library-pro/checkin-items" },
            { name: "View Overdue Items", path: "/gen-admin/library-pro/view-overdue-items" },
            { name: "View Stock Count", path: "/gen-admin/library-pro/view-stock-count" },
            { name: "View User Engagement", path: "/gen-admin/library-pro/view-user-engagement" }
          ]
        }
      ]
    },
    {
      section: "Nexus - Student Collaboration",
      secIcon: FaN,
      menu: [
        {
          name: "Masters",
          path: "/student-collaboration/masters",
          icon: HiOutlineCog,
          haveSubmenu: false
        },
        {
          name: "Project Collaboration - UniCore Opus",
          path: "/student-collaboration/unicore-opus",
          icon: HiOutlineFolder,
          haveSubmenu: true,
          submenu: [
            { name: "Create Group", path: "/student-collaboration/unicore-opus/create-group" },
            { name: "View Group", path: "/student-collaboration/unicore-opus/view-group" }
          ]
        },
        {
          name: "Collaborative Virtual Spaces - UniCore Space",
          path: "/student-collaboration/unicore-space",
          icon: HiOutlineFolder,
          haveSubmenu: true,
          submenu: [
            { name: "Create Post", path: "/student-collaboration/unicore-space/create-post" },
            { name: "Create Clubs/Groups", path: "/student-collaboration/unicore-space/create-clubs-groups" }
          ]
        },
        {
          name: "Shared Academic Resources - UniCore Academia",
          path: "/student-collaboration/unicore-academia",
          icon: HiOutlineFolder,
          haveSubmenu: true,
          submenu: [
            { name: "Academia Folder", path: "/student-collaboration/unicore-academia/academia-folder" },
            { name: "Academia", path: "/student-collaboration/unicore-academia/academia" }
          ]
        },
        {
          name: "Discussion Forums - UniCore Forums",
          path: "/student-collaboration/unicore-forums",
          icon: HiOutlineFolder,
          haveSubmenu: true,
          submenu: [
            { name: "Create and Participate", path: "/student-collaboration/unicore-forums/create-and-participate" }
          ]
        }
      ]
    },
    {
      section: "Performance Insight - KPI Management",
      secIcon: FaP,
      menu: [
        {
          name: "Masters",
          path: "/kpi-management/masters",
          icon: HiOutlineCog,
          haveSubmenu: false
        },
        {
          name: "Performance Appraisal - UniCore Goals",
          path: "/kpi-management/unicore-goals",
          icon: HiOutlineFolder,
          haveSubmenu: true,
          submenu: [
            { name: "Set Goals", path: "/kpi-management/unicore-goals/set-goals" },
            { name: "Monitor Goals", path: "/kpi-management/unicore-goals/monitor-goals" },
            { name: "Update Achievements", path: "/kpi-management/unicore-goals/update-achievements" }
          ]
        },
        {
          name: "Professional Development Planning - UniCore Career Path",
          path: "/kpi-management/unicore-career-path",
          icon: HiOutlineFolder,
          haveSubmenu: true,
          submenu: [
            { name: "Schedule Trainings", path: "/kpi-management/unicore-career-path/schedule-trainings" },
            { name: "View High Performance Members", path: "/kpi-management/unicore-career-path/view-high-performance-members" }
          ]
        },
        {
          name: "Student Satisfaction - UniCore Delight",
          path: "/kpi-management/unicore-delight",
          icon: HiOutlineFolder,
          haveSubmenu: true,
          submenu: [
            { name: "Send Feedback Forms", path: "/kpi-management/unicore-delight/send-feedback-forms" },
            { name: "Analyze Student Feedbacks", path: "/kpi-management/unicore-delight/analyze-student-feedbacks" }
          ]
        }
      ]
    }
  ];

export default menu;