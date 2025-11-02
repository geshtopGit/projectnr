import { BrowserRouter as Router,Routes,Route} from "react-router-dom" 
import './App.css';
import HomeComp from "./Componet/HomeComp";
import Layout from "./Componet/Layout"
import All from "./Componet/All";
import Register from "./Componet/Register";
import Login from "./Componet/Login ";
import SingleProduct from "./Componet/SingleProduct"
import  Axios from "axios";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import SingleCategory from "./Componet/SingelCategory"
import Out from "./Componet/Out";
import SingelShoppingCard from "./Componet/SingelShoppingCard";
import { useSelector ,useDispatch} from "react-redux";
import Maneger from "./Componet/Maneger";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("userNow");
    if (token) {
      Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const dispatch = useDispatch();


  const roles = useSelector(state => state.sum.roles);
  return (
  <div>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route path="/" element={<All />} ></Route>
        <Route path="maneger" element={<Maneger />} ></Route>
        <Route path="home" element={<HomeComp />} ></Route>
        <Route path="register" element={<Register />} ></Route>
        <Route path="login" element={<Login />} ></Route>
        <Route path="all/:id" element={<SingleProduct />} ></Route>
        <Route path="allSCard" element={<SingelShoppingCard />} ></Route>
        <Route path="category" element={<SingleCategory />} ></Route>
        <Route path="out" element={<Out />} ></Route>
        </Route>
      </Routes>
    </Router>
  </div>
  );
}

export default App;
