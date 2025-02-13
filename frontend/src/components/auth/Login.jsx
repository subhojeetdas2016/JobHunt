import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "../ui/sonner";
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
                  className="w-6 h-6 text-black dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path fillRule="evenodd" d="..." clipRule="evenodd" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-black dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="..." />
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
