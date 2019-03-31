/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

type Props = {
  navigation: any,
}

type States = {

}

export default class Practice extends Component<Props> {

  static navigationOptions = {
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: '#ffffff',
    },
    headerLeft: null,
  };

  render() {

    return (
      <View style={styles.container}>
        <Text>Practice</Text>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});