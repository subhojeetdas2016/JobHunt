import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setloading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student", // Default role
  });

  const [showPassword, setShowPassword] = useState(false);

  const changeEventHandler = (e) => {
    console.log("Input changed:", e.target.name, e.target.value); // Debug input change
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    console.log("Toggling password visibility:", !showPassword); // Debug toggle
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Login form submitted with data:", input); // Debug form submission
    try {
      dispatch(setloading(true));
      console.log("Sending login request to API..."); // Debug API call initiation
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log("Login response received:", res.data); // Debug API response
      if (res.data.success) {
        console.log("Login successful, updating user state."); // Debug success path
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success("Login Successful");
      } else {
        console.warn("Login failed:", res.data.message); // Debug failure response
        toast.error("Login Failed: " + res.data.message);
      }
    } catch (error) {
      console.error("Login error:", error); // Debug catch block
      const errorMsg = error.response?.data?.message || "Something went wrong!";
      toast.error("Login Failed: " + errorMsg);
    } finally {
      console.log("Stopping loading state."); // Debug loading state end
      dispatch(setloading(false));
    }
  };

  useEffect(() => {
    console.log("Checking if user is already logged in:", user); // Debug initial user check
    if (user) {
      console.log("User already logged in, redirecting to home."); // Debug redirect
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Log In</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="JobHunt@gmail.com"
              required
            />
          </div>

          <div className="my-2 relative">
            <Label>Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter Your Password"
              className="pr-10"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-0 flex items-center pr-3 mt-6"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-black dark:text-white"
                >
                  <g>
                    <path
                      d="M12 10.75c-2.346 0-4.25 1.904-4.25 4.25s1.904 4.25 4.25 4.25 4.25-1.904 4.25-4.25-1.904-4.25-4.25-4.25zm0 1.5a2.751 2.751 0 0 1 0 5.5 2.751 2.751 0 0 1 0-5.5z"
                      fill="#000000"
                    />
                    <path
                      d="m22.53 12.97-1.514-1.515c-4.98-4.979-13.052-4.979-18.032 0L1.47 12.97a.749.749 0 1 0 1.06 1.06l1.515-1.514c4.393-4.394 11.517-4.394 15.91 0l1.515 1.514a.749.749 0 1 0 1.06-1.06z"
                      fill="#000000"
                    />
                    <path
                      d="m18.85 6.867-1.5 2.598a.751.751 0 0 0 1.3.75l1.5-2.598a.75.75 0 0 0-1.3-.75zM11.25 5.5v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0zM3.85 7.617l1.5 2.598a.751.751 0 0 0 1.3-.75l-1.5-2.598a.75.75 0 0 0-1.3.75z"
                      fill="#000000"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="512"
                  height="512"
                  x="0"
                  y="0"
                  viewBox="0 0 24 24"
                  style="enable-background:new 0 0 512 512"
                  xml:space="preserve"
                  class=""
                >
                  <g>
                    <path
                      fill="#000000"
                      fill-rule="evenodd"
                      d="M1.264 6.666a.745.745 0 0 1 1.033.092C4.01 8.771 7.118 11.283 12 11.283c4.881 0 7.99-2.512 9.703-4.525a.745.745 0 0 1 1.033-.092.707.707 0 0 1 .094 1.01c-.528.621-1.183 1.29-1.972 1.933.042.046.079.099.109.157l1.955 3.826a.71.71 0 0 1-.328.963.741.741 0 0 1-.983-.321l-1.925-3.767a13.52 13.52 0 0 1-4.42 1.89l.875 4.285a.718.718 0 0 1-.575.844.733.733 0 0 1-.863-.563l-.882-4.314c-.58.07-1.188.108-1.821.108s-1.24-.038-1.821-.108l-.882 4.314a.733.733 0 0 1-.863.563.718.718 0 0 1-.575-.844l.876-4.286a13.483 13.483 0 0 1-3.757-1.48L2.32 14.344a.744.744 0 0 1-1.027.144.707.707 0 0 1-.146-1.005l2.608-3.402A15.022 15.022 0 0 1 1.17 7.676a.707.707 0 0 1 .094-1.01Z"
                      clip-rule="evenodd"
                      opacity="1"
                      data-original="#000000"
                      class=""
                    ></path>
                  </g>
                </svg>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Student</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Recruiter</Label>
              </div>
            </div>
          </div>

          {loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-[#2b2a2a]"
            >
              Log In
            </Button>
          )}

          <span className="text-sm italic mt-2 block">
            Create an Account?{" "}
            <Link to="/Signup" className="text-blue-500">
              SignUp
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
