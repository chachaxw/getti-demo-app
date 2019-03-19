/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import Video, { ScrollView, Container } from 'react-native-af-video-player'

type Props = {
  navigation: any,
}
export default class Result extends Component<Props> {
  static navigationOptions = ({ navigation }: any) => {
    const { state } = navigation;
    // Setup the header and tabBarVisible status
    const header = state.params && (state.params.fullscreen ? undefined : null);
    const tabBarVisible = state.params ? state.params.fullscreen : true;

    return {
      title: '知识讲解',
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: '#ffffff',
      },
      // For stack navigators, you can hide the header bar like so
      header,
      // For the tab navigators, you can hide the tab bar like so
      tabBarVisible,
    };
  }

  onFullScreen(status: any) {
    // Set the params to pass in fullscreen status to navigationOptions
    this.props.navigation.setParams({
      fullscreen: !status
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>instead 和 instead of 有什么区别？</Text>
          <Container>
            <Video url={require('../assets/video/video.mp4')}
              onFullScreen={status => this.onFullScreen(status)}/>
          </Container>
          <View style={styles.wordInfo}>
            <Text style={styles.word}>“instead”</Text>
            <Text style={styles.explain}>instead 是一个副词。当我们说一个人做了一件事情而不是另一件事情的时候，我们就用 instead</Text>
            <Text style={styles.example}>
              Hema did not answer. Instead she looked out of the taxi window. 赫玛没有回答。相反，她望向了出租车窗外。
            </Text>
            <Text style={styles.example}>
              I felt like crying, but I managed to smile instead. 我想哭，但我还是尽量笑了。
            </Text>
          </View>
          <View style={styles.wordInfo}>
            <Text style={styles.word}>“instead of”</Text>
            <Text style={styles.explain}>
              instead of 是一个介词，强调对其宾语的否定。通常用于引出一件不被做，或不被使用，或并非真实的事情
            </Text>
            <Text style={styles.example}>
              Why not use your bike to get to work instead of your car? 比起开车，为什么不骑你的自行车去上班呢？
            </Text>
            <Text style={styles.example}>
              You can have rice instead of potatoes. 你可以吃米饭而不是土豆
            </Text>
            <Text style={styles.example}>
              我们可以说某人 does something instead of doing something else
            </Text>
            <Text style={styles.example}>
              You could always go camping instead of staying in a hotel. 你可以去野营而不是住旅馆。
            </Text>
            <Text style={styles.example}>
              Why don’t you help, instead of standing there and watching. 你为什么站在那里看着，而不帮忙呢？
            </Text>
          </View>
          <View style={styles.tipsWrapper}>
            <Text style={styles.tipsTitle}>注意!</Text>
            <Text style={styles.tipsContent}>不要说某人 does something instead to do something else</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    backgroundColor: '#F5F5F5',
  },
  wrapper: {
    width: '100%',
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 19,
    color: '#05384D',
    fontWeight: 'bold',
    paddingTop: 12,
    paddingBottom: 12,
  },
  wordInfo: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  word: {
    color: '#05384D',
    fontWeight: 'bold',
    fontSize: 17,
    paddingTop: 16,
    paddingBottom: 5,
  },
  explain: {
    color: '#075C7E',
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  example: {
    color: '#0168A4',
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
  },
  tipsWrapper: {
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    backgroundColor: '#76ABD3',
  },
  tipsTitle: {
    fontSize: 17,
    color: '#fff',
    marginBottom: 12,
  },
  tipsContent: {
    fontSize: 14,
    color: '#fff',
  }
});