import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, TouchableOpacity,StyleSheet,ActivityIndicator } from 'react-native';
import HotelCard from '../components/HotelCard';
import { useTranslation } from '../translation/TranslationContext.js';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const HotelScreen = () => {
    const [city, setCity] = useState('');
    const [cityId, setCityId] = useState('-2106102');
    const [cityData, setCityData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const {translatedStrings } = useTranslation();


    const getCityId = async () => {
        console.log("Getting City Id");
        const url = `https://booking-com.p.rapidapi.com/v1/hotels/locations?name=${city}&locale=en-gb`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e38628a4bbmsh9f0e6aab78428b1p181216jsnad1638f86729',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            // console.log(result[0].dest_id);
            setCityId(result[0].dest_id);
            console.log("cityId ",cityId);
            return result[0].dest_id; // Return the city id
        } catch (error) {
            console.error(error);
        }
    };

    const getHotels = async (Id) => {
        console.log("Getting Hotel List");
        const url = `https://booking-com.p.rapidapi.com/v1/hotels/search?checkout_date=2024-09-15&order_by=popularity&filter_by_currency=AED&room_number=1&dest_id=${Id}&dest_type=city&adults_number=2&checkin_date=2024-09-14&locale=en-gb&units=metric&include_adjacency=true&children_number=2&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&page_number=0&children_ages=5%2C0`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e38628a4bbmsh9f0e6aab78428b1p181216jsnad1638f86729',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            setCityData(result.result);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    const handleSearch = async () => {
        console.log("Search Pressed");
        setIsLoading(true);
        const Id = await getCityId();
        await getHotels(Id);
    };

    return (
        <View className="flex-1 w-full bg-gray-200" >

            <View className="w-full h-52 rounded-b-2xl" style={{backgroundColor:'skyblue'}}>
                
                <View className="mt-16 " style={{ alignItems: 'center', alignSelf: 'center', }}>
                    <View className="flex-row">
                        <View className="px-4"style={{alignItems:'center',alignSelf: 'center'}}><FontAwesome6 name="hotel" size={24} color="black" /></View>
                        <Text className="font-extrabold text-black" style={{ alignItems: 'center', fontSize: 28, alignSelf: 'center' }}>{translatedStrings.Search_Hotels}</Text>
                    </View>
                </View>

                <View className=" flex-row mt-4 mx-5 p-1 px-4 bg-white" style={[styles.mainCard,{borderRadius:50}]}>
                    <TextInput className="font-bold px-3 text-black  rounded-md" placeholder={translatedStrings.Search_city}
                        value={city}
                        onChangeText={setCity}
                        style={{ width: '89%', fontSize:16 }}
                    />

                    <TouchableOpacity className="w-9 h-9 ml-1  bg-black" style={{borderRadius:100, alignItems: 'center', alignSelf: 'center'}} onPress={() => { handleSearch() }}>
                        <View className="my-auto"><FontAwesome name="search" size={22} color="white" /></View>
                    </TouchableOpacity>
                </View>
                
            </View>


            {cityData && cityData.length!=0 ?
                <ScrollView className="">
                   { cityData.map((hotel, index) => {
                    return <HotelCard key={index} data={hotel} />;
                })}
                </ScrollView>
                :<View className="mx-auto my-auto"><Fontisto name="hotel" size={86} color="gray" /></View>
            }

            {isLoading && (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}

        </View>
    );
};

export default HotelScreen;


const styles = StyleSheet.create({
    activityIndicatorContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainCard:{
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.6,
      elevation: 8,
    },
  });
