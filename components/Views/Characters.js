import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator.js';

export default function Characters() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const renderCustomItem = ({ item, index }) => {

        return (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.name}</Text>
                    <Text>{item.status} {item.species}</Text>
                    <Text>Last know location:</Text>
                    <Text>{item.location.name}</Text>
                </View>
            </View>
        )
    }


    //Load More Data on scroll end
    const loadMoreCharactersData = () => {
        setCurrentPage(currentPage + 1);
        setIsLoading(true);
    }




    //Method to Load Data
    const loadCharactersData = () => {
        fetch("https://rickandmortyapi.com/api/character/?&page=" + currentPage)
            .then(response => response.json())
            .then(responseJson => {

                //Setting data into state
                setData(data.concat(responseJson.results));

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

    }, [])

    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ padding: 20 }}>
                <FlatList
                    data={data}
                    renderItem={renderCustomItem}
                    style={{ width: 350, height: 800 }}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={renderFooter}
                    onEndReached={loadMoreCharactersData}
                    //onEndReachedThreshold={0.1}
                    ItemSeparatorComponent={() => <View style={{ height: 0.5, backgroundColor: 'black' }} />}
                />
            </View>
            {/*
                isLoading ?
                    (
                        <LoadingIndicator color={'#fff'} />
                    ) : (
                        <View style={{ padding: 20 }}>
                            <FlatList
                                data={data}
                                renderItem={this.renderCustomItem}
                                style={{ width: 350, height: 800 }}
                                keyExtractor={(item, index) => index.toString()}
                                ListFooterComponent={this.renderFooter}
                                onEndReached={this.loadMoreCharactersData}
                                //onEndReachedThreshold={0.1}
                                ItemSeparatorComponent={() => <View style={{ height: 0.5, backgroundColor: 'black' }} />}
                            />
                        </View>
                    )
            */}

        </View>

    )
}
