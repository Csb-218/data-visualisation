import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {feature,featureChart} from '@/types';


interface barChartState {
    selectedFeature : feature | null,
    selectedAge : string | null,
    selectedGender : string | null,
    featureChart : featureChart | null,
    features: feature[]
}

const initialState : barChartState = {
    selectedFeature : null  ,
    selectedAge : null ,
    selectedGender : null ,
    featureChart : null,
    features:[]
}

const barChartSlice = createSlice({
    name : 'BarChart' ,
    initialState ,
    reducers : {

        setFeature:(state, action:PayloadAction<feature | null>)=>{
            state.selectedFeature = action.payload
        },

        setAge:(state, action:PayloadAction<string | null>)=>{
            state.selectedAge= action.payload
        },

        setGender:(state, action:PayloadAction<string | null>)=>{
            state.selectedGender = action.payload
            console.log(action.payload)
        },

        setFeatureChart:(state ,action:PayloadAction<featureChart | null>)=>{
            state.featureChart = action.payload
 
        } ,

        setFeatures:(state ,action:PayloadAction<feature[]>)=>{
            state.features = action.payload
 
        } 
    }
}) 

export const {setFeature , setGender , setAge , setFeatureChart , setFeatures} = barChartSlice.actions ;
export default barChartSlice.reducer ;