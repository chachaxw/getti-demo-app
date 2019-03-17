/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: "center",
    backgroundColor: '#F9F9F9',
  },
});

type Props = {}
export default class Result extends Component<Props> {
  static navigationOptions = {
    title: '知识讲解',
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: '#ffffff',
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Learn Screen</Text>
      </View>
    )
  }
}