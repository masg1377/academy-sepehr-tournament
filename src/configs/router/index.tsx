// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
// ** Layouts

import { LayoutWrapper } from "@src/components/LayoutWrapper";

// ** Route Components
import { PublicRoute } from "@src/components/common/routes/PublicRoute";

// ** Utils
import { TRoute } from "@src/core/model/routes.model";
import { TournamentDetail } from "@src/components/TournamentListContainer/TournamentDetail";

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/tournament-list";

const AddMls = lazy(() =>
  import("../../screens/MLS/AddMls").then((o) => ({
    default: o.AddMls,
  }))
);

const MultiLangList = lazy(() =>
  import("../../screens/MultiLang").then((o) => ({
    default: o.MultiLang,
  }))
);

const NotificationsList = lazy(() =>
  import("../../screens/Notifications").then((o) => ({
    default: o.Notifications,
  }))
);
const AddNotification = lazy(() =>
  import("../../screens/Notifications/AddNotif").then((o) => ({
    default: o.AddNotif,
  }))
);

const NotifContentLanguage = lazy(() =>
  import(
    "../../screens/Notifications/NotifContentLanguage/NotifContentLanguage"
  ).then((o) => ({
    default: o.NotifContentLanguage,
  }))
);

const NotificationSettingList = lazy(() =>
  import("../../screens/Notifications/NotifSettingList/NotifSettingList").then(
    (o) => ({
      default: o.NotifSettingList,
    })
  )
);

const NotificationVariablesList = lazy(() =>
  import("../../screens/Notifications/Variables").then((o) => ({
    default: o.NotificationVariables,
  }))
);

const MultiLangEdit = lazy(() =>
  import("../../screens/MultiLang/EditLanguage").then((o) => ({
    default: o.Editlanguage,
  }))
);

const AddClient = lazy(() =>
  import("../../screens/Alerts/AddClient").then((o) => ({
    default: o.AddClient,
  }))
);

const UsagePlan = lazy(() =>
  import("../../screens/UsagePlan/UsagePlan").then((o) => ({
    default: o.UsagePlan,
  }))
);

const AddUsagePlan = lazy(() =>
  import("../../screens/UsagePlan/AddUsagePlan/AddUsagePlan").then((o) => ({
    default: o.AddUsagePlan,
  }))
);

const UsagePlanResourceList = lazy(() =>
  import("../../screens/UsagePlan/ResourcesList/ResourcesList").then((o) => ({
    default: o.ResourcesList,
  }))
);

const Package = lazy(() =>
  import("../../screens/Package").then((o) => ({
    default: o.Package,
  }))
);

const PackageDetail = lazy(() =>
  import("../../screens/Package/Detail").then((o) => ({
    default: o.Detail,
  }))
);

const AddPackage = lazy(() =>
  import("../../screens/Package/AddWizard").then((o) => ({
    default: o.AddWizard,
  }))
);

const DuplicatePackage = lazy(() =>
  import("../../screens/Package/AddWizard").then((o) => ({
    default: o.AddWizard,
  }))
);

const Login = lazy(() =>
  import("../../screens/Auth/Login").then((o) => ({
    default: o.Login,
  }))
);
const EmailCheck = lazy(() =>
  import("../../screens/Auth/EmailCheck").then((o) => ({
    default: o.EmailCheck,
  }))
);
const LogOut = lazy(() =>
  import("../../screens/Auth/LogOut").then((o) => ({
    default: o.LogOut,
  }))
);
const Register = lazy(() =>
  import("../../screens/Auth/Register").then((o) => ({
    default: o.Register,
  }))
);
const ForgotPassword = lazy(() =>
  import("../../screens/Auth/ForgotPassword").then((o) => ({
    default: o.ForgotPassword,
  }))
);
const Error = lazy(() =>
  import("../../screens/Error").then((o) => ({ default: o.Error }))
);

