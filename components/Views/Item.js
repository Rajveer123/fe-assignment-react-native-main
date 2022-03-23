import React, { Component, useCallback, useEffect } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Item = (props) => {
    const onlineStatusColor = (props.character.status == 'Alive') ? "green" : 'red';
    const statusTitle = props.character.status + " - " + props.character.species;
    const rightImage = props.type == 'Add' ? require('../../assets/favorite_icon.png') : require('../../assets/delete_icon.png');
    //Below Method will check item is already added or not in Array
    const alreadyContainsFavItem = (obj, list) => {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].id === obj.id) {
                return true;
            }
        }
        return false;
    }

    const handleRightImageClick = () => {

        var savedItemsData = [];
        AsyncStorage.getItem('savedFavriouteData').then((value) => {
            if (props.type == "Add") {
                if (value == null || value == undefined || (value != null && typeof (value) == Array && value.length == 0)) {
                    savedItemsData.push(props.character);
                } else {
                    savedItemsData = JSON.parse(value);
                    //Checking if item already added as favrioute item
                    if (!alreadyContainsFavItem(props.character, savedItemsData)) {
                        savedItemsData.push(props.character);
                    } else {
                        //Showing toast message after removing item
                        props.handleToastMessage != null && props.handleToastMessage('Already Faviourite Item.', 'error');
                        return;
                    }
                    props.handleToastMessage != null && props.handleToastMessage('Successfully saved.', 'info');
                }

            } else {
                if (value != null && JSON.parse(value).length > 0) {
                    savedItemsData = JSON.parse(value);
                    //Perform delete operation
                    savedItemsData = savedItemsData.filter(item => item.id !== props.character.id);
                    props.handleToastMessage != null && props.handleToastMessage('Faviourite Item Removed Successfully.', 'info');
                }

            }
            try {
                AsyncStorage.setItem('savedFavriouteData', JSON.stringify(savedItemsData));
                //Reload Faviourite Page again after removing item
                props.onRefresh != null && props.onRefresh(savedItemsData);
            } catch (error) {
                console.log('There is an error while storing local storage :' + JSON.stringify(error));
            }
        });

    }

    return (
        <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'rgb(242, 242, 242)', borderRadius: 10 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 2, padding: 10 }}>
                <Image source={{ uri: props.character.image }} style={{ width: 100, height: 100, borderRadius: 50 }} />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'flex-start', display: 'flex', flexDirection: 'column', backgroundColor: 'transparent', flex: 3, marginTop: 20, marginBottom: 20, marginLeft: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{props.character.name}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <View style={{ marginTop: 5, height: 15, width: 15, borderRadius: 7.5, backgroundColor: onlineStatusColor }} />
                    <Text style={{ marginTop: 5, marginLeft: 10, fontSize: 18, alignSelf: 'center' }}>{statusTitle}</Text>
                </View>
                <Text style={{ marginTop: 15, fontSize: 16 }}>Last know location:</Text>
                <Text style={{ fontWeight: '600', fontSize: 16 }}>{props.character.location.name}</Text>
            </View>
            <TouchableWithoutFeedback onPress={handleRightImageClick}>
                <View style={{
                    backgroundColor: 'white', flex: 1.2,
                    height: 60, width: 60, alignSelf: 'flex-start',
                    borderRadius: 30, alignSelf: 'flex-start',
                    justifyContent: 'center',
                    alignItems: 'center', marginTop: 10, marginRight: 10
                }}>
                    <Image style={{ height: 40, width: 40, overflow: 'hidden' }} source={rightImage} />
                </View>
            </TouchableWithoutFeedback>
        </View >

    )
};


export default Item;