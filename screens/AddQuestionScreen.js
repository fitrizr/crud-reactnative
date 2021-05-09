import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebaseDb';

class AddQuestionScreen extends Component{

    constructor() {
    super();
    this.dbRef = firebase.firestore().collection('question');
    this.state = {
      question: '',
      level: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeUser() {
    if(this.state.question === ''){
     alert('Fill at least your Question!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        question: this.state.question,
        level: this.state.level,
      }).then((res) => {
        this.setState({
          question: '',
          level: '',
          isLoading: false,
        });
        this.props.navigation.navigate('QuestionScreen')
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
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Question'}
              value={this.state.question}
              onChangeText={(val) => this.inputValueUpdate(val, 'question')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Level'}
              value={this.state.level}
              onChangeText={(val) => this.inputValueUpdate(val, 'level')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Add Question'
            onPress={() => this.storeUser()} 
            color="#19AC52"
          />
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddQuestionScreen
