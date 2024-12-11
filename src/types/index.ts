import { Dispatch , SetStateAction } from "react";


export interface personStat{
    Day : string ,
    Age : string,
    Gender : string,
    A : number,
    B : number,
    C : number,
    D : number,
    E : number,
    F :number
}

export interface feature{
    feature : string,
    time_spent : number,
    fill : '#fcfcfc'
}

export interface DataPoint {
    date: string;
    events: number;
};

export interface featureChart {
    feature : feature ;
    chartData : DataPoint [] ;
}

export interface FeatureStateProps{
    feature : feature,
    setFeature : Dispatch<SetStateAction<feature>> ,
   
}