import React, { useState } from 'react'
import { useForm, Controller  } from "react-hook-form"
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Spinner, FormFeedback  } from 'reactstrap'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getHistoricalData } from '../services/weather/index'
import { deleteEmptyParams, unixHourToHuman, unixDateToHuman } from '../utils/helpers'
import { useOnChange } from '../utils/useOnChange'
import OneRowTable from '../components/OneRowTable'
import TableData from '../components/TableData'

import FormCard from '../components/FormCard'

const HistoricalView = () => {

  const { control, handleSubmit } = useForm()
  const [requestData, setRequestData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const [isLatEmpty, setIsLatEmpty] = useState(false)
  const [isLonEmpty, setIsLonEmpty] = useState(false)
  const [isDtEmpty, setIsDtEmpty] = useState(false)


  // Current info.
  const currentWeatherInitialState = { current: { weather: [ {main: "",description: ""} ], temp: "", humidity: "", clouds: ""  } }
  const [currentInfo, setCurrentInfo] = useState(currentWeatherInitialState)
  const currentInfoHeadRows = ["Main", "Description", "Clouds", "Temperature", "Humidity"]
  const currentInfoDataRows = [ currentInfo.current.weather[0].main, currentInfo.current.weather[0].description, currentInfo.current.clouds, currentInfo.current.temp, currentInfo.current.humidity ]
  useOnChange(currentInfo, setCurrentInfo, requestData, Object.keys(currentWeatherInitialState) )


  // Historical.
  const historicalInitialState = { hourly: [{ weather: [ {main: "",description: ""} ], temp: "", humidity: "", clouds: "", dt: "" }] }
  const [historical, setForecast] = useState(historicalInitialState)
  const historicalHeadRows = ["Hour", "Main", "Description", "Clouds", "Temperature", "Humidity"]
  useOnChange(historical, setForecast, requestData, Object.keys(historicalInitialState) )

  const historicalObjectRow = function (group) {
    return [ unixHourToHuman(group.dt), group.weather[0].main, group.weather[0].description, group.clouds, group.temp, group.humidity ]
  }



  const invalidInputs = ({lat, lon, dt}) => {
    if (!lat){
      setIsLonEmpty(false)
      setIsDtEmpty(false)

      setIsLatEmpty(true)
      return true
    }

    if (!lon){
      setIsDtEmpty(false)
      setIsLatEmpty(false)

      setIsLonEmpty(true)
      return true
    }

    if (!dt){
      setIsLatEmpty(false)
      setIsLonEmpty(false)

      setIsDtEmpty(true)
      return true
    }

    setIsLatEmpty(false)
    setIsLonEmpty(false)
    setIsDtEmpty(false)
    return false
  }

  const onSubmit = async (data) => {

    if ( invalidInputs(data) ) {
      return
    }

    setIsLoading(true)
    deleteEmptyParams(data)

    const req = await getHistoricalData(data)

    if (req.status !== 200) {

      toast.error(`ERROR: ${req.message}`);
      setRequestData({ ...currentWeatherInitialState, ...historicalInitialState })

    } else {
      setRequestData(req.data)
    }

    setIsLoading(false)
  }

  return(
    <Container fluid={true}>

      <br/><h2>Historical Information</h2><hr/>

      <Row>
        <Col sm="12" md="5">
          <Form onSubmit={handleSubmit(onSubmit)}>

            <FormCard title="Required Parameters" >

              <FormGroup>
                <Label for="latitude">latitude</Label>

                <Controller
                  name="lat"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => <Input type="number" name="lat" id="latitude" placeholder="37.774929" onChange={onChange} value={value} invalid={isLatEmpty} /> }
                />
                <FormFeedback>Empty field!! You must input the latitude</FormFeedback>

              </FormGroup>

              <FormGroup>
                <Label for="longitude">longitude</Label>

                <Controller
                  name="lon"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => <Input type="number" name="lon" id="longitude" placeholder="-122.419418" onChange={onChange} value={value} invalid={isLonEmpty} /> }
                />
                <FormFeedback>Empty field!! You must input the longitude</FormFeedback>

              </FormGroup>

              <FormGroup>
                <Label for="dt">Unix epoch time</Label>

                <Controller
                  name="dt"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => <Input type="number" name="dt" id="dt" placeholder="1614469200" onChange={onChange} value={value} invalid={isDtEmpty}  /> }
                />

                <FormFeedback>Empty field!! You must input a unix epoch time </FormFeedback>

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

          <h5>Historical info: <small> {unixDateToHuman(historical.hourly[0].dt)} </small></h5>
          <TableData headFields={historicalHeadRows} objectRow={historicalObjectRow} data={historical.hourly} isLoading={isLoading}/> <br/>

        </Col>
      </Row>

    </Container>
  )
}

export default HistoricalView