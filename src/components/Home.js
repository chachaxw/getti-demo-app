/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView, NavigationActions } from 'react-navigation';

type Props = {
  navigation: any,
}

type States = {
  activeTab: string,
}

export default class Home extends Component<Props, States> {

  state = {
    activeTab: 'coach',
  }

  static navigationOptions = {
    header: null,
  };

  takePicture() {
    this.props.navigation.navigate('Camera');
  }

  goToLearn() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Learn',
      params: {
        id: 100,
      },
    });

    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    const { activeTab } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.tabBar}>
          <View style={Object.assign({}, styles.tabItem, {
              borderBottomColor: activeTab === 'coach' ? '#333' : '#fff'
            })
          }>
            <Image style={styles.tabItemIcon} source={require('../assets/images/user.png')}></Image>
            <Text style={styles.tabItemText}>Coach</Text>
          </View>
          <View style={Object.assign({}, styles.tabItem, {
              borderBottomColor: activeTab === 'discovery' ? '#333' : '#fff'
            })
          }>
            <Image style={styles.tabItemIcon} source={require('../assets/images/discovery.png')}></Image>
            <Text style={styles.tabItemText}>发现</Text>
          </View>
        </View>
        <View style={styles.wrapper}>
          <TouchableOpacity onPress={() => this.takePicture()} activeOpacity={1}>
            <View style={styles.button} shadowColor="#a6a6a6" shadowOpacity={0.5}
              shadowOffset={{width: 0, height: 2}} shadowRadius={50}>
              <Image style={styles.buttonIcon} source={require('../assets/images/camera_icon.png')}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.takePicture()} activeOpacity={1}>
            <View style={styles.button} shadowColor="#a6a6a6" shadowOpacity={0.5}
              shadowOffset={{width: 0, height: 2}} shadowRadius={50}>
              <Image style={styles.buttonIcon} source={require('../assets/images/text_icon.png')}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.takePicture()} activeOpacity={1}>
            <View style={styles.button} shadowColor="#a6a6a6" shadowOpacity={0.5}
              shadowOffset={{width: 0, height: 2}} shadowRadius={50}>
              <Image style={styles.buttonIcon} source={require('../assets/images/book_icon.png')}></Image>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    height: 44,
    paddingLeft: 40,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
  },
  tabItem: {
    paddingBottom: 4,
    borderBottomWidth: 4,
    marginRight: 50,
    alignItems: 'center',
  },
  tabItemText: {
    fontSize: 15,
    color: '#333',
  },
  tabItemIcon: {
    width: 19,
    height: 19,
    marginBottom: 2,
  },
  wrapper: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F5F5F5',
  },
  button: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  buttonIcon: {
    width: 44,
    height: 40,
  },
});