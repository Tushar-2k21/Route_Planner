import React, { useState } from 'react';
import { View, Text, TextInput,Image, TouchableOpacity, ScrollView } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase'
import {EnvelopeIcon,LockClosedIcon} from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import ChangeLang from '../components/ChangeLang';
import { useTranslation } from '../translation/TranslationContext.js';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {translatedStrings } = useTranslation();


  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user; 
        // Handle successful login, e.g., navigate to another screen
        console.log("user Logged In");

      })
      .catch((error) => {
        // Handle login errors
        let errorMessage = '';
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'User not found. Please check your email and try again.';
            break;
          case 'auth/invalid-credential':
            errorMessage = 'Invalid credentials. Please try again.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email. Please enter a valid email address.';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your internet connection and try again.';
            break;
          default:
            errorMessage = error.message; // Other unexpected errors
        }
        setError(errorMessage);
      });
  };


  return (
    <View className="flex-1 bg-yellow-500">
        {/* <StatusBar hidden={true}/> */}
        <SafeAreaView className="flex">
            <View style={{ alignItems: 'center' }} className=" flex-none mt-6 mb-1">
              <Image  source={require('../assets/signup.png')} resizeMode="contain" className="w-60 h-60 "/>
            </View>
            <View className="flex-row justify-center">
                <Text className="text-white font-extrabold pt-1 pb-2" style={{textAlign: 'center', fontSize:28}}>{translatedStrings.Welcome}</Text>
                <Text className="text-black font-extrabold pt-1 pb-2" style={{textAlign: 'center', fontSize:28}}> {translatedStrings.Back}</Text>
            </View>
        </SafeAreaView>

        {/* white are for form */}

        <ScrollView className="flex-1 bg-white rounded-tr-[35] rounded-tl-[35]">
            {error && <Text className="text-red-600 px-2 pt-3 text-center">{error}</Text>}
            <View className="form mt-4 px-2 pb-2 ">  
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
                  <Text className=" text-gray-700 mx-2 font-bold">{translatedStrings.Password}</Text>
                </View>
                <TextInput 
                    className=" bg-gray-100 text-gray-700 mx-4 py-2 px-4 rounded-2xl"
                    secureTextEntry
                    placeholder={translatedStrings.Password}
                    value={password}
                    onChangeText={setPassword}
                    />
            </View>

            <TouchableOpacity className="flex items-end mx-6">
                <Text className="text-blue-300">{translatedStrings.Forgot_Password}</Text>
            </TouchableOpacity>

            <TouchableOpacity className=" mt-6 mx-6 py-3 bg-yellow-400 rounded-2xl" onPress={handleLogin}>
                <Text className="font-bold  text-center" style={{textAlignVertical: 'center', fontSize:18}}>{translatedStrings.Login}</Text>
            </TouchableOpacity>

            <Text className="font-bold text-center mt-2" style={{fontSize:18}}>{translatedStrings.OR}</Text>

            <TouchableOpacity className=" border border-black flex-row mt-6 mx-6 py-2 rounded-2xl justify-center my-2">
                <Image source={require('../assets/google.png')} className="w-7 h-7"/>
                <Text className=" mx-4 font-bold" style={{textAlignVertical: 'center', fontSize:18}} >{translatedStrings.Continue_with_Google}</Text>
            </TouchableOpacity>

            <View className="flex-row justify-center mt-4">
                <Text className="text-gray-500" >{translatedStrings.Dont_have_an_account}</Text>
                <TouchableOpacity 
                    className="flex items-end mx-1 "
                    onPress={()=>{setError(null);navigation.navigate('SignUp')}} >
                    <Text className="text-yellow-500">{translatedStrings.Register_Signup}</Text>
                </TouchableOpacity>
            </View>
            
        </ScrollView>

        <ChangeLang/>

    </View>
  );
};



export default LoginScreen;
