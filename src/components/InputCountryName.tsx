import { Button, Container, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

type countryStateData = {
  capital: string
  Population: number
  latlng: string | number
  Flag: string
}

const InputCountryName = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [run, setRun] = useState<boolean>(false);
  const [countryData, setCountryData] = useState<countryStateData>({
    capital: "",
    Population: 0,
    latlng: "",
    Flag: ""
  })

  function getCountryInfo() {
    axios({
      method: "GET",
      url: `https://restcountries.com/v3.1/name/${inputValue}`,
      responseType: "json"
    })
      .then((res) => {
        setCountryData({
          capital: res?.data[0]?.capital,
          Population: res?.data[0]?.population,
          latlng: res?.data[0]?.latlng,
          Flag: res?.data[0]?.flags?.png
        })
      })
      .catch((error) => {
        console.log(error);
      })
    setRun(true);
  }

  useEffect(() => {
    if (run) {
      navigate("/country-details", { state: countryData })
      return () => {
        setRun(false);
      }
    }
  }, [countryData])

  return (
    <>
      <Container maxWidth="xs" sx={{ height: "100vh", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
      <Typography variant='h3' data-testid="heading">Search Country Details</Typography>
        <TextField type="text" data-testid="input" onChange={(e: any) => setInputValue(e.target.value)} />
        <Button variant="contained" data-testid="button" disabled={inputValue ? false : true} sx={{ marginLeft: "20px" }} onClick={() => getCountryInfo()}>Fetch Country</Button>
      </Container>
    </>
  )
}

export default InputCountryName