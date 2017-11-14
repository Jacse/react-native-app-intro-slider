# react-native-app-intro-slider

`react-native-app-intro-slider` is an easy-to-use but very configurable app introduction slider/swiper. Use it to onboard your users on first launch.

## Features

1. Supports the newest version of React Native
2. Supports both Android and iOS (and iPhone X!)

## Installation

Install library from `npm`:

    ```bash
    npm install react-native-app-intro-slider --save
    ```

or using `yarn`:

    ```bash
    yarn add react-native-app-intro-slider
    ```
  

## Usage

### Basic example

Basic example with no configuration:

TODO: Insert gif

```javascript
import React from 'react';
import { StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
  }
});

const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('./assets/1.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('./assets/2.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('./assets/3.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#22bcb5',
  }
];

export default class App extends React.Component {
  _onDone = () => {
    // User finished the introduction. Show "real" app
  }
  render() {
    return (
      <AppIntroSlider
        slides={slides}
        onDone={this._onDone}
      />
    );
  }
}
```

### Configuring buttons

Basic example with buttons configured:

TODO: insert gif

```javascript
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 320,
  }
});

// slides = [...]

export default class App extends React.Component {
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  render() {
    return (
      <AppIntroSlider
        slides={slides}
      />
    );
  }
}
```

## Props and options:

Name             | Type       | Default                   | Description
-----------------|------------|---------------------------|--------------
onNext           | `function` | `void`                    | Called when user goes to next slid
onDone           | `function` | `void`                    | Called when user ends the introduction be pressing the done button
dotColor         | `string`   | 'rgba(0, 0, 0, .2)'       | Color of inactive pagination dots
activeDotColor   | `string`   | 'rgba(255, 255, 255, .9)' | Color of active pagination dot
renderNextButton | `function` | renders a Text-component  | Use to supply your own next button
renderDoneButton | `function` | renders a Text-component  | Use to supply your own done button
renderItem       | `function` | renders `DefaultSlide`    | Function returning a slide. Use if you want complete control over slide rendering

## Running example app
