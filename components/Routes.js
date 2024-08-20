import { View, Text ,TouchableOpacity, ScrollView} from 'react-native'
import React, { useState , useEffect} from 'react';
import DirectTrains from './DirectTrains'
import NoDirectRoutes from './NoDirectRoutes'
import IndirectRoutes from './IndirectRoutes';
import { useTranslation } from '../translation/TranslationContext.js';


const Routes = (props) => {
    const city=props.city;
    const trainDataWithCost=props.trainDataWithCost;
    const indirectRouteData=props.indirectRouteData;


    const {translatedStrings } = useTranslation();

    // console.log("train data in routes :" + trainData);
    const [directVisibility,setDirectVisibility]=useState(true);

  return (
    <View className="flex-1 mt-32 mx-6">
        <View className="flex-row justify-between mt-6 rounded-l-2xl rounded-r-2xl bg-gray-50 ">

            <TouchableOpacity className="flex-1 j py-4 rounded-l-2xl" onPress={()=>{setDirectVisibility(true)}} style={[directVisibility && {backgroundColor:'#facc15'}]}>
            <Text className="font-extrabold " style={{textAlign: 'center'}}>{translatedStrings.Single_mode}</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1  py-4 rounded-r-2xl" onPress={()=>{setDirectVisibility(false)}}style={[!directVisibility && {backgroundColor:'#facc15'}]}>
                <Text className="font-extrabold" style={{textAlign: 'center'}}>{translatedStrings.Multi_mode}</Text>
            </TouchableOpacity>

        </View>

        {
            directVisibility==false ? null :
            (
                !trainDataWithCost || trainDataWithCost.length==0    // make it 0 
                ? <NoDirectRoutes key="noDirect" style={{ flex: 1, backgroundColor: 'blue' }} />
                : <DirectTrains key="directTrains" style={{ flex: 1, backgroundColor: 'blue' }} city={city} trainDataWithCost={trainDataWithCost}/>
            )
            
        }

        {
            directVisibility==true ? null 
            : <IndirectRoutes key="IndirectRoutes" style={{ flex: 1, backgroundColor: 'blue' }} 
                city={city} indirectRouteData={indirectRouteData} />

        }

    </View>
  )
}

export default Routes