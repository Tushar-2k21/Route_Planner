import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet, Pressable, TouchableWithoutFeedback } from 'react-native';
import { useTranslation } from '../translation/TranslationContext.js';

const PersonsModal = ({ visible, onClose, onSelect }) => {

  const { locale, translatedStrings } = useTranslation();
  const [languageCode, setLanguageCode] = useState(locale);

  const chooseLanguage = (lang) => {
    setLanguageCode(lang);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Heading */}
          <Text style={styles.headingText}>Choose App Language</Text>

          {/* Options */}
          <TouchableOpacity onPress={() => chooseLanguage('en')} style={[styles.personOption, languageCode === 'en' && styles.selectedOption]}>
            <Text style={[styles.optionText, languageCode === 'en' && styles.selectedText]}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => chooseLanguage('hi')} style={[styles.personOption, languageCode === 'hi' && styles.selectedOption]}>
            <Text style={[styles.optionText, languageCode === 'hi' && styles.selectedText]}>Hindi</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => chooseLanguage('ta')} style={[styles.personOption, languageCode === 'ta' && styles.selectedOption]}>
            <Text style={[styles.optionText, languageCode === 'ta' && styles.selectedText]}>Tamil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => chooseLanguage('te')} style={[styles.personOption, languageCode === 'te' && styles.selectedOption]}>
            <Text style={[styles.optionText, languageCode === 'te' && styles.selectedText]}>Telugu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => chooseLanguage('gu')} style={[styles.personOption, languageCode === 'gu' && styles.selectedOption]}>
            <Text style={[styles.optionText, languageCode === 'gu' && styles.selectedText]}>Gujarati</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => chooseLanguage('bn')} style={[styles.personOption, languageCode === 'bn' && styles.selectedOption]}>
            <Text style={[styles.optionText, languageCode === 'bn' && styles.selectedText]}>Bengali</Text>
          </TouchableOpacity>

          {/* OK Button */}
          <TouchableOpacity className=" mt-6 mx-6 py-2 bg-black rounded-2xl" onPress={() => { onSelect(languageCode) }}>
            <Text className="font-bold text-white text-center" style={{ textAlignVertical: 'center', fontSize: 18 }}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '70%'
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  personOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: 'gray', // Add your custom style for selected option here
  },
  selectedText: {
    color: 'white', // Text color for selected option
  },
});

export default PersonsModal;
