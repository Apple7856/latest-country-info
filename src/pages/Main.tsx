import React from 'react'
import CountryDetails from '../components/CountryDetails'
import InputCountryName from '../components/InputCountryName'
import { BrowserRouter ,Routes, Route } from 'react-router-dom';

const Main = () => {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<InputCountryName />} />
                  <Route path='/country-details' element={<CountryDetails />} />
              </Routes>
          </BrowserRouter>
      </>
  )
}

export default Main