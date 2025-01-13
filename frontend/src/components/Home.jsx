import React, { useEffect } from "react";
import Navbar from "../components/shared/navbar";
import HeroSection from "../components/HeroSection";
import CategoryCarousel from "../components/CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./footer"
import useGetAllJob from "./hooks/useGetAllJob";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
    useGetAllJob();
    const {user} = useSelector(store=>store.auth);
    const Navigate = useNavigate();
    useEffect(()=>{
        if(user?.role == 'recruiter'){
            Navigate("/admin/companies");
        }
    },[]);

    return (
        <div>
            <Navbar />
            <HeroSection />
            <CategoryCarousel />
            <LatestJobs />
            <Footer/>
        </div>
    )
}

export default Home;