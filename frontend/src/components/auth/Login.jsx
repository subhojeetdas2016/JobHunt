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

    
    const { loading,user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "student", // Default role
    });

    const [showPassword, setShowPassword] = useState(false);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
  
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setloading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success("Login Successful");
            } else {
                toast.error("Login Failed: " + res.data.message);
            }
        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.message || "Something went wrong!";
            toast.error("Login Failed: " + errorMsg);
        } finally {
            dispatch(setloading(false));
        }
    };

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])

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
        <path
            fillRule="evenodd"
            d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            clipRule="evenodd"
        />
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
        <path d="m4 15.6 3.055-3.056A4.913 4.913 0 0 1 7 12.012a5.006 5.006 0 0 1 5-5c.178.009.356.027.532.054l1.744-1.744A8.973 8.973 0 0 0 12 5.012c-5.388 0-10 5.336-10 7A6.49 6.49 0 0 0 4 15.6Z" />
        <path d="m14.7 10.726 4.995-5.007A.998.998 0 0 0 18.99 4a1 1 0 0 0-.71.305l-4.995 5.007a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.402.211.59l-4.995 4.983a1 1 0 1 0 1.414 1.414l4.995-4.983c.189.091.386.162.59.211.011 0 .021.007.033.01a2.982 2.982 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z" />
        <path d="m19.821 8.605-2.857 2.857a4.952 4.952 0 0 1-5.514 5.514l-1.785 1.785c.767.166 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z" />
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
                        <Button type="submit" className="w-full bg-black text-white hover:bg-[#2b2a2a]">
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
