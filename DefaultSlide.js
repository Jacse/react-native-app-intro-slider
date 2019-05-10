import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Platform } from 'react-native';

export default class DefaultSlide extends React.PureComponent {
  render() {
    const style = {
      backgroundColor: this.props.backgroundColor,
      width: this.props.width,
      flex: 1,
      paddingBottom: this.props.bottomButton ? 132 : 64,
    };
    return (
      <View style={[styles.mainContent, style]}>
        <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
        <Image source={this.props.image} style={this.props.imageStyle} />
        <Text style={[styles.text, this.props.textStyle]}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    color: 'rgba(255, 255, 255, .7)',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '300',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    color: 'rgba(255, 255, 255, .7)',
    fontWeight: '300',
    paddingHorizontal: 16,
  },
});
