import React, { useEffect } from "react";
import {Box, Button, Typography} from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { IoIosLogIn } from "react-icons/io";
import {toast } from 'react-hot-toast'
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        console.log(email, password);
        try{
            toast.loading("Signing up", {id: "login"});
            await auth?.signup(name, email, password);
            toast.success("Signed In Successfully", {id: "login"});
        }
        catch(error) {
            console.log(error);
            toast.error("Signing in Failed", {id: "login"});
        }
    };
useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);    
  
  return (
    <Box width={'100%'} height={"100%"} display="flex" flex = {1}>
        <Box padding = {8} mt={8} display={{md: "flex", small:"none", xs:"none"}}>
            <img src="" alt="" style={{width: "400px" }}/>
        </Box>
        <Box display={'flex'} flex={{xs: 1, md: 0.5}} justifyContent={"center"} alignItems={"center"} padding={2} ml={"auto"} mt={16}>
            <form onSubmit={handleSubmit}
            style={{margin: "auto", padding: "30px", boxShadow: "10px 10px 20px #000", borderRadius: "10px", border: "none", }}>
                <Box sx = {{display:"flex", flexDirection:"column", justifyContent: "center"}}>
                    <Typography variant="h4" textAlign={"center"} padding={2} fontWeight={600} > Sign Up</Typography>
                    <CustomizedInput type="text" name="name" label="Name"/>
                    <CustomizedInput type="email" name="email" label="Email"/>
                    <CustomizedInput type="password" name="password" label="Password"/>
                    <Button  type="submit" sx = {{px: 2, py: 1, mt: 2, width:"400 px", borderRadius: 2, bgcolor: "#00fffc", ":hover": {bgcolor:"white", color: "black"}}}
                        endIcon={<IoIosLogIn/>}
                    >
                        Sign Up
                    </Button>
                </Box>
            </form>
        </Box>
    </Box>
    )
};

export default Signup;