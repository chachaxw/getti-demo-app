/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, View, Text } from 'react-native';
import Video, { Container } from 'react-native-af-video-player';
import ImagePicker from 'react-native-image-picker';

import learnMock from '../mock/learn';

type Props = {
  navigation: any,
}

type States = {
  knowledge: any,
}
export default class Result extends Component<Props, States> {

  state = {
    knowledge: {},
  }

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
    const { navigation } = this.props;
    const id = navigation.state.params && navigation.state.params.id ? navigation.state.params.id : 0;
    const knowledge = learnMock[id];
    console.log(knowledge);

    return (
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>{knowledge && knowledge.title}</Text>
          <Container>
            <Video url={require('../assets/video/video.mp4')}
              onFullScreen={status => this.onFullScreen(status)}/>
          </Container>
          {knowledge && knowledge.words && knowledge.words.length ? 
            knowledge.words.map(item => {
              return (
                <View style={styles.wordInfo} key={item.id}>
                  <Text style={styles.word}>{item.word}</Text>
                  <Text style={styles.explain}>{item.explain}</Text>
                  {item.example && item.example.length > 0 ?
                    item.example.map(d => (
                      <Text style={styles.example} key={d.id}>{d.content}</Text>
                    )) : null
                  }
                </View>
              );
            }) : null
          }
          <View style={styles.tipsWrapper}>
            <Text style={styles.tipsTitle}>注意!</Text>
            {knowledge.tips && knowledge.tips.length > 0 ? 
              knowledge.tips.map(item => (
                <Text style={styles.tipsContent} key={item.id}>{item.content}</Text>
              )) : null
            }
          </View>
          <View style={styles.relative}>
            <Text style={styles.title}>相关条目: </Text>
            {knowledge.relative && knowledge.relative.length > 0 ? 
              knowledge.relative.map(item => (
                <View style={styles.label}>
                  <Text key={item.id} style={styles.labelText}>{item.content}</Text>
                </View>
              )) : null
            }
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
  relative: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#8CD1EE',
  },
  label: {
    paddingTop: 5,
    marginRight: 10,
    marginBottom: 10,
    paddingRight: 15,
    paddingBottom: 5,
    paddingLeft: 15,
    borderRadius: 14,
    borderColor: '#eee',
    borderWidth: 1,
  },
  labelText: {
    fontSize: 14,
  },
  wrapper: {
    flex: 1,
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
    borderBottomColor: '#8CD1EE',
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