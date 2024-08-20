import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useTranslation } from '../translation/TranslationContext.js';

const TrainDetail = ({ route }) => {
  const props = route.params;
  const {translatedStrings } = useTranslation();

  return (
    <View className=" flex-1 p-4 bg-white">
      <View className="flex-row justify border border-blue-300 p-2 rounded-lg">
        <Text className="font-extrabold text-orange-900" style={{fontSize:16}}>{translatedStrings.Train_No} : </Text>
        <Text className="text-blue-500 font-extrabold"style={{fontSize:16}}>{props.train_number}</Text>
      </View>

      <View className="flex-row flex-wrap my-2 px-1">
        <Text className="font-extrabold text-orange-900" style={{fontSize:16}}>{translatedStrings.Name} : </Text>
        <Text className="text-amber-700 font-extrabold" style={{fontSize:16}}>{props.train_name}</Text>
      </View>

      <View className="flex-row flex-wrap border border-gray-200 p-1 rounded-lg justify-between">
        <View className="flex-row ">
          <Text className="font-extrabold py-1">{translatedStrings.Type} : </Text>
          <Text className="bg-gray-100 px-2 py-1 rounded-lg font-extrabold text-yellow-500">{props.train_type}</Text>
        </View>
        <View className="flex-row">
          <Text className="font-extrabold py-1">{translatedStrings.Special_Train} ? : </Text>
          <Text className="bg-gray-100 px-2 py-1 rounded-lg font-extrabold text-yellow-500">{props.special_train ? <Text>Yes</Text> : <Text>No</Text>}</Text>
        </View>
      </View>

      {/* from  */}
      <View className="flex-row justify-center mt-4 mx-4">
        <View  className="bg-gray-200 h-1 my-auto rounded-xl" style={{width:'44%'}}/>
        <Text className="border border-gray-200 p-2 px-4 font-extrabold text-gray-400 rounded-xl">{translatedStrings.From}</Text>
        <View className="bg-gray-200  h-1 my-auto rounded-xl" style={{width:'44%'}}/>
      </View>


      <View className="flex-row flex-wrap justify-between p-1 mt-1 bg-gray-50 rounded-lg">
        <Text className="font-extrabold" style={{fontSize:16}}>{translatedStrings.Station} : </Text>
        <Text className="text-blue-500 font-extrabold"style={{fontSize:16}}>{props.from_station_name}</Text>
      </View>

      <View className="flex-row flex-wrap justify-between p-1 mt-1 bg-white rounded-lg">
        <Text className="font-extrabold" style={{fontSize:16}}>{translatedStrings.Station_Code} :</Text>
        <Text className="font-extrabold"style={{fontSize:16}}>{'( '}{props.from}{' )'}</Text>
      </View>

      <View className="flex-row justify-between p-1 mt-1 bg-gray-50 rounded-lg ">
        <View className="flex-row">
          <Text className="font-extrabold" style={{fontSize:16}}>{translatedStrings.Arrival_Time} : </Text>
          <Text className="text-green-600 font-extrabold"style={{fontSize:16}}>{props.from_sta}</Text>
        </View>

        <View className="flex-row">
          <Text className="font-extrabold" style={{fontSize:16}}>{translatedStrings.Departure_Time} : </Text>
          <Text className="text-red-600 font-extrabold"style={{fontSize:16}}>{props.from_std}</Text>
        </View>
      </View>

      {/* to  */}

      <View className="flex-row justify-center mt-4 mx-3">
        <View  className="bg-gray-200 h-1 my-auto rounded-xl" style={{width:'44%'}}/>
        <Text className="border border-gray-200 p-2 px-4 font-extrabold text-gray-400 rounded-xl ">  {translatedStrings.To}  </Text>
        <View className="bg-gray-200  h-1 my-auto rounded-xl" style={{width:'44%'}}/>
      </View>

      <View className="flex-row flex-wrap justify-between p-1 mt-1 bg-gray-50 rounded-lg">
        <Text className="font-extrabold" style={{fontSize:16}}>{translatedStrings.Station} : </Text>
        <Text className="text-blue-500 font-extrabold"style={{fontSize:16}}>{props.to_station_name}</Text>
      </View>

      <View className="flex-row flex-wrap justify-between p-1 mt-1 bg-white rounded-lg">
        <Text className="font-extrabold" style={{fontSize:16}}>{translatedStrings.Station_Code} :</Text>
        <Text className="font-extrabold"style={{fontSize:16}}>{'( '}{props.to}{' )'}</Text>
      </View>

      <View className="flex-row justify-between p-1 mt-1 bg-gray-50 rounded-lg ">
        <View className="flex-row">
          <Text className="font-extrabold" style={{fontSize:16}}>{translatedStrings.Arrival_Time} : </Text>
          <Text className="text-green-600 font-extrabold"style={{fontSize:16}}>{props.to_sta}</Text>
        </View>

        <View className="flex-row">
          <Text className="font-extrabold" style={{fontSize:16}}>{translatedStrings.Departure_Time} : </Text>
          <Text className="text-red-600 font-extrabold"style={{fontSize:16}}>{props.to_std}</Text>
        </View>
      </View>

      

      <View className="flex-row justify-center my-4 ">
        <View  className="bg-gray-200 h-1 my-auto rounded-xl" style={{width:'100%'}}/>
      </View>


      <View className="flex-row justify-between px-1">
          <Text className="font-extrabold" style={{fontSize:16}}>{translatedStrings.Total_Journey_Duration} : </Text>
          <Text className="text-orange-800 font-extrabold"style={{fontSize:16}}>{props.duration} hr</Text>
        </View>
      
      <View className="flex-row ml-auto my-2 p-2 bg-gray-100 rounded-lg">
        <Text className="font-extrabold" style={{fontSize:16,alignSelf:'center'}}>{translatedStrings.Cost} : <FontAwesome name="rupee" size={16} color="black" /></Text>
        <Text className="text-green-400 font-extrabold" style={{fontSize:18,alignSelf:'center'}}> {props.cost}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stationSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});

export default TrainDetail;
