/**
 * @format
 * @flow
 */

import axios from 'axios';
import React, { Component } from 'react';
import { StyleSheet, Image, Button, View, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { NavigationActions } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import apiUrl, { auth } from '../api/config';

type Props = {
  navigation: any,
}

type States = {
  uri: string | null,
  loading: boolean,
}
export default class Camera extends Component<Props, States> {
  camera: any = {};

  state = {
    uri: null,
    loading: false,
  };

  static navigationOptions = {
    header: null,
  };

  //拍摄照片
  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.7, base64: true };
      const data = await this.camera.takePictureAsync(options);

      if (data && data.uri) {
        this.setState({ uri: data.uri });
      }
    }
  }

  async scanPhoto(file: string) {
    const form = new FormData();
    const configs = {
      headers: {
        'Authorization': auth,
        'Content-Type': 'multipart/form-data'
      }
    };
    form.append('content', file);

    console.log('form', form);
    axios.post(apiUrl.knowledge, form, configs).then(res => {
      console.log('response', res);
      if(res) {
        const navigateAction = NavigationActions.navigate({
          routeName: 'Result',
          params: {},
        });
        this.props.navigation.dispatch(navigateAction);
      }
      this.setState({ loading: false });
    }).catch((err: Error) => {
      console.log('Error', err);
      this.setState({ loading: false });
      alert('扫描失败');
    })
  }

  async handleOk() {
    this.setState({ loading: true });

    if (this.state.uri) {
      await this.scanPhoto(this.state.uri);
    }
  }

  handleCancel() {
    this.setState({ uri: null });
  }

  render() {
    const { uri } = this.state;

    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.loading}
          textContent={'识别中...'}
          textStyle={styles.spinnerTextStyle}
        />
        {!uri ? 
          <RNCamera
            style={styles.camera}
            ref={(ref) => {
              this.camera = ref;
            }}
            type={RNCamera.Constants.Type.back}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}>
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                <Image style={styles.icon} source={require('../assets/images/Camera.png')}></Image>
              </TouchableOpacity>
            </View>
          </RNCamera> : 
          <View style={styles.preview}>
            <Image source={{ uri }} style={styles.preview} />
            <Button style={styles.button} title="使用" onPress={() => this.handleOk()} />
            <Button style={styles.button} color="#999" title="取消" onPress={() => this.handleCancel()} />
          </View>
        }
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    minHeight: 44,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    height: 60,
    width: 60,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    alignSelf: 'center',
  },
  icon: {
    width: 60,
    height: 60,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});