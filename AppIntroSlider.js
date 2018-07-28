import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import DefaultSlide from './DefaultSlide';

const { width, height } = Dimensions.get('window');

const isIphoneX = (
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === 812 || width === 812)
);

export default class AppIntroSlider extends React.Component {
  static defaultProps = {
    activeDotStyle: {
      backgroundColor: 'rgba(255, 255, 255, .9)',
    },
    dotStyle: {
      backgroundColor: 'rgba(0, 0, 0, .2)',
    },
    skipLabel: 'Skip',
    doneLabel: 'Done',
    nextLabel: 'Next',
    prevLabel: 'Back',
    buttonStyle: null,
    buttonTextStyle: null,
  }
  state = {
    width,
    height,
    activeIndex: 0,
  };

  goToSlide = (pageNum) => {
    this.setState({ activeIndex: pageNum });
    this.flatList.scrollToOffset({ offset: pageNum * this.state.width });
  }

  _onNextPress = () => {
    this.goToSlide(this.state.activeIndex + 1);
    this.props.onSlideChange && this.props.onSlideChange(this.state.activeIndex + 1, this.state.activeIndex);
  }
  _onPrevPress = () => {
    this.goToSlide(this.state.activeIndex - 1);
    this.props.onSlideChange && this.props.onSlideChange(this.state.activeIndex - 1, this.state.activeIndex);
  }

  _renderItem = (item) => {
    const { width, height } = this.state;
    const bottomSpacer = (this.props.bottomButton ? (this.props.showSkipButton ? 44 : 0) + 44 : 0) + (isIphoneX ? 34: 0) + 64;
    const topSpacer = (isIphoneX ? 44 : 0) + (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight);
    const props = { ...item.item, bottomSpacer, topSpacer, width, height };

    return this.props.renderItem ? this.props.renderItem(props) : <DefaultSlide {...props} />;
  }

  _renderButton = (name, onPress) => {
    const show = (name === 'Skip' || name === 'Prev') ? this.props[`show${name}Button`] : !this.props[`hide${name}Button`];
    const content = this.props[`render${name}Button`] ? this.props[`render${name}Button`]() : this._renderDefaultButton(name);
    return show && this._renderOuterButton(content, name, onPress);
  }

  _renderDefaultButton = (name) => {
    let content = (
      <Text style={[styles.buttonText, this.props.buttonTextStyle]}>
        {this.props[`${name.toLowerCase()}Label`]}
      </Text>
    );
    if (this.props.bottomButton) {
      content = <View style={[styles.bottomButton, (name === 'Skip' || name === 'Prev') && { backgroundColor: 'transparent' }, this.props.buttonStyle]}>{content}</View>
    }
    return content;
  }

  _renderOuterButton = (content, name, onPress) => {
    const style = (name === 'Skip' || name === 'Prev') ? styles.leftButtonContainer : styles.rightButtonContainer;
    return (
      <View style={this.props.bottomButton ? styles.bottomButtonContainer : style}>
        <TouchableOpacity onPress={onPress} style={this.props.bottomButton ? styles.flexOne : this.props.buttonStyle}>
          {content}
        </TouchableOpacity>
      </View>
    )
  }

  _renderNextButton = () => this._renderButton('Next', this._onNextPress)

  _renderPrevButton = () => this._renderButton('Prev', this._onPrevPress)

  _renderDoneButton = () => this._renderButton('Done', this.props.onDone && this.props.onDone)

  _renderSkipButton = () => this._renderButton('Skip', this.props.onSkip && this.props.onSkip)

  _renderPagination = () => {
    const isLastSlide = this.state.activeIndex === (this.props.slides.length - 1);
    const isFirstSlide = this.state.activeIndex === 0;

    const skipBtn = (!isFirstSlide && this._renderPrevButton()) || (!isLastSlide && this._renderSkipButton());
    const btn = isLastSlide ? this._renderDoneButton() : this._renderNextButton();

    return (
      <View style={styles.paginationContainer}>
        <View style={styles.paginationDots}>
          {!this.props.bottomButton && skipBtn}
          {this.props.slides.length > 1 && this.props.slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === this.state.activeIndex ? this.props.activeDotStyle : this.props.dotStyle,
              ]}
            />
          ))}
          {!this.props.bottomButton && btn}
        </View>
        {this.props.bottomButton && btn}
        {this.props.bottomButton && skipBtn}
      </View>
    )
  }

  _onMomentumScrollEnd = (e) => {
    const offset = e.nativeEvent.contentOffset.x;
    // Touching very very quickly and continuous brings about
    // a variation close to - but not quite - the width.
    // That's why we round the number.
    // Also, Android phones and their weird numbers
    const newIndex = Math.round(offset / this.state.width);
    if (newIndex === this.state.activeIndex) {
      // No page change, don't do anything
      return;
    }
    const lastIndex = this.state.activeIndex;
    this.setState({ activeIndex: newIndex });
    this.props.onSlideChange && this.props.onSlideChange(newIndex, lastIndex);
  }

  _onLayout = () => {
    const { width, height } = Dimensions.get('window');
    if (width !== this.state.width || height !== this.state.height) {
      // Set new width to update rendering of pages
      this.setState({ width, height });
      // Set new scroll position
      const func = () => { this.flatList.scrollToOffset({ offset: this.state.activeIndex * width, animated: false }) }
      Platform.OS === 'android' ? setTimeout(func, 0) : func();
    }
  }

  render() {
    // Separate props used by the component to props passed to FlatList
    const {
      hidePagination,
      activeDotStyle,
      dotStyle,
      skipLabel,
      doneLabel,
      nextLabel,
      prevLabel,
      buttonStyle,
      buttonTextStyle,
      renderItem,
      data,
      ...otherProps
    } = this.props;

    return (
      <View style={styles.flexOne}>
        <FlatList
          ref={ref => this.flatList = ref}
          data={this.props.slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          style={styles.flexOne}
          renderItem={this._renderItem}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          extraData={this.state.width}
          onLayout={this._onLayout}
          {...otherProps}
        />
        {!hidePagination && this._renderPagination()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16 + (isIphoneX ? 34 : 0),
    left: 0,
    right: 0,
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  leftButtonContainer: {
    position: 'absolute',
    left: 0,
  },
  rightButtonContainer: {
    position: 'absolute',
    right: 0,
  },
  bottomButtonContainer: {
    height: 44,
    marginHorizontal: 16,
  },
  bottomButton: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
    padding: 12,
  }
});
