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
                <View style={{ margin: 20, justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex', flexDirection: 'column' }}>
                    <Text style={{ color: 'green', fontSize: 25, fontWeight: '600' }}>Filters</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 20, flexBasis: 30 }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>Status</Text>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: '500', marginLeft: 30 }}>Active</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 20, flexBasis: 30 }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>Name</Text>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: '500', marginLeft: 30 }}>Rajveer</Text>
                    </View>

                </View>
            </View>
        </View>
    )
}