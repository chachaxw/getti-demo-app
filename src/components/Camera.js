/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Image, Button, View, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';
import { NavigationActions } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import AxiosInstance from '../api/AxiosInstance';
import ApiUrl from '../api/config';

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
      const options = {
        quality: 0.5,
        base64: true,
        height: 1600,
        width: 900,
      };
      const data = await this.camera.takePictureAsync(options);
      console.log('Data', data);
      if (data && data.uri) {
        this.setState({ uri: data.uri });
      }
    }
  }

  async scanPhoto(uri: string) {
    const form = new FormData();
    const file = {
      uri,
      type: 'multipart/form-data',
      name: 'temp.jpg'
    };

    const configs = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    form.append('content', file);

    try {
      const [res1, res2] = await new Promise.all([
        AxiosInstance.post(ApiUrl.knowledge, form, configs),
        AxiosInstance.post(ApiUrl.ocr, form, configs),
      ]);

      let knowledge = [];
      if (res1.data && res1.data.length) {
          knowledge = res1.data.map(item => item.knowledge);
      }

      const navigateAction = NavigationActions.navigate({
        routeName: 'Result',
        params: {
          words: res2.data.words,
          knowledge,
        },
      });
      this.props.navigation.dispatch(navigateAction);

      this.setState({ loading: null });
    } catch (error) {
      console.log('Error', error);
      this.setState({ loading: null });
      alert('上传图片失败');
    }
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

  openPhotoLibrary() {
    // Open Image Library:
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          uri: response.uri,
        });
      }
    });
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
            <Button style={styles.select} title="从相册选择" onPress={() => this.openPhotoLibrary()} />
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                <Image style={styles.icon} source={require('../assets/images/Camera.png')}></Image>
              </TouchableOpacity>
            </View>
          </RNCamera> : 
          <View style={styles.previewWapper}>
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
  previewWapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  preview: {
    flex: 1,
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
  select: {
    position: 'absolute',
    left: 10,
    top: 10,
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