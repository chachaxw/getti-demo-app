/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#FBFBFA',
  },
});

type Props = {}
export default class Result extends Component<Props> {

  static navigationOptions = {
    title: '扫描结果',
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: '#ffffff',
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Scan Result</Text>
      </View> 
    );
  }
}