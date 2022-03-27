import { View, Text } from 'react-native';
import React, { useState } from 'react';
export default function FilterPage(props) {
    if (!props.isFilterPageVisible) {
        return null;
    }


    return (
        <View style={{ display: 'flex', position: 'absolute', flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
            <View style={{ borderRadius: 5, backgroundColor: 'white', flex: 1, width: '80%', height: '90%', margin: 50, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black', fontSize: 20 }}>Filter Page Pop-up Window</Text>
            </View>
        </View>
    )
}