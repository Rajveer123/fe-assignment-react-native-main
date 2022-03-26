import { View, Text, Dimensions } from 'react-native';
import React, { useState } from 'react';
export default function FilterPage(props) {
    if (!props.isFilterPageVisible) {
        return null;
    }
    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
    const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height);
    const [modelWindowWidth, setModelWindowWidth] = useState(Dimensions.get('window').width / 2);
    const [modelWindowHeight, setModelWindowHeight] = useState(Dimensions.get('window').height / 2);
    //Handle Screen Orientation
    Dimensions.addEventListener('change', () => {
        setWindowWidth(Dimensions.get('window').width);
        setWindowHeight(Dimensions.get('window').height);
        setModelWindowWidth(Dimensions.get('window').width / 2);
        setModelWindowHeight(Dimensions.get('window').height / 2);
    });

    return (
        <View style={{ display: 'flex', position: 'absolute', flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
            <View style={{ borderRadius: 5, backgroundColor: 'white', flex: 1, width: '80%', height: '90%', margin: 50, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black', fontSize: 20 }}>Filter Page Pop-up Window</Text>
            </View>
        </View>
    )
}