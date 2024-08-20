import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity ,Image} from 'react-native';
import { auth } from '../firebase'; // Import the auth instance from firebase.js
import { useTranslation } from '../translation/TranslationContext.js';
import ChangeLang from '../components/ChangeLang';

const ProfileScreen = ({ logout }) => {
  const [userEmail, setUserEmail] = useState(null);
  const {locale,translatedStrings } = useTranslation();

  useEffect(() => {
    // Get the current user from Firebase Authentication
    const currentUser = auth.currentUser;

    if (currentUser) {
      const email = currentUser.email;
      setUserEmail(email);
    }
  }, []);

  return (
    <View className="flex-1 bg-blue-400">
        <View className="">
          <Image  source={require('../assets/profile.png')} resizeMode="stretch" className=" mt-20 mx-auto w-60 h-60 "/>
        </View>

        <View className="flex-1 bg-white rounded-tl-3xl rounded-tr-3xl">
          <Text className="mt-8 font-extrabold" style={{textAlign: 'center',fontSize:18}}>{translatedStrings.User} : {userEmail}</Text>

          <TouchableOpacity className=" mt-6 mx-6 py-2 bg-blue-400 rounded-2xl" onPress={logout}>
                <Text className="font-bold text-white text-center" style={{textAlignVertical: 'center', fontSize:18}}>{translatedStrings.Logout}</Text>
          </TouchableOpacity>
        </View>
        {console.log("profile locale=",locale)}
  
        <ChangeLang/>

    </View>
  );
};


export default ProfileScreen;
