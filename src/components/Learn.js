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
    alignItems: "center",
    backgroundColor: '#F9F9F9',
  },
  wrapper: {
    width: '100%',
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 19,
    color: '#05384D',
    paddingTop: 12,
    paddingBottom: 12,
  }
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
        <View style={styles.wrapper}>
          <Text style={styles.title}>instead 和 instead of 有什么区别？</Text>
        </View>
      </View>
    )
  }
}