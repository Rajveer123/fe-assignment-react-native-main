import { View, Text, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator.js';
import TostMessage from './TostMessage.js';
import Item from './Item.js';
export default function Favorites({ navigation, updateHeaderTitle }) {
    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
    const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height);
    //Handle Screen Orientation
    Dimensions.addEventListener('change', () => {
        setWindowWidth(Dimensions.get('window').width);
        setWindowHeight(Dimensions.get('window').height);
    });
    const [isLoading, setIsLoading] = useState(false);
    const [savedData, setSavedData] = useState([]);
    //Tost Message Related States
    const [showTostMessage, setShowTostMessage] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = navigation.addListener('focus', () => {
            const getSavedData = () => {
                let savedFavriouteItems = [];
                AsyncStorage.getItem('savedFavriouteData').then((value) => {
                    if (value == null) {
                        try {
                            setSavedData(savedFavriouteItems);
                        } catch (error) {
                            console.log('There is an error while getting local storage :' + JSON.stringify(error));
                        }
                    } else {
                        savedFavriouteItems = JSON.parse(value);
                        setSavedData(savedFavriouteItems);
                    }
                    if (updateHeaderTitle != null && typeof (updateHeaderTitle) === 'function') {
                        if (savedFavriouteItems.length > 0) {
                            updateHeaderTitle("Saved Favrioutes (" + savedFavriouteItems.length + ")");
                        } else {
                            updateHeaderTitle("Saved Favrioutes");
                        }
                    }
                    setIsLoading(false);
                })
            }
            //Get the Saved Favrioute Data
            getSavedData();
            // The screen is focused
            // Call any action
            // Return the function to unsubscribe from the event so it gets removed on unmount
            return unsubscribe;
        });
    }, [navigation])

    //here I'm trying to refresh (example from docs)
    const onRefresh = React.useCallback((updatedSavedItemsData) => {
        setSavedData(updatedSavedItemsData);
        if (updateHeaderTitle != null && typeof (updateHeaderTitle) === 'function') {
            if (updatedSavedItemsData.length > 0) {
                updateHeaderTitle("Saved Favrioutes (" + updatedSavedItemsData.length + ")");
            } else {
                updateHeaderTitle("Saved Favrioutes");
            }

        }
    });
    //Method to show / hide Toast Message
    const handleToastMessage = React.useCallback((message, type) => {
        setShowTostMessage(true);
        var toastMessagetimeOut = setTimeout(function () {
            setShowTostMessage(false);
            clearTimeout(toastMessagetimeOut);
            toastMessagetimeOut = null;
        }, 1000);
    });
    return (
        <View style={{ flex: 1, backgroundColor: 'white', width: windowWidth, height: windowHeight }}>
            {isLoading ?
                <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <LoadingIndicator />
                </View> :
                <View style={{ display: 'flex', flex: 1 }}>
                    {savedData.length > 0 ?
                        <FlatList
                            data={savedData}
                            renderItem={({ item }) =>
                                <Item character={item} type="Delete" onRefresh={onRefresh} handleToastMessage={handleToastMessage} />}
                            style={{ display: 'flex', flex: 1, padding: 20 }}
                            keyExtractor={(item, index) => index.toString()}
                            initialNumToRender={4}
                            ItemSeparatorComponent={() => <View style={{ height: 15, backgroundColor: 'transparent' }} />}
                        /> :
                        <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flex: 1 }}>
                            <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>No favourite item saved yet.</Text>
                        </View>}
                    <TostMessage type='info' message='Item Removed Successfully.' isTostMessageVisible={showTostMessage} />
                </View>}

        </View>
    )
}