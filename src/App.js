import './App.css';
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import sortData from './util';

function App() {

  const[countries, setCountries]=useState([])
  const[country, setCountry]=useState('worldwide')
  const[countryInfo, setCountryInfo] = useState('')
  const[tableData, setTableData] = useState([])

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => setCountryInfo(data))
  }, [])

  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name:country.country,
          value:country.countryInfo.iso2,
          id: country.country
        }))
        const sortedData = sortData(data)
        setTableData(sortedData)
        setCountries(countries)
      })
    }

    getCountries()
  }, [])

  const changeCountry = async (e) => {
      const countryCode = e.target.value
      setCountry(countryCode)
      let url = countryCode === 'worldwide' 
      ? "https://disease.sh/v3/covid-19/all" 
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`

      await fetch(url)
      .then(response => response.json())
      .then(data => (setCountryInfo(data)))
  }
  console.log(countryInfo)

  return (
    <div className="app">
      <div className='app-left'>
        <div className='app-header'>
          <h1>COVID-19 TRACKER</h1>
          <FormControl>
            <Select variant='outlined' value={country} onChange={changeCountry}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem key={country.id} value={country.value}>{country.name}</MenuItem>
                ))
              }

            </Select>
          </FormControl>
        </div>
        <div className='app-cards'>
          <InfoBox title="CoronaVirus cases" cases ={countryInfo.todayCases} total ={countryInfo.cases} />
          <InfoBox title="CoronaVirus Recovories" cases ={countryInfo.todayRecovered} total ={countryInfo.recovered} />
          <InfoBox title="CoronaVirus Deaths" cases ={countryInfo.todayDeaths} total ={countryInfo.deaths} />
        </div>
        <Map />
      </div>
      <Card className='app-right'>
          <CardContent>
            <h2>Live Cases by Country</h2>
            <Table countries={tableData} />
            <h2>Worldwide new cases</h2>
          </CardContent>
          <CardContent>Worldwide new cases</CardContent>
      </Card>
      
    </div>
  );
}

export default App;
