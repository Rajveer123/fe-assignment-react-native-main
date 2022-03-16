import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator.js';
import Item from './Item.js';

export default function Characters(props) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    //Load More Data on scroll end
    const loadMoreCharactersData = () => {
        setCurrentPage(currentPage + 1);
        setIsLoading(true);
        loadCharactersData();
    }

    //Method to Load Data
    const loadCharactersData = async () => {
        fetch("https://rickandmortyapi.com/api/character/?&page=" + currentPage)
            .then(response => response.json())
            .then(responseJson => {

                if (responseJson != null && responseJson.results != null && responseJson.results.length > 0) {
                    //Setting data into state
                    setData(data.concat(responseJson.results));
                }
                if (props.updateHeaderTitle != null) {
                    props.updateHeaderTitle("All Characters (" + (responseJson.info.count) + ")");
                }
                //Hiding Loading Indicator once data gets loaded
                setIsLoading(false);


            }).catch(error => {
                console.log('Error selecting random data: ' + error)
            })

    }
    //Footer loading indicator view while list is loading
    const renderFooter = () => {
        return (
            isLoading ?
                <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' />
                </View> : null
        )
    }

    useEffect(() => {
        //Showing Activity Indicator while List is Loading Data
        setIsLoading(true);
        //Load Data
        loadCharactersData();

    }, [currentPage])

    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <View style={{ padding: 20 }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                        <Item character={item} type="Add" />
                    }
                    style={{ width: 350, height: 800 }}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={renderFooter}
                    onEndReached={loadMoreCharactersData}
                    initialNumToRender={4}
                    onEndReachedThreshold={0.1}
                    ItemSeparatorComponent={() => <View style={{ height: 15, backgroundColor: 'transparent' }} />}
                />
            </View>


        </View>

    )
}
