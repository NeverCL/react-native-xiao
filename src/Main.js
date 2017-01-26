/* 
 * 首页程序
 * 后退键功能 
 */

import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, BackAndroid, Platform, ToastAndroid, TouchableHighlight } from 'react-native';

import Check from './CheckAppByPushy';
import Push from './JPush';
import ViewAnimate from './ViewAnimate';

class Main extends Component {
    constructor() {
        super();
        this.onBackAndroid = this.onBackAndroid.bind(this);
    }

    componentWillMount() {
        if (Platform.OS === 'android')
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        if (Platform.OS === 'android')
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackSeconds() {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    }

    onBackAndroid() {
        const {navigator} = this.props;
        const routers = navigator.getCurrentRoutes();
        if (routers.length > 1) {
            //默认返回导航栈
            navigator.pop();
            return true;
        }
        return this.onBackSeconds();
    }

    render() {
        return (
            <View style={style.container}>
                <Text style={style.info}>当前:Main组件</Text>
                <Button color="#006699" title="检查更新" onPress={x => this.props.navigator.push({ component: Check })} />
                <Button color="#006600" title="推送服务" onPress={x => this.props.navigator.push({ component: Push })} />
                <Button color="#841584" title="动画特效" onPress={x => this.props.navigator.push({ component: ViewAnimate })} />
                <Button color="#841584" title="进入Tabs页面" onPress={x => x} />
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    info: {
        textAlign: 'center',
        fontSize: 30,
    }
});

export default Main;