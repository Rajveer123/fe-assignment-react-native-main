import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
const Item = (props) => {

    return (

        <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'rgb(242, 242, 242)', borderRadius: 10 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1.8 }}>
                <Image source={{ uri: props.character.image }} style={{ width: 100, height: 100, borderRadius: 50, padding: 10 }} />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'flex-start', display: 'flex', flexDirection: 'column', backgroundColor: 'transparent', flex: 3, marginTop: 20, marginBottom: 20, marginLeft: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{props.character.name}</Text>
                <Text style={{ marginTop: 15, fontSize: 18 }}>{props.character.status} {props.character.species}</Text>
                <Text style={{ marginTop: 15, fontSize: 16 }}>Last know location:</Text>
                <Text style={{ fontWeight: '600', fontSize: 16 }}>{props.character.location.name}</Text>
            </View>
        </View >
    );
};

export default Item;