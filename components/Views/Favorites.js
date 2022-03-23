import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator.js';
import Item from './Item.js';
export default function Favorites({ navigation, updateHeaderTitle }) {


    const [isLoading, setIsLoading] = useState(false);
    const [savedData, setSavedData] = useState([]);

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
                        updateHeaderTitle("Saved Favrioutes (" + savedFavriouteItems.length + ")");
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
            updateHeaderTitle("Saved Favrioutes (" + updatedSavedItemsData.length + ")");
        }
    });

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            {isLoading ? <LoadingIndicator /> :
                <View style={{ padding: 20 }}>
                    {savedData.length > 0 ?
                        <FlatList
                            data={savedData}
                            renderItem={({ item }) =>
                                <Item character={item} type="Delete" onRefresh={onRefresh} />}
                            style={{ width: 350, height: 800 }}
                            keyExtractor={(item, index) => index.toString()}
                            initialNumToRender={4}
                            ItemSeparatorComponent={() => <View style={{ height: 15, backgroundColor: 'transparent' }} />}
                        /> : <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>No favourite item saved yet.</Text>}
                </View>}

        </View>
    )
}