/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

type Props = {
  navigation: any,
}

type States = {
  text: string,
}

export default class BookNote extends Component<Props, States> {

  state = {
    text: '',
  };

  static navigationOptions = {
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: '#ffffff',
    },
  };

  saveNote() {
    console.log('Save Note');
  }

  render() {

    return (
      <View style={styles.container}>
        <TextInput 
          autoFocus
          multiline={true}
          placeholder="写笔记..."
          style={styles.textInput}
          value={this.state.text}
          onChangeText={(text) => this.setState({text})}
        />
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => this.saveNote()}>
            <Text style={styles.buttonText}>保存笔记</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#F5F5F5',
  },
  textInput: {
    flex: 0.8,
    padding: 16,
    fontSize: 15,
  },
  bottom: {
    height: 50,
    padding: 28,
  },
  button: {
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5AC8FA',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});