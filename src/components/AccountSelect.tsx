import React from 'react';
import {Button, View, StyleSheet, Text} from 'react-native';
import {useAccounts} from '../providers';
import {Section} from './Section';
import Picker from 'react-native-dropdown-picker';
import {Toast, ALERT_TYPE} from 'react-native-alert-notification';

export const AccountSelect = () => {
  const {accounts, selectedAccount, selectAccount, createAccount, importAccountShow, exportAccountShow} =
    useAccounts();
  const [open, setOpen] = React.useState(false);
  const [account, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    {label: 'BNB', value: 'bnb'},
  ]);

  React.useEffect(() => {
    const data = [];
    for(let i = 0; i < accounts.length; i++){
      data.push({label: accounts[i].name, value: accounts[i].name})
    }
    setItems(data)
  }, [accounts]);

  React.useEffect(() => {
    console.log("TotalAccount Data------->", accounts)
    for(let i = 0; i < accounts.length; i++){
      if(accounts[i].name == account){
        selectAccount(accounts[i])
      }
    }
  }, [account]);

  return (
    <>
    <View style={styles.PickerContainer}>
      <Section title={`Account: ${selectedAccount?.name || 'None'}`}>
      </Section>
      <Picker
        items={items}
        setItems={setItems}
        setValue={setValue}
        value={account}
        open={open}
        setOpen={setOpen}
        style={styles.pickerButton}
        containerStyle={styles.picker}
        dropDownContainerStyle={{
          borderColor: 'purple',
          padding: 20
        }}
        placeholder={'Select a Account'}
      /> 
      <Text>
      {`\n`}
      </Text>
      
      <Button title="Create Account" onPress={()=>{
        createAccount();
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Created successfully',
          autoClose: 5000,
        });
        }} /> 
      {/* &nbsp; */}
      <Text>
        &nbsp;
      </Text>
      <Button title="Import Account" onPress={importAccountShow} />
      <Text>
        &nbsp;
      </Text>
      <Button title="Export Account" onPress={exportAccountShow} />
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0cc',
    color: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '60%',
    marginTop: 40,
  },
  
  buttonTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },

  label: {
    color: 'purple',
    fontSize: 16,
    fontWeight: '500',
    width: '80%',
    marginBottom: 10,
  },

  textInput: {
    color: 'black',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: 'purple',
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    width: '80%',
    marginBottom: 25,
  },

  pickerButton: {
    borderColor: 'purple',
  },

  picker: {
    width: '100%',
    borderColor: 'purple',
    zIndex: 9999,
    // marginBottom: 0,
  },

  PickerContainer: {
    paddingLeft: 20,
    paddingRight: 20
  }
});
