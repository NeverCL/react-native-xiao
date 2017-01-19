import React, { Component } from 'react';
import { Button, View } from 'antd-mobile';
import { Alert, Modal } from 'react-native';

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
import ImageViewer from 'react-native-image-zoom-viewer';
import _updateConfig from '../update.json';


const {appKey} = _updateConfig[Platform.OS];

const images = [{
    url: 'http://scimg.jb51.net/allimg/160815/103-160Q509544OC.jpg'
}, {
    url: 'http://img.sc115.com/uploads1/sc/jpgs/1508/apic22412_sc115.com.jpg'
}, {
    url: 'http://v1.qzone.cc/avatar/201407/07/00/24/53b9782c444ca987.jpg!200x200.jpg'
}]

class App extends Component {
    constructor() {
        super();
        this.state = {
            visible: false
        };
    }

    checkUpdate = () => {
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
    };

    render() {
        return (
            <View>
                <Button onClick={this.checkUpdate}>在线更新</Button>
                <Button onClick={() => this.setState({ visible: !this.state.visible })}>测试按钮</Button>
                <Modal visible={this.state.visible} transparent={true}>
                    <ImageViewer imageUrls={images} />
                </Modal>
            </View>
        );
    }
}

export default App;