const MLSList = lazy(() =>
  import("@src/screens/MLS/MLSList").then((o) => ({
    default: o.MLSList,
  }))
);
const TournamentList = lazy(() =>
  import("@src/screens/Tournament/List").then((o) => ({
    default: o.List,
  }))
);
const AddTournament = lazy(() =>
  import("@src/screens/Tournament/Add").then((o) => ({
    default: o.Add,
  }))
);
const TournamentAvg = lazy(() =>
  import("@src/screens/Tournament/Detail/AddAvg").then((o) => ({
    default: o.AddAvgPage,
  }))
);

const MLSDetail = lazy(() =>
  import("@src/screens/MLS/Detail").then((o) => ({ default: o.Detail }))
);

const PlatformDetail = lazy(() =>
  import("@src/screens/Platform/Detail/Detail").then((o) => ({
    default: o.Detail,
  }))
);

const ClientsDetail = lazy(() =>
  import("@src/screens/Alerts/Detail").then((o) => ({ default: o.Detail }))
);

const Alerts = lazy(() =>
  import("@src/screens/Alerts").then((o) => ({ default: o.Alerts }))
);

const Platform = lazy(() =>
  import("@src/screens/Platform").then((o) => ({ default: o.Platform }))
);

const AddPlatform = lazy(() =>
  import("@src/screens/Platform/AddPlatform").then((o) => ({
    default: o.AddPlatform,
  }))
);

const BTTList = lazy(() =>
  import("@src/screens/BTT").then((o) => ({
    default: o.BTT,
  }))
);

const UsersList = lazy(() =>
  import("@src/screens/Users").then((o) => ({
    default: o.Users,
  }))
);

const UsersDetail = lazy(() =>
  import("@src/screens/Users/UsersDetail").then((o) => ({
    default: o.UsersDetail,
  }))
);

const BTTAdd = lazy(() =>
  import("@src/screens/BTT/AddBtt").then((o) => ({
    default: o.AddBtt,
  }))
);

const BTTDetail = lazy(() =>
  import("@src/screens/BTT/Detail").then((o) => ({
    default: o.Detail,
  }))
);

const DiscountsList = lazy(() =>
  import("@src/screens/Discounts/DiscountsList").then((o) => ({
    default: o.DiscountsList,
  }))
);
const DiscountDetail = lazy(() =>
  import("@src/screens/Discounts/DiscountDetail").then((o) => ({
    default: o.DiscountDetail,
  }))
);
const AddDiscount = lazy(() =>
  import("@src/screens/Discounts/AddDiscount").then((o) => ({
    default: o.AddDiscount,
  }))
);
const Settingg = lazy(() =>
  import("@src/screens/Settingg/Settingg").then((o) => ({
    default: o.Settingg,
  }))
);

const ProfileSetup = lazy(() =>
  import("@src/screens/Profile/ProfileSetup").then((o) => ({
    default: o.ProfileSetup,
  }))
);

const ProfilePage = lazy(() =>
  import("@src/screens/Profile/ProfilePage").then((o) => ({
    default: o.ProfilePage,
  }))
);

const StaffList = lazy(() =>
  import("@src/screens/Staff/StaffList").then((o) => ({
    default: o.StaffList,
  }))
);
const AddStaff = lazy(() =>
  import("@src/screens/Staff/AddStaff/AddStaff").then((o) => ({
    default: o.AddStaff,
  }))
);
const StaffDetail = lazy(() =>
  import("@src/screens/Staff/StaffDetail/StaffDetail").then((o) => ({
    default: o.StaffDetail,
  }))
);

const AllCustomer = lazy(() =>
  import("@src/screens/Customers/AllCustomer/AllCustomer").then((o) => ({
    default: o.AllCustomer,
  }))
);

const MlsCustomer = lazy(() =>
  import("@src/screens/Customers/MlsCustomer/MlsCustomer").then((o) => ({
    default: o.MlsCustomer,
  }))
);

const CustomerDetail = lazy(() =>
  import("@src/screens/Customers/CustomerDetail/CustomerDetail").then((o) => ({
    default: o.CustomerDetail,
  }))
);

const EditCustomer = lazy(() =>
  import("@src/screens/Customers/EditCustomer/EditCustomer").then((o) => ({
    default: o.EditCustomer,
  }))
);

const PaymentHistory = lazy(() =>
  import("@src/screens/Customers/PaymentHistory/PaymentHistory").then((o) => ({
    default: o.PaymentHistory,
  }))
);

