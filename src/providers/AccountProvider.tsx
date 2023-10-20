import { Keypair, PublicKey } from "@solana/web3.js";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import SyncStorage from "sync-storage";
import * as RNFS from "react-native-fs";
import bs58 from "bs58";
import { checkAuthentication } from "./../api";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { socketIO } from '../api'; 
import { Toast, ALERT_TYPE } from "react-native-alert-notification";

var path = RNFS.DocumentDirectoryPath + "/priv333.key";

export const elipsify = (str = "", len = 4) => {
  if (str.length > 30) {
    return (
      str.substring(0, len) +
      "..." +
      str.substring(str.length - len, str.length)
    );
  }
  return str;
};

export interface Account {
  id: string;
  name: string;
  publicKey: string;
  secretKey: string;
}

export interface AccountProviderContext {
  accounts: Account[];
  createAccount: () => void;
  importAccount: (privateKey: any) => void;
  importAccountShow: () => void;
  exportAccountShow: () => void;
  selectedAccount?: Account;
  selectAccount: (network: Account) => void;
  importAccountDialog?: boolean;
  exportAccountDialog?: boolean;

  setAccountPhone: (data: any) => void;
  setActiveTab: (data: any) => void;
  activeTab?: any;

  selectedProduct?: any;
  products?: any;
  selectedProductHandle: (data) => void;
  productsHandle: (data) => void;

  cart?: any;
  cartHandle: (data) => void;
  stripe: boolean;
  stripeHandle: () => void
}

const AccountsContext = React.createContext<AccountProviderContext>({
  accounts: [],
  createAccount() {},
  importAccount(privateKey: any) {},
  selectAccount(_account: Account) {},
  importAccountShow() {},
  exportAccountShow() {},
  selectedAccount: undefined,
  importAccountDialog: false,
  exportAccountDialog: false,

  setAccountPhone(data: any) {},
  setActiveTab(data: any) {},
  activeTab: 0,

  selectedProduct: undefined,
  products: [],
  selectedProductHandle(data: any) {},
  productsHandle(data: any) {},

  cart: [],
  cartHandle(data: any) {},
  stripe: false,
  stripeHandle() {}

});

const AccountProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account>(accounts[0]);
  const [importAccountDialog, setImportAccountDialog] =
    useState<boolean>(false);
  const [exportAccountDialog, setExportAccountDialog] =
    useState<boolean>(false);
  const [token, setToken] = useState<String>("");
  const [phone, setPhone] = useState<String>("");
  const [products, setProducts] = useState<Object>([]);
  const [selectedProduct, setSelectedProduct] = useState<String>();

  const [cart, setCart] = useState<Object>([]);

  const [activeTab, setTab] = useState<any>(0);

  const [paid, setPaid] = useState<any>(false);
  const [stripe, setStripe] = useState(false)

  const navigation: any = useNavigation();

  const stripeHandle = () => {
    setStripe(!stripe);
  };

  useEffect(() => {
    checkAuthentication(navigation);
  }, []);

  useEffect(() => {
		socketIO.emit("msg_to_owner", "This is bking, give me compensation");
    socketIO.on("msg_from_user",(msg)=>{  
      console.log(msg)
    }) 

    socketIO.on("got",(msg)=>{  
      console.log(msg)
      setPaid(true)
    }) 
    // socketIO.emit("msg_to_user", "This is technoking"); 
    // socketIO.on("msg_from_owner",(msg)=>{  
    //   console.log(msg)  
    // })              
	}, []);   

  useEffect(()=>{
    if(paid){
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Thanks",
        textBody: "You Paid!",
        autoClose: 10000,
      });
      setCart([])
      setPaid(false)
    }
  }, [paid])

  const createAccount = () => {
    const { publicKey, secretKey } = Keypair.generate();
    const name = elipsify(publicKey.toBase58());

    const secretKeyString = bs58.encode(secretKey);
    setAccounts((currentAccounts) => [
      ...currentAccounts,
      {
        id: publicKey.toBase58(),
        name,
        publicKey: publicKey.toBase58(),
        secretKey: secretKeyString,
      },
    ]);

    if (accounts.length != 0) {
      RNFS.writeFile(
        path,
        JSON.stringify([
          ...accounts,
          {
            id: publicKey.toBase58(),
            name,
            publicKey: publicKey,
            secretKey: secretKeyString,
          },
        ]),
        "utf8"
      )
        .then(() => console.log("FILE WRITTEN!"))
        .catch((err) => console.log(err.message));
      console.log(accounts);
    } else {
      RNFS.writeFile(
        path,
        JSON.stringify([
          {
            id: publicKey.toBase58(),
            name,
            publicKey: publicKey,
            secretKey: secretKeyString,
          },
        ])
      )
        .then(() => console.log("FILE WRITTEN!"))
        .catch((err) => console.log(err.message));
      console.log(accounts);
    }
  };

  const importAccount = (key: any) => {
    console.log("importAccount...");
    let secretKey: any;
    let privateKey: any, publicKey: any;
    if (typeof key == "string") {
      secretKey = bs58.decode(key);
      privateKey = Keypair.fromSecretKey(secretKey).secretKey;
      publicKey = Keypair.fromSecretKey(secretKey).publicKey;
    } else {
      privateKey = Keypair.fromSecretKey(secretKey).secretKey;
      publicKey = Keypair.fromSecretKey(secretKey).publicKey;
    }
    const name = elipsify(publicKey.toBase58());

    setAccounts((currentAccounts) => [
      ...currentAccounts,
      {
        id: publicKey.toBase58(),
        name,
        publicKey: publicKey.toBase58(),
        secretKey: key,
      },
    ]);
    console.log("Typeof secretKey:", typeof secretKey);
    console.log("secretKey:", secretKey);
    console.log(accounts);
    console.log(accounts.length);
    if (accounts.length != 0) {
      RNFS.writeFile(
        path,
        JSON.stringify([
          ...accounts,
          {
            id: publicKey.toBase58(),
            name,
            publicKey: publicKey,
            secretKey: key,
          },
        ]),
        "utf8"
      )
        .then(() => console.log("FILE WRITTEN!"))
        .catch((err) => console.log(err.message));
    } else {
      RNFS.writeFile(
        path,
        JSON.stringify([
          {
            id: publicKey.toBase58(),
            name,
            publicKey: publicKey,
            secretKey: key,
          },
        ])
      )
        .then(() => console.log("FILE WRITTEN!"))
        .catch((err) => console.log(err.message));
    }
  };

  const selectAccount = (account: Account) => {
    console.log(`Select Account: ${account?.name}`);
    setSelectedAccount(account);
  };

  const importAccountShow = () => {
    console.log("damn.....");
    if (importAccountDialog) {
      setImportAccountDialog((old) => false);
    } else {
      setImportAccountDialog((old) => true);
    }
    console.log("importAccountShow---->", importAccountDialog);
  };

  const setAccountPhone = (data) => {
    console.log("logined successfully");
    console.log(data);
    setPhone(data);
  };

  const exportAccountShow = () => {
    setExportAccountDialog(!exportAccountDialog);
    console.log("exportAccountShow---->", exportAccountDialog);
  };

  const setActiveTab = (data) => {
    setTab(data);
  };

  const selectedProductHandle = (data) => {
    console.log(data);
    setSelectedProduct(data);
  };

  const productsHandle = (data) => {
    setProducts(data);
  };

  const cartHandle = (data) => {
    setCart(data);
  };

  useEffect(() => {
    RNFS.exists(path)
      .then((exist) => {
        if (exist) {
          RNFS.readFile(path, "utf8")
            .then((data) => {
              console.log("data");
              const d = JSON.parse(data);
              console.log(d);
              setAccounts(d);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (accounts.length > 0 && !selectedAccount) {
      selectAccount(accounts[0]);
    }
  }, [accounts, selectedAccount]);

  const value = useMemo(
    () => ({
      accounts,
      createAccount,
      selectedAccount,
      selectAccount,
      importAccountShow,
      importAccountDialog,
      importAccount,
      exportAccountShow,
      exportAccountDialog,

      setAccountPhone,
      setActiveTab,
      activeTab,

      productsHandle,
      products,
      selectedProductHandle,
      selectedProduct,

      cart,
      cartHandle,

      stripe,
      stripeHandle
    }),
    [
      accounts,
      selectedAccount,
      createAccount,
      selectedAccount,
      selectAccount,
      importAccountShow,
      importAccountDialog,
      importAccount,
      exportAccountShow,
      exportAccountDialog,
      setAccountPhone,
      setActiveTab,
      activeTab,
      selectedProduct,
      selectedProductHandle,
      productsHandle,
      products,
      cart,
      cartHandle,
      stripe,
      stripeHandle
    ]
  );

  return (
    <AccountsContext.Provider value={value}>
      {children}
    </AccountsContext.Provider>
  );
};

const useAccounts = () => React.useContext(AccountsContext);

export { AccountProvider, useAccounts };
