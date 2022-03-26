import { View, Text, Dimensions } from 'react-native'
import React, { useState } from 'react'

export default function TostMessage(props) {
    if (!props.isTostMessageVisible) {
        return null;
    }

    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
    const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height);
    let tostMessagecontainerViewHeight = 280;

    //Handle Screen Orientation
    Dimensions.addEventListener('change', () => {
        setWindowWidth(Dimensions.get('window').width);
        setWindowHeight(Dimensions.get('window').height);
    });

    const tostMessageBGColor = props.type == 'info' ? 'green' : 'red';

    return (
        <View style={{ display: 'flex', backgroundColor: 'transparent', position: 'absolute', flex: 1, width: windowWidth, height: windowHeight, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <View style={{ justifyContent: 'flex-start', alignItems: 'center', position: 'absolute', alignSelf: 'center', width: windowWidth, height: tostMessagecontainerViewHeight }}>
                <View style={{ borderRadius: 5, justifyContent: 'centre', alignItems: 'center', backgroundColor: tostMessageBGColor }}>
                    <Text style={{ color: 'white', fontSize: 20, padding: 30 }}>{props.message}</Text>
                </View>
            </View>
        </View >
    )
}