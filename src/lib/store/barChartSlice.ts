import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {feature,featureChart} from '@/types';


interface barChartState {
    selectedFeature : feature | null,
    selectedAge : string | null,
    selectedGender : string | null,
    featureChart : featureChart | null
}

const initialState : barChartState = {
    selectedFeature : null  ,
    selectedAge : null ,
    selectedGender : null ,
    featureChart : null
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
 
        } 
    }
}) 

export const {setFeature , setGender , setAge , setFeatureChart} = barChartSlice.actions ;
export default barChartSlice.reducer ;