import React,{useEffect, useState} from 'react';

import './App.css';
import {CssBaseline,Grid} from '@material-ui/core'

import { getPlacesData,getWeatherData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import Footer from './components/Footer/Footer';

function App() {

const [coordinates,setCoordinates] = useState({})  
const [bound,setBound] = useState({})  
const [childClick, setChildClick] = useState(null);
const [loading, setLoading] = useState(false);
const [type, setType] = useState('hotels');
const [rating, setRating] = useState('');
const [fillterPlaces, setFillterPlaces] = useState([]);
const [weatherData, setWeatherData] = useState([]);



const [places, setPlaces] = useState([]);
  useEffect(()=>{

    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
      setCoordinates({lat:latitude,lng:longitude})
    })

  },[])
  useEffect(()=>{
    const fillterItems = places.filter((place)=> place.rating > rating)
    
    setFillterPlaces(fillterItems)

  },[rating])

  useEffect(()=>{

    if(bound.sw && bound.ne){

      getWeatherData(coordinates.lat,coordinates.lng).then((data)=>{
        console.log(data);
          setWeatherData(data)
      })

      setLoading(true)
      getPlacesData(type,bound.sw,bound.ne).then((data)=>{
        console.log(data);
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0 ));
      setFillterPlaces([])
      setLoading(false)
      
      // console.log(places);
    })
    
    
  }
    
    
    
  },[type,bound,coordinates])

  return (
  <>
  <CssBaseline/>
  <Header 
    setCoordinates={setCoordinates}  
  />
  <Grid container spacing={3} style={{width:'100%'}}>
    {/* xs == small size like phone take full width of 12 and md === medium device*/}
    <Grid item xs={12} md={4}>
    <List
     places={fillterPlaces.length ? fillterPlaces : places}
     childClick = {childClick} 
     loading={loading}
     type={type} 
     setType={setType}
     rating={rating}
     setRating={setRating}
    />
    </Grid>
    <Grid item xs={12} md={8}>
    <Map 
    setCoordinates={setCoordinates}
          setBounds={setBound}
          coordinates={coordinates}
          places={fillterPlaces.length ? fillterPlaces : places} 
          setChild={setChildClick}
          weatherData = {weatherData}
    />

    <Footer/>
    </Grid>
  </Grid>
  
  </>
  );
}

export default App;
