import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { AccountSelect, Balance, NetworkSelect, Section } from "../components";
import { useAccounts, useConnections } from "../providers";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import Dialog from "react-native-dialog";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import ConfettiCannon from "react-native-confetti-cannon";
import bs58 from "bs58";
import axios from "axios";
import { ScrollView } from "react-native";

const API: any = "https://api-artengine.texaglo.com";

const WalletScreen = () => {
  const {
    selectedAccount,
    importAccountDialog,
    importAccountShow,
    importAccount,
    exportAccountDialog,
    exportAccountShow,
  } = useAccounts();
  const { connection, selectedNetwork } = useConnections();

  const [balance, setBalance] = useState<any>();
  const [scan, setScan] = useState<any>(false);
  const [scanResult, setScanResult] = useState<any>("");
  const [privateKey, setPrivateKey] = useState<any>("");
  const [exportPrivateKey, setExportPrivateKey] = useState<any>("");

  const [shoot, setShoot] = useState(false);

  useEffect(() => {
    //Time out to fire the cannon
    setTimeout(() => {
      setShoot(true);
    }, 1000);
  }, []);

  const getBalance = () => {
    if (!connection || !selectedAccount) return;
    console.log(selectedAccount.id);
    console.log(`Get balance for ${selectedAccount.publicKey}`);
    setBalance(null);
    connection
      .getBalance(new PublicKey(selectedAccount.publicKey))
      .then((res) => setBalance(String(res / LAMPORTS_PER_SOL)))
      .catch((err) => console.log(err));
  };

  const getAirdrop = () => {
    if (!connection || !selectedAccount) return;
    connection
      .requestAirdrop(
        new PublicKey(selectedAccount.publicKey),
        2 * LAMPORTS_PER_SOL
      )
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => console.log(err));
  };

  const onSuccess = (e: any) => {
    const check = e.data; //.substring(0, 4)
    console.log(`scanned data`, check);
    setScan(true);
    setScanResult(check);
  };

  const scanAgain = () => {
    //To fire the cannon again
    setShoot(false);
    setTimeout(() => {
      setShoot(true);
    }, 500);

    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Success",
      textBody: "Confirmed",
      autoClose: 5000,
    });
    setScan(false);
    setScanResult("");
  };

  useEffect(() => {
    if (selectedAccount) {
      console.log("selectedAccount------>", selectedAccount);
      // setExportPrivateKey(bs58.encode(selectedAccount?.secretKey).toString())
    }
  }, [selectedAccount]);

  useEffect(() => {
    if (scanResult != "") {
      const data = JSON.parse(scanResult);
      if (data.ticketAmount == 0) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Info",
          textBody: "Ticket is already sold!",
          autoClose: 5000,
        });
      } else {
        let flag = 1; //  not in whitelist
        for (let i = 0; i < JSON.parse(data.whitelist).length; i++) {
          if (JSON.parse(data.whitelist)[i] == selectedAccount?.publicKey) {
            flag = 0; //  in whitelist
          }
        }
        if (flag == 1) {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Info",
            textBody: "You are not whitelist",
            autoClose: 5000,
          });
        } else {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Info",
            textBody: "You are in whitelist",
            autoClose: 5000,
          });
          axios
            .post(`${API}/api/subdomain/request-ticket`, {
              gate: `${data.gate}`,
              wallet: `${selectedAccount.publicKey}`,
            })
            .then((response) => {
              console.log(response);
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Info",
                textBody: "You just got the QRcode Ticket",
                autoClose: 5000,
              });
            })
            .catch((error) => {
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Info",
                textBody: "Please scan again",
                autoClose: 5000,
              });
            });
        }
      }
    }
  }, [scanResult]);

  useEffect(() => {
    if (balance || !connection) return;
    getBalance();
  }, [balance, getBalance, connection]);

  return (
    <ScrollView>
      <View>
        {/*Cannon which will fire whenever shoot is true*/}
        {shoot ? <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} /> : null}
        {/* <ConfettiCannon autoStart={true}	count={200} origin={{x: -10, y: 0}} />   */}
        <NetworkSelect />
        <AccountSelect />
        {selectedAccount ? (
          <View>
            <Section title="Balance">
              {balance ? (
                <Balance balance={balance} symbol="SOL" decimals={10} />
              ) : (
                <Text>Fetching balance.</Text>
              )}
            </Section>
            <Section title="Actions">
              <Button title="Refresh Balance" onPress={getBalance} />
              <Button
                disabled={selectedNetwork?.endpoint === "mainnet-beta"}
                title="Airdrop"
                onPress={getAirdrop}
              />
            </Section>
          </View>
        ) : null}

        <Section title="Scan">
          <Button title="QR Scan" onPress={scanAgain} />
        </Section>
        <Section title="QR Code Result">
          <Text style={styles.centerText}>{scanResult}</Text>
        </Section>
        <Section title="">
          <Text style={styles.centerText}>{}</Text>
        </Section>

        <QRCodeScanner
          onRead={onSuccess}
          // flashMode={RNCamera.Constants.FlashMode.torch}
          topContent={
            <Text style={styles.textBold}>Please Scan the QR code</Text>
          }
        />

        {/* <Section title="TechonoKing">
              <Text>
                https://www.texaglo.com
                {"\n"}{"\n"}{"\n"}{"\n"}
                {"\n"}{"\n"}{"\n"}{"\n"}
                {"\n"}{"\n"}
              </Text>
        </Section>
           
        <Dialog.Container visible={exportAccountDialog}>
            <Dialog.Title>Account Export</Dialog.Title>
            <Dialog.Description>
              Your Account Private Key
            </Dialog.Description>
              <TextInput
                    style={styles.privateKey}
                    multiline={true}
                    numberOfLines={2}
                    onChangeText={(text) => setPrivateKey(text.trim())}
                    value={exportPrivateKey}
                    />
            <Dialog.Button label="Close" onPress={exportAccountShow} />
        </Dialog.Container>

          <Dialog.Container visible={importAccountDialog}>
            <Dialog.Title>Account Import</Dialog.Title>
            <Dialog.Description>
              Please input your private key
            </Dialog.Description>
              <TextInput
                  style={styles.privateKey}
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(text) => setPrivateKey(text.trim())}
                  />
            <Dialog.Button label="Import" onPress={()=>{
              importAccount(privateKey);
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'Added successfully',
                autoClose: 5000,
              });
              importAccountShow();
            }} />
            <Dialog.Button label="Close" onPress={importAccountShow} />
        </Dialog.Container> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 50,
    margin: 200,
    color: "#777",
  },

  textBold: {
    fontWeight: "700",
    padding: 10,
    color: "#000",
  },

  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },

  buttonTouchable: {
    padding: 16,
  },

  pickerButton: {
    borderColor: "purple",
  },

  picker: {
    width: "80%",
    borderColor: "purple",
    zIndex: 999999,
    marginBottom: 25,
  },

  privateKey: {
    borderColor: "purple",
    backgroundColor: "purple",
    color: "white",
  },
});

export default WalletScreen;
