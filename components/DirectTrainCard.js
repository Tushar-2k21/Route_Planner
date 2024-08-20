import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from '../translation/TranslationContext.js';
import { useNavigation } from '@react-navigation/native';
// import { axios } from 'axios';

const DirectTrainCard = (props) => {
  const city=props.city;
  const tno=props.train_number;
  const tname=props.train_name;
  const duration=props.duration;
  const from_station_name=props.from_station_name;
  const fromCode=props.from;

  const navigation = useNavigation();
  const {translatedStrings } = useTranslation();

  // const {locale,translatedStrings } = useTranslation();
  const [stringToTranslate,setStringToTranslate]=useState();
  const [translated_station_name, setTranslatedStationName]=useState();
  const [translated_train_name, setTranslatedTrainName]=useState();

  const makeString= async()=>{
      console.log("Creating a string for translation");

      if (from_station_name && tname) {
        let x=from_station_name,y=tname;
        await setStringToTranslate(x.toString() + ' | ' + y.toString());
      } else {
        await setStringToTranslate(null);
      }

  }
  const translate = async()=>{
      console.log("String To Translate : ",stringToTranslate)

      {
        const url = 'https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=hi&api-version=3.0&profanityAction=NoAction&textType=plain';
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '--',
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
          },
          body: [
            {
              Text: 'Mathura Jn | Prayagraj Junction, Rajdhani Express'
            }
          ]
        };
        
        try {
          const response = await fetch(url, options);
          const result = await response.text();
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      }
  }

  const applyTranslation =async()=>{

  }

  const handleTranslate=async()=>{

      console.log("Translate Button Clicked");

      await makeString();  
      await translate();
      await applyTranslation();
  }




  return (
    <View style={styles.container} className="">

      <View className="flex-row border-black">
          <View className="flex-row my-1 bg-blue-400 rounded-md justify-center py-1" style={{width:'86%'}}>
                <FontAwesome5 name="train" size={24} color="white" className="px-4s"/>
                <Text className="px-2 text-white font-bold"style={{textAlign: 'center',fontSize:16}}>{translatedStrings.Train_Route}</Text>
          </View>
          {/* translate */}
          <Pressable className="bg-gray-200 rounded-lg px-2 my-1 ml-1" style={{justifyContent:'center'}}
            onPress={handleTranslate} >
            <MaterialCommunityIcons name="google-translate" size={24} color="black" />
          </Pressable>
      </View>

      <View className="flex-row">
        <Text>{translatedStrings.From} : </Text>
        <Text className="font-bold" style={{fontSize:16}} >{from_station_name}{' ('}{fromCode}{') '}</Text>
      </View>

      <View className="flex-row">
        <Text>{translatedStrings.To} :      </Text>
        <Text className="font-bold" style={{fontSize:16}} >PRYAGRAJ JN{'(PRYJ)'} </Text>
      </View>

      <View className="flex-row bg-gray-100 w-32 pl-1 rounded-md">
        <Text style={{fontSize:16}} className="py-1 font-extrabold">{translatedStrings.Train_No}</Text>
        <Text style={{fontSize:16}} className="py-1 px-2 font-extrabold text-blue-500">{tno}</Text>
      </View>

      <Text style={{fontSize:16}} className="text-amber-800 font-extrabold">{tname}</Text>

      <View className="flex-row justify-between">
          <View className="flex-row ">
            <Text style={{fontSize:16}} className="py-1 pr-1">{translatedStrings.Duration}:</Text>
            <Text style={{fontSize:16}} className="py-1 pr-1">{duration} hr</Text>
          </View>
          <View className="flex-row bg-gray-100 px-1 rounded-md">
            <View className="flex justify-center align-middle px-1"><FontAwesome5 name="rupee-sign" size={14} color="black" /></View>
            <Text style={{fontSize:18}} className="py-1 pr-1 font-extrabold text-green-500">{props.cost}</Text>
          </View>
      </View>
      <TouchableOpacity className="mx-auto bg-gray-100 px-2 rounded-md" onPress={()=>{navigation.navigate('Train Details', {...props})}}>
        <Text className="">{translatedStrings.More_Details} {'>'}</Text>
      </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    paddingBottom: 10,
    marginVertical: 10,
    marginHorizontal: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 2,
  },
});

export default DirectTrainCard;
