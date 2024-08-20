import React, { useState , useEffect} from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, Pressable, ScrollView, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {cityData2} from '../data/citydata2'
import { cityDataHindi } from '../data/cityDataHindi';

const FillCity = ({route}) => {

    const navigation = useNavigation();
    const { setCity, setStationList } = route.params;

    const [thisCity,setThisCity]=useState('');

    const selectCity=(cityName,stationList)=>{
        setCity(cityName);
        const stationCodeList = stationList.map(station => station.station_code);
        setStationList(stationCodeList);
        navigation.navigate('HomeScreen');
    }


    return (
        <View className="">
            {/* <Text className="mt-10 mx-auto font-extrabold" style={{textAlignVertical: 'center', fontSize:32}}>Search City</Text> */}
            <View  className=" flex-row mt-4 mx-4 p-2 pl-4 rounded-2xl border border-gray-400">
                <Text className="font-bold p-1 text-gray-600 ">From : </Text>
                <TextInput className="flex-1 mr-4 font-bold px-3 bg-white text-gray-600 rounded-md"
                    placeholder='New Delhi'
                    value={thisCity}
                    onChangeText={setThisCity}
                    />
            </View>

            {thisCity=='' ? null :
                <ScrollView className="flex mx-4 p-1  rounded-lg border border-gray-200 bg-gray-200 ">
                        {cityData2.filter(item =>
                        item.city_name.toLowerCase().includes(thisCity.toLowerCase())
                        ).map((item, index) => (
                        <TouchableOpacity onPress={()=>{selectCity(item.city_name,item.stations)}}key={index} 
                            className="p-2 flex m-1 border-x-4 border-gray-100">
                            <Text className="font-bold">{item.city_name}</Text>
                        </TouchableOpacity>
                        ))
                        }
                </ScrollView> 
            }
        </View>
    )
}

export default FillCity