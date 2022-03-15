import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
const Item = (props) => {
    const onlineStatusColor = (props.character.status == 'Alive') ? "green" : 'red';
    const statusTitle = props.character.status + " - " + props.character.species;

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
            <View style={{
                backgroundColor: 'white', flex: 1.2,
                height: 60, width: 60, alignSelf: 'flex-start',
                borderRadius: 30, alignSelf: 'flex-start',
                justifyContent: 'center',
                alignItems: 'center', marginTop: 10, marginRight: 10
            }}>
                <Image style={{ height: 40, width: 40, overflow: 'hidden' }} source={require('../../assets/favorite_icon.png')} />
            </View>
        </View >
    );
};

export default Item;