/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { isIPhoneX, isIPhoneXR, isRightAnswer } from '../utils/utils';
import mockPractice from '../mock/practice';

type Props = {
  navigation: any,
}

type States = {
  active: any,
  activeIndex: number,
  statusList: any[],
  practice: any[],
  selectedList: any[],
  selectedOption: any,
  selectedGrammar: any[],
}

export default class Practice extends Component<Props, States> {

  state = {
    activeIndex: 0,
    active: mockPractice[0],
    statusList: [{}, {}, {}],
    practice: mockPractice,
    selectedList: [],
    selectedGrammar: [],
    selectedOption: null,
  };

  static navigationOptions = {
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: '#ffffff',
    },
    headerLeft: null,
  };

  componentDidMount() {
    const { active } = this.state;

    if (active.type === 'translate' && active.options) {
      this.setState({
        selectedList: active.options.filter(d => d.selected)
      });
    }
  }

  goBack() {
    this.setState({
      activeIndex: 0,
      active: mockPractice[0],
      statusList: [{}, {}, {}],
      practice: mockPractice,
      selectedList: [],
      selectedGrammar: [],
      selectedOption: null,
    });

    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  }

  selectWord(word: any) {
    const { active, selectedList } = this.state;
    const selected = this.state.selectedList;
    const list = active.options.map(item => {
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
      active: {
        ...active,
        options: list,
      }
    });
  }

  selectOption(option: any) {
    this.setState({ selectedOption: option });
  }

  selectGrammar(word: any) {
    const { active } = this.state;

    const list = active.sentence.map(item => {
      if (item.id === word.id) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return item;
    });

    this.setState({
      active: {
        ...active,
        sentence: list,
      },
      selectedGrammar: list.filter(d => !d.selected),
    });
  }

  nextPractice() {
    let { activeIndex, active, practice } = this.state;
    activeIndex++;

    if (activeIndex < practice.length) {
      active = practice[activeIndex];
    } else {
      active = null;
    }

    this.setState({ active, activeIndex });
  }

  submit() {
    let isRight;
    let statusList = this.state.statusList;
    let active = this.state.active;
    const { selectedList, selectedOption, selectedGrammar } = this.state;

    const answer = active.answer;

    if (active.type === 'translate') {
      isRight = statusList[0].status = selectedList.length && isRightAnswer(selectedList, answer) ? 'right' : 'wrong';
    } else if (active.type === 'grammar') {
      isRight = statusList[1].status = selectedGrammar.length && isRightAnswer(selectedGrammar, answer) ? 'right' : 'wrong';
    } else if (active.type === 'select') {
      isRight = statusList[2].status = selectedOption && (answer.id === selectedOption.id) ? 'right' : 'wrong';
    }

    active.status = isRight;

    this.setState({ statusList, active });
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

  renderGrammar(props: any) {
    return (
      <View style={styles.content}>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.grammarWrapper}>
          {props.sentence && props.sentence.length > 0 ?
            props.sentence.map((item: any) => {
              return (
                <TouchableOpacity key={item.id} activeOpacity={0.8} onPress={() => this.selectGrammar(item)}>
                  <Text style={Object.assign({}, styles.grammarWord, {
                    backgroundColor: item.selected ? '#C2E3FF' : '#FFF'
                  })}>
                    {item.word}
                  </Text>
                  <View style={Object.assign({}, styles.grammarWord, {
                    borderBottomColor: item.selected ? '#FFF' : '#D8D8D8'
                  })} />
                </TouchableOpacity>
              );
            }) : null
          }
        </View>
      </View>
    );
  }

  renderSelect(props: any) {
    const { selectedOption } = this.state;

    return (
      <View style={styles.content}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.sentence}>{props.sentence}</Text>
        <View style={styles.optionsList}>
          {props.options && props.options.length ?
            props.options.map((item) => {
              if (selectedOption && item.id === selectedOption.id) {
                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={1}
                    style={Object.assign({}, styles.optionWraper, {
                      borderWidth: 0,
                      backgroundColor: '#C2E3FF',
                    })}
                    onPress={() => this.selectOption(item)}>
                    <Text style={styles.optionText}>{item.word}</Text>
                  </TouchableOpacity>
                );
              }

              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={1}
                  style={styles.optionWraper}
                  onPress={() => this.selectOption(item)}>
                  <Text style={styles.optionText}>{item.word}</Text>
                </TouchableOpacity>
              );
            }) : null
          }
        </View>
      </View>
    );
  }

  renderFinished() {
    return (
      <View style={Object.assign({}, styles.content, {alignItems: 'center'})}>
        <Image source={require('../assets/images/finished.png')} style={{width: 322, height: 316}} />
        <Text style={styles.finishedText}>你已经掌握高考中的同位语</Text>
      </View>
    );
  }

  renderAnswerStatus(props: any) {
    alert(props.status);
    if (!(props && props.status)) {
      return;
    }

    if (props.status === 'right') {
      return (
        <View style={Object.assign({}, styles.answerStatus, {
          backgroundColor: '#D4F5FF'
        })}>
          <Text style={styles.rightText}>正确</Text>
        </View>
      );
    } else if (props.status === 'wrong') {
      return (
        <View style={Object.assign({}, styles.answerStatus, {
          backgroundColor: '#FFC1C1'
        })}>
          <Text style={styles.wrongText}>错误</Text>
          <Text>{props.answerStr}</Text>
        </View>
      );
    }

    return null;
  }

  render() {
    const { statusList, active, activeIndex, practice } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={() => this.goBack()}>
            <Image style={styles.closeButton} source={require('../assets/images/back_icon.png')}></Image>
            <Text style={{marginLeft: 5, color: '#999'}}>返回学习</Text>
          </TouchableOpacity>
          <View style={styles.statusWrapper}>
            {statusList.map((item: any, i: number) => {
              if (item && item.status === 'right') {
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
        {practice && practice.length ? 
          practice.map((item) => {
            if (!active || item.type !== active.type) {
              return null;
            }

            if (item.type === 'translate') {
              return this.renderTranslate(active);
            } else if (item.type === 'select') {
              return this.renderSelect(active);
            } else if (item.type === 'grammar') {
              return this.renderGrammar(active);
            }
          }) : null
        }
        {!active && this.renderFinished()}
        <View>
          {active ? this.renderAnswerStatus(active) : null}
          {active && (statusList[activeIndex].status ? 
            <TouchableOpacity style={Object.assign({}, styles.button, {
                height: (isIPhoneX() || isIPhoneXR()) ? 80 : 50,
                alignItems: (isIPhoneX() || isIPhoneXR()) ? 'flex-start' : 'center',
                backgroundColor: statusList[activeIndex].status === 'right' ? '#8FD2EC' : '#FE4C4A'
              })}
              activeOpacity={0.8} onPress={() => this.nextPractice()}>
                <Text style={styles.buttonText}>继续</Text>
            </TouchableOpacity> :
            <TouchableOpacity style={Object.assign({}, styles.button, {
              height: (isIPhoneX() || isIPhoneXR()) ? 80 : 50,
              alignItems: (isIPhoneX() || isIPhoneXR()) ? 'flex-start' : 'center',
            })}
            activeOpacity={0.8} onPress={() => this.submit()}>
              <Text style={styles.buttonText}>提交</Text>
            </TouchableOpacity>)
          }
          {!active && <TouchableOpacity style={Object.assign({}, styles.button, {
              height: (isIPhoneX() || isIPhoneXR()) ? 80 : 50,
              alignItems: (isIPhoneX() || isIPhoneXR()) ? 'flex-start' : 'center',
            })}
            activeOpacity={0.8} onPress={() => this.goBack()}>
              <Text style={styles.buttonText}>练习更高等级的同位语</Text>
            </TouchableOpacity>
          }
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
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 5,
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
  },
  optionsList: {
    marginTop: 42,
    alignItems: 'center',
  },
  optionWraper: {
    width: 200,
    height: 46,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#999999',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  grammarWrapper: {
    marginTop: 50,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  grammarWord: {
    fontSize: 16,
    color: '#333333',
    marginRight: 5,
    paddingBottom: 2,
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
  }
});