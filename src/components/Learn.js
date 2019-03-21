/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, View, Text } from 'react-native';
import Video from 'react-native-video';

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

  static navigationOptions = {
    title: '知识讲解',
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: '#ffffff',
    },
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
          {knowledge && knowledge.video && <Video style={styles.video} controls
            source={{uri: knowledge.video}} muted={false} paused={true} />
          }
          {knowledge && knowledge.words && knowledge.words.length ? 
            knowledge.words.map((item, index) => {
              return (
                <View style={styles.wordInfo} key={index}>
                  <Text style={styles.word}>{item.word}</Text>
                  <Text style={styles.explain}>{item.explain}</Text>
                  {item.example && item.example.length > 0 ?
                    item.example.map(d => (
                      <Text style={styles.example} key={d.id}>
                        {d.content}
                      </Text>
                    )) : null
                  }
                </View>
              );
            }) : null
          }
          {knowledge && knowledge.tips && knowledge.tips.length > 0 ?
            <View style={styles.tipsWrapper}>
              <Text style={styles.tipsTitle}>注意!</Text>
              {knowledge.tips.map(item => (
                  <Text style={styles.tipsContent} key={item.id}>{item.content}</Text>
                ))
              }
            </View> : null
          }
          <View style={styles.relative}>
            <Text style={styles.title}>相关条目: </Text>
            {knowledge && knowledge.relative && knowledge.relative.length > 0 ? 
              knowledge.relative.map(item => (
                <View style={styles.label} key={item.id}>
                  <Text style={styles.labelText}>{item.content}</Text>
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
  video: {
    height: 200,
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
    lineHeight: 24,
    paddingTop: 10,
    paddingBottom: 10,
  },
  example: {
    color: '#0168A4',
    fontSize: 14,
    lineHeight: 22,
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
    lineHeight: 22,
  }
});