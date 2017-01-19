import React, { Component } from 'react';
import { Button, View } from 'antd-mobile';
import { Alert } from 'react-native';

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
                        if (info.upToDate) {
                            Alert.alert('提示', '您的应用版本已是最新.');
                        } else {
                            Alert.alert('提示', '检查到新的版本' + info.name + ',是否立即更新?\n' + info.description, [
                                {
                                    text: '是', onPress: () => downloadUpdate(info).then(hash =>
                                        switchVersion(hash)
                                    )
                                },
                                { text: '否', },
                            ]);
                        }
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