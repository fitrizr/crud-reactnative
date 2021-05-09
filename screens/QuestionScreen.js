import React, { Component } from 'react';
import { StyleSheet, Button, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../database/firebaseDb';
import colors from "../styles/Colors";

class QuestionScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('question');
    this.state = {
      isLoading: true,
      userArray: []
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
      const { question, level} = res.data();
      userArray.push({
        key: res.id,
        res,
        question,
        level,
      });
    });
    this.setState({
      userArray,
      isLoading: false,
   });
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
        <View style={{marginVertical: 48}}>
        <Button
            title="Add New Question"
            onPress={() => this.props.navigation.navigate('AddQuestionScreen')}
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
                    </ListItem.Content>
                </ListItem>
              );
            })
          }
      </ScrollView>
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
  }
})

export default QuestionScreen;