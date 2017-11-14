import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const isIphoneX = (
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === 812 || width === 812)
);


export default class DefaultSlide extends React.PureComponent {
  render() {
    return (
      <View style={[styles.flexOne, {
        backgroundColor: this.props.backgroundColor,
        width: this.props.width,
        height: this.props.height,
      }]}>
        <View style={styles.iPhoneXTopSpacer} />
        <View style={styles.mainContent}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Image source={this.props.image} style={this.props.imageStyle} />
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
        <View style={styles.bottomSpacer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iPhoneXTopSpacer: {
    height: isIphoneX ? 44 : Platform.OS === 'ios' ? 20 : 0,
  },
  bottomSpacer: {
    height: 32 + 18 + 32 + (isIphoneX ? 34 : 0),
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    color: 'rgba(255, 255, 255, .7)',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '300',
  },
  title: {
    fontSize: 26,
    color: 'rgba(255, 255, 255, .7)',
    fontWeight: '300',
  }
});
