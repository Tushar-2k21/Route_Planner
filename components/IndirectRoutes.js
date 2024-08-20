import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import IndirectRouteCard from './IndirectRouteCard';
import NoIndirectRoutes from './NoIndirectRoute';
import { useTranslation } from '../translation/TranslationContext.js';

const IndirectRoutes = (props) => {
    const {translatedStrings } = useTranslation();

    const [itemsToShow, setItemsToShow] = useState(3);
    const [sliderValue, setSliderValue] = useState(0.5);
    const [sortedRouteData, setSortedRouteData] = useState([]);
    const { indirectRouteData: data, city } = props;

    const parseRouteString = (routeString) => {
        const realRoute=routeString;
        const parts = routeString.split('|'); // Split the string into parts
        
        const totalDuration = parts[parts.length - 2].trim(); // Get the total duration
        const totalCost = parseFloat(parts[parts.length - 1].replace('₹ ', '')); // Get the total cost

        return {
            realRoute,
            totalDuration,
            totalCost,
        };
    };

    const parseDuration = (duration) => {
        const [hours, minutes] = duration.split('h ');
        return (parseInt(hours, 10) * 60) + parseInt(minutes, 10); // Convert "Xh Ym" to total minutes
    };
    
    const getSortedRouteData = (x) => {
        const y = 1 - x; // Slider value for balancing time and cost
        return data
            .map(parseRouteString) // Convert to objects with total duration and total cost
            .sort((a, b) => {
                const zA = (x * a.totalCost) + (y * parseDuration(a.totalDuration));
                const zB = (x * b.totalCost) + (y * parseDuration(b.totalDuration));
                return zA - zB; // Sort by the calculated balancing value
            });
    };

    useEffect(() => {
        if (data) {
            const sortedData = getSortedRouteData(sliderValue);
            setSortedRouteData(sortedData);
        }
    }, [sliderValue, data]); // Re-run when these dependencies change

    const handleLoadMore = () => {
        setItemsToShow((prev) => prev + 3); // Increase the number of items to show
    };

    return (
        <View style={{ flex: 1 }}>

            {/* Slider for adjusting cost-duration balance */}
            {
                !data ? null :
                <View style={{ padding: 10 }} className="flex-row justify-between">
                    <Text>{translatedStrings.Time}</Text>
                    <View className="w-60">
                        <Slider
                        value={sliderValue}
                        onValueChange={setSliderValue} // Trigger re-render via useEffect
                        minimumValue={0}
                        maximumValue={1}
                        step={0.01}
                        minimumTrackTintColor="#1E90FF"
                        maximumTrackTintColor="#D3D3D3"
                        />
                    </View>
                    <Text>{translatedStrings.Cost}</Text>
                </View>
            }
            

            <ScrollView className="bg-gray-200">

                {data && sortedRouteData.length > 0 ? (
                    <>
                        {sortedRouteData.slice(0, itemsToShow).map((route, index) => (
                            <View key={index} style={{ marginBottom: 10 }}>
                                <IndirectRouteCard data={route.realRoute} city={city} />
                            </View>
                        ))}

                        {sortedRouteData.length > itemsToShow && (
                            <View style={{ padding: 10, alignItems: 'center' }}>
                                <Button title={translatedStrings.Load_More} onPress={handleLoadMore} />
                            </View>
                        )}
                    </>
                ) : (
                    <NoIndirectRoutes />
                )}
            </ScrollView>
        </View>
    );
};

export default IndirectRoutes;
