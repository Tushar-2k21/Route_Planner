import React, { useState , useEffect} from 'react';
import { View, Text, Button, TouchableOpacity, Switch, Pressable,StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import {LockClosedIcon} from 'react-native-heroicons/solid';
import Routes from '../components/Routes.js';
import { FontAwesome6,FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from '../firebase.js';
import { collection, getDocs ,doc,getDoc} from "firebase/firestore"; 
import PersonsModal from '../components/PersonsModal.js';
import { useTranslation } from '../translation/TranslationContext.js';

const TestScreen = () => {
  const [city,setCity]=useState('New Delhi');
  const [fullData,setFullData]=useState();
  const handleSearch = async () => {

    try {
      const citiesCollectionRef = collection(db, 'cities');
      const docRef = doc(citiesCollectionRef, '07DrnlFoV6FAUHhpIeLb'); 
  
      const docSnapshot = await getDoc(docRef); // Use getDoc instead of getDocs
        
      const data = docSnapshot.data();
      setFullData(data);
      const cityData = data[city]; // Assuming 'city' is the key you're searching for

      if (cityData) 
      {
        console.log(`City '${city}' found \n `, cityData);

      } 
      else 
      {
        console.log(`City '${city}' not found in document.`);
      }

    } 
    catch (error) 
    {
      console.error('Error fetching data:', error.message);
    }
  }
  
  return (
    <TouchableOpacity className="mx-auto my-auto" onPress={handleSearch}>
      <Text>Fetch</Text>
    </TouchableOpacity>
    
  );
};

export default TestScreen;


// Mathura-b-Buses from Amar Travels (Agra), Raj Kalpana Travels, Ashok Bus Service  etc.-₹ 1199-6h 45m-Allahabad|6h 45m|₹ 1200