/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Video from 'react-native-video';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView, NavigationActions } from 'react-navigation';

import learnMock from '../mock/learn';
import { isIPhoneX, isIPhoneXR } from '../utils/utils';

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
    headerBackTitle: '返回',
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: '#ffffff',
    },
  }

  startToLearn() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Practice',
      params: {},
    });

    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    const { navigation } = this.props;
    const id = navigation.state.params && navigation.state.params.id ? navigation.state.params.id : 0;
    const knowledge = learnMock[id];

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.wrapper}>
          <Text style={styles.title}>{knowledge && knowledge.title}</Text>
          {knowledge && knowledge.video && <Video style={styles.video} controls
            source={{uri: knowledge.video}} muted={false} paused={true} />
          }
          {knowledge && knowledge.words && knowledge.words.length ? 
            knowledge.words.map((item, index) => {
              return (
                <View style={styles.wordInfo} key={index}>
                  {item.word ? <View style={styles.highLightWord}>
                    <Text style={styles.highLight}>{item.word}</Text>
                    <Text style={styles.word}>{item.word}</Text>
                  </View> : null}
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
            <View style={styles.labelWrapper}>
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
        <View style={Object.assign({}, styles.bottomWrapper, {
          paddingBottom: (isIPhoneX() || isIPhoneXR()) ? 0 : 12,
        })}>
          <TouchableOpacity style={styles.bottomButton}
            onPress={() => this.startToLearn()} activeOpacity={0.8}>
            <Text style={styles.bottomButtonText}>开始学习</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  wrapper: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  relative: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#8CD1EE',
  },
  video: {
    height: 200,
  },
  labelWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  highLightWord: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  highLight: {
    position: 'absolute',
    height: 20,
    top: 12,
    left: 30,
    borderRightWidth: 12,
    borderRightColor: '#F8E71C',
    color: 'rgba(0,0,0,0)',
    backgroundColor: '#F8E71C',
  },
  word: {
    position: 'relative',
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
    lineHeight: 18,
    paddingTop: 5,
    paddingBottom: 5,
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
  },
  bottomWrapper: {
    marginTop: 20,
    paddingLeft: 28,
    paddingRight: 28,
  },
  bottomButton: {
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC249',
  },
  bottomButtonText: {
    fontSize: 20,
    color: '#333',
  }
});