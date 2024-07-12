import React, { useEffect } from 'react'
import './App.css'
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBannerData, setImageUrl } from "./store/movieoSlice";

const App = () => {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const excludedPaths = ["/signup", "/signin"];

  const fetchTrendingdata = async () => {
    try {
      const response = await axios.get("/trending/all/week");
      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.log(err, "error");
    }
  };
  const shouldExcludeNavigation = () => {
    return excludedPaths.some((path) => pathname.startsWith(path));
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get("/configuration");

      dispatch(setImageUrl(response.data.images.secure_base_url + "original"));
    } catch (error) {}
  };

  useEffect(() => {
    fetchTrendingdata();
    fetchConfiguration();
  }, []);

  return (
    <main className="pb-14 lg:pb-0">
      {!shouldExcludeNavigation() && <Header />}
      <div className="min-h-[100vh]">
        <Outlet />
      </div>
      {!shouldExcludeNavigation() && <Footer />}
      {!shouldExcludeNavigation() && <MobileNavigation />}
    </main>
  );
};

export default App
