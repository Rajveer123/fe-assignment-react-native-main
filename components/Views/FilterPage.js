import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
export default function FilterPage(props) {
    if (!props.isFilterPageVisible) {
        return null;
    }
    const HandleCancelButtonClick = () => {
        props.HandleCancelButtonClick != null && props.HandleCancelButtonClick("Rajveer", 2);
    }

    return (
        <View style={{ display: 'flex', position: 'absolute', flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
            <View style={{ borderRadius: 5, backgroundColor: 'white', flex: 1, width: '80%', height: '90%', margin: 50, position: 'absolute', flexDirection: 'column' }}>
                <TouchableWithoutFeedback onPress={HandleCancelButtonClick}>
                    <Image source={require('../../assets/cancel_icon.png')}
                        style={{ width: 40, height: 40, alignSelf: 'flex-end', margin: 10 }} />
                </TouchableWithoutFeedback>
                <View style={{ margin: 20, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Text style={{ color: 'black', fontSize: 20 }}>Filter Page Pop-up Window</Text>
                </View>
            </View>
        </View>
    )
}