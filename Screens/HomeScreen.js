// HomeScreen.js
import React, { useState , useEffect} from 'react';
import { View, Text, Button, TouchableOpacity, Switch, Pressable,StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import {LockClosedIcon} from 'react-native-heroicons/solid';
import Routes from '../components/Routes.js';
import { FontAwesome6,FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from '../firebase.js';
import { collection, getDocs,doc,getDoc } from "firebase/firestore"; 
import PersonsModal from '../components/PersonsModal.js';
import { useTranslation } from '../translation/TranslationContext.js';

function getRandomCost(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const HomeScreen = ({navigation,logout}) => {

  const {translatedStrings } = useTranslation();

  const [city,setCity]=useState('Mathura');
  const [stationList,setStationList]=useState(["MTJ"]); // *** change it to MTJ ***8
  const [count,setCount]=useState(1); // no of passengers
  const [isLoading, setIsLoading] = useState(false);
  const [routeVisibility, setRouteVisibility]=useState(false); // make this false here

  const [toStationCode,setToStationCode]=useState('PRYJ'); // **** change it to PRYJ ****

  const [currentDate,setCurrentDate]=useState(new Date());
  const dt=new Date();
  const [dateOfJourney, setDateOfJourney] = useState(dt.toISOString().slice(0,10));

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLanguage, setShowLanguage]=useState(false);

  const [trainData, setTrainData] = useState();

  const trainDataWithCost = trainData ? trainData.map(train => ({
    ...train,
    cost: train.cost || getRandomCost(1000, 2000),
  })) : [];

  const [indirectRouteData, setIndirectRouteData]=useState();
  const [fbData,setFBData]=useState();
  
  console.log(trainData);


  const handleSearch = async () => {
    console.log("search pressed");

    setIsLoading(true);
  
    try {
      const promises = stationList.map(async (fromStation) => {
        const url = `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=${fromStation}&toStationCode=${toStationCode}&dateOfJourney=${dateOfJourney}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'd49a0fef48mshfd1215f557b8297p118a71jsn7acfde364f25',
            'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
          }
        };
  
        const response = await fetch(url, options);
        const result = await response.json();
        if(result.message!="Success"){
            Toast.show({
                type: 'error',
                text1: 'API message = Failure',
                position: 'bottom',
                visibilityTime: 4000,
              });
        }
        return result.data;
      });
      const allTrainData = await Promise.all(promises);

      setTrainData(allTrainData.flat()); // Flatten the array of arrays

      setIsLoading(false);
    setRouteVisibility(true);
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Some Error Occurred',
        position: 'bottom',
        visibilityTime: 4000,
      });
      console.error('API Error : ',error);
    }

    // handling indirect routes when search is pressed

    if(fbData)// data already present
    {
        setIsLoading(true);
        const cityData = fbData[city];

        if(cityData){
          console.log("HomeScreen indirect route city data \n", cityData);
          setIndirectRouteData(cityData);
        }
        else{
          console.log(`City '${city}' not found in document.`);
          setIndirectRouteData(null); // Set indirect_route_data to null if the city is not found
        }
    
        setIsLoading(false);
    }
    else
    {
          try {
            setIsLoading(true);
            const citiesCollectionRef = collection(db, 'cities');
            const docRef = doc(citiesCollectionRef, '07DrnlFoV6FAUHhpIeLb');
            const docSnapshot = await getDoc(docRef);

            const data = docSnapshot.data();


            const cityData = data[city];

            if(cityData){
              console.log("HomeScreen indirect route city data \n", cityData);
              setIndirectRouteData(cityData);
            }
            else{
              console.log(`City '${city}' not found in document.`);
              setIndirectRouteData(null); // Set indirect_route_data to null if the city is not found
            }
        
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching data:', error);
            Toast.show({
                  type: 'error',
                  text1: 'Error in Fetching Data for Multimode',
                  position: 'top',
                  visibilityTime: 4000,
                });
        }
    }
    
    
  };
  


  const handleFillCity=()=>{
        navigation.navigate('FillCity',{setCity: setCity, setStationList:setStationList});
  }

  const onChangeDate = (event, selectedDate) => {
    const d = selectedDate || currentDate;
    const formattedDate = d.toISOString().slice(0, 10);
    setDateOfJourney(formattedDate);
    setShowDatePicker(false);
    }
  
  const handlePersonSelect = (personCount) => {
    setCount(personCount);
    setShowModal(false);
  };  


  return (
    <View className="flex-1 bg-yellow-500 ">

        {/* Header  */}
        <View className="absolute mt-16 " style={{alignItems:'center',alignSelf: 'center'}}>
            <View className="flex-row">
                <View className="px-4"style={{alignItems:'center',alignSelf: 'center'}}><FontAwesome6 name="route" size={24} color="black" /></View>
                <Text className="font-extrabold" style={{alignItems:'center',fontSize:28,alignSelf: 'center'}}>{translatedStrings.AppName}</Text>
            </View>
        </View>      

      {/* route Search Card */}
      <View className="bg-white mt-28 rounded-2xl py-2" style={styles.mainCard}>

            {/* From City */}
            <TouchableOpacity onPress={()=>{handleFillCity()}} className=" flex-row mt-4 mx-4 p-2 pl-4 rounded-2xl border-2 border-black">
                <Text className="font-bold p-1 text-black ">{translatedStrings.From} : </Text>
                 <Text className="font-bold px-3 py-1  text-black bg-gray-100 rounded-md">{city}</Text>
             </TouchableOpacity>

             {/* To City  */}
            <View className="flex-row mt-4 mx-4 p-2 pl-4 rounded-2xl border-2 border-black ">
                <View className="flex-none my-auto"><LockClosedIcon size="18" color="black" /></View>
                <View className="ml-2">
                  <Text className="font-extrabold text-black py-1">{translatedStrings.Destination}</Text>
                </View>
            </View>

            {/* Date and Number of Persons */}
            <View className="flex-row my-2 mx-4">

                {/* Date Picker  */}
                <View className="flex-1 px-2 rounded-lg">
                    <Text className="font-extrabold text-black" style={{textAlignVertical: 'center'}}>{translatedStrings.Date}</Text>
                    <TouchableOpacity className="justify-center" onPress={() => setShowDatePicker(true)} >
                        <Text className="bg-black text-white p-1 px-2 rounded-md font-bold " >{dateOfJourney}</Text>
                    </TouchableOpacity>
                </View>

                <Pressable className=" flex-1  px-2 rounded-lg" onPress={()=>{setShowModal(true)}}>
                      <Text className="font-bold text-black" style={{textAlignVertical: 'center'}}>{translatedStrings.Persons}</Text>
                      <View className="justify-center" >
                      <PersonsModal
                        visible={showModal}
                        onClose={() => setShowModal(false)}
                        onSelect={handlePersonSelect}
                      />
                      <Text className="bg-black text-white p-1 px-2 rounded-md font-bold " >{count}</Text>
                    </View>
                </Pressable>

            </View>

            

             {/* Search Button  */}
            <TouchableOpacity className="flex-none   py-2 mx-4 my-1 rounded-xl  bg-yellow-500 " onPress={()=>{handleSearch()}}>
              <Text className="text-center font-extrabold text-black" style={{textAlignVertical: 'center', fontSize:18}} >{translatedStrings.Search}</Text>
            </TouchableOpacity>

      </View>
      
      <View className="flex-1  bg-gray-200 mt-60">
            {/* all the route displey stuff */}

            {routeVisibility==false 
            ? <View className="flex-1 bg-gray-200 mt-36 justify-center" style={{alignItems:'center'}}>
                  <FontAwesome6 name="person-walking-luggage" size={86} color="lightgray" />
              </View>
            :<Routes city={city} trainDataWithCost={trainDataWithCost} indirectRouteData={indirectRouteData} /> 
            }
      </View>

      {showDatePicker && (
            <DateTimePicker
            value={currentDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
            minimumDate={new Date()} 
            />
        )}
      
      
      {isLoading && (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        )}
      

    </View>
  );
};


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
        width: 2,
        height: 3,
      },
      shadowOpacity: 0.45,
      shadowRadius: 4.84,
      elevation: 8,
      position: 'absolute',zIndex: 10,alignSelf: 'center',width:'85%' ,
    },
  });

export default HomeScreen;


