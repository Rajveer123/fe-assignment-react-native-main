import { View, Text, FlatList, Dimensions, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import TostMessage from './TostMessage.js';
import FilterPage from './FilterPage.js';
import Item from './Item.js';



function Characters(props, ref) {
    let comeAfterResetingFilter = false;
    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
    const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height);
    //Handle Screen Orientation
    Dimensions.addEventListener('change', () => {
        setWindowWidth(Dimensions.get('window').width);
        setWindowHeight(Dimensions.get('window').height);
    });
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    //Tost Message Related States
    const [toastMessage, setToastMessage] = useState('Saved Successfully');
    const [toastMessageType, setToastMessageType] = useState('Info');
    const [showTostMessage, setShowTostMessage] = useState(false);
    //Filter Page Related States
    const [showFilterPage, setShowFilterPage] = useState(false);
    const [filterPageStatusData, setFilterPageStatusData] = useState([]);
    const [filterPageGenderData, setFilterPageGenderData] = useState([]);
    const [loadMoreAPIURL, setLoadMoreAPIURL] = useState('');

    //Handle Child view click from Parent 
    useImperativeHandle(ref, () => ({
        // Open Filter Page Popup Window
        openFilterPagePopWindow: () => {
            setShowFilterPage(true)
        }
    }))

    //Load More Data on scroll end
    const loadMoreCharactersData = () => {
        if (loadMoreAPIURL != null) {
            setIsLoading(true);
            loadCharactersData(loadMoreAPIURL);
        }
    }

    //Method to Load Character Data
    const loadCharactersData = async (loadMoreAPI = null, filterPageQueryString = null) => {
        const apiURL = loadMoreAPI != null ? loadMoreAPI : ((filterPageQueryString != null && filterPageQueryString.length > 0) ? "https://rickandmortyapi.com/api/character/?&page=" + currentPage + "&" + filterPageQueryString : "https://rickandmortyapi.com/api/character/?&page=" + currentPage);
        fetch(apiURL)
            .then(response => response.json())
            .then(responseJson => {

                if (responseJson != null && responseJson.info != null) {
                    if (props.updateHeaderTitle != null) {
                        props.updateHeaderTitle("All Characters (" + (responseJson.info.count) + ")");
                    }
                    //Setting load more API
                    setLoadMoreAPIURL(responseJson.info.next);
                }

                if (responseJson != null && responseJson.results != null && responseJson.results.length > 0) {
                    //Setting data into state
                    //setData(data.concat(responseJson.results));

                    if (filterPageQueryString != null && filterPageQueryString.length > 0 && loadMoreAPI == null) {

                        //come from filter so only setting filter response data
                        setData(responseJson.results);

                    } else {
                        if (comeAfterResetingFilter) {
                            //Here we are eliminating last filter data while setting new data for list
                            setData(responseJson.results.concat([]));
                            comeAfterResetingFilter = false;
                        } else {
                            //loading without filter data so concating with existing data to new data via API response
                            setData(responseJson.results.concat(data));
                        }

                    }


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
    //Method to show / hide Toast Message
    const handleToastMessage = React.useCallback((message, type) => {
        setToastMessage(message);
        setToastMessageType(type);
        setShowTostMessage(true);

        var toastMessagetimeOut = setTimeout(function () {
            setShowTostMessage(false);
            clearTimeout(toastMessagetimeOut);
            toastMessagetimeOut = null;
        }, 1000);
    });
    //Method that updates the total filters count on UI
    const setTotalFilterPageCount = (statusFilters, gendeFilters) => {
        let totalFiltersCount = 0;
        let filterQueryString = '';
        statusFilters.forEach(function (status) {
            if (status.checked) {
                filterQueryString = filterQueryString.concat('&status=', status.name);
                totalFiltersCount++;
            }
        });
        gendeFilters.forEach(function (gender) {
            if (gender.checked) {
                filterQueryString = filterQueryString.concat('&gender=', gender.name);
                totalFiltersCount++;
            }
        });
        props.updateFiltersCount != null && props.updateFiltersCount(totalFiltersCount);
        //Resetting current page and character data before executing filter page data
        setCurrentPage(0);
        setData([]);
        setIsLoading(true);
        //Checking if any filter parameter is set or not then load character data based on filter parameter set on filter page
        if (filterQueryString != null && filterQueryString.length > 0) {
            filterQueryString = filterQueryString.substring(1);
            //Load Charater Data along with filter query string
            loadCharactersData(null, filterQueryString);

        } else {
            comeAfterResetingFilter = true;
            //Load Charater Data
            loadCharactersData();
        }

    }
    //Method which handles filter page cancel button click and handle pop-up show / hide and updating total filter counts
    const HandleCancelButtonClick = React.useCallback((statusCheckBoxesData, genderCheckBoxesData) => {
        setFilterPageStatusData(statusCheckBoxesData);
        setFilterPageGenderData(genderCheckBoxesData);
        setShowFilterPage(false)
        setTotalFilterPageCount(statusCheckBoxesData, genderCheckBoxesData);
    });
    return (

        <View style={{ display: 'flex', flex: 1, backgroundColor: 'white', width: windowWidth, height: windowHeight }}>
            <View style={{ display: 'flex', flex: 1 }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                        <Item character={item} type="Add" handleToastMessage={handleToastMessage} />
                    }
                    style={{ display: 'flex', flex: 1, padding: 20 }}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={renderFooter}
                    onEndReached={loadMoreCharactersData}
                    initialNumToRender={4}
                    onEndReachedThreshold={0.1}
                    ItemSeparatorComponent={() => <View style={{ height: 15, backgroundColor: 'transparent' }} />}
                />
                <TostMessage type={toastMessageType} message={toastMessage} isTostMessageVisible={showTostMessage} />
                <FilterPage isFilterPageVisible={showFilterPage} HandleCancelButtonClick={HandleCancelButtonClick} StausCheckBoxes={filterPageStatusData} GenderCheckBoxes={filterPageGenderData} />
            </View>
        </View>

    )
}
export default forwardRef(Characters);