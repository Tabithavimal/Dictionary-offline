import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Header } from 'react-native-elements';
import db from './Localdb';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: '',
      word: '',
      definition: '',
      wordSearched: '',
      isButtonPressed: '',
      example: '',
    };
  }

  getWord = (text) => {
    var texts = text.toLowerCase();
    try {
      var word = db[text]['word'];
      var definition = db[text]['definition'];
      var example = db[text]['example'];
      this.setState({
        word: word,
        definition: definition,
        example: example,
      });
    } catch (err) {
      alert('Sorry this word is not available for now');
      this.setState({
        text: '',
        isSearchPressed: false,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'turquoise'}
          centerComponent={{
            text: 'Pocket Dictionary',
            style: {
              color: 'black',
              fontSize: 20,
              fontFamily: 'times new roman',
            },
          }}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({ text: text });
          }}
        />

        <TouchableOpacity
          style={styles.searchbutton}
          onPress={() => {
            this.setState({ word: db[this.state.text].word });
          }}>
          <Text
            style={styles.buttontext}
            onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord(this.state.text);
            }}>
            {' '}
            Search{' '}
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={styles.detailsTitle}> Word :{''} </Text>
          <Text style={{ fontSize: 18 }}> {this.state.word} </Text>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={styles.detailsTitle}> Definition :{''} </Text>
          <Text style={{ fontSize: 18 }}> {this.state.definition} </Text>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={styles.detailsTitle}> Example :{''} </Text>
          <Text style={{ fontSize: 18 }}> {this.state.example} </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  inputBox: {
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 5,
    outline: 'none',
  },

  searchbutton: {
    width: '30%',
    height: 30,
    alignSelf: 'center',
    padding: 20,
    margin: 15,
    borderRadius: 3,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },

  buttontext: {
    height: 70,
    alignSelf: 'center',
    marginTop: -20,
    borderRadius: 6,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 3,
    width: 135,
    fontFamily: 'quicksand',
  },

  detailsTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'orange',
  },
});
