import axios from "axios";
import config from "./config";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

import { io } from "socket.io-client";

const api = axios.create();

export const socketIO = io(config.API);

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export const signup = async (data) => {
  return api
    .post(`${config.API}/api/auth/register`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { success: false, message: "Server Error" };
    });
};

export const sentCode = async (data) => {
  return api
    .post(`${config.API}/api/auth/login`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { success: false, message: "Server Error" };
    });
};

export const verifyCode = async (data) => {
  return api
    .post(`${config.API}/api/auth/verifyCode`, data)
    .then((response) => {
      AsyncStorage.setItem("token", response.data.token)
        .then(() => {
          console.log("Data stored successfully");
        })
        .catch((error) => {
          console.log("Error storing data:", error);
        });
      return response.data;
    })
    .catch((error) => {
      return { success: false, message: "Server Error" };
    });
};

export const comingSoon = () => {
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: "Thanks",
    textBody: "Coming Soon!",
    autoClose: 5000,
  });
};

export const checkAuthentication = async (navigation) => {
  try {
    console.log("checkAuthentication...");

    const token = await AsyncStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
    console.log(token);

    const res = (await api.get(`${config.API}/api/auth/whoami`)).data;
    if (!res?.success) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Thanks",
        textBody: "Please login!",
        autoClose: 5000,
      });
      navigation.navigate("Home");
    } else {
      navigation.navigate("Dashboard");
    }
  } catch (err) {
    Toast.show({
      type: ALERT_TYPE.WARNING,
      title: "Thanks",
      textBody: "Please login!",
      autoClose: 5000,
    });
    navigation.navigate("Home");
    return { success: false, message: "Server Error" };
  }
};

export const getUserIdFromToken = async ()=>{
  const decodedToken:any = jwtDecode(await AsyncStorage.getItem("token"));
  return decodedToken?.id
}

export const getUserNameFromToken = async ()=>{
  const decodedToken:any = jwtDecode(await AsyncStorage.getItem("token"));
  return decodedToken?.username
}

export const getPointsFromToken = async ()=>{
  const decodedToken:any = jwtDecode(await AsyncStorage.getItem("token"));
  return decodedToken?.points
}

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `${token}`;
  } else delete axios.defaults.headers.common["Authorization"];
};

export const logout = async (navigation) => {
  await AsyncStorage.removeItem("token");
  navigation.navigate("Home");
};

export const aiChat = async (data) => {
  console.log("ai chat..");
  try {
    const res = (await api.post(`${config.API}/api/product/ai_chat`, data))
      .data;
    return res;
  } catch (err) {
    return { success: false, message: "Server Error" };
  }
};

export const getProducts = async () => {
  console.log("get Products..");
  try {
    const res = (await api.post(`${config.API}/api/product/get_products`)).data;
    return res;
  } catch (err) {
    return { success: false, message: "Server Error" };
  }
};


export const getCollectibles = async (data) => {
  console.log("get Collectibles..");
  try {
    const res = (await api.post(`${config.API}/api/product/get_collectibles`, data)).data;
    return res;
  } catch (err) {
    return { success: false, message: "Server Error" };
  }
};

export const getProduct = async (data) => {
  console.log("get Product..");
  try {
    const res = (await api.post(`${config.API}/api/product/get_product`, data)).data;
    return res;
  } catch (err) {
    return { success: false, message: "Server Error" };
  }
};

export const sentMsgToOwner = async (data) => {
  console.log("sentToOwner..");
  try {
    const res = (await api.post(`${config.API}/api/message/sent_to_owner`, data)).data;
    return res;
  } catch (err) {
    return { success: false, message: "Server Error" };
  }
};

export const refundPurchase = async (data) => {
  console.log("refundPurchase...");
  try {
    const res = (await api.post(`${config.API}/api/payment/refund`, data)).data;
    return res;
  } catch (err) {
    return { success: false, message: "Server Error" };
  }
};

export const createPayment = async (data) => {
  console.log("creatPayment...");
  try {
    const res = (await api.post(`${config.API}/api/payment/create_payment`, data)).data;
    return res;
  } catch (err) {
    return { success: false, message: "Server Error" };
  }
}; 

// Encryption function
export const encryptMessage = (message, shift) => {
  let encryptedMessage = '';
  for (let i = 0; i < message.length; i++) {
    let charCode = message.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      charCode = ((charCode - 65 + shift) % 26) + 65;
    } else if (charCode >= 97 && charCode <= 122) {
      charCode = ((charCode - 97 + shift) % 26) + 97;
    }
    encryptedMessage += String.fromCharCode(charCode);
  }
  return encryptedMessage;
};