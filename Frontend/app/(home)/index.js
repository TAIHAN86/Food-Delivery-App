import { StyleSheet, Text, Alert, View,ScrollView,Pressable,TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Location from 'expo-location'
import { Octicons, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const HomeScreen = () => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Location Loading.....');
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false)
  useEffect(()=>{
   checkIfLocationEnabled();
   getCurrentLocation();
  },[])
  //check if location is enable or not
  const checkIfLocationEnabled= async ()=>{
    let enabled = await Location.hasServicesEnabledAsync();       //returns true or false
    if(!enabled){                     //if not enable 
      Alert.alert('Location not enabled', 'Please enable your Location', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }else{
      setLocationServicesEnabled(enabled)         //store true into state
    }
  }
  //get current location
  const getCurrentLocation= async ()=>{
       let {status} = await Location.requestForegroundPermissionsAsync();  //used for the pop up box where we give permission to use location 
      console.log(status);
       if(status !== 'granted'){
        Alert.alert('Permission denied', 'Allow the app to use the location services', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
       }

         //get current position lat and long
       const {coords} = await Location.getCurrentPositionAsync();  
       console.log(coords)
       
       if(coords){
        const {latitude,longitude} =coords;
        console.log(latitude,longitude);

       //provide lat and long to get the the actual address
        let responce = await Location.reverseGeocodeAsync({           
          latitude,
          longitude
        });
        console.log(responce);
        //loop on the responce to get the actual result
        for(let item of responce ){
         let address = `${item.name} ${item.city} ${item.postalCode}`
          setDisplayCurrentAddress(address)
        }
           }
  }
  
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      
      
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          padding: 10,
        }}
      >
      <Octicons name="location" size={24} color="#E52850" />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>Deliver To</Text>
          <Text style={{ color: "gray", fontSize: 16, marginTop: 3 }}>
            {displayCurrentAddress}
          </Text>
        </View>
        <Pressable
          style={{
            backgroundColor: "#6CB4EE",
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>S</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: "#C0C0C0",
          paddingVertical: 8,
          paddingHorizontal: 10,
          borderRadius: 11,
          marginTop: 10,
          marginHorizontal: 10,
        }}
      >
        <TextInput placeholder="Search for food, hotels" />
        <AntDesign name="search1" size={24} color="#E52B50" />
      </View>

    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})