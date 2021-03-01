import React, { useState } from 'react'
import { useForm, Controller  } from "react-hook-form"
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Spinner  } from 'reactstrap'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { deleteEmptyParams, unixHourToHuman, unixDateToHuman } from '../utils/helpers'
import { getForecastData } from '../services/weather/index'
import { useOnChange } from '../utils/useOnChange'
import OneRowTable from '../components/OneRowTable'
import TableData from '../components/TableData'

import FormCard from '../components/FormCard'

const ForecastView = () => {

  const { control, handleSubmit } = useForm()
  const [requestData, setRequestData] = useState({})
  const [isLoading, setIsLoading] = useState(false)


  // Current info.
  const currentInfoInitialState = { city: { name: "", country: "", population: "", timezone: ""  } }
  const [currentInfo, setCurrentInfo] = useState(currentInfoInitialState)
  const currentInfoHeadRows = ["Country", "City", "Population", "Timezone"]
  const currentInfoDataRows = [ currentInfo.city.country, currentInfo.city.name, currentInfo.city.population, currentInfo.city.timezone, ]
  useOnChange(currentInfo, setCurrentInfo, requestData, Object.keys(currentInfoInitialState) )


  // Forecast.
  const forecastInitialState = { list: [{ weather: [ {main: "",description: ""} ], main: [ { temp: "", humidity: "" } ] , clouds: { all: "" }, dt: "" }] }
  const [forecast, setForecast] = useState(forecastInitialState)
  const forecastHeadRows = ["Date", "Hour", "Main", "Description", "Clouds", "Temperature", "Humidity"]
  useOnChange(forecast, setForecast, requestData, Object.keys(forecastInitialState) )

  const forecastObjectRow = function (group) {
    return [ unixDateToHuman(group.dt), unixHourToHuman(group.dt), group.weather[0].main, group.weather[0].description, group.clouds.all, group.main.temp, group.main.humidity ]
  }

  const onSubmit = async (data) => {

    setIsLoading(true)
    deleteEmptyParams(data)

    const req = await getForecastData(data)

    if (req.status !== 200) {

      toast.error(`ERROR: ${req.message}`);
      setRequestData({ ...currentInfoInitialState, ...forecastInitialState })

    } else {
      setRequestData(req.data)
    }

    setIsLoading(false)
  }

  return(
    <Container fluid={true}>

      <br/><h2>Forecast</h2><hr/>

      <Row>
        <Col sm="12" md="5">
          <Form onSubmit={handleSubmit(onSubmit)}>

            <FormCard title="Parameters" >

              <FormGroup>
                <Label for="q">City</Label>

                <Controller
                  name="q"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => <Input type="text" name="q" id="q" placeholder="San Francisco" onChange={onChange} value={value} /> }
                />

              </FormGroup>

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
                <Label for="units">Units</Label>

                <Controller
                  name="units"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => <Input type="select" name="units" id="units" placeholder="San Francisco" onChange={onChange} value={value} >
                    <option> </option>
                    <option>standard</option>
                    <option>metric</option>
                    <option>imperial</option>
                  </Input>}
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
                <Label for="cnt">Count</Label>

                <Controller
                  name="cnt"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => <Input type="number" name="cnt" id="cnt" placeholder="20" onChange={onChange} value={value} /> }
                />
              </FormGroup>

              <FormGroup>
                <Label for="zip">Zip Code</Label>

                <Controller
                  name="zip"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => <Input type="text" name="zip" id="zip" placeholder="en" onChange={onChange} value={value} /> }
                />
              </FormGroup>



              <FormGroup check row>
                <Col>
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

          </Form>
        </Col>

        <Col sm="12" md="7">

          <h5>Current Info</h5>
          <OneRowTable headFields={currentInfoHeadRows} dataFields={currentInfoDataRows} isLoading={isLoading}/> <br/>

          <h5>Forecast</h5>
          <TableData headFields={forecastHeadRows} objectRow={forecastObjectRow} data={forecast.list} isLoading={isLoading}/> <br/>

        </Col>
      </Row>

    </Container>
  )
}

export default ForecastView