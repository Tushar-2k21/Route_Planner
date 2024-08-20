import { View, Text,Pressable } from 'react-native'
import {React,useState} from 'react'
import { FontAwesome6,FontAwesome } from '@expo/vector-icons';
import LanguageModal from '../components/LanguageModal.js'
import { useTranslation } from '../translation/TranslationContext.js';


const ChangeLang = () => {
  const { locale, changeLocale, translatedStrings } = useTranslation();
  const [showLanguage, setShowLanguage]=useState(false);

  const handleLanguageChange = (newLocale) => {
    changeLocale(newLocale);
    setShowLanguage(false);
  };

  return (
    <Pressable className="absolute p-2 mt-16" onPress={()=>{setShowLanguage(true)}} style={{ right: 20, }}>
        <View className="flex-row">
            <FontAwesome name="language" size={28} color="black" />
            <LanguageModal
              visible={showLanguage}
              onClose={() => setShowLanguage(false)}
              onSelect={handleLanguageChange}
            />
        </View>
    </Pressable>
  )
}

export default ChangeLang