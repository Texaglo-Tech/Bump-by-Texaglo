import axios from "axios";
import { toast } from "react-toastify";
import jwt from 'jsonwebtoken';

const config = require("./config.json");
const XLSX = require('xlsx');
const fileSaver = require('file-saver');

const api = axios.create();

// Add a request interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers['Authorization'] = token;
    }
        return config;
    }, (error) => {
    // Handle request error
    return Promise.reject(error);
});

export const getUserIdFromToken = ()=>{
    const decodedToken = jwt.decode(localStorage.getItem("token"));
    return decodedToken.id
}

export const getCurrentProductId = ()=>{
    const id = localStorage.getItem("product_id");
    return id
}

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

export const exportToExcel = (exportFileName, data) => {
    var XLSX__default = /*#__PURE__*/_interopDefaultLegacy(XLSX);
    var EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    var EXCEL_EXTENSION = ".xlsx";
    var ws = XLSX__default['default'].utils.json_to_sheet(data);
    var wb = {
      Sheets: {
        data: ws
      },
      SheetNames: ["data"]
    };
    var eb = XLSX__default['default'].write(wb, {
      bookType: "xlsx",
      type: "array"
    });
    var blob = new Blob([eb], {
      type: EXCEL_TYPE
    });
    fileSaver.saveAs(blob, exportFileName + EXCEL_EXTENSION);
  };

const signin = async (data) => {
    try {
        const res = (await api.post(`${config.backend_url}/api/auth/login`, data)).data;
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
        const res = await api.post(`${config.backend_url}/api/auth/register`, data);
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
        const res = (await api.post(`${config.backend_url}/api/auth/login`, data)).data;
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
        const res = (await api.post(`${config.backend_url}/api/auth/verifycode`, data)).data;

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
        console.log("checkauthentication")

        if(router.pathname.includes("product")|| router.pathname.includes("refer")){ // authenticate ignore whitelist 
            return
        }

        const res = (await api.get(`${config.backend_url}/api/auth/whoami`)).data;
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
        toast.warning("Please login!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
        localStorage.removeItem("token")
        router.push("/login")
        return {success:false, message: "Server Error"}
    }
}

export const logout = async (router)=> {
    localStorage.removeItem("token");
    router.push("/login")
}

export const uploadImgForItem = async (data) => {
    console.log("uploading Image for item...")
    const id = toast.loading("uploading...", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });
    try {
        const res = (await api.post(`${config.backend_url}/api/product/upload_img_for_item`, data)).data;
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

export const createOrder = async (data) => {
    console.log("create order...")
    const id = toast.loading("Create order", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });
    try {
        const res = (await api.post(`${config.backend_url}/api/product/create_order`, data)).data;

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

export const updateQuantity = async (data) => {
    console.log("update quantity according to product..")
    const id = toast.loading("Updating...", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });
    try {
        const res = (await api.post(`${config.backend_url}/api/product/update_quantity`, data)).data;

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

export const getProductSummary = async (data) => {
    console.log("get Product Summary..")
    try {
        const res = (await api.post(`${config.backend_url}/api/product/get_product_summary`, data)).data;
        return res
    }catch(err){
        return {success:false, message: "Server Error"}
    }
}

export const getSummary = async (data) => {
    console.log("get Summary..")
    try {
        const res = (await api.post(`${config.backend_url}/api/product/get_summary`, data)).data;
        return res
    }catch(err){
        return {success:false, message: "Server Error"}
    }
}

export const addMembershipDiscount = async (data) => {
    console.log("add membership discount ...")
    const id = toast.loading("Create Qrcode...", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });
    try {
        const res = (await api.post(`${config.backend_url}/api/product/add_membership_discount`, data)).data;

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

export const customizeDeploy = async (data) => {
    console.log("deploy customized ...")
    const id = toast.loading("Save and deploying...", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });
    try {
        const res = (await api.post(`${config.backend_url}/api/product/customize_deploy`, data)).data;

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

export const surveyDeploy = async (data) => {
    console.log("deploy customized ...")
    const id = toast.loading("Save and deploying...", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });
    try {
        const res = (await api.post(`${config.backend_url}/api/product/survey_deploy`, data)).data;

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

export const aiDeploy = async (data) => {
    console.log("deploy ai bot ...")
    const id = toast.loading("Save and deploying...", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });
    try {
        const res = (await api.post(`${config.backend_url}/api/product/ai_deploy`, data)).data;

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

export const forgotPassword = async (data) => {
    console.log("forgotPassword...")
    const id = toast.loading("Requesting forgot password...", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });
    try {
        const res = (await api.post(`${config.backend_url}/api/auth/forgot_password`, data)).data;

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


export const getRefer = async (data) => {
    try {
        const res = (await api.post(`${config.backend_url}/api/auth/get_refer`, data)).data;
        return res
    }catch(err){
        console.log(err)
        return {success:false, message: "Server Error"}
    }
}

