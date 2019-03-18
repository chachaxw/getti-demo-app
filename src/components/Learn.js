/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, View, Text, TouchableOpacity } from 'react-native';
import Video from 'react-native-af-video-player'

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
    paddingTop: 12,
    paddingBottom: 12,
  },
  explain: {
    color: '#075C7E',
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 12,
    paddingBottom: 12,
  },
  example: {
    color: '#0168A4',
    fontSize: 14,
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
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>instead 和 instead of 有什么区别？</Text>
          <Video url={require('../assets/video/video.mp4')} />
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
        </View>
      </ScrollView>
    )
  }
}