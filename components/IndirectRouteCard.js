import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useTranslation } from '../translation/TranslationContext.js';

const IndirectRouteCard = (props) => {
    const city = props.city;
    const data = props.data;
    const {translatedStrings } = useTranslation();

    // Split the data into individual legs of the route
    const legs = data.split('|');

    const renderTransportIcon = (mode) => {
        switch (mode) {
            case 'f':
                return <MaterialCommunityIcons name="airplane" size={24} color="white" />;
            case 't':
                return <MaterialIcons name="train" size={24} color="white" />;
            case 'c':
                return <FontAwesome5 name="car" size={24} color="white" />;
            case 'c':
                return <FontAwesome5 name="car" size={24} color="white" />
            case 'b':
                return <FontAwesome5 name="bus" size={24} color="white" />;
            default:
                return <FontAwesome name="question-circle" size={24} color="white" />;
        }
    };

    return (
        <View style={styles.container} className="my-4 rounded-xl bg-white">
            {legs.map((leg, index) => {

                // Split each leg into details
                const details = leg.split('-');

                // Extract details for each leg of the route
                let [from, mode_of_transport, transport_name, price, time, to] = details;

                // Check if it's the second last leg
                if (index === legs.length - 2) {
                    return (
                        <View key={index} className="flex-row justify-between ml-2 px-2 mx-auto bg-gray-200 rounded-md">
                            <Text>{translatedStrings.Total_Time} : {from}</Text>
                        </View>
                    );
                }
                // Check if it's the last leg
                if (index === legs.length - 1) {
                    return (
                        <View key={index} className="flex-row justify-between ml-2 px-2 mx-auto bg-gray-200 rounded-md">
                            <Text>{translatedStrings.Estimated_Cost} : {from}</Text>
                        </View>
                    );
                }
                return (
                    <View key={index}  className="p-2 rounded-md">
                        <View className="flex-row bg-blue-400 pl-1 rounded-md" style={{paddingVertical:2}}>
                            <Text className="font-bold mr-2 text-white" style={{fontSize:18}}>{from}</Text>
                            <View className="mx-2">{renderTransportIcon(mode_of_transport)}</View>
                            <Text className="font-bold mx-2 text-white" style={{fontSize:18}}>{to}</Text>
                        </View>

                        <Text style={{fontSize:16}} className="text-amber-800 py-1">{transport_name}</Text>

                        <View className="flex-row justify-between">
                            <Text>{translatedStrings.Duration}: {time}</Text>
                            <Text>{price}</Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2, // This is for Android, to display shadow properly
      },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    
    legTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default IndirectRouteCard;