const AccessDetail = lazy(() =>
  import("@src/screens/MLS/Detail/AccessDetail").then((o) => ({
    default: o.AccessDetail,
  }))
);

const PaymentDetail = lazy(() =>
  import("@src/screens/Customers/PaymentHistory/PaymentDetail").then((o) => ({
    default: o.PaymentDetail,
  }))
);

const PackagesInvoiceDetail = lazy(() =>
  import("@src/screens/Customers/PaymentHistory/PackageInvoice").then((o) => ({
    default: o.PackageInvoice,
  }))
);

const PromotionsList = lazy(() =>
  import("@src/screens/Promotions/PromotionsList").then((o) => ({
    default: o.PromotionsList,
  }))
);
const PromotionDetail = lazy(() =>
  import("@src/screens/Promotions/PromotionDetail").then((o) => ({
    default: o.PromotionDetail,
  }))
);
const AddPromotion = lazy(() =>
  import("@src/screens/Promotions/AddPromotion/AddPromotion").then((o) => ({
    default: o.AddPromotion,
  }))
);

const RolesList = lazy(() =>
  import("@src/screens/Roles").then((o) => ({
    default: o.Roles,
  }))
);

const AddRole = lazy(() =>
  import("@src/screens/Roles/AddRole/AddRole").then((o) => ({
    default: o.AddRoleScreen,
  }))
);

const Dashboard = lazy(() =>
  import("@src/screens/Dashboard").then((o) => ({
    default: o.Dashboard,
  }))
);

const Permissions = lazy(() =>
  import("@src/screens/Permissions").then((o) => ({
    default: o.Permissions,
  }))
);

const AddPermission = lazy(() =>
  import("@src/screens/Permissions/AddPermissionPage").then((o) => ({
    default: o.AddPermissionPage,
  }))
);

const GroupList = lazy(() =>
  import("@src/screens/Groups").then((o) => ({
    default: o.Groups,
  }))
);

const JoinRequestList = lazy(() =>
  import("@src/screens/Groups/JoinRequest").then((o) => ({
    default: o.JoinRequest,
  }))
);

const MemberList = lazy(() =>
  import("@src/screens/Groups/MemberListPage").then((o) => ({
    default: o.MemberListPage,
  }))
);

const WhiteList = lazy(() =>
  import("@src/screens/Groups/WhiteListPage").then((o) => ({
    default: o.WhiteListPage,
  }))
);

const GroupDetails = lazy(() =>
  import("@src/screens/Groups/GroupDetail").then((o) => ({
    default: o.GroupDetail,
  }))
);

const APIMgmtList = lazy(() =>
  import("@src/screens/APIMgmt").then((o) => ({
    default: o.APIMgmt,
  }))
);

const ApiDetails = lazy(() =>
  import("@src/screens/APIMgmt/Details/ApiDetails").then((o) => ({
    default: o.ApiDetails,
  }))
);

const PublisherList = lazy(() =>
  import("@src/screens/Publisher").then((o) => ({
    default: o.Publisher,
  }))
);

const AddPublisher = lazy(() =>
  import("@src/screens/Publisher/AddPublisher").then((o) => ({
    default: o.AddPublisher,
  }))
);

const AddMember = lazy(() =>
  import("@src/screens/Groups/AddMember").then((o) => ({
    default: o.AddMember,
  }))
);

const CreateGroup = lazy(() =>
  import("@src/screens/Groups/CreateGroup").then((o) => ({
    default: o.CreateGroup,
  }))
);

