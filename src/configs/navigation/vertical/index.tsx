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
  {
    id: "users",
    title: "Users",
    icon: require("../../../assets/images/icons/sidebar-menu/user.svg").default,
    icon_l: require("../../../assets/images/icons/sidebar-menu/user-l.svg")
      .default,
    children: [
      {
        id: "users",
        title: "Users",
        icon: <Circle size={12} />,
        icon_l: <Circle size={12} color="white" />,
        navLink: "/users",
      },
      {
        id: "customers",
        title: "Customers",
        icon: <Circle size={12} />,
        icon_l: <Circle size={12} color="white" />,
        navLink: "/customer-list",
      },

      {
        id: "mlsCustomers",
        title: "MLS Customers",
        icon: <Circle size={12} />,
        icon_l: <Circle size={12} color="white" />,
        navLink: "/mlsCustomer-list",
      },
      {
        id: "staffmgmt",
        title: "Staff List",
        icon: <Circle size={12} />,
        icon_l: <Circle size={12} color="white" />,
        navLink: "/staff",
      },
    ],
  },
  {
    id: "groups",
    title: "Group Mgmt",
    icon: require("../../../assets/images/icons/sidebar-menu/employee.svg")
      .default,
    icon_l: require("../../../assets/images/icons/sidebar-menu/employee-l.svg")
      .default,
    navLink: "/groups-list",
  },
  {
    id: "staffRolePermission",
    title: "Roles & Permissions",
    icon: require("../../../assets/images/icons/sidebar-menu/staff.svg")
      .default,
    icon_l: require("../../../assets/images/icons/sidebar-menu/staff-l.svg")
      .default,
    children: [
      {
        id: "roles",
        title: "Roles",
        icon: <Circle size={12} />,
        icon_l: <Circle size={12} color="white" />,
        navLink: "/roles",
      },
      {
        id: "permission",
        title: "Permissions",
        icon: <Circle size={12} />,
        icon_l: <Circle size={12} color="white" />,
        navLink: "/permissions",
      },
    ],
  },
  {
    id: "multilang",
    title: "Multi language",
    icon: require("../../../assets/images/icons/sidebar-menu/lang.svg").default,
    icon_l: require("../../../assets/images/icons/sidebar-menu/lang-l.png")
      .default,
    navLink: "/multilang",
  },
  {
    id: "mls",
    title: "MLS",
    icon: require("../../../assets/images/icons/sidebar-menu/MLS-web.svg")
      .default,
    icon_l: require("../../../assets/images/icons/sidebar-menu/MLS-web-l.svg")
      .default,
    children: [
      {
        id: "mls",
        title: "MLS Providers",
        icon: <Circle size={12} />,
        icon_l: <Circle size={12} color="white" />,
        navLink: "/mls-list",
      },
      {
        id: "platform",
        title: "MLS Platform",
        icon: <Circle size={12} />,
        icon_l: <Circle size={12} color="white" />,
        navLink: "/platforms",
      },
      {
        id: "requests",
        title: "MLS Requests",
        icon: <Circle size={12} />,
        icon_l: <Circle size={12} color="white" />,
        navLink: "/alerts",
      },
    ],
  },
  {
    id: "salesMarketing",
    title: "Sales & Marketing",
    icon: require("../../../assets/images/icons/sidebar-menu/package.svg")
      .default,
    icon_l: require("../../../assets/images/icons/sidebar-menu/package-l.svg")
      .default,
    children: [
      {
        id: "packages",
        title: "Packages",
        icon: <Circle size={12} />,
        icon_l: <Circle size={12} color="white" />,
        navLink: "/packages",
      },
      {
        id: "discounts",
        title: "Discounts",
        icon: <Circle size={12} />,
        icon_l: <Circle size={12} color="white" />,
        navLink: "/discounts-list",
      },
      {
        id: "promotions",
        title: "Promotions",
        icon: <Circle size={12} />,
        icon_l: <Circle size={12} color="white" />,
        navLink: "/promotion-list",
      },
    ],
  },
  {
    id: "notifications",
    title: "Notification",
    icon: require("../../../assets/images/icons/sidebar-menu/notification.svg")
      .default,
    icon_l:
      require("../../../assets/images/icons/sidebar-menu/notification-l.svg")
        .default,
    children: [
      {
        id: "notif-list",
        title: "Notifcation list",
        icon: <Circle size={12} />,
        icon_l: <Circle size={12} color="white" />,
        navLink: "/notification-list",
      },
      {
        id: "variables",
        title: "Variables",
        icon: <Circle size={12} />,
        icon_l: <Circle size={12} color="white" />,
        navLink: "/notification-variables",
      },
      {
        id: "notif-setting",
        title: "Notification settings",
        icon: <Circle size={12} />,
        icon_l: <Circle size={12} color="white" />,
        navLink: "/notification-setting-list",
      },
    ],
  },
  {
    id: "publisher",
    title: "Publisher",
    icon: require("../../../assets/images/icons/sidebar-menu/publisher.svg")
      .default,
    icon_l: require("../../../assets/images/icons/sidebar-menu/publisher-l.svg")
      .default,
    navLink: "/publisher-list",
  },
  {
    id: "btt",
    title: "BTT Management",
    icon: require("../../../assets/images/icons/sidebar-menu/btt-mgmt.svg")
      .default,
    icon_l: require("../../../assets/images/icons/sidebar-menu/btt-mgmt-l.svg")
      .default,
    navLink: "/btt-list",
  },
  {
    id: "UsagePlan",
    title: "Usage Plan Mgmt",
    icon: require("../../../assets/images/icons/sidebar-menu/btt-mgmt.svg")
      .default,
    icon_l: require("../../../assets/images/icons/sidebar-menu/btt-mgmt.svg")
      .default,
    navLink: "/usage-plan",
    children: [
      {
        id: "usage-plans",
        title: "Usage Plans",
        icon: <Circle size={12} />,
        icon_l: <Circle size={12} color="white" />,
        navLink: "/usage-plan",
      },
      {
        id: "resources",
        title: "Resources",
        icon: <Circle size={12} />,
        icon_l: <Circle size={12} color="white" />,
        navLink: "/resource-list",
      },
    ],
  },
  {
    id: "APIKeyMgmt",
    title: "API Key Mgmt",
    icon: require("../../../assets/images/icons/sidebar-menu/api-mgt.svg")
      .default,
    icon_l:
      require("../../../assets/images/icons/sidebar-menu/api-mgt-white.svg")
        .default,
    navLink: "/api-mgmt",
  },
  {
    id: "LogOut",
    title: "LogOut",
    icon: require("../../../assets/images/icons/sidebar-menu/logout.svg")
      .default,
    icon_l: require("../../../assets/images/icons/sidebar-menu/logout-l.svg")
      .default,
    navLink: "/logOut",
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
