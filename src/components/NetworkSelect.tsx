import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {useConnections} from '../providers';
import {Section} from './Section';
import Picker from 'react-native-dropdown-picker';

export const NetworkSelect = () => {
  const {
    networkError,
    networkVersion,
    networks,
    selectedNetwork,
    selectNetwork,
  } = useConnections();
  const [open, setOpen] = React.useState(false);
  const [network, setValue] = React.useState(null);

  React.useEffect(() => {
    const data = [];
    for(let i = 0; i < networks.length; i++){
      data.push({label: networks[i].name, value: networks[i].name})
    }
    setItems(data)
  }, [networks]);

  React.useEffect(() => {
    console.log(network)
    for(let i = 0; i < networks.length; i++){
      if(networks[i].name == network){
        selectNetwork(networks[i])
      }
    }
  }, [network]);

  const [items, setItems] = React.useState([
    {label: 'BNB', value: 'bnb'},
    {label: 'BUSD', value: 'busd'},
    {label: 'ETH', value: 'eth'},
  ]);

  return (
    <>
        {/* <Section
          description={`Version: ${
            networkVersion?.['solana-core'] || 'Connecting...'
          }`}
          title={`Network: ${selectedNetwork?.name}`}>
        </Section> */}
        <View style={styles.PickerContainer}>
            <Picker
              autoScroll={true}
              items={items}
              setItems={setItems}
              setValue={setValue}
              value={network}
              open={open}
              setOpen={setOpen}
              style={styles.pickerButton}
              containerStyle={styles.picker}
              dropDownContainerStyle={{
                borderColor: 'purple',
                padding: 20
              }}
              placeholder={'Select a network'}
            />
        </View>
          {/* {networks.map(item => (
            <Button
              disabled={item === selectedNetwork}
              key={item.id}
              title={item.name}
              onPress={() => selectNetwork(item)}
            />
          ))} */}
          {networkError ? (
            <Section title="Error">
              {JSON.stringify(networkError, null, 2)}
            </Section>
          ) : null}
       
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
    zIndex: 99999,
    // marginBottom: 0,
  },
  PickerContainer: {
    padding: 20
  }
});