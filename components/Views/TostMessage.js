import { View, Text, Dimensions } from 'react-native'
import React from 'react'

export default function TostMessage(props) {
    if (!props.isTostMessageVisible) {
        return null;
    }
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const tostMessageBGColor = props.type == 'info' ? 'green' : 'red';

    return (
        <View style={{ display: 'flex', backgroundColor: 'transparent', position: 'absolute', flex: 1, width: windowWidth, height: windowHeight, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ borderRadius: 5, justifyContent: 'centre', alignItems: 'center', backgroundColor: tostMessageBGColor, marginTop: 300 }}>
                <Text style={{ color: 'white', fontSize: 20, padding: 30 }}>{props.message}</Text>
            </View>
        </View>
    )
}