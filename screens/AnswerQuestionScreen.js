import React, { Component } from 'react';
import { StyleSheet, Button, TextInput, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../database/firebaseDb';
import colors from "../styles/Colors";

class AnswerQuestionScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('question');
    this.dbRef = firebase.firestore().collection('answer');
    this.state = {
      isLoading: true,
      userArray: [],
      answer: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArray = [];
    querySnapshot.forEach((res) => {
      const { id, question, level} = res.data();
      userArray.push({
        key: res.id,
        res,
        id,
        question,
        level,
      });
    });
    this.setState({
      userArray,
      isLoading: false,
   });
  }
     
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
    
  storeUser() {
    if(this.state.answer === ''){
     alert('Fill your answerr!!!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        answer: this.state.answer,
      }).then((res) => {
        this.setState({
          answer: '',
          isLoading: false,
        });
        this.props.navigation.navigate('AnswerQuestionScreen')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View>
        
        <View style={styles.container}>
        <Text style={styles.paragraph}>
          Change code in the editor and watch it change on your phone!
          Save to get a shareable url. You get a new url each time you save.
        </Text>

        <ListItem
          title="ListItem with Placeholder"
          textInput={true}
          textInputStyle={{ backgroundColor: '#fff', marginLeft: 30 }}
        />
        </View>
        
      <ScrollView style={styles.container}>
          {
            this.state.userArray.map((item, i) => {
              return (
                <ListItem 
                    key={i} 
                    chevron 
                    bottomDivider
                    onPress={() => {
                        this.props.navigation.navigate('', {
                        userkey: item.key
                        });
                    }}>
                    <ListItem.Content>
                        <ListItem.Title>Question: {item.question}</ListItem.Title>
                        <ListItem.Subtitle>Level Question: {item.level}</ListItem.Subtitle>
                        <View style={styles.inputGroup}>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            placeholder={'Your Answer'}
                            value={this.state.answer}
                            onChangeText={(val) => this.inputValueUpdate(val, 'answer')}
                        />
                        </View>
                    </ListItem.Content>

                </ListItem>
              );
            })
          }
      </ScrollView>
      
        <View style={{marginVertical: 48}}>
        <Button
            title="Submit"
            onPress={() => this.storeUser()} 
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
    },
  add:{
    color: colors.blue,
    fontWeight: "500",
    fontSize: 14,
    marginTop: 8
    },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
})

export default AnswerQuestionScreen;