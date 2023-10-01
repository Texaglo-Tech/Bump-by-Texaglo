import axios from "axios";
import { toast } from "react-toastify";

const config = require("./config.json");

const signin = async (data) => {
    try {
        const res = (await axios.post(`${config.backend_url}/api/auth/login`, data)).data;
        if(res.success){
            localStorage.setItem("token", res.token);
        }
        return res
    }catch(err){
        console.log(err)
        return {success:false, message: "Server Error"}
    }
}

export const signinHandle = async (data) => {
    if (data.email =="") {
        toast.warning("Please input the email!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        });
        return;
    }

    if (data.password == "") {
        toast.warning("Please input the password!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        });
        return;
    }

    const id = toast.loading("Login", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });

    const res = await signin(data);
    
    toast.update(id, {
        render: res.message,
        type: res.success ? "success": "error",
        autoClose: 2000,
        isLoading: false,
    });

    return res
}


const signup = async (data) => {
    try {
        const res = await axios.post(`${config.backend_url}/api/auth/register`, data);
        return res.data
    }catch(err){
        return {success:false, message: "Server Error"}
    }
}

export const signupHandle = async (data) => {
    if (data.username =="") {
        toast.warning("Please input the username!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        });
        return;
    }

    if (data.phone =="") {
        toast.warning("Please input the phone!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        });
        return;
    }

    if (data.email =="") {
        toast.warning("Please input the email!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        });
        return;
    }

    if (data.password == "") {
        toast.warning("Please input the password!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        });
        return;
    }

    const id = toast.loading("Signup", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });

    const res = await signup(data);
    
    toast.update(id, {
        render: res.message,
        type: res.success ? "success": "error",
        autoClose: 2000,
        isLoading: false,
    });

    return res
}

export const sentOTP = async (data) => {
    const id = toast.loading("Sending code", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });
    try {
        const res = (await axios.post(`${config.backend_url}/api/auth/login`, data)).data;
        toast.update(id, {
            render: res.message,
            type: res.success ? "success": "error",
            autoClose: 2000,
            isLoading: false,
        });
        return res
    }catch(err){
        toast.update(id, {
            render: "Server Error",
            type: "error",
            autoClose: 2000,
            isLoading: false,
        });
        return {success:false, message: "Server Error"}
    }
}

export const verifyOTP = async (data) => {
    console.log("verify...")
    const id = toast.loading("Verify code", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });
    try {
        const res = (await axios.post(`${config.backend_url}/api/auth/verifycode`, data)).data;

        if(res.success){
            localStorage.setItem("token", res.token);
        }

        toast.update(id, {
            render: res.message,
            type: res.success ? "success": "error",
            autoClose: 2000,
            isLoading: false,
        });
        return res
    }catch(err){
        toast.update(id, {
            render: "Server Error",
            type: "error",
            autoClose: 2000,
            isLoading: false,
        });
        return {success:false, message: "Server Error"}
    }
}

export const checkAuthentication = async (router) => {
    try{
        
        const token = localStorage.getItem("token");
        if (token) {
            setAuthToken(token);
        }

        const res = (await axios.get(`${config.backend_url}/api/auth/whoami`)).data;
        if(!res?.success) {
            localStorage.removeItem("token")
            toast.warning("Please login!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            router.push("/login")
        }else{
            if(router.pathname.includes("login")){
                router.push("/dashboard")
            }
        }
    }catch(err){
        console.log(err)
        toast.warning("Please login!!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
        localStorage.removeItem("token")
        return {success:false, message: "Server Error"}
    }
}

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
}

export const logout = async (router)=> {
    localStorage.removeItem("token");
    router.push("/login")
}


