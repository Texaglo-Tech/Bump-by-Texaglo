// InviteScreen.tsx

import React, {useState} from 'react';
import { View } from 'react-native';
import { ScrollView} from 'react-native';

import InviteHeader from '../components/Invite/Header';
import InviteBody from '../components/Invite/Body';

const InviteScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', }}>
          <InviteHeader navigation={navigation}/>

          <InviteBody navigation={navigation}/>
        </View>
      </ScrollView>
  );
};

export default InviteScreen;
