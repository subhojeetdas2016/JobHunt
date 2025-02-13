import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setloading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    email: "",
    fullname: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log("Checking if user is already logged in:", user);
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const changeEventHandler = (e) => {
    console.log(`Changing input for ${e.target.name}:`, e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    console.log("File selected:", e.target.files?.[0]);
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    console.log("Toggled showPassword:", !showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("email", input.email);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    console.log("Submitting form data:", {
      fullname: input.fullname,
      email: input.email,
      phoneNumber: input.phoneNumber,
      role: input.role,
      file: input.file ? input.file.name : null,
    });

    try {
      dispatch(setloading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log("Server response:", res.data);
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      dispatch(setloading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              required
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter Your Name"
            />
          </div>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              required
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="JobHunt@gmail.com"
            />
          </div>

          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              required
              type="number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter Phone Number"
            />
          </div>

          <div className="my-2 relative">
            <Label>Password</Label>
            <Input
              required
              type={showPassword ? "text" : "password"}
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter Your Password"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-0 flex items-center pr-3 mt-6"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {/* Toggle password visibility SVG */}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  required
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
                  required
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

            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                required
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer bg-[#C0C0C0]"
              />
            </div>
          </div>

          {loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my bg-black text-white hover:bg-[#2b2a2a]"
            >
              Sign Up
            </Button>
          )}
          <span className="text-sm italic">
            Already have an Account?{" "}
            <Link to="/Login" className="text-blue-500">
              Log In
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
