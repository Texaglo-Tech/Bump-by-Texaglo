// ProductScreen.tsx

import React, {useState} from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';

import ProductHeader from '../components/Product/Header';
import ProductBody from '../components/Product/Body';

const ProductScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', }}>
          <ProductHeader navigation={navigation}/>

          <ProductBody navigation={navigation}/>
        </View>
      </ScrollView>
  );
};

export default ProductScreen;
