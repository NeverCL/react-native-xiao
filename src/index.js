/*
 * 程序入口
 * 配置导航     
 */

import React, { Component } from 'react';
import { Navigator, BackAndroid, Platform } from 'react-native';

import Main from './Main';

class App extends Component {

    render() {
        return (
            <Navigator
                initialRoute={{ name: 'Hello', component: Main }}
                renderScene={(route, navigator) => {
                    let {component: Component} = route;
                    return (<Component navigator={navigator} route={route} />);
                } } />
        );
    }
}

export default App;