import React from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet ,Pressable} from 'react-native';

const PersonsModal = ({ visible, onClose, onSelect }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => onSelect(1)} style={styles.personOption}>
            <Text style={styles.optionText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelect(2)} style={styles.personOption}>
            <Text style={styles.optionText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelect(3)} style={styles.personOption}>
            <Text style={styles.optionText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelect(4)} style={styles.personOption}>
            <Text style={styles.optionText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSelect(5)} style={styles.personOption}>
            <Text style={styles.optionText}>5</Text>
          </TouchableOpacity>
          
          {/* Add more options as needed */}
        </View>
      </Pressable>
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
  },
  personOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  optionText: {
    fontSize: 16,
  },
});

export default PersonsModal;
