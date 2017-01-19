import React, { Component } from 'react';
import { Button, View } from 'antd-mobile';

import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update';

import _updateConfig from '../update.json';
const {appKey} = _updateConfig[Platform.OS];

class App extends Component {
    render() {
        return (
            <View>
                <Button onClick={() => {
                    checkUpdate(appKey).then(info => {
                        downloadUpdate(info).then(hash => {
                            switchVersion(hash);
                        });
                    }).catch(err => {
                        Alert.alert('提示', '更新失败.');
                    });
                } }>在线更新</Button>
                <Button>测试按钮</Button>
            </View>
        );
    }
}

export default App;