import React, { Component } from 'react';
import { Button, View } from 'antd-mobile';
import ImageViewer from 'react-native-image-zoom-viewer';

const images = [{
    url: 'http://scimg.jb51.net/allimg/160815/103-160Q509544OC.jpg'
}, {
    url: 'http://img.sc115.com/uploads1/sc/jpgs/1508/apic22412_sc115.com.jpg'
}, {
    url: 'http://v1.qzone.cc/avatar/201407/07/00/24/53b9782c444ca987.jpg!200x200.jpg'
}]

class ViewImage extends Component {
    constructor() {
        super();
        this.state = {
            visible: false
        };
    }

    render() {
        return (
            <View>
                <Button onClick={() => this.setState({ visible: !this.state.visible })}>查看图片</Button>
                <Modal visible={this.state.visible} transparent={true}>
                    <ImageViewer imageUrls={images} />
                </Modal>
            </View>
        );
    }
}

export default ViewImage;