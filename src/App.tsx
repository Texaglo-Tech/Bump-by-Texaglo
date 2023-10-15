import React, { useEffect } from 'react';
import { HomeScreen, SigninScreen, SurveyScreen, ChatScreen, ChatContactsScreen,SignupScreen, CartScreen, ProfileScreen, ScanScreen, LocalCategoryScreen, InviteScreen, CollectiblesScreen, CategoryScreen, DashboardScreen, ProductScreen } from './screens';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { AccountProvider } from './providers/AccountProvider';
import { MenuProvider } from 'react-native-popup-menu';

import  WalletScreen  from './screens/Wallet';
import { checkAuthentication } from './api';

const Stack = createStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <AlertNotificationRoot>
        <AccountProvider> 
          <MenuProvider>
              <Stack.Navigator>
                <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
                <Stack.Screen name="Signin" options={{ headerShown: false }} component={SigninScreen} />
                <Stack.Screen name="Signup" options={{ headerShown: false }} component={SignupScreen} />
                <Stack.Screen name="Category" options={{ headerShown: false }} component={CategoryScreen} />
                <Stack.Screen name="LocalCategory" options={{ headerShown: false }} component={LocalCategoryScreen} />
                <Stack.Screen name="Collectibles" options={{ headerShown: false }} component={CollectiblesScreen} />
                <Stack.Screen name="Invite" options={{ headerShown: false }} component={InviteScreen} />
                <Stack.Screen name="Profile" options={{ headerShown: false }} component={ProfileScreen} />
                <Stack.Screen name="Survey" options={{ headerShown: false }} component={SurveyScreen} />
                <Stack.Screen name="Dashboard" options={{ headerShown: false }} component={DashboardScreen} />
                <Stack.Screen name="Cart" options={{ headerShown: false }} component={CartScreen} />
                <Stack.Screen name="Scan" options={{ headerShown: false }} component={ScanScreen} />
                <Stack.Screen name="Product" options={{ headerShown: false }} component={ProductScreen} />
                <Stack.Screen name="Chat" options={{ headerShown: false }} component={ChatScreen} />
                <Stack.Screen name="ChatContacts" options={{ headerShown: false }} component={ChatContactsScreen} />
                <Stack.Screen name="Wallet" options={{ headerShown: false }} component={WalletScreen} />
              </Stack.Navigator>
          </MenuProvider>
        </AccountProvider>
      </AlertNotificationRoot>
    </NavigationContainer>
  );
};

export default App;
