/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { isIPhoneX, isIPhoneXR } from '../utils/utils';

type Props = {
  navigation: any,
}

type States = {
  statusList: any[],
  practice: any,
  selectedList: any[],
}

export default class Practice extends Component<Props, States> {

  state = {
    statusList: [{correct: true}, {}, {}],
    practice: {
      type: 'translate',
      title: '翻译此句子',
      sentence: '我们每个人都有一本字典来帮助我们。',
      options: [
        { id: 0, word: 'we', selected: false },
        { id: 1, word: 'dictionary', selected: false },
        { id: 2, word: 'dictionaries', selected: false },
        { id: 3, word: 'help', selected: false },
        { id: 4, word: 'to', selected: false },
        { id: 5, word: 'each', selected: false },
        { id: 6, word: 'have', selected: false },
        { id: 7, word: 'a', selected: false },
        { id: 8, word: 'us', selected: false },
        { id: 9, word: 'every', selected: false },
      ],
    },
    selectedList: [],
  };

  static navigationOptions = {
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: '#ffffff',
    },
    headerLeft: null,
  };

  componentDidMount() {
    const { options } = this.state.practice;
    this.setState({
      selectedList: options.filter(d => d.selected)
    });
  }

  goBack() {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  }

  selectWord(word: any) {
    const { practice, selectedList } = this.state;
    const selected = this.state.selectedList;
    const list = practice.options.map(item => {
      if (item.id === word.id) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return item;
    });

    if (!word.selected) {
      selected.push({ ...word, selected: true });
      this.setState({
        selectedList: selected,
      });
    } else {
      this.setState({
        selectedList: selectedList.filter(d => d.id !== word.id),
      });
    }

    this.setState({
      practice: {
        ...practice,
        options: list,
      }
    });
  }

  submit() {
    alert('Submit');
  }

  renderTranslate(props: any) {
    const { selectedList } = this.state;

    return (
      <View style={styles.content}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.sentence}>{props.sentence}</Text>
        <View style={styles.answerWrap}>
          <View style={styles.line}>
            {selectedList.length ? selectedList.map((item: any) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.7}
                  style={styles.wordLabel}
                  onPress={() => this.selectWord(item)}
                >
                  <Text style={styles.word}>{item.word}</Text>
                </TouchableOpacity>
              )
            }) : null}
          </View>
        </View>
        <View style={styles.options}>
          {props.options && props.options.length > 0 ?
            props.options.map((item: any) => {
              if (item.selected) {
                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={1}
                    style={Object.assign({}, styles.wordLabel, {backgroundColor: '#E9E9E9', borderWidth: 0})}
                  >
                    <Text style={Object.assign({}, styles.word, {color: 'rgba(0,0,0,0)'})}>{item.word}</Text>
                  </TouchableOpacity>
                );
              }

              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.7}
                  style={styles.wordLabel}
                  onPress={() => this.selectWord(item)}
                >
                  <Text style={styles.word}>{item.word}</Text>
                </TouchableOpacity>
              );
            }) : null
          }
        </View>
      </View>
    );
  }

  renderSelect(props) {

  }

  renderFinished() {
    return (
      <View style={Object.assign({}, styles.content, {alignItems: 'center'})}>
        <Image source={require('../assets/images/finished.png')} style={{width: 322, height: 316}} />
        <Text style={styles.finishedText}>你已经掌握高考中的同位语</Text>
      </View>
    );
  }

  render() {
    const { statusList, practice } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity  style={styles.closeButton} onPress={() => this.goBack()}>
            <Image style={styles.closeButton} source={require('../assets/images/close.png')}></Image>
          </TouchableOpacity>
          <View style={styles.statusWrapper}>
            {statusList.map((item: any, i: number) => {
              if (item && item.correct) {
                return (
                  <View style={Object.assign({}, styles.status, {backgroundColor: '#24D17E'})} key={i}>
                    <Image style={{width: 15, height: 11}} source={require('../assets/images/correct.png')}/>
                  </View>
                );
              }
              return (
                <View style={styles.status} key={i}>
                  <Image style={{width: 15, height: 11}} source={require('../assets/images/correct.png')}/>
                </View>
              );
            })}
          </View>
        </View>
        {this.renderFinished()}
        <View style={Object.assign({}, styles.answerStatus, {
          backgroundColor: '#D4F5FF'
        })}>
          <Text style={styles.rightText}>正确</Text>
        </View>
        <View>
          <TouchableOpacity style={Object.assign({}, styles.button, {
              height: (isIPhoneX() || isIPhoneXR()) ? 80 : 50,
              alignItems: (isIPhoneX() || isIPhoneXR()) ? 'flex-start' : 'center',
            })}
            activeOpacity={0.8} onPress={() => this.submit()}>
            <Text style={styles.buttonText}>保存笔记</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    width: 22,
    height: 22,
  },
  statusWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  status: {
    width: 30,
    height: 30,
    marginLeft: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7E7E7',
  },
  content: {
    padding: 15,
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  sentence: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 22,
    marginTop: 12,
  },
  answerWrap: {
    marginTop: 10,
  },
  line: {
    minHeight: 56,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
  },
  options: {
    marginTop: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  word: {
    fontSize: 18,
    color: '#333',
  },
  wordLabel: {
    margin: 6,
    padding: 8,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#D8D8D8',
    backgroundColor: '#FFF',
  },
  answerStatus: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 25,
    paddingRight: 25,
  },
  rightText: {
    color: '#1289B7',
    fontSize: 20,
    fontWeight: 'bold',
  },
  wrongText: {
    color: '#EA3334',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightAnswer: {
    color: '#EA2C2B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#5AC8FA',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  finishedText: {
    fontSize: 18,
    color: '#666666',
    marginTop: 30,
  }
});