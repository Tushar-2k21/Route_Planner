import React from 'react';
import { View, Text, StyleSheet,Image, Pressable,Linking } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Ionicons,Fontisto } from '@expo/vector-icons';
import { useTranslation } from '../translation/TranslationContext.js';


const HotelCard = ({ data }) => {

    const {translatedStrings } = useTranslation();

    const handleVisitWebsite = () => {
        // Open the hotel's website URL in the browser
        Linking.openURL(data.url);
    };
    return (
        <View className="flex-1 p-4 bg-white m-5 rounded-lg">
            
            <Image source={{ uri: data.max_photo_url }} className="h-40 w-80 rounded-xl"  />

            <View className="flex-row mt-2">
                <Text className="font-extrabold" style={{fontSize:16}}>{translatedStrings.Name} : </Text>
                <Text className="text-blue-600 font-extrabold" style={{width:'80%',fontSize:16}}>{data.hotel_name}</Text>
            </View>
            
            <View className="flex-row mt-1">
                <Text className="font-extrabold" style={{fontSize:16}}>{translatedStrings.Address} : </Text>
                <Text className="text-orange-800 font-extrabold" style={{width:'80%',fontSize:16}}>{data.address}</Text>
            </View>

            <View className="absolute bg-white pl-1 pr-2 pt-1 rounded-xl" style={{marginLeft:20, marginTop:20}}>
                <View className="flex-row">
                    <Entypo name="star" size={18} color="black" />
                    <Text style={[styles.text, {alignItems:'flex-end',alignSelf: 'flex-end'}]} className="text-black">{data.review_score}</Text>
                </View>
            </View>

            <View className="flex-row mt-2">
                <View className="flex-row bg-gray-100 py-1 px-2 rounded-xl" style={{alignSelf:'center'}}>
                    <Ionicons name="pricetags-sharp" size={24} color="black" />
                    <Text style={styles.text}> {data.price_breakdown.currency} </Text> 
                    <Text className="font-extrabold text-green-500" style={{fontSize:16}} >{data.price_breakdown.all_inclusive_price}</Text> 
                </View>
                <Pressable onPress={handleVisitWebsite} className="ml-auto bg-yellow-100 p-2 rounded-lg">
                    <View className="flex-row">
                        <Text className="font-extrabold" style={{fontSize:16}}>{translatedStrings.Visit}  </Text>
                        <Fontisto name="share-a" size={18} color="black" />
                    </View>
                </Pressable>

            </View>

            
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 3,
    },
    mainCard:{
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.6,

      },
});

export default HotelCard;

