import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import DirectTrainCard from './DirectTrainCard';
import { useTranslation } from '../translation/TranslationContext.js';

function DirectTrains(props) {
  const { city, trainDataWithCost } = props;
  const {translatedStrings } = useTranslation();

  // State to manage visible trains, slider value, and sorted data
  const [visibleTrains, setVisibleTrains] = useState(5);
  const [sliderValue, setSliderValue] = useState(0.5);

  // Function to convert "HH:MM" to total minutes
  const parseDuration = (duration) => {
    const [hours, minutes] = duration.split(':').map(Number);
    return (hours * 60) + minutes; // Convert to total minutes
  };

  // Function to calculate the sorted data based on slider value
  const getSortedTrainData = (x) => {
    const y = 1 - x;
    return [...trainDataWithCost].sort((a, b) => {
      const costA = parseFloat(a.cost) || getRandomCost(1000, 3000); // Ensure cost is numeric
      const costB = parseFloat(b.cost) || getRandomCost(1000, 3000);
      const durationA = parseDuration(a.duration); // Convert duration to total minutes
      const durationB = parseDuration(b.duration);

      const zA = (x * costA) + (y * durationA); // Calculate combined metric
      const zB = (x * costB) + (y * durationB);
      console.log(zA,"<--->",zB)
      return zA - zB; // Sort by the combined metric
    });
  };

  // Initialize sorted train data
  const [sortedTrainData, setSortedTrainData] = useState(getSortedTrainData(sliderValue));

  // Use useEffect to re-sort train data when sliderValue changes
  useEffect(() => {
    const sorted = getSortedTrainData(sliderValue);
    setSortedTrainData(sorted); // Update the sorted train data
  }, [sliderValue, trainDataWithCost]); // Only re-run when these dependencies change

  const loadMoreTrains = () => {
    setVisibleTrains(prev => prev + 5); // Load more trains
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Slider for adjusting cost-duration balance */}
      <View style={{ padding: 10 }} className="flex-row justify-between">
        <Text>{translatedStrings.Time}</Text>
        <View className="w-60"><Slider
          value={sliderValue}
          onValueChange={setSliderValue} // Trigger re-render via useEffect
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          minimumTrackTintColor="#1E90FF"
          maximumTrackTintColor="#D3D3D3"
        /></View>
        <Text>{translatedStrings.Cost}</Text>
      </View>

      <ScrollView>
        {
          sortedTrainData.slice(0, visibleTrains).map((train, index) => (
            <DirectTrainCard key={index} city={city} {...train} />
          ))
        }

        {/* Load More button */}
        {visibleTrains < sortedTrainData.length && (
          <View style={{ padding: 10, alignItems: 'center' }}>
            <Button title={translatedStrings.Load_More} onPress={loadMoreTrains} />
          </View>
        )}
      </ScrollView>
      {console.log(sortedTrainData)}
    </View>
  );
}

export default DirectTrains;
