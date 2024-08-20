import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Touchable,Image, TouchableOpacity, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase'
import {ArrowLeftIcon,EnvelopeIcon,LockClosedIcon} from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useTranslation } from '../translation/TranslationContext.js';


const SignUpScreen2 = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {translatedStrings } = useTranslation();


  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user; 
        // Handle successful signUp, e.g., navigate to Login screen
        console.log("SignUp successful");
        Toast.show({
          type: 'success',
          text1: 'SignUp Successful',
          position: 'bottom',
          visibilityTime: 4000,
        });
      })
      .catch((error) => {
        // Handle sign-up errors
        let errorMessage = '';
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'Email already in use. Please use a different email.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email. Please enter a valid email address.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Weak password. Please enter a stronger password.';
            break;
          case 'auth/misssing-password':
            errorMessage = 'Please enter the password.';
            break;
          default:
            errorMessage = error.message; // Other unexpected errors
        }
        setError(errorMessage);
      });
  };


  return (
    <View className="flex-1 bg-sky-400">
        {/* <StatusBar hidden={true}/> */}
        <SafeAreaView className="flex">
            <View className="flex-row justify-start">
                <TouchableOpacity className="bg-black p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-4 absolute"
                        onPress={()=>{setError(null);navigation.goBack()}}    
                >
                    <ArrowLeftIcon size="20" color="white"/>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-center mt-10">
              <Image source={require('../assets/signup2.png')} className="w-60 h-60"/>
            </View>
            <View className="flex-row justify-center">
                <Text className="text-white font-extrabold pt-1 pb-2" style={{textAlign: 'center', fontSize:28}}>{translatedStrings.Hello}</Text>
                <Text className="text-black font-extrabold pt-1 pb-2" style={{textAlign: 'center', fontSize:28}}> {translatedStrings.There}</Text>
            </View>
        </SafeAreaView>

        {/* white are for form */}

        <ScrollView className="flex-1 bg-white rounded-tr-[35] rounded-tl-[35]">
            {error && <Text className="text-red-600 px-2 pt-3 text-center">{error}</Text>}
            <View className="form mt-4 px-2 [b-2] ">  
                <View className="flex-row  pl-2 my-2 ml-3">
                  <EnvelopeIcon size="20" color="black"/>
                  <Text className=" text-gray-700 mx-2 font-bold border-red-500 ">{translatedStrings.Email}</Text>
                </View>
                <TextInput 
                    className="bg-gray-100 text-gray-700 mx-4 py-2 px-4 rounded-2xl"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    placeholder='example@gmail.com'/>
            </View>

            <View className="form  p-2 ">  
                <View className="flex-row pl-2 my-2 ml-3">
                  <LockClosedIcon size="20" color="black"/>
                  <Text className=" text-gray-700 mx-2 font-bold ">{translatedStrings.Password}</Text>
                </View>
                <TextInput 
                    className=" bg-gray-100 text-gray-700 mx-4 py-2 px-4 rounded-2xl"
                    secureTextEntry
                    placeholder={translatedStrings.Password}
                    value={password}
                    onChangeText={setPassword}
                    />
            </View>

            <TouchableOpacity className=" mt-6 mx-6 py-3 bg-sky-400 rounded-2xl" onPress={handleSignUp}>
                <Text className="font-bold text-white text-center" style={{textAlignVertical: 'center', fontSize:18}}>{translatedStrings.Signup}</Text>
            </TouchableOpacity>

            <Text className="font-bold text-center mt-2" style={{fontSize:18}}>{translatedStrings.OR}</Text>

            <TouchableOpacity className=" border border-black flex-row mt-6 mx-6 py-2 rounded-2xl justify-center my-2">
                <Image source={require('../assets/google.png')} className="w-7 h-7"/>
                <Text className=" mx-4 font-bold" style={{textAlignVertical: 'center', fontSize:18}} >{translatedStrings.Sign_in_with_google}</Text>
            </TouchableOpacity>
            
        </ScrollView>

    </View>
  );
};



export default SignUpScreen2;
