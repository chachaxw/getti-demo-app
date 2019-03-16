/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Button, Image, ImageBackground, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#FBFBFA',
  },
  camera: {
    width: 206,
    height: 206,
    marginTop: 100,
  },
  button: {
    width: 375,
    height: 140,
    color: '#ffffff',
    fontSize: 18,
    paddingLeft: 28,
    paddingRight: 28,
    borderRadius: 12,
    position: 'absolute',
    bottom: 20,
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
  },
});

type Props = {
  navigation: any,
}
export default class Home extends Component<Props> {

  static navigationOptions = {
    title: 'Getti',
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: '#ffffff',
    },
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Image style={styles.camera} source={require('../assets/images/Camera.png')}></Image>
        <Button onPress={() => navigation.navigate('Result')}>
          <ImageBackground style={styles.button} source={require('../assets/images/Button.png')}>
            <Text style={styles.buttonText}>我的学习</Text>
            <Image style={styles.rightArrow} source={require('../assets/images/RightArrow.png')}></Image>
          </ImageBackground>
        </Button>
      </View> 
    );
  }
}