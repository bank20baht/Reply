import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import {SCREEN_NAME} from './constants/screensNames';
import {useTheme} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Home from './screens/Home';
import Login from './screens/Login';
import Option from './screens/Option';
import Profile from './screens/Profile';
import Register from './screens/Register';
import AddPost from './screens/AddPost';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type Props = {};
const TabScreens = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === SCREEN_NAME.HOME_PAGE) {
            iconName = 'home';
          } else if (route.name === SCREEN_NAME.PROFILE_PAGE) {
            iconName = 'smileo';
          } else if (route.name === SCREEN_NAME.OPTION_PAGE) {
            iconName = 'setting';
          } else if (route.name == SCREEN_NAME.ADDPOST_PAGE) {
            iconName = 'plussquare';
          }
          if (!iconName) {
            return null; // or provide a fallback icon or handle the error accordingly
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e0ffff', // Change the active tab color
        tabBarInactiveTintColor: 'black', // Change the inactive tab color
        tabBarStyle: {
          backgroundColor: '#0085ff', // Change the background color of the tab bar
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}>
      <Tab.Screen
        name={SCREEN_NAME.HOME_PAGE}
        component={Home}
        options={{
          title: 'Home',
          headerTitleStyle: {
            color: '#e0ffff',
          },
          headerStyle: {
            backgroundColor: '#0085ff',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.ADDPOST_PAGE}
        component={AddPost}
        options={{
          title: 'Add Post',
          headerTitleStyle: {
            color: '#e0ffff',
          },
          headerStyle: {
            backgroundColor: '#0085ff',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.PROFILE_PAGE}
        component={Profile}
        options={{
          title: 'Profile',
          headerTitleStyle: {
            color: '#e0ffff',
          },
          headerStyle: {
            backgroundColor: '#0085ff',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME.OPTION_PAGE}
        component={Option}
        options={{
          title: 'Setting',
          headerTitleStyle: {
            color: '#e0ffff',
          },
          headerStyle: {
            backgroundColor: '#0085ff',
          },
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
};

const App = (props: Props) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREEN_NAME.LOGIN_PAGE}
          component={Login}
          options={{
            title: 'Login',
            headerTitleStyle: {
              color: '#6EC3FF',
            },
            headerStyle: {
              backgroundColor: '#0085ff',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name={SCREEN_NAME.REGISTER_PAGE}
          component={Register}
          options={{
            title: 'Register',
            headerTitleStyle: {
              color: '#6EC3FF',
            },
            headerStyle: {
              backgroundColor: '#0085ff',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Tabs"
          component={TabScreens}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
