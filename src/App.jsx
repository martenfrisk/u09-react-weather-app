import React, { useEffect, useState } from 'react';
import './App.scss';
import TodaysWeather from './components/TodaysWeather'
import FiveDayForecast from './components/FiveDayForecast'
import { ReactComponent as LocationIcon } from './icon-location.svg'
import axios from 'axios'

function App() {
  const [ tempUnit, setTempUnit ] = useState('metric')
  const [ todayData, setTodayData ] = useState({})
  const [ fiveDayData, setFiveDayData ] = useState([])
  const [ location, setLocation ] = useState({latitude: "", longitude: ""})
  

  const apiKey = "?APPID=26d6aa7a16d6ccb2d3b33c09f1fe1244"
  const owmUrl = "https://api.openweathermap.org/data/2.5/"

  // 2nd apiKey: f861b57e016d087f66495be34cf0636d
  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoords)
    } else {
      alert('Unable to call on geolocation')
    }
  }

  const getCoords = (location) => {
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    })
  }
  
  const defaultLat = 59.33
  const defaultLon = 18.06
  let urlOptions = ""

  if (location.latitude === null || !location.latitude) {
    urlOptions = 
          apiKey +
          "&lat=" + 
          defaultLat + 
          "&lon=" + 
          defaultLon +
          "&units=" +
          tempUnit
  } else {
    const apiLat = location.latitude
    const apiLon = location.longitude
    urlOptions = 
          apiKey +
          "&lat=" + 
          apiLat.toFixed(2) + 
          "&lon=" + 
          apiLon.toFixed(2) +
          "&units=" +
          tempUnit
  }


  useEffect(() => {
    let url = owmUrl + "weather" + urlOptions
    axios({url: url, timeout: 4000})
    .then(function (response) {
      let data = response.data
      setTodayData({ 
        temp: data.main.temp, 
        temp_min: data.main.temp_min, 
        temp_max: data.main.temp_max, 
        name: data.name, 
        dt: data.dt,
        description: data.weather[0].description,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        humidity: data.main.humidity,
        windspeed: data.wind.speed
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  }, [location, tempUnit, urlOptions])

  useEffect(() => {
    let url = owmUrl + "forecast" + urlOptions
    axios({url: url, timeout: 4000})
    .then(function (response) {
      let data = response.data
      setFiveDayData({
        data: data.list
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  }, [location, tempUnit, urlOptions])
  


  return (
    <div className="App">


      <div className="topBar">
        <LocationIcon onClick={getLocation} className="geoLocation" />

        
          <button className="tempButton" onClick={() => setTempUnit('metric')}>Celsius</button>
          <button className="tempButton" onClick={() => setTempUnit('imperial')}>Fahrenheit</button>
          <button className="tempButton" onClick={() => setTempUnit('kelvin')}>Kelvin</button>
       
      </div>

      <TodaysWeather data={todayData} tempUnit={tempUnit} />
      <FiveDayForecast data={fiveDayData} tempUnit={tempUnit} />
    </div>
  )
}

export default App