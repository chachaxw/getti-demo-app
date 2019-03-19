/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, View, Text, TouchableOpacity } from 'react-native';


type Props = {
  navigation: any,
}

export default class Home extends Component<Props, States> {

  static navigationOptions = {
    title: 'Getti',
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: '#ffffff',
    },
  };

  takePicture() {
    this.props.navigation.navigate('Camera');
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.cameraTouchable} onPress={() => this.takePicture()} activeOpacity={1}>
          <Image style={styles.camera} source={require('../assets/images/Camera.png')}></Image>
        </TouchableOpacity>
        <View style={styles.button} shadowColor="#a6a6a6" shadowOpacity={0.5}
          shadowOffset={{width: 0, height: 2}} shadowRadius={50}>
          <TouchableOpacity onPress={() => navigation.navigate('Learn')} activeOpacity={1}>
            <ImageBackground style={styles.buttonBG} source={require('../assets/images/Button.png')}>
              <Text style={styles.buttonText}>我的学习</Text>
              <Image style={styles.rightArrow} source={require('../assets/images/RightArrow.png')}></Image>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    backgroundColor: '#F9F9F9',
  },
  cameraTouchable: {
    marginTop: 100,
    backgroundColor: '#FBFBFA',
  },
  camera: {
    width: 128,
    height: 128,
  },
  button: {
    width: '100%',
    position: 'absolute',
    bottom: 40,
  },
  buttonBG: {
    width: 350,
    height: 60,
    color: '#ffffff',
    fontSize: 18,
    paddingLeft: 28,
    paddingRight: 28,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  rightArrow: {
    width: 34,
    height: 17,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  }
});