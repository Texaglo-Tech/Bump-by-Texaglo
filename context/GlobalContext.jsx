import { createContext, useContext, useState, useCallback } from 'react';

const GlobalContext = createContext({
    address: '',
    setAddress: (addr) => {},
    activeSubMenu: false,
    activeSubMenuHandle: () => {},
    activeNavbar: 0,
    activeNavbarHandle: (num) => {},
    product_data:{},
    productDataHandle:(key, value) =>{}
});

const GlobalProviders = (props) => {
    const [address, setWalletAddress] = useState("");
    const [activeSubMenu, setActiveSubMenu] = useState(false);
    const [activeNavbar, setActiveNavbar] = useState(0);

    const [product_data, setProductData] = useState({        
        product_name: "",
        product_cost: "",
        product_desc: "",
        product_type: "local",
        product_link: "nfc",
        product_payment: "dollar",
        product_qrcode: "physical",
        quantity: 0,

        background_color: "",
        button1_color: "",
        button2_color: "",
        buy_color: "",
        website: false,
        link: "",

        survey: false,
        ai: false,

        product_file: null
    });

    const setAddress = useCallback(
        async (addr) => {
            setWalletAddress(addr);
        },
        [address]
    );

    const downSubMenuHandle = async () => {
        setActiveSubMenu(false);
    }

    const activeSubMenuHandle = async () => {
        setActiveSubMenu(!activeSubMenu);
    }

    const activeNavbarHandle = async (data) => {
        setActiveNavbar(data);
    }

    const productDataHandle = async(key, value) => {
        setProductData({
            ...product_data,
            [key] : value
        })
    }

    let wrapperValues = {
        address,
        activeSubMenu,
        activeNavbar,
        product_data,
        setAddress,
        activeSubMenuHandle,
        activeNavbarHandle,
        productDataHandle,
        downSubMenuHandle
    };

    return (
        <GlobalContext.Provider value={wrapperValues}>
            {props.children}
        </GlobalContext.Provider>
    );
};


const useGlobal = () => useContext(GlobalContext);

export {GlobalContext, GlobalProviders, useGlobal}
