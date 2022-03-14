import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator.js';

export default function Characters() {
    const [state, setState] = useState({
        isLoading: true,
        randomUserData: [],
        loadingExtraData: false,
        page: 1
    });



    useEffect(() => {
        //Showing Activity Indicator while List is loading data
        setTimeout(() => {
            setState({ ...state, isLoading: false });
        }, 2000)
    })



    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {
                state.isLoading ?
                    (
                        <LoadingIndicator color={'#fff'} />
                    ) : (
                        <Text>Characters!</Text>
                    )
            }

        </View>



    )
}