import * as React from 'react';
import { FlatList, FlatListProps, ViewStyle, NativeScrollEvent, GestureResponderEvent, LayoutChangeEvent, ListRenderItemInfo } from 'react-native';
declare type Props<ItemT> = {
    data: ItemT[];
    renderItem: (info: ListRenderItemInfo<ItemT> & {
        dimensions: {
            width: number;
            height: number;
        };
    }) => React.ReactNode;
    renderSkipButton?: () => React.ReactNode;
    renderNextButton?: () => React.ReactNode;
    renderDoneButton?: () => React.ReactNode;
    renderPrevButton?: () => React.ReactNode;
    onSlideChange?: (a: number, b: number) => void;
    onSkip?: () => void;
    onDone?: () => void;
    onNext?: () => void;
    renderPagination?: (activeIndex: number) => React.ReactNode;
    activeDotStyle: ViewStyle;
    dotStyle: ViewStyle;
    dotClickEnabled: boolean;
    skipLabel: string;
    doneLabel: string;
    nextLabel: string;
    prevLabel: string;
    showDoneButton: boolean;
    showNextButton: boolean;
    showPrevButton: boolean;
    showSkipButton: boolean;
    bottomButton: boolean;
} & FlatListProps<ItemT>;
declare type State = {
    width: number;
    height: number;
    activeIndex: number;
};
export default class AppIntroSlider<ItemT = any> extends React.Component<Props<ItemT>, State> {
    static defaultProps: {
        activeDotStyle: {
            backgroundColor: string;
        };
        dotStyle: {
            backgroundColor: string;
        };
        dotClickEnabled: boolean;
        skipLabel: string;
        doneLabel: string;
        nextLabel: string;
        prevLabel: string;
        showDoneButton: boolean;
        showNextButton: boolean;
        showPrevButton: boolean;
        showSkipButton: boolean;
        bottomButton: boolean;
    };
    state: {
        width: number;
        height: number;
        activeIndex: number;
    };
    flatList: FlatList<ItemT> | undefined;
    goToSlide: (pageNum: number, triggerOnSlideChange?: boolean | undefined) => void;
    getListRef: () => FlatList<ItemT> | undefined;
    _rtlSafeIndex: (i: number) => number;
    _renderItem: (flatListArgs: any) => JSX.Element;
    _renderButton: (name: string, label: string, onPress?: (() => void) | undefined, render?: (() => React.ReactNode) | undefined) => JSX.Element;
    _renderDefaultButton: (name: string, label: string) => JSX.Element;
    _renderOuterButton: (content: React.ReactNode, name: string, onPress?: ((e: GestureResponderEvent) => void) | undefined) => JSX.Element;
    _renderNextButton: () => false | JSX.Element;
    _renderPrevButton: () => false | JSX.Element;
    _renderDoneButton: () => false | JSX.Element;
    _renderSkipButton: () => false | JSX.Element;
    _renderPagination: () => JSX.Element;
    _onMomentumScrollEnd: (e: {
        nativeEvent: NativeScrollEvent;
    }) => void;
    _onLayout: ({ nativeEvent }: LayoutChangeEvent) => void;
    render(): JSX.Element;
}
export {};
