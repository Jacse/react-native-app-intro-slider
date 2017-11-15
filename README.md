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

![Basic example gif](images/basic-example.gif)

Basic example with no configuration:

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

![Button example gif](images/button-example.gif)

Basic example with buttons configured:

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

## Custom slide layout

![Custom layout example gif](images/custom-example.gif)

Here a custom `renderItem` is supplied. Notice how the setup of `slides` has been configured too.

```js
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo';
import AppIntroSlider from 'react-native-app-intro-slider';

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 64,
    justifyContent: 'space-around',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  }
});

const slides = [
  {
    key: 'somethun',
    title: 'Quick setup, good defaults',
    text: 'React-native-app-intro-slider is easy to setup with a small footprint and no dependencies. And it comes with good default layouts!',
    icon: 'ios-images-outline',
    colors: ['#63E2FF', '#B066FE'],
  },
  {
    key: 'somethun1',
    title: 'Super customizable',
    text: 'The component is also super customizable, so you can adapt it to cover your needs and wants.',
    icon: 'ios-options-outline',
    colors: ['#A3A1FF', '#3A3897'],
  },
  {
    key: 'somethun2',
    title: 'No need to buy me beer',
    text: 'Usage is all free',
    icon: 'ios-beer-outline',
    colors: ['#29ABE2', '#4F00BC'],
  },
];

export default class App extends React.Component {
  _renderItem = props => (
    <LinearGradient
      style={{ flex: 1 }}
      colors={props.colors}
      start={{x: 0, y: .1}} end={{x: .1, y: 1}}
    >
      <View style={{ height: props.topSpacer }} />
      <View style={styles.mainContent}>
        <Ionicons style={{ backgroundColor: 'transparent' }} name={props.icon} size={200} color="white" />
        <View>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.text}>{props.text}</Text>
        </View>
      </View>
      <View style={{ height: props.bottomSpacer }} />
    </LinearGradient>
  );

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        bottomButton
      />
    );
  }
}
```


## Props and options:

Name             | Type       | Default                   | Description
-----------------|------------|---------------------------|--------------
slides           | `object`   | No default, required      | An array of [slide-objects](#slide-object)
bottomButton     | `boolean`  | `false`                   | Enable to show a full-width button under pagination
onNext           | `function` | `void`                    | Called when user goes to next slid
onDone           | `function` | `void`                    | Called when user ends the introduction be pressing the done button
dotColor         | `string`   | 'rgba(0, 0, 0, .2)'       | Color of inactive pagination dots
activeDotColor   | `string`   | 'rgba(255, 255, 255, .9)' | Color of active pagination dot
renderNextButton | `function` | renders a Text-component  | Use to supply your own next button
renderDoneButton | `function` | renders a Text-component  | Use to supply your own done button
renderItem       | `function` | renders `DefaultSlide`    | Function returning a slide. Use if you want complete control over slide rendering. The function is passed the slide object as wells as { topSpacer: Number, bottomSpacer: Number }. These show the "safe-space" where other UI is not interfering.

## slides object
Each slide object should contain at least a unique `key`. If you use the default layouts your object should furthermore contain:

Name             | Type                | Note           
-----------------|---------------------|---------------------
title            | `string`            | The title
text             | `string`            | Main text of slide
image            | `Image`-source prop | Slide image
backgroundColor  | `string`            | slide backgroundcolor

If you use a custom `renderItem`-method you can design your slide objects as you see fit.

## Running example app


## TODO
* Test Android