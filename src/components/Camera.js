/**
 * @format
 * @flow
 */

import axios from 'axios';
import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Spinner from 'react-native-loading-spinner-overlay';
import apiUrl from '../api/config';

type Props = {
  navigation: any,
}

type States = {
  loading: boolean,
}
export default class Camera extends Component<Props, States> {
  camera: any = {};

  state = {
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
      console.log(data, this.camera);
      // if (data && data.uri) {
      //   this.setState({ loading: true });
      //   await this.scanPhoto(data.uri);
      // }
    }
  }

  async scanPhoto(file: File) {
    const form = new FormData();
    const configs = {
      headers:{'Content-Type':'multipart/form-data'}
    };
    form.append('content', file);

    axios.post(apiUrl.knowledge, form, configs).then(res => {
      if(res) {
        console.log('response', res);
        this.props.navigation.navigate('Result');
      }
      this.setState({ loading: false });
    }).catch((err: Error) => {
      console.log('Error', err);
      this.setState({ loading: false });
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          ref={(ref) => {
            this.camera = ref;
          }}
          type={RNCamera.Constants.Type.back}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}>
          <Spinner
            visible={this.state.loading}
            textContent={'识别中...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Image style={styles.icon} source={require('../assets/images/Camera.png')}></Image>
            </TouchableOpacity>
          </View>
        </RNCamera>
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