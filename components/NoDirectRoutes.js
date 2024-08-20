import React from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { useTranslation } from '../translation/TranslationContext.js';

const NoDirectRoutes = () => {
  const {translatedStrings } = useTranslation();

  return (
    <ScrollView className="bg-gray-200">
        <View style={styles.container}>
          <Text style={styles.text}>{translatedStrings.Sorry_No_data_available}</Text>
        </View>
    </ScrollView>
  )  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default NoDirectRoutes