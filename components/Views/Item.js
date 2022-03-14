import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
const Item = (props) => {

    return (

        <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Image source={{ uri: props.character.image }} style={{ width: 100, height: 100 }} />
            <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{props.character.name}</Text>
                <Text>{props.character.status} {props.character.species}</Text>
                <Text>Last know location:</Text>
                <Text>{props.character.location.name}</Text>
            </View>
        </View>
    );
};

export default Item;