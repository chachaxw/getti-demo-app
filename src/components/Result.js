/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Image, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import HighlightText from './HighLight';

type Props = {
  navigation: any;
}

type States = {
  selected: any,
  selectedData: any,
  wordsList: any[],
}
export default class Result extends Component<Props, States> {

  state = {
    wordsList: [],
    selected: null,
    selectedData: null,
  }

  static navigationOptions = {
    title: '扫描结果',
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: '#E1EEFE',
    },
  };

  joinStudy() {
    alert('Join to Study');
  }

  formatData(data: any) {
    const text = data.text;
    const knowledge = data.knowledge;

    const format = knowledge.filter((item: any) => {
      if (item.knowledge && item.knowledge.length) {
        const sentence = text.substring(item.start, item.end);
        item.knowledge.map((d) => {
          d.words = d.indices.map(i => text.substring(i.start, i.start + i.len));
          return d;
        });
        item.sentence = sentence;
        return item;
      }
    });

    return format;
  }

  selectKnowledge(evt: any, selectedData: any, knowledge: any) {
    const { selected } = this.state;

    this.setState({
      selected: null,
      selectedData: null,
    });

    this.setState({
      selected: knowledge,
      selectedData,
    });

    if (selected && knowledge && knowledge.id === selected.id) {
      this.setState({
        selected: null,
        selectedData: null,
      });
    }
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
    const { selectedData, selected } = this.state;
    const params = navigation.state.params ? navigation.state.params : null;

    let wordsList = [], data = {};
    if (params) {
      wordsList = params.words.map(item => ({
        word: item.word,
        chinese: item.chinese,
      }));
      data = this.formatData(params.data);
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.wordsContainer}>
          <View style={styles.head}>
            <Text style={styles.headText}>有{wordsList.length}个单词你可能不认识</Text>
            <TouchableOpacity onPress={() => this.joinStudy()} activeOpacity={0.8} style={styles.button}>
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
        {data && data.length ? 
          data.map((item, index) => {
            return (
              <View key={index} style={{backgroundColor: index % 2 === 0 ? '#C2DCFD' : '#E1EEFE'}}>
                <View style={styles.wordsContainer} shadowColor="#a6a6a6" shadowOpacity={0.2}
                  shadowOffset={{width: 0, height: 2}} shadowRadius={50}>
                  {selectedData && selectedData.start === item.start ? 
                    <HighlightText
                      searchWords={selected.words}
                      textToHighlight={item.sentence}
                      highlightStyle={{color: '#4A4A4A', backgroundColor: '#E9EAA0'}}
                    /> : <Text style={{color: '#4A4A4A'}}>{item.sentence}</Text>
                  }
                </View>
                {item.knowledge && item.knowledge.length > 0 ?
                  item.knowledge.map((d: any, i: number) => {
                    return (
                        <View key={i} style={styles.tipsWrapper}>
                          <Image style={styles.avatar} source={require('../assets/images/logo.png')} />
                          <TouchableOpacity onPress={(evt: any) => this.selectKnowledge(evt, item, d)}
                            activeOpacity={1} style={styles.learnContainer}>
                            <View shadowColor="#a6a6a6" shadowOpacity={0.2} style={Object.assign({}, styles.learn, {
                                backgroundColor: selectedData && selectedData.start === item.start &&
                                  selected && selected.comment === d.comment ? '#F4E62A' : null
                              })}
                              shadowOffset={{width: 0, height: 2}} shadowRadius={50}>
                              <Text>{d.comment} {d.chinese && d.chinese}</Text>
                              <View style={{width: '100%', flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <TouchableOpacity onPress={() => this.goToLearn(d.id)}
                                  activeOpacity={0.8} style={styles.learnButton}>
                                  <Text style={styles.buttonText}>学习该知识点</Text>
                                    <Image style={styles.rightArrow} source={require('../assets/images/arrow_blue.png')}></Image>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                    );
                  }): null
                }
              </View>
            );
          }) : null
        }
        <View style={{paddingBottom: 50}}></View>
      </ScrollView> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1EEFE',
  },
  wordsContainer: {
    width: '100%',
    padding: 12,
    justifyContent: 'flex-start',
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
    backgroundColor: '#fff',
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
    color: '#444',
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
    backgroundColor: '#FFF',
  },
  buttonText: {
    fontSize: 13,
    color: '#4A90E2',
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
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  learnContainer: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#fff',
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomEndRadius: 16,
  },
  learn: {
    flex: 1,
    padding: 12,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomEndRadius: 16,
  },
  learnButton: {
    minWidth: 90,
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
    // backgroundColor: '#1DAFFE',
  },
  rightArrow: {
    width: 17,
    height: 14,
  },
});