import React from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap'

const FormCard = ({ children, title }) => <>
  <Card>
    <CardBody>
      <CardTitle tag="h5">{ title }</CardTitle>
      {children}
    </CardBody>
  </Card>
  <br/>
</>


export default FormCard