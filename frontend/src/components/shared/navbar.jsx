import React from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "../ui/sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logutHandler = async () => {
    console.log("Logout initiated...");
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      console.log("Logout API Response:", res.data);

      if (res.data.success) {
        console.log("Logout successful, clearing user state...");
        dispatch(setUser(null));
        navigate("/");
        toast.success("Logged out successfully!");
      } else {
        console.error("Logout failed:", res.data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  console.log("Navbar rendered. Current user:", user);

  return (
    <div className="bg-[#F3E5F5]">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <Link className="cursor-pointer" to="/">
            <h1 className="text-2xl font-bold">
              Job<span className="text-[#c31664]">Hunt</span>
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role == "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <Link className="cursor-pointer" to="/">
                  <li>Home</li>
                </Link>
                <Link className="cursor-pointer" to="/Jobs">
                  <li>Jobs</li>
                </Link>
                <Link className="cursor-pointer" to="/Browse">
                  <li>Browse</li>
                </Link>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/Login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/Signup">
                <Button className=" relative text-[#e8e8e8] z-10 bg-[#c31664]  overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:w-0 before:bg-pink-600/100 before:z-[-1] before:transition-all before:duration-500 hover:before:w-full hover:text-[#e8e8e8]">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.ProfilePhoto}
                    alt="avatarIMG"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className=" bg-white w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.ProfilePhoto}
                      alt="avatarIMG"
                    />
                  </Avatar>
                  <h4 className="font-medium">{user?.fullname}</h4>
                </div>
                {user && user.role == "student" && (
                  <div className=" flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                )}
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <LogOut />
                  <Button onClick={logutHandler} variant="link">
                    Log Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
