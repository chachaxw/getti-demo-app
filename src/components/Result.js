/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Image, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

type Props = {
  navigation: any;
}

type States = {
  wordsList: any[],
}
export default class Result extends Component<Props, States> {

  state = {
    wordsList: [],
  }

  static navigationOptions = {
    title: '扫描结果',
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: '#ffffff',
    },
  };

  joinStudy() {
    alert('Join to Study');
  }



  goToLearn(id: number) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Learn',
      params: {
        id,
      },
    });

    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    const { navigation } = this.props;
    const params = navigation.state.params ? navigation.state.params : null;

    let wordsList = [], data = {};
    if (params) {
      wordsList = params.words.map(item => ({
        word: item.word,
        chinese: item.chinese,
      }));
      data = params.data;
    }

    console.log(wordsList, data);

    return (
      <ScrollView style={styles.container}>
        <View style={styles.wordsContainer} shadowColor="#a6a6a6" shadowOpacity={0.2}
          shadowOffset={{width: 0, height: 2}} shadowRadius={50}>
          <View style={styles.head}>
            <Text style={styles.headText}>有{wordsList.length}个单词你可能不认识</Text>
            <TouchableOpacity style={styles.button} onPress={() => this.joinStudy()} activeOpacity={0.8}>
              <Text style={styles.buttonText}>加入学习</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.wordsList}>
            {wordsList && wordsList.length > 0 ? wordsList.map((item, index) => (
              <View style={styles.wordLabel} key={index}>
                <Text>{`${item.word}  ${item.chinese}`}</Text>
              </View>
            )) : null}
          </View>
        </View>
        {/* <View style={styles.wordsContainer} shadowColor="#a6a6a6" shadowOpacity={0.2}
          shadowOffset={{width: 0, height: 2}} shadowRadius={50}>
          <Text style={styles.headText}>
            If every distraction took 1 minute, that should add up to 2.5 hours of unfruitful time.
          </Text>
        </View> */}
        {knowledge && knowledge.length > 0 ? 
          knowledge.map((item: any, index: number) => {
            return (
              <View style={styles.tipsWrapper}>
                <Image style={styles.avatar} source={require('../assets/images/Camera.png')} />
                <View style={styles.learnContainer} shadowColor="#a6a6a6" shadowOpacity={0.2}
                  shadowOffset={{width: 0, height: 2}} shadowRadius={50}>
                  <Text>{item.comment}</Text>
                  <TouchableOpacity style={styles.learnButton} onPress={() => this.goToLearn(item.id)} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>学习该知识点</Text>
                    <Image style={styles.rightArrow} source={require('../assets/images/Arrow.png')}></Image>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }): null
        }
      </ScrollView> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#F9F9F9',
  },
  wordsContainer: {
    width: '100%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
  },
  wordsList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wordLabel: {
    paddingTop: 2,
    paddingRight: 12,
    paddingBottom: 2,
    paddingLeft: 12,
    marginRight: 10,
    marginBottom: 6,
    color: '#767070',
    borderRadius: 4,
    backgroundColor: '#f2f2f2',
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  headText: {
    fontSize: 15,
    color: '#303032',
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  button: {
    display: 'flex',
    borderRadius: 14,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#1DAFFE',
  },
  buttonText: {
    fontSize: 13,
    color: '#fff',
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  tipsWrapper: {
    width: '100%',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  learnContainer: {
    flex: 1,
    padding: 12,
    marginLeft: 10,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomEndRadius: 12,
    backgroundColor: '#ffffff',
  },
  learnButton: {
    maxWidth: 140,
    display: 'flex',
    borderRadius: 14,
    paddingTop: 5,
    paddingLeft: 14,
    paddingBottom: 5,
    paddingRight: 14,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1DAFFE',
  },
  rightArrow: {
    width: 17,
    height: 14,
  },
});