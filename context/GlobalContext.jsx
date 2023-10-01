import { createContext, useContext, useState, useCallback } from 'react';

const GlobalContext = createContext({
    address: '',
    setAddress: (addr) => {},
    activeSubMenu: false,
    activeSubMenuHandle: () => {},
    activeNavbar: 0,
    activeNavbarHandle: (num) => {}
});

const GlobalProviders = (props) => {
    const [address, setWalletAddress] = useState("");
    const [activeSubMenu, setActiveSubMenu] = useState(false);
    const [activeNavbar, setActiveNavbar] = useState(0);

    const setAddress = useCallback(
        async (addr) => {
            setWalletAddress(addr);
        },
        [address]
    );

    const activeSubMenuHandle = async () => {
        setActiveSubMenu(!activeSubMenu);
    }

    const activeNavbarHandle = async (data) => {
        setActiveNavbar(data);
    }

    let wrapperValues = {
        address,
        activeSubMenu,
        activeNavbar,
        setAddress,
        activeSubMenuHandle,
        activeNavbarHandle
    };

    return (
        <GlobalContext.Provider value={wrapperValues}>
            {props.children}
        </GlobalContext.Provider>
    );
};


const useGlobal = () => useContext(GlobalContext);

export {GlobalContext, GlobalProviders, useGlobal}
