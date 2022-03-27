import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
export default function FilterPage(props) {
    if (!props.isFilterPageVisible) {
        return null;
    }

    const [statusCheckboxes, setStatusCheckboxes] = useState([{
        id: 1,
        title: 'Alive',
        name: 'alive',
        checked: false,
    }, {
        id: 2,
        title: 'Dead',
        name: 'dead',
        checked: false,
    }, {
        id: 3,
        title: 'Unknown',
        name: 'unknown',
        checked: false,
    }]);

    const toggleStatsCheckbox = (id, index) => {
        const statusCheckboxData = [...statusCheckboxes];
        statusCheckboxData[index].checked = !statusCheckboxData[index].checked;
        setStatusCheckboxes(statusCheckboxData);
    }
    const HandleCancelButtonClick = () => {
        const selectedCheckBoxes = statusCheckboxes.find((cb) => cb.checked === true);
        props.HandleCancelButtonClick != null && props.HandleCancelButtonClick("Rajveer", 2);
    }

    const StatusCheckboxesView = (function () {

        const checBoxesView = statusCheckboxes.map((cb, index) => {
            const checkBoxBGImage = cb.checked ? require('../../assets/checked_checkbox.png') : require('../../assets/unchecked_checkbox.png');
            return (
                <View style={{ flexDirection: "row", justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 10, height: 40 }}>
                        <TouchableWithoutFeedback onPress={() => { toggleStatsCheckbox(cb.id, index) }}>
                            <Image style={{ width: 40, height: 40 }} source={checkBoxBGImage} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 40 }}>
                        <Text style={{ marginLeft: 10, fontWeight: '600', color: 'gray', fontSize: 18 }}>{cb.title}</Text>
                    </View>
                </View>

            )
        });
        return checBoxesView;

    })();

    return (
        <View style={{ display: 'flex', position: 'absolute', flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
            <View style={{ borderRadius: 5, backgroundColor: 'white', flex: 1, width: '80%', height: '90%', margin: 50, position: 'absolute', flexDirection: 'column' }}>
                <TouchableWithoutFeedback onPress={HandleCancelButtonClick}>
                    <Image source={require('../../assets/cancel_icon.png')}
                        style={{ width: 40, height: 40, alignSelf: 'flex-end', margin: 10 }} />
                </TouchableWithoutFeedback>
                <View style={{ flex: 1, margin: 20, justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex', flexDirection: 'column' }}>
                    <Text style={{ color: 'green', fontSize: 25, fontWeight: '600' }}>Filters</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 20 }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>Status</Text>
                        <View>
                            {StatusCheckboxesView}
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 20 }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>Name</Text>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: '500', marginLeft: 30 }}>Rajveer</Text>
                    </View>

                </View>
            </View>
        </View>
    );

}