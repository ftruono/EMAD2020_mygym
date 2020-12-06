import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, StackActions } from '@react-navigation/native';

import DrawerNavigator from './app/config/AppNavigator';
import { AuthContext } from './app/config/AutenticationConfig';
import { Tabs } from './app/screens/HomeTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseAutentication, Firestore } from './app/config/FirebaseConfig';
import SplashScreen from './app/screens/SplashScreen';





const Stack = createStackNavigator();


export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignIn: true,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignIn: false,
            userToken: null,
            errorCode:null,
          };
      }
    },
    {
      isLoading: true,
      isSignIn: false,
      userToken: null,
    }
  );

  React.useEffect(() => {

    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);





  const authContext = React.useMemo(
    () => ({

      signIn: async data => {


        try {
          const response = await FirebaseAutentication.signInWithEmailAndPassword(data.username, data.password);
          console.log("Collegato" + response.user.uid);
          const user = (await Firestore.collection('UTENTI').doc(response.user.uid).get()).data();

          dispatch({ type: 'SIGN_IN', token: {type: user.type,id: response.user.id} })
        } catch (error) {
         
        }

      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },

    }),
    []
  );
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {
            state.isLoading ? (
              <Stack.Screen name="Splash" component={SplashScreen} />
            ) : state.userToken == null ? (
              <Stack.Screen name="Home"
                component={Tabs}
                options={
                  {
                    headerTintColor: '#ff6c16',
                    headerStyle: { backgroundColor: '#ff6c16' },
                    title: 'My Pocket Gym',
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push'
                  }
                }

              />

            ) : (
                  <Stack.Screen name="Menu"
                    component={DrawerNavigator}
                    options={{ headerShown: false }}
                    initialParams={{ user: state.userToken }} ></Stack.Screen>

                )

          }

        </Stack.Navigator>
      </NavigationContainer >
    </AuthContext.Provider>
  )
};

