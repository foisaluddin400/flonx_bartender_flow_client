import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import UserManagement from "../page/UserManagement/UserManagement";



import Profile from "../page/Settings/Profile";
import TermsCondition from "../page/Settings/TermsCondition";
import FAQ from "../page/Settings/FAQ";
import PrivacyPolicy from "../page/Settings/PrivacyPolicy";
import Categories from "../page/CategoriesManagement/Categories";
import Subcategory from "../page/CategoriesManagement/Subcategory";

import ForgetPass from "../Auth/ForgetPass";
import Verify from "../Auth/Verify";
import ResetPass from "../Auth/ResetPass";
import Notification from "../page/Notification/Notification";
import About from "../page/Settings/About";
import Login from "../Auth/Login";
import ProductManage from "../page/product/ProductManage";
import ManageShifts from "../page/manageShifts/ManageShifts";
import Earning from "../page/earning/Earning";
import VenueProfile from "../page/venuwProfile/VenueProfile";
import ManageProfile from "../page/manageProfile/ManageProfile";
import HelpSupport from "../page/helpSupport/HelpSupport";
import ProductDetails from "../page/product/ProductDetails";
import AddProduct from "../page/product/AddProduct";
import EditProduct from "../page/product/EditProduct";

import AddManageShift from "../page/manageShifts/AddManageShift";
import UpdateVenyeProfile from "../page/venuwProfile/UpdateVenyeProfile";
import UpdateProfile from "../page/manageProfile/UpdateProfile";
import UpdatePassword from "../page/manageProfile/UpdatePassword";
import FindBarthender from "../page/manageShifts/FindBarthender";
import BartenderDetails from "../page/manageShifts/BartenderDetails";
import MyShifts from "../page/myShift/MyShifts";
import ShiftDetails from "../page/myShift/ShiftDetails";
import VenueDetails from "../page/myShift/VenueDetails";
import MyProfile from "../page/venuwProfile/MyProfile";
import AccountSetting from "../page/venuwProfile/AccountSetting";
import PassWordChange from "../page/venuwProfile/PassWordChange";
import RegisterVerify from "../Auth/RegisterVerify";
import ConnectStripe from "../Auth/ConnectStripe";
import CompleteProfile from "../Auth/CompleteProfile";
import JoinAs from "../Auth/JoinAs";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
     
        <DashboardLayout></DashboardLayout>
      
    ),
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/UserManagement",
        element: <UserManagement></UserManagement>,
      },
     {
        path: "/dashboard/productManagement",
        element: <ProductManage></ProductManage>,
      },
   {
        path: "/dashboard/shifts",
        element: <MyShifts></MyShifts>
      },
       {
        path: "/dashboard/shifts/venueDetails/:id",
        element: <VenueDetails></VenueDetails>
      },
       {
        path: "/dashboard/shifts/details/:id",
        element: <ShiftDetails></ShiftDetails>
      },
      {
        path: "/dashboard/productManagement/details/:id",
        element: <ProductDetails></ProductDetails>  ,
      },
      {
        path: "/dashboard/ManageShifts",
        element: <ManageShifts></ManageShifts>,
      },
        {
        path: "/dashboard/ManageShifts/add_request",
        element: <AddManageShift></AddManageShift>,
      },
      {
        path: "/dashboard/ManageShifts/find_bartender",
        element: <FindBarthender></FindBarthender>,
      },
      {

        path: "/dashboard/ManageShifts/details/:id",
        element: <ShiftDetails></ShiftDetails>,
      },
        {

        path: "/dashboard/BartenderShifts/details/:id",
        element: <BartenderDetails></BartenderDetails>,
      },
      {
        path: "/dashboard/productManagement/add",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/dashboard/productManagement/edit/:id",
        element: <EditProduct></EditProduct>,
      },
       {
        path: "/dashboard/earning",
        element: <Earning></Earning>,
      },
      {
        path: "/dashboard/VenueProfile",
        element: <VenueProfile></VenueProfile>,
      },
        {
        path: "/dashboard/myProfile",
        element: <MyProfile></MyProfile>
      },
     {
        path: "/dashboard/accountSetting",
        element: <AccountSetting></AccountSetting>
      },
      {
        path: "/dashboard/change_password",
        element: <PassWordChange></PassWordChange>
      },
      {
        path: "/dashboard/UpdateProfile",
        element: <UpdateVenyeProfile></UpdateVenyeProfile>,
      },
      {
        path: "/dashboard/HelpSupport",
        element: <HelpSupport></HelpSupport>,
      },
      {
        path: "/dashboard/ManageProfile",
        element: <ManageProfile></ManageProfile>,
      },


  {
        path: "/dashboard/updateProfile",
        element: <UpdateProfile></UpdateProfile>,
      },


        {
        path: "/dashboard/updatePassword",
        element: <UpdatePassword> </UpdatePassword>,
      },





      {
        path: "/dashboard/CategoriesManagement/Categories",
        element: <Categories></Categories>,
      },
      {
        path: "/dashboard/CategoriesManagement/Categories",
        element: <Categories></Categories>,
      },
      {
        path: "/dashboard/CategoriesManagement/Subcategory",
        element: <Subcategory></Subcategory>,
      },
     
      {
        path: "/dashboard/Settings/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/Settings/notification",
        element: <Notification></Notification>,
      },
      {
        path: "/dashboard/Settings/Terms&Condition",
        element: <TermsCondition></TermsCondition>,
      },
      {
        path: "/dashboard/Settings/FAQ",
        element: <FAQ></FAQ>,
      },
      {
        path: "/dashboard/Settings/aboutUs",
        element: <About></About>,
      },
      {
        path: "/dashboard/Settings/PrivacyPolicy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/joinAs",
    element: <JoinAs></JoinAs>,
  },
   {
    path: "/completeProfile",
    element: <CompleteProfile></CompleteProfile>,
  },
   {
    path: "/connectStripe",
    element: <ConnectStripe></ConnectStripe>,
  },
  {
    path: "/forgot-password",
    element: <ForgetPass></ForgetPass>,
  },
   {
    path: "/registerVerify",
    element: <RegisterVerify></RegisterVerify>,
  },
  {
    path: "/verification",
    element: <Verify></Verify>,
  },
  {
    path: "/reset-password",
    element: <ResetPass></ResetPass>,
  },
    ],
  },


]);
