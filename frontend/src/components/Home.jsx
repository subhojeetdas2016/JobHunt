import React, { useEffect } from "react";
import Navbar from "../components/shared/navbar";
import HeroSection from "../components/HeroSection";
import CategoryCarousel from "../components/CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./footer";
import useGetAllJob from "./hooks/useGetAllJob";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
    useGetAllJob();
    
    const { user } = useSelector(store => store.auth);
    const Navigate = useNavigate();
    
    useEffect(() => {
        console.log("User role:", user?.role);
        if (user?.role === 'recruiter') {
            console.log("Redirecting recruiter to /admin/companies");
            Navigate("/admin/companies");
        }
    }, [user, Navigate]);

    return (
        <div>
            <Navbar />
            <HeroSection />
            <CategoryCarousel />
            <LatestJobs />
            <Footer />
        </div>
    )
}

export default Home;
