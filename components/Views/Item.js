import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
const Item = (props) => {

    return (

        <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'rgb(242, 242, 242)', borderRadius: 10 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Image source={{ uri: props.character.image }} style={{ width: 60, height: 60, borderRadius: 30 }} />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'flex-start', display: 'flex', flexDirection: 'column', backgroundColor: 'transparent', flex: 3 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{props.character.name}</Text>
                <Text>{props.character.status} {props.character.species}</Text>
                <Text>Last know location:</Text>
                <Text>{props.character.location.name}</Text>
            </View>
        </View>
    );
};

export default Item;