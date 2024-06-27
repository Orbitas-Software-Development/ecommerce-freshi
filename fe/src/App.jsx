import "./App.css";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Footer from "../../fe/src/components/Footer/Footer";
import Navbar from "../../fe/src/components/Navbar/Navbar";
import Cart from "../../fe/src/pages/Cart/Cart";
import Order from "../../fe/src/pages/Order/Order";
import MyOrders from "./pages/MyOrders/MyOrders";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard/ClientDashboard";
import AddClient from "./pages/ClientDashboard/AddClient/AddClient";
import BranchesDashboard from "./pages/BranchesDashboard/BranchesDashboard";
import AddBranch from "./pages/BranchesDashboard/AddBranch/AddBranch";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";
import AddUser from "./pages/UserDashboard/AddUser/AddUser";
import ViewPdf from "./pages/MyOrders/ViewPdf";
import CompanyInformation from "./pages/CompanyInformación/CompanyInformation";
import Products from "./pages/Products/Products";
import AddProduct from "./pages/Products/AddProduct/AddProduct";
import PriceList from "./pages/PriceList/PriceList";
import AddPriceList from "./pages/PriceList/AddPriceList/AddPriceList";
import Category from "./pages/Category/Category";
import AddCategory from "./pages/Category/AddCategory/AddCategory";
import Iva from "./pages/Iva/Iva";
import AddIva from "./pages/Iva/AddIva/AddIva";

import Emails from "./pages/Emails/Emails";
import EditEmail from "./pages/Emails/EditEmail.jsx/EditEmail";
import AssignProduct from "./pages/AssignProducts/AssignProduct";
import CompanyReportDashboard from "./pages/CompanyReportDashboard/CompanyReportDashboard";
import CompanyOrder from "./pages/CompanyReports/CompanyOrder/CompanyOrder";
import CompanyProductSales from "./pages/CompanyReports/CompanyProductSales/CompanyProductSales";

function App() {
  let location = useLocation().pathname;

  return (
    <>
      {location === "/login" ? null : <Navbar />}
      <Routes>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/admindashboard" element={<AdminDashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/myorders" element={<MyOrders />}></Route>
        <Route path="/clientdashboard" element={<ClientDashboard />}></Route>
        <Route path="/clientform" element={<AddClient />}></Route>
        <Route path="/branchdashboard" element={<BranchesDashboard />}></Route>
        <Route path="/branchform" element={<AddBranch />}></Route>
        <Route path="/userdashboard" element={<UserDashboard />}></Route>
        <Route path="/userform" element={<AddUser />}></Route>
        <Route path="/updatepassword" element={<UpdatePassword />}></Route>
        <Route path="/viewpdf" element={<ViewPdf />}></Route>
        <Route
          path="/CompanyInformation"
          element={<CompanyInformation />}
        ></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/productform" element={<AddProduct />}></Route>
        <Route path="/priceList" element={<PriceList />}></Route>
        <Route path="/priceListForm" element={<AddPriceList />}></Route>
        <Route path="/category" element={<Category />}></Route>
        <Route path="/categoryForm" element={<AddCategory />}></Route>
        <Route path="/iva" element={<Iva />}></Route>
        <Route path="/addIva" element={<AddIva />}></Route>
        <Route path="/emails" element={<Emails />}></Route>
        <Route path="/editEmail" element={<EditEmail />}></Route>
        <Route path="/assignProduct" element={<AssignProduct />}></Route>
        <Route
          path="/companyReports"
          element={<CompanyReportDashboard />}
        ></Route>
        <Route path="/companyOrder" element={<CompanyOrder />}></Route>
        <Route
          path="/companyProductSales"
          element={<CompanyProductSales />}
        ></Route>
        <Route path="*" element={<Navigate to="/login" />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
