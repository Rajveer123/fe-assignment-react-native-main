import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function LoadingIndicator() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: 'column', backgroundColor: 'gray', position: 'absolute' }}>
            <ActivityIndicator color={"#fff"} />
            <Text style={{ marginTop: 30, fontSize: 20, fontWeight: 'bold', color: '#fff' }}> Loading....</Text>
        </View>
    )
}