import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Characters from './components/Views/Characters.js';
import Favorites from './components/Views/Favorites.js';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const Badge = ({ badgeCount }) => (
  <View style={styles.circle}>
    <Text style={styles.count}>{badgeCount}</Text>
  </View>
);

export default function App() {
  const [charactersTabHeaderTitle, setCharactersTabHeaderTitle] = useState("All Characters ( 0 )");
  const [favouriteTabHeaderTitle, setFavouriteTabHeaderTitle] = useState("Saved Favrioutes (1)");
  //Initialize the local storage data for saved favourite items
  const savedFavriouteItems: React.DependencyList = [];
  const setSavedData = () => {
    AsyncStorage.getItem('savedFavriouteData').then((value) => {
      if (value == null) {
        try {
          AsyncStorage.setItem('savedFavriouteData', JSON.stringify(savedFavriouteItems));
        } catch (error) {
          console.log('There is an error while storing local storage :' + JSON.stringify(error));
        }
      }
    })
  }
  useEffect(() => {
    setSavedData();
  }, [])
  //Update title header name based on data we got after paggination 
  const updateCharacterTabTitle = React.useCallback((updatedharacterTabTitle) => {
    setCharactersTabHeaderTitle(updatedharacterTabTitle);
  }, []);

  const updateFavouriteTabTitle = React.useCallback((updatedFavouriteTabTitle) => {
    setFavouriteTabHeaderTitle(updatedFavouriteTabTitle);
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Characters') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'ios-list-outline' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',


        })}>
        <Tab.Screen name="Characters"
          children={() => <Characters updateHeaderTitle={updateCharacterTabTitle} />}
          options={{
            headerStatusBarHeight: 64,
            headerTitle: charactersTabHeaderTitle, tabBarLabel: "Characters", headerShown: true, headerTintColor: 'green', headerTitleAlign: 'left', headerRight: () => (
              <TouchableWithoutFeedback onPress={() => alert('Open Filter Model Window')}>
                <View style={{ marginBottom: 20 }}>
                  <View style={styles.filterImageContainer}>
                    <Image source={require('./assets/filter_icon.png')}
                      style={{ width: 30, height: 30 }} />
                  </View>
                  <Badge badgeCount={2} />
                </View>
              </TouchableWithoutFeedback>
            ),
          }} />
        <Tab.Screen name="Favorites"
          children={({ navigation }) => <Favorites updateHeaderTitle={updateFavouriteTabTitle} navigation={navigation} />}
          options={{ headerTitle: favouriteTabHeaderTitle, tabBarLabel: "Favorites", headerShown: true, headerTitleAlign: 'left', headerTintColor: 'green' }} />
      </Tab.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 15,
    backgroundColor: 'red',
    position: 'absolute',
    marginTop: -10,
    marginLeft: 30
  },
  count: {
    color: '#FFF'
  },
  filterImageContainer: {
    marginRight: 20,
    borderColor: 'gray',
    borderWidth: 1,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  }
});
