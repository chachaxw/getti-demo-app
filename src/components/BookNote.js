/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Text, TextInput, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import AxiosInstance from '../api/AxiosInstance';
import ApiUrl from '../api/config';

type Props = {
  navigation: any,
}

type States = {
  text: string,
  loading: boolean,
}

export default class BookNote extends Component<Props, States> {

  state = {
    text: '',
    loading: false,
  };

  static navigationOptions = ({ navigation }: any) => {
    return {
      title: '输入文本',
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: '#ffffff',
      },
      headerBackTitle: '返回',
    };
  };

  async saveNote() {
    this.setState({ loading: true });
    const { text } = this.state;

    const form = new FormData();
    const configs = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    form.append('text', text);

    try {
      const [res1, res2] = await new Promise.all([
        AxiosInstance.post(ApiUrl.knowledge, form, configs),
        AxiosInstance.post(ApiUrl.ocr, form, configs),
      ]);
      this.setState({ loading: false });

      const navigateAction = NavigationActions.navigate({
        routeName: 'Result',
        params: {
          words: res2.data.words,
          data: res1.data,
        },
      });
      this.props.navigation.dispatch(navigateAction);
    } catch (error) {
      this.setState({ loading: false });
      alert('提交失败');
    }
  }

  render() {

    return (
      <KeyboardAvoidingView style={styles.container} enabled behavior="padding">
        <Spinner visible={this.state.loading} />
        <TextInput
          autoFocus
          multiline={true}
          placeholder="请输入..."
          style={styles.textInput}
          value={this.state.text}
          onChangeText={(text) => this.setState({text})}
        />
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => this.saveNote()}>
            <Text style={styles.buttonText}>提交</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#F5F5F5',
  },
  textInput: {
    flex: 0.8,
    padding: 16,
    fontSize: 15,
  },
  bottom: {
    height: 44,
    paddingLeft: 28,
    paddingRight: 28,
    marginBottom: 20,
  },
  button: {
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5AC8FA',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});