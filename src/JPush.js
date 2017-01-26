/*
 * 极光推送sdk测试
 * 开启/停止/恢复/监听推送服务
 */
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import JPushModule from 'jpush-react-native';

class Push extends Component {
    componentDidMount() {
        JPushModule.addReceiveCustomMsgListener((message) => {
            console.log("receive notification: " + message);
        });
        JPushModule.addReceiveNotificationListener((message) => {
            console.log("receive notification: " + message);
        });
        JPushModule.addReceiveOpenNotificationListener((map) => {
            console.log("Opening notification!");
            console.log("map.extra: " + map.key);
        });
    }

    componentWillUnmount() {
        JPushModule.removeReceiveCustomMsgListener();
        JPushModule.removeReceiveNotificationListener();
        JPushModule.removeGetRegistrationIdListener();
        console.log("Will clear all notifications");
        JPushModule.clearAllNotifications();
    }


    render() {
        return (
            <View>
                <Button title="开启服务" onPress={() => JPushModule.initPush()} />
                <Button title="停止服务" onPress={() => JPushModule.stopPush()} />
                <Button title="返回" color="#841584" onPress={() => this.props.navigator.pop()} />
                <Button title="恢复服务" onPress={() => JPushModule.resumePush()} />
                <Button title="获取RegistrationId" onPress={() => JPushModule.getRegistrationID((registrationId) => {
                    this.setState({
                        registrationId: registrationId
                    });
                })} />
                <Button title="获取Info" onPress={() => JPushModule.getInfo((map) => {
                    this.setState({
                        appkey: map.myAppKey,
                        imei: map.myImei,
                        package: map.myPackageName,
                        deviceId: map.myDeviceId,
                        version: map.myVersion
                    });
                })} />
            </View>
        );
    }
}

export default Push;