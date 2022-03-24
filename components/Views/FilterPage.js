import { View, Text, Dimensions } from 'react-native';
export default function FilterPage(props) {
    if (!props.isFilterPageVisible) {
        return null;
    }
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const tostMessageBGColor = props.type == 'info' ? 'green' : 'red';

    return (
        <View style={{ display: 'flex', backgroundColor: 'transparent', position: 'absolute', flex: 1, width: windowWidth, height: windowHeight, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ borderRadius: 5, justifyContent: 'centre', alignItems: 'center', backgroundColor: tostMessageBGColor, padding: 30, flex: 1 }}>
                <Text style={{ color: 'white', fontSize: 20 }}>Filter Page</Text>
            </View>
        </View>
    )
}