// ** Merge Routes
const Routes: TRoute[] = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
    auth: true,
  },
  {
    path: "/tournament-list",
    element: <TournamentList />,
    breadCrumb: {
      main: { title: "Tournament" },
      secondary: [{ title: "Home" }, { title: "Tournament" }],
    },
    auth: true,
  },
  {
    path: "/tournament-list/add",
    element: <AddTournament />,
    breadCrumb: {
      main: { title: "Tournament" },
      secondary: [
        { title: "Home" },
        { title: "Tournament", link: "/tournament-list" },
        { title: "Add" },
      ],
    },
    auth: true,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    breadCrumb: {
      main: { title: "Dashboard" },
      // secondary: [{ title: "Home" }, { title: "Packages" }],
    },
    auth: true,
  },
  {
    path: "/",
    index: true,
    element: <Navigate replace to="/login" />,
    auth: false,
  },
  {
    path: "/packages",
    element: <Package />,
    breadCrumb: {
      main: { title: "Packages" },
      secondary: [{ title: "Home" }, { title: "Packages" }],
    },
    auth: true,
  },
  {
    path: "/api-mgmt",
    element: <APIMgmtList />,
    breadCrumb: {
      main: { title: "API Key Management" },
      secondary: [{ title: "Home" }, { title: "API key" }],
    },
    auth: true,
  },
  {
    path: "/notification-list",
    element: <NotificationsList />,
    breadCrumb: {
      main: { title: "Notification list" },
      secondary: [{ title: "Home", link: "/" }, { title: "Notifications" }],
    },
    auth: true,
  },
  {
    path: "/notification-list/add",
    element: <AddNotification />,
    breadCrumb: {
      main: { title: "Add Notification" },
      secondary: [
        { title: "Home", link: "/" },
        { title: "Notifications", link: "/notification-list" },
        { title: "Add" },
      ],
    },
    auth: true,
    miniBord: true,
  },
  {
    path: "/notification-content",
    element: <NotifContentLanguage />,
    breadCrumb: {
      main: { title: "Content and language" },
      secondary: [{ title: "Home", link: "/" }, { title: "Dashboard" }],
    },
    auth: true,
    miniBord: true,
  },
  {
    path: "/notification-setting-list",
    element: <NotificationSettingList />,
    breadCrumb: {
      main: { title: "Notification list" },
      secondary: [{ title: "Home", link: "/" }, { title: "User" }],
    },
    auth: true,
    miniBord: true,
  },
  {
    path: "/notification-variables",
    element: <NotificationVariablesList />,
    breadCrumb: {
      main: { title: "Variable list" },
      secondary: [{ title: "Home", link: "/" }, { title: "User" }],
    },
    auth: true,
    miniBord: true,
  },
  {
    path: "/api-mgmt/:id",
    element: <ApiDetails />,
    breadCrumb: {
      main: { title: "API Key Information" },
      secondary: [
        { title: "Home", link: "/" },
        { title: "API Key", link: "/api-mgmt" },
        { title: "Details" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/usage-plan",
    element: <UsagePlan />,
    breadCrumb: {
      main: { title: "Usage plan list" },
      secondary: [
        { title: "Home", link: "/" },
        { title: "User", link: "/user" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/add-usage-plan",
    element: <AddUsagePlan />,
    breadCrumb: {
      main: { title: "Add Usage Plan" },
      secondary: [
        { title: "Usage Plan", link: "/" },
        { title: "Add Usage Plan", link: "/" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/edit-usage-plan/:id",
    element: <AddUsagePlan />,
    breadCrumb: {
      main: { title: "Edit Usage Plan" },
      secondary: [
        { title: "Usage Plan", link: "/" },
        { title: "Edit Usage Plan", link: "/" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/resource-list",
    element: <UsagePlanResourceList />,
    breadCrumb: {
      main: { title: "Resources list" },
      secondary: [
        { title: "Home", link: "/" },
        { title: "User", link: "/" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/packages/:id",
    element: <PackageDetail />,
    breadCrumb: {
      main: { title: "Package details" },
      secondary: [
        { title: "Home", link: "/" },
        { title: "Packages", link: "/packages" },
        { title: "Package detail" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/packages/add",
    element: <AddPackage />,
    breadCrumb: {
      main: { title: "Add Packages" },
      secondary: [
        { title: "Home" },
        { title: "Packages", link: "/packages" },
        { title: "Add New Package" },
      ],
    },
    auth: true,
    miniBord: true,
    hasBack: true,
  },
  {
    path: "/packages/add/:id",
    element: <AddPackage />,
    breadCrumb: {
      main: { title: "Add Packages" },
      secondary: [
        { title: "Home" },
        { title: "Packages", link: "/packages" },
        { title: "Add New Packages" },
      ],
    },
    auth: true,
    miniBord: true,
    hasBack: true,
  },
  {
    path: "/packages/edit/:id",
    element: <AddPackage />,
    breadCrumb: {
      main: { title: "Edit Packages" },
      secondary: [
        { title: "Home" },
        { title: "Packages", link: "/packages" },
        { title: "Edit Packages" },
      ],
    },
    auth: true,
    miniBord: true,
    hasBack: true,
  },
  {
    path: "/packages/duplicate/:id",
    element: <DuplicatePackage />,
    breadCrumb: {
      main: { title: "Duplicate Package" },
      secondary: [
        { title: "Home" },
        { title: "Packages", link: "/packages" },
        { title: "Duplicate Package" },
      ],
    },
    auth: true,
    miniBord: true,
    hasBack: true,
  },
  {
    path: "/alerts",
    element: <Alerts />,
    breadCrumb: {
      main: { title: "Clients Requests" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Clients Requests" },
      ],
    },
    auth: true,
  },
  {
    path: "/publisher-list",
    element: <PublisherList />,
    breadCrumb: {
      main: { title: "Publisher" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Publisher" },
      ],
    },
    auth: true,
  },
  {
    path: "/publisher-list/add",
    element: <AddPublisher />,
    breadCrumb: {
      main: { title: "Add publishers" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Publisher", link: "/publisher-list" },
        { title: "Add" },
      ],
    },
    auth: true,
    hasBack: true,
  },

  {
    path: "/platforms",
    element: <Platform />,
    breadCrumb: {
      main: { title: "Platform" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Platforms" },
      ],
    },
    auth: true,
  },
  {
    path: "/discounts-list",
    element: <DiscountsList />,
    breadCrumb: {
      main: { title: "Discounts" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Discounts" },
      ],
    },
    auth: true,
  },
  {
    path: "/discounts-list/detail/:id",
    element: <DiscountDetail />,
    breadCrumb: {
      main: { title: "Discount Detail" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Discounts", link: "/discounts-list" },
        { title: "Detail" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/discounts-list/add",
    element: <AddDiscount />,
    breadCrumb: {
      main: { title: "Add Discount" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Discounts", link: "/discounts-list" },
        { title: "Add Discount" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/allSetting",
    element: <Settingg />,
    breadCrumb: {
      main: { title: "Setting" },
      secondary: [{ title: "Home", link: "/dashboard" }, { title: "Settings" }],
    },
    auth: true,
  },
  {
    path: "/discounts-list/edit/:id",
    element: <AddDiscount />,
    breadCrumb: {
      main: { title: "Edit Discount" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Discounts", link: "/discounts-list" },
        { title: "Edit Discount" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/logOut",
    element: <LogOut />,
    // breadCrumb: {
    //   main: { title: "Promotions" },
    //   secondary: [
    //     { title: "Home", link: "/dashboard" },
    //     { title: "Promotions" },
    //   ],
    // },
    auth: true,
  },
  {
    path: "/promotion-list",
    element: <PromotionsList />,
    breadCrumb: {
      main: { title: "Promotions" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Promotions" },
      ],
    },
    auth: true,
  },
  {
    path: "/permissions",
    element: <Permissions />,
    breadCrumb: {
      main: { title: "Permission" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Permissions" },
      ],
    },
    auth: true,
  },
  {
    path: "/permissions/add",
    element: <AddPermission />,
    breadCrumb: {
      main: { title: "Add Permission" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Permissions", link: "/permissions" },
        { title: "Add new permission" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/promotion-list/detail/:id",
    element: <PromotionDetail />,
    breadCrumb: {
      main: { title: "Promotions Details" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Promotions", link: "/promotion-list" },
        { title: "Detail" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/promotion-list/add",
    element: <AddPromotion />,
    breadCrumb: {
      main: { title: "Add Promotion" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Promotions", link: "/promotion-list" },
        { title: "Add new" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/promotion-list/edit/:id",
    element: <AddPromotion />,
    breadCrumb: {
      main: { title: "Edit Promotion" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Promotions", link: "/promotion-list" },
        { title: "Edit promotion" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/mls-list",
    element: <MLSList />,
    breadCrumb: {
      main: { title: "MLS" },
      secondary: [{ title: "Home", link: "/dashboard" }, { title: "MLS" }],
    },
    auth: true,
    // permissions: ["can_view_mls_server"],
  },
  {
    path: "/multilang",
    element: <MultiLangList />,
    breadCrumb: {
      main: { title: "Multi language list" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Multi languages" },
      ],
    },
    auth: true,
    // permissions: ["can_view_mls_server"],
  },
  {
    path: "/multilang/edit/:id",
    element: <MultiLangEdit />,
    breadCrumb: {
      main: { title: "Edit Language" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Language List", link: "/multilang" },
        { title: "Edit" },
      ],
    },
    auth: true,
    hasBack: true,
    // permissions: ["can_view_mls_server"],
  },
  {
    path: "/mls-list/add",
    element: <AddMls />,
    breadCrumb: {
      main: { title: "Add MLS" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "MLS", link: "/mls-list" },
        { title: "Add MLS" },
      ],
    },
    miniBord: true,
    auth: true,
    hasBack: true,
  },
  {
    path: "/mls-list/add/:id",
    element: <AddMls />,
    breadCrumb: {
      main: { title: "Add MLS" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "MLS", link: "/mls-list" },
        { title: "Add MLS" },
      ],
    },
    miniBord: true,
    auth: true,
    hasBack: true,
  },
  {
    path: "/mls-list/edit/:id",
    element: <AddMls />,
    breadCrumb: {
      main: { title: "Edit MLS" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "MLS", link: "/mls-list" },
        { title: "Edit MLS" },
      ],
    },
    miniBord: true,
    auth: true,
    hasBack: true,
  },
  {
    path: "/alerts/edit/:id",
    element: <AddClient />,
    breadCrumb: {
      main: { title: "Edit Client Request" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Clients Requests List", link: "/alerts" },
        { title: "Edit Requests" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/platforms/add",
    element: <AddPlatform />,
    breadCrumb: {
      main: { title: "Add Platform" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Platforms", link: "/platforms" },
        { title: "Add Platform" },
      ],
    },
    auth: true,
    miniBord: true,
    hasBack: true,
  },
  // {
  //   path: "/platforms/add/:id/:step",
  //   element: <AddPlatform />,
  //   breadCrumb: {
  //     main: { title: "Add Platform" },
  //     secondary: [
  //       { title: "Home", link: "/dashboard" },
  //       { title: "Platforms", link: "/platforms" },
  //       { title: "Add Platform" },
  //     ],
  //   },
  //   auth: true,
  //   miniBord: true,
  // },
  {
    path: "/platforms/edit/:id/:step",
    element: <AddPlatform />,
    breadCrumb: {
      main: { title: "Edit Platform" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Platforms", link: "/platforms" },
        { title: "Edit Platform" },
      ],
    },
    auth: true,
    miniBord: true,
    hasBack: true,
  },
  {
    path: "/mls-list/:id",
    element: <MLSDetail />,
    breadCrumb: {
      main: { title: "MLS" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "MLS", link: "/mls-list" },
        { title: "Detail" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/tournament-detail/:id",
    element: <TournamentDetail />,
    breadCrumb: {
      main: { title: "Tournament" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "TOURNAMENT", link: "/tournament-list" },
        { title: "Detail" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/tournament-detail/add-avg/:id",
    element: <TournamentAvg />,
    breadCrumb: {
      main: { title: "Tournament add avrage" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Tournament", link: "/tournament-list" },
        { title: "Detail" },
        { title: "Add avrage" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/mls-list/access/:mlsId/:accessId",
    element: <AccessDetail />,
    breadCrumb: {
      main: { title: "MLS Access" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "MLS", link: "/mls-list" },
        { title: "Detail" },
      ],
    },
    auth: true,
    hasBack: true,
  },

  {
    path: "/platforms/:id",
    element: <PlatformDetail />,
    breadCrumb: {
      main: { title: "Platform" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Platforms", link: "/platforms" },
        { title: "Detail" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/alerts/:id",
    element: <ClientsDetail />,
    breadCrumb: {
      main: { title: "Request" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Clients Requests", link: "/alerts" },
        { title: "Detail" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/btt-list",
    element: <BTTList />,
    breadCrumb: {
      main: { title: "Badge, Trophy, Tag" },
      secondary: [{ title: "Home", link: "/dashboard" }, { title: "BTTs" }],
    },
    auth: true,
  },
  {
    path: "/users",
    element: <UsersList />,
    breadCrumb: {
      main: { title: "Users" },
      secondary: [{ title: "Home", link: "/dashboard" }, { title: "Users" }],
    },
    auth: true,
  },
  {
    path: "/users/detail/:id",
    element: <UsersDetail />,
    breadCrumb: {
      main: { title: "Users" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Users", link: "/users" },
        { title: "User Detail" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/btt-list/add",
    element: <BTTAdd />,
    breadCrumb: {
      main: { title: "Add Badge, Trophy, Tag" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "BTT" },
        { title: "Add BTT" },
      ],
    },
    auth: true,
    miniBord: true,
    hasBack: true,
  },
  {
    path: "/btt-list/add/:id",
    element: <BTTAdd />,
    breadCrumb: {
      main: { title: "Add Badge, Trophy, Tag" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "BTT" },
        { title: "Add BTT" },
      ],
    },
    auth: true,
    miniBord: true,
    hasBack: true,
  },
  {
    path: "/btt-list/edit/:id",
    element: <BTTAdd />,
    breadCrumb: {
      main: { title: "Edit Badge, Trophy, Tag" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "BTT" },
        { title: "Edit BTT" },
      ],
    },
    auth: true,
    miniBord: true,
    hasBack: true,
  },
  {
    path: "/btt-list/:id",
    element: <BTTDetail />,
    breadCrumb: {
      main: { title: "BTT Details" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "BTTs", link: "/btt-list" },
        { title: "Details" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/customer-list",
    element: <AllCustomer />,
    breadCrumb: {
      main: { title: "Customers" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Customer List" },
      ],
    },
    auth: true,
  },
  {
    path: "/mlsCustomer-list",
    element: <MlsCustomer />,
    breadCrumb: {
      main: { title: "MLS Customer" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "MLS Customer List" },
      ],
    },
    auth: true,
  },
  {
    path: "/customer-list/:id",
    element: <CustomerDetail />,
    breadCrumb: {
      main: { title: "Customer Information" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Customer List", link: "/customer-list" },
        { title: "Details" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/customer-list/edit/:id",
    element: <EditCustomer />,
    breadCrumb: {
      main: { title: "Edit Customer detail" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Customer List", link: "/customer-list" },
        { title: "Edit" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    //path: "/customer-list/payment/:id/:customerName/:customerLastName",
    path: "/customer-list/payment/:id/:customerName",
    element: <PaymentHistory />,
    breadCrumb: {
      main: { title: "Payment History" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Customer List", link: "/customer-list" },
        { title: "Payment" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/customer-list/payment/detail/:userId/:invoiceId",
    element: <PaymentDetail />,
    breadCrumb: {
      main: { title: "Invoice Details" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Customer List", link: "/customer-list" },
        { title: "Invoice" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/customer-list/package-invoice/:id/:userId/:packageName",
    element: <PackagesInvoiceDetail />,
    breadCrumb: {
      main: { title: "Payment history" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Customer List", link: "/customer-list" },
        { title: "Package Invoice" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
    auth: false,
  },

  // {
  //   path: "/emailCheck",
  //   element: <EmailCheck />,
  //   meta: {
  //     layout: "blank",
  //   },
  //   auth: false,
  // },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
    auth: false,
  },
  {
    path: "/profileSetup",
    element: <ProfileSetup />,
    meta: {
      layout: "blank",
    },
    auth: true,
  },

  {
    path: "/profile",
    element: <ProfilePage />,
    breadCrumb: {
      main: { title: "Profile & Account" },
      secondary: [{ title: "Home", link: "/dashboard" }, { title: "Profile" }],
    },
    auth: true,
  },
  {
    path: "/profile/:tab",
    element: <ProfilePage />,
    breadCrumb: {
      main: { title: "Profile & Account" },
      secondary: [{ title: "Home", link: "/dashboard" }, { title: "Profile" }],
    },
    auth: true,
  },
  {
    path: "/profileSetup",
    element: <ProfileSetup />,
    meta: {
      layout: "blank",
    },
    auth: false,
  },
  {
    path: "/staff",
    element: <StaffList />,
    breadCrumb: {
      main: { title: "Staff" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Staff List" },
      ],
    },
    auth: true,
  },
  {
    path: "/staff/:id",
    element: <StaffDetail />,
    breadCrumb: {
      main: { title: "Staff Information" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Staff list", link: "/staff" },
        { title: "Details" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/staff/add",
    element: <AddStaff />,
    breadCrumb: {
      main: { title: "Invite Staff" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Staff list", link: "/staff" },
        { title: "Invite Staff" },
      ],
    },
    auth: true,
    miniBord: false,
    hasBack: true,
  },
  {
    path: "/roles",
    element: <RolesList />,
    breadCrumb: {
      main: { title: "Users Role" },
      secondary: [{ title: "Home", link: "/dashboard" }, { title: "Roles" }],
    },
    auth: true,
  },
  {
    path: "/roles/add",
    element: <AddRole />,
    breadCrumb: {
      main: { title: "Add Role" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Roles", link: "/roles" },
        { title: "Add Role" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/roles/edit/:id",
    element: <AddRole />,
    breadCrumb: {
      main: { title: "Edit Role" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Roles", link: "/roles" },
        { title: "Edit Role" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/groups-list",
    element: <GroupList />,
    breadCrumb: {
      main: { title: "Groups" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Group List" },
      ],
    },
    auth: true,
  },
  {
    path: "/groups-list/join-requests/:group_id",
    element: <JoinRequestList />,
    breadCrumb: {
      main: { title: "" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Group List", link: "/groups-list" },
        { title: "Join Request" },
      ],
    },
    auth: true,
  },
  {
    path: "/groups-list/members/:group_id",
    element: <MemberList />,
    breadCrumb: {
      main: { title: "" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Group List", link: "/groups-list" },
        { title: "List" },
      ],
    },
    auth: true,
  },
  {
    path: "/groups-list/Whitelist/:group_id",
    element: <WhiteList />,
    breadCrumb: {
      main: { title: "" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Group List", link: "/groups-list" },
        { title: "List" },
      ],
    },
    auth: true,
  },
  {
    path: "/groups-list/:id",
    element: <GroupDetails />,
    breadCrumb: {
      main: { title: "Group Details" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Group List", link: "/groups-list" },
        { title: "Details" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/groups-list/invite-member/:id",
    element: <AddMember />,
    breadCrumb: {
      main: { title: "Invite Member" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Users", link: "/groups-list" },
        { title: "Add User" },
      ],
    },
    auth: true,
    hasBack: true,
  },
  {
    path: "/groups-list/add-group",
    element: <CreateGroup />,
    breadCrumb: {
      main: { title: "New Group" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Groups", link: "/groups-list" },
        { title: "Add Group" },
      ],
    },
    auth: true,
    miniBord: true,
    hasBack: true,
  },
  {
    path: "/groups-list/add-group/:id",
    element: <CreateGroup />,
    breadCrumb: {
      main: { title: "New Group" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Groups", link: "/groups-list" },
        { title: "Add Group" },
      ],
    },
    auth: true,
    miniBord: true,
    hasBack: true,
  },
  {
    path: "/groups-list/edit-group/:id",
    element: <CreateGroup />,
    breadCrumb: {
      main: { title: "Edit Group" },
      secondary: [
        { title: "Home", link: "/dashboard" },
        { title: "Groups", link: "/groups-list" },
        { title: "Edit" },
      ],
    },
    auth: true,
    miniBord: true,
    hasBack: true,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
    auth: false,
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
    auth: false,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
    meta: {
      layout: "blank",
    },
    auth: false,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
    meta: {
      layout: "blank",
    },
    auth: true,
  },
];

export { DefaultRoute, TemplateTitle, Routes };
