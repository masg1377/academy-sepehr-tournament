import {
  Mail,
  Home,
  Airplay,
  AlertTriangle,
  UserX,
  Users,
  FileText,
  Settings,
  Layers,
  Layout,
  Circle,
} from "react-feather";

export default [
  {
    id: "tournament",
    title: "Tournament",
    icon: require("../../../assets/images/icons/sidebar-menu/lang.svg").default,
    icon_l: require("../../../assets/images/icons/sidebar-menu/lang-l.png")
      .default,
    navLink: "/tournament-list",
  },

  // {
  //   id: "home",
  //   title: "Dashboard",
  //   icon: require("../../../assets/images/icons/sidebar-menu/dashboard.svg")
  //     .default,
  //   icon_l: require("../../../assets/images/icons/sidebar-menu/dashboard-l.svg")
  //     .default,
  //   navLink: "/dashboard",
  // },
  // {
  //   id: "packages",
  //   title: "Packages",
  //   icon: require("../../../assets/images/icons/sidebar-menu/package.svg")
  //     .default,
  //   icon_l: require("../../../assets/images/icons/sidebar-menu/package-l.svg")
  //     .default,
  //   navLink: "/packages",
  // },

  // {
  //   id: "mls",
  //   title: "MLS",
  //   icon: require("../../../assets/images/icons/sidebar-menu/MLS-web.svg")
  //     .default,
  //   icon_l: require("../../../assets/images/icons/sidebar-menu/MLS-web-l.svg")
  //     .default,
  //   navLink: "/mls-list",
  // },
  // {
  //   id: "discounts_promotion",
  //   title: "Discount & promo",
  //   icon: require("../../../assets/images/icons/sidebar-menu/discounts-promo.svg")
  //     .default,
  //   icon_l:
  //     require("../../../assets/images/icons/sidebar-menu/discounts-promo-l.svg")
  //       .default,

  //   children: [
  //     {
  //       id: "discounts",
  //       title: "Discounts",
  //       icon: <Circle size={12} />,
  //       icon_l: <Circle size={12} color="white" />,
  //       navLink: "/discounts-list",
  //     },
  //     {
  //       id: "promotions",
  //       title: "Promotions",
  //       icon: <Circle size={12} />,
  //       icon_l: <Circle size={12} color="white" />,
  //       navLink: "/promotion-list",
  //     },
  //   ],
  // },
  // {
  //   id: "customers",
  //   title: "Customers",
  //   icon: require("../../../assets/images/icons/sidebar-menu/customer.svg")
  //     .default,
  //   icon_l: require("../../../assets/images/icons/sidebar-menu/customer-l.svg")
  //     .default,
  //   children: [
  //     {
  //       id: "allCustomer",
  //       title: "All Customer",
  //       icon: <Circle size={12} />,
  //       icon_l: <Circle size={12} color="white" />,
  //       navLink: "/customer-list",
  //     },
  //     {
  //       id: "mlsCustomer",
  //       title: "MLS Customer",
  //       icon: <Circle size={12} />,
  //       icon_l: <Circle size={12} color="white" />,
  //       navLink: "/mlsCustomer-list",
  //     },
  //   ],
  // },
  // {
  //   id: "requests",
  //   title: "Requests",
  //   icon: require("../../../assets/images/icons/sidebar-menu/active-requests.svg")
  //     .default,
  //   icon_l:
  //     require("../../../assets/images/icons/sidebar-menu/active-requests-l.svg")
  //       .default,
  //   navLink: "/alerts",
  // },
  // {
  //   id: "groups",
  //   title: "Group Mgmt",
  //   icon: require("../../../assets/images/icons/sidebar-menu/employee.svg")
  //     .default,
  //   icon_l: require("../../../assets/images/icons/sidebar-menu/employee-l.svg")
  //     .default,
  //   navLink: "/groups-list",
  // },
  // {
  //   id: "platform",
  //   title: "Platform",
  //   icon: require("../../../assets/images/icons/sidebar-menu/platforms.svg")
  //     .default,
  //   icon_l: require("../../../assets/images/icons/sidebar-menu/platforms-l.svg")
  //     .default,
  //   navLink: "/platforms",
  // },
  // {
  //   id: "users",
  //   title: "Users",
  //   icon: require("../../../assets/images/icons/sidebar-menu/user.svg").default,
  //   icon_l: require("../../../assets/images/icons/sidebar-menu/user-l.svg")
  //     .default,
  //   navLink: "/users",
  // },
  // {
  //   id: "staffmgmt",
  //   title: "Staff Mgmt",
  //   icon: require("../../../assets/images/icons/sidebar-menu/staff.svg")
  //     .default,
  //   icon_l: require("../../../assets/images/icons/sidebar-menu/staff-l.svg")
  //     .default,
  //   navLink: "/staff",
  // },
  // {
  //   id: "multilang",
  //   title: "Multi language",
  //   icon: require("../../../assets/images/icons/sidebar-menu/lang.svg").default,
  //   icon_l: require("../../../assets/images/icons/sidebar-menu/lang-l.png")
  //     .default,
  //   navLink: "/multilang",
  // },
  // {
  //   id: "roles",
  //   title: "Roles",
  //   icon: require("../../../assets/images/icons/sidebar-menu/role.svg").default,
  //   icon_l: require("../../../assets/images/icons/sidebar-menu/role-l.svg")
  //     .default,
  //   navLink: "/roles",
  // },
  // {
  //   id: "permission",
  //   title: "Permissions",
  //   icon: require("../../../assets/images/icons/sidebar-menu/permission.svg")
  //     .default,
  //   icon_l:
  //     require("../../../assets/images/icons/sidebar-menu/permission-l.svg")
  //       .default,
  //   navLink: "/permissions",
  // },
  // {
  //   id: "btt",
  //   title: "BTT Mgmt",
  //   icon: require("../../../assets/images/icons/sidebar-menu/btt-mgmt.svg")
  //     .default,
  //   icon_l: require("../../../assets/images/icons/sidebar-menu/btt-mgmt-l.svg")
  //     .default,
  //   navLink: "/btt-list",
  // },
  // {
  //   id: "LogOut",
  //   title: "LogOut",
  //   icon: require("../../../assets/images/icons/sidebar-menu/logout.svg")
  //     .default,
  //   icon_l: require("../../../assets/images/icons/sidebar-menu/logout-l.svg")
  //     .default,
  //   navLink: "/logOut",
  // },
];
