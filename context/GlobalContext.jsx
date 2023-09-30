import { createContext, useContext, useState, useCallback } from 'react';

const GlobalContext = createContext({
    address: '',
    setAddress: (addr) => {},
    activeSubMenu: false,
    activeSubMenuHandle: () => {}
});

const GlobalProviders = (props) => {
    const [address, setWalletAddress] = useState("");
    const [activeSubMenu, setActiveSubMenu] = useState(false);
    const setAddress = useCallback(
        async (addr) => {
            setWalletAddress(addr);
        },
        [address]
    );

    const activeSubMenuHandle = async () => {
        setActiveSubMenu(!activeSubMenu);
    }

    let wrapperValues = {
        address,
        activeSubMenu,
        setAddress,
        activeSubMenuHandle
    };

    return (
        <GlobalContext.Provider value={wrapperValues}>
            {props.children}
        </GlobalContext.Provider>
    );
};


const useGlobal = () => useContext(GlobalContext);

export {GlobalContext, GlobalProviders, useGlobal}
