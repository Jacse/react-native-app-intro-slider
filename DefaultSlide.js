import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
} from 'react-native';

export default class DefaultSlide extends React.PureComponent {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.backgroundColor }}>
        <View style={{ height: this.props.topSpacer }} />
        <View style={styles.mainContent}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Image source={this.props.image} style={this.props.imageStyle} />
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
        <View style={{ height: this.props.bottomSpacer }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    color: 'rgba(255, 255, 255, .7)',
    fontWeight: '300',
    paddingHorizontal: 16,
  }
});
