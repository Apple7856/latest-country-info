import { Box, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

type countryStateData = {
  temperature: string
  weather_icons: string
  Wind_speed: number
  Precip: string
}

const CountryDetails = () => {
  const location: any = useLocation();
  const [clickShow, setClickShow] = useState<boolean>(false)
  const [weatherData, setWeatherData] = useState<countryStateData>({
    temperature: "",
    weather_icons: "",
    Wind_speed: 0,
    Precip: ""
  })

  function getCapitalData() {
    axios({
      method: "GET",
      url: `http://api.weatherstack.com/current?access_key=799d2cb12c98d1978925b8fa886e1e0a&query=${location.state.capital}`,
      responseType: "json"
    })
      .then((res) => {
        console.log(res.data.current);
        setWeatherData({
          temperature: res?.data?.current?.temperature,
          weather_icons: res?.data?.current?.weather_icons,
          Wind_speed: res?.data?.current?.wind_speed,
          Precip: res?.data?.current?.precip
        })
        setClickShow(true);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <>
      <Container maxWidth="xs" sx={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Typography variant='h3' data-testid="heading">Country Details</Typography>
        <Box>
          <Typography variant='body1' data-testid="capital">capital: {location.state.capital}</Typography>
          <Typography variant='body1' data-testid="population">Population: {location.state.population}</Typography>
          <Typography variant='body1' data-testid="latlng">latlng: {JSON.stringify(location.state.latlng)}</Typography>
          <Typography variant='body1' data-testid="flag">Flag: <img style={{ width: "50px" }} src={location.state.Flag} /></Typography>
          <Button variant='outlined' onClick={() => getCapitalData()}>Capital Weather</Button>
        </Box>
        {
          clickShow ?
            <Box>
              <Typography variant='h3'>Weather Details</Typography>
              <Box>
                <Typography variant='body1'>temperature: {weatherData.temperature}</Typography>
                <Typography variant='body1'>Wind_speed: {weatherData.Wind_speed}</Typography>
                <Typography variant='body1'>Precip: {weatherData.Precip}</Typography>
                <Typography variant='body1'>weather_icons: <img style={{ width: "50px" }} src={weatherData.weather_icons[0]} /></Typography>
              </Box>
            </Box>
            : ""
        }
      </Container>
    </>
  )
}

export default CountryDetails