import { Dimensions, Platform } from 'react-native';

// iPhoneX Xs
const X_WIDTH = 375;
const X_HEIGHT = 812;

// iPhoneXR XsMax
const XR_WIDTH = 414;
const XR_HEIGHT = 896;

// screen
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
 
// 判断是否为iphoneX或Xs
export function isIphoneX() {
  return (
    Platform.OS === 'ios' && 
    ((SCREEN_HEIGHT === X_HEIGHT && SCREEN_WIDTH === X_WIDTH) || 
    (SCREEN_HEIGHT === X_WIDTH && SCREEN_WIDTH === X_HEIGHT))
  )
}

// 判断是否为iphoneXR或XsMAX
export function isIphoneXR() {
  return (
    Platform.OS === 'ios' && 
    ((SCREEN_HEIGHT === XR_HEIGHT && SCREEN_WIDTH === XR_WIDTH) || 
    (SCREEN_HEIGHT === XR_WIDTH && SCREEN_WIDTH === XR_HEIGHT))
  )
}

// 判断答案是否和标准答案一致
export function isRightAnswer(arr1, arr2) {

  if (arr1.length > arr2.length) {
    return false;
  }

  const result = arr2.map((item, i) => {
    return arr1[i] && (arr1[i].id === item.id);
  });

  return !(result.filter(d => !d).length > 0);
}