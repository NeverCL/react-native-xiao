/* 
 * 首页程序
 * 后退键功能 
 */

import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, BackAndroid, Platform, ToastAndroid } from 'react-native';

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
                <Button color="red" title="布局页面" onPress={x => x} />
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