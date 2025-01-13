import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2, X } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.bio || "",
    skills: user?.profile?.skills || "",
    file: null,
  });

  const dispatch = useDispatch();

  // Handle input change for text fields
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  // Submit form handler
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if(input.file){
    formData.append("file", input.file);
  }
    setLoading(true);

    try {
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Profile updated successfully!");
        console.log("updated profile",res.data.user);
      }
    } catch (err){
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update profile.");
    }
    finally {
      setLoading(false);
      setOpen(false);
    } 
    console.log(input);
    
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="bg-white sm:max-w-[425px]"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <DialogClose
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          onClick={() => setOpen(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <form onSubmit={submitHandler}>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="fullname">Name</Label>
              <Input
                id="fullname"
                name="fullname"
                value={input.fullname}
                onChange={changeHandler}
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={input.email}
                onChange={changeHandler}
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="phoneNumber">Phone</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeHandler}
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" name="bio" value={input.bio} onChange={changeHandler} />
            </div>
            <div className="grid grid-cols-1 gap-2 ">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeHandler}
              />
            </div>
            <div className="grid grid-cols-1 gap-2 ">
              <Label htmlFor="file">Resume</Label>
              <Input
                id="file"
                type="file"
                accept="application/pdf"
                name="file"
                onChange={fileChangeHandler}
              />
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
