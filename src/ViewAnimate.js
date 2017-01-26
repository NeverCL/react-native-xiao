import React, { Component } from 'react';
import { Animated, View, Text, Image, StatusBar } from 'react-native';

class Ani extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(0),
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={true} />
                <Animated.Image                         // 可选的基本组件类型: Image, Text, View
                    source={{ uri: 'http://h.hiphotos.baidu.com/zhidao/pic/item/6d81800a19d8bc3ed69473cb848ba61ea8d34516.jpg' }}
                    resizeMode='stretch'
                    style={{
                        flex: 1,
                        transform: [                        // `transform`是一个有序数组（动画按顺序执行）
                            { scale: this.state.bounceValue },  // 将`bounceValue`赋值给 `scale`
                        ]
                    }}
                    />
            </View>
        );
    }

    componentDidMount() {
        this.state.bounceValue.setValue(1.5);     // 设置一个较大的初始值
        Animated.spring(                          // 可选的基本动画类型: spring, decay, timing
            this.state.bounceValue,                 // 将`bounceValue`值动画化
            {
                toValue: 1,                         // 将其值以动画的形式改到一个较小值
                tension: 50,                          //张力默认40
                friction: 1,                          // Bouncier spring
            }
        ).start();                                // 开始执行动画
    }

}

export default Ani;