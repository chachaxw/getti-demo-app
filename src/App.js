/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './components/Home';

const MainNavigator = createStackNavigator({
  Home: { screen: Home },
});

const AppContainer =  createAppContainer(MainNavigator);

type Props = {}
export default class App extends Component<Props> {
  render() {
    return <AppContainer />;
  }
}