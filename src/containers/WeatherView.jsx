import React, { useState } from 'react'
import { useForm, Controller  } from "react-hook-form"
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Spinner, FormFeedback  } from 'reactstrap'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getCurrentWeatherData } from '../services/weather/index'
import { deleteEmptyParams } from '../utils/helpers'
import { useOnChange } from '../utils/useOnChange'
import OneRowTable from '../components/OneRowTable'
import FormCard from '../components/FormCard'


const WeatherView = () => {

  const { control, handleSubmit } = useForm()
  const [requestData, setRequestData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isEmptyField, setIsEmptyField] = useState(false)


  // Country Info.
  const countryInfoInitialState = { timezone: "", sys: { country: "" }, name: "", coord: { lon: "", lat: ""} }
  const [countryInfo, setCountryInfo] = useState(countryInfoInitialState)
  const countryInfoHeadRows = ["Country", "City Name", "Timezone", "Longitude", "Latitude"]
  const countryInfoDataRows = [countryInfo.sys.country, countryInfo.name, countryInfo.timezone, countryInfo.coord.lon, countryInfo.coord.lat]
  useOnChange(countryInfo, setCountryInfo, requestData, Object.keys(countryInfoInitialState) )


  // Weather info.
  const weatherInfoInitialState = { weather: [ {main: "",description: ""} ], clouds: {all:""}, wind: {speed:"",deg:""} }
  const [weatherInfo, setWeatherInfo] = useState(weatherInfoInitialState)
  const weatherInfoHeadRows = ["Main Weather", "Description", "All Clouds", "Wind Deg", "Wind Speed"]
  const weatherInfoDataRows = [weatherInfo.weather[0].main, weatherInfo.weather[0].description, weatherInfo.clouds.all, weatherInfo.wind.deg, weatherInfo.wind.speed]
  useOnChange(weatherInfo, setWeatherInfo, requestData, Object.keys(weatherInfoInitialState) )


  // Temperature info.
  const temperatureInitialState = { main: { temp: "", feels_like: "", temp_min: "", temp_max: "", pressure: "", humidity: "" } }
  const [temperatureInfo, setTemperatureInfo] = useState(temperatureInitialState)
  const temperatureInfoHeadRows = ["Temperature", "Feels like", "T. Min.", "T. Max.", "Pressure", "Humidity"]
  const temperatureInfoDataRows = [temperatureInfo.main.temp, temperatureInfo.main.feels_like, temperatureInfo.main.temp_min, temperatureInfo.main.temp_max, temperatureInfo.main.pressure, temperatureInfo.main.humidity, ]
  useOnChange(temperatureInfo, setTemperatureInfo, requestData, Object.keys(temperatureInitialState) )


  const onSubmit = async (data) => {

    if (!data.q) {
      return setIsEmptyField(true)
    } else {
      setIsEmptyField(false)
    }

    setIsLoading(true)
    deleteEmptyParams(data)

    const req = await getCurrentWeatherData(data)

    if (req.status !== 200) {

      toast.error(`ERROR: ${req.message}`);
      setRequestData({ ...countryInfoInitialState, ...weatherInfoInitialState, ...temperatureInitialState })

    } else {
      setRequestData(req.data)
    }

    setIsLoading(false)
  }

  return(
    <Container fluid={true}>

      <br/><h2>Wheather Information</h2><hr/>

      <Row>
        <Col sm="12" md="5">
          <Form onSubmit={handleSubmit(onSubmit)}>

            <FormCard title="Required Parameters" >
              <FormGroup>
                <Label for="q">City</Label>

                <Controller
                  name="q"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => <Input type="text" name="q" id="q" placeholder="San Francisco" onChange={onChange} value={value} invalid={isEmptyField}  /> }
                />

                <FormFeedback>Empty field!! You must name a city</FormFeedback>

              </FormGroup>

              <FormGroup check row>
                <Col >
                  <div style={{float: "right"}}>
                    {
                      isLoading
                      ? <Spinner color="primary" />
                      : <Button style={{float: "right"}}>Submit</Button>
                    }
                  </div>
                </Col>
              </FormGroup>
            </FormCard>

            <FormCard title="Optional Parameters" >

              <FormGroup>
                <Label for="latitude">latitude</Label>

                <Controller
                  name="lat"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => <Input type="number" name="lat" id="latitude" placeholder="37.774929" onChange={onChange} value={value} /> }
                />
              </FormGroup>

              <FormGroup>
                <Label for="longitude">longitude</Label>

                <Controller
                  name="lon"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => <Input type="number" name="lon" id="longitude" placeholder="-122.419418" onChange={onChange} value={value} /> }
                />
              </FormGroup>

              <FormGroup>
                <Label for="id">City ID</Label>

                <Controller
                  name="id"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => <Input type="number" name="id" id="id" placeholder="1590094153" onChange={onChange} value={value} /> }
                />
              </FormGroup>

              <FormGroup>
                <Label for="lang">Language</Label>

                <Controller
                  name="lang"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => <Input type="text" name="lang" id="lang" placeholder="en" onChange={onChange} value={value} maxLength="2" /> }
                />
              </FormGroup>

              <FormGroup>
                <Label for="units">Units</Label>

                <Controller
                  name="units"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => <Input type="select" name="units" id="units" placeholder="San Francisco" onChange={onChange} value={value} >
                    <option> </option>
                    <option>metric</option>
                    <option>imperial</option>
                  </Input>}
                />

              </FormGroup>

            </FormCard>

          </Form>
        </Col>

        <Col sm="12" md="7">

          <h5>Country Info</h5>
          <OneRowTable headFields={countryInfoHeadRows} dataFields={countryInfoDataRows} isLoading={isLoading}/> <br/>

          <h5>Weather info.</h5>
          <OneRowTable headFields={weatherInfoHeadRows} dataFields={weatherInfoDataRows} isLoading={isLoading}/> <br/>

          <h5>Temperature Info</h5>
          <OneRowTable headFields={temperatureInfoHeadRows} dataFields={temperatureInfoDataRows} isLoading={isLoading}/> <br/>

        </Col>
      </Row>

    </Container>
  )
}

export default WeatherView