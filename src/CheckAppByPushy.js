/**
 *
 * 检查更新组件
 * 采用Pushy方式更新
 */

import React, { Component } from 'react';
import { Button, View } from 'antd-mobile';
import { Alert, Modal, Text, StyleSheet } from 'react-native';
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

class CheckAppByPushy extends Component {
    checkUpdate = () => {
        checkUpdate(appKey).then(info => {
            if (info.upToDate) {
                Alert.alert('提示', new Date() + '您的应用版本已是最新.');
            } else {
                let str = `检查到新版本:
                名称:${info.name}
                描述:${info.description}
                是否立即更新`;

                Alert.alert('提示', str, [{
                    text: '是', onPress: () => downloadUpdate(info)
                        .then(hash => switchVersion(hash))
                }, { text: '否', }]);
            }
        }).catch(err => {
            Alert.alert('提示', '更新失败!');
        });
    };

    render() {
        return (
            <View>
                <Text style={style.info}>
                    当前包版本号:{packageVersion + '\n'}
                    当前版本Hash:{currentVersion}
                </Text>
                <Button onClick={this.checkUpdate}>在线更新</Button>
            </View>
        );
    }
}

const style = StyleSheet.create({
    info: {
        flex: 1,
        alignItems: 'center',
    }
})

export default CheckAppByPushy;