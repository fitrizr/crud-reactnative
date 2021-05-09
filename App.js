import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from './database/firebaseDb';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

import AddUserScreen from './screens/AddUserScreen'
import UserScreen from './screens/UserScreen'
import UserDetailScreen from './screens/UserDetailScreen'
import AddQuestionScreen from './screens/AddQuestionScreen'
import QuestionScreen from './screens/QuestionScreen'
import AnswerQuestionScreen from './screens/AnswerQuestionScreen'

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'
// import CommentScreen from './components/main/Comment'

const Stack = createStackNavigator();
export class App extends Component {
  constructor(props) {
    super()
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {

    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!loggedIn) {
    return (
      <NavigationContainer>
        <MyStack2 />
      </NavigationContainer>
    );
    }

    return (
      // <Provider store={store}>
      // <NavigationContainer>
      //   {/* <MyStack1 /> */}
      //   <MyStack3 />
      // </NavigationContainer>
      // </Provider>

      <Provider store={store}>
        <NavigationContainer >
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
            {/* <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation}/> */}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    ); 
  }
}

export default App

function MyStack1() {
  return (
    <Stack.Navigator
      screenOptions={{
          headerStyle: {
            backgroundColor: '#621FF7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      }}>
      
      <Stack.Screen 
        name="AnswerQuestionScreen" 
        component={AnswerQuestionScreen} 
        options={{ title: 'Answer Question' }}
      />   
       <Stack.Screen 
        name="QuestionScreen" 
        component={QuestionScreen} 
        options={{ title: 'Question List' }}
      />      
      <Stack.Screen 
        name="AddQuestionScreen" 
        component={AddQuestionScreen} 
        options={{ title: 'Add Question' }}
      />
      <Stack.Screen 
        name="UserScreen" 
        component={UserScreen} 
        options={{ title: 'Users List' }}
      /> 
      <Stack.Screen 
        name="AddUserScreen" 
        component={AddUserScreen} 
        options={{ title: 'Add User' }}
      />
      <Stack.Screen 
       name="UserDetailScreen" 
       component={UserDetailScreen} 
       options={{ title: 'User Detail' }}
      />
    </Stack.Navigator>
  );
}

function MyStack2() {
  return (
    <Stack.Navigator
      screenOptions={{
          headerStyle: {
            backgroundColor: '#621FF7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      }}>
      
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />      
    </Stack.Navigator>

  );
}

function MyStack3() {
  return (
    <Stack.Navigator
      screenOptions={{
          headerStyle: {
            backgroundColor: '#621FF7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      }}>
      
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
      {/* <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/> */}
      {/* <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation}/>       */}
    </Stack.Navigator>

  );
}

const styles = StyleSheet.create({

});

// export default function App() {

//   return (
//     <NavigationContainer>
//       <MyStack />
//     </NavigationContainer>
//   );
// }


