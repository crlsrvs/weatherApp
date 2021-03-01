import React from 'react'
import { Table, Spinner   } from 'reactstrap'

const OneRowTable = ({ headFields, dataFields, isLoading }) => {

  const headRows = () => {
    return headFields.map( (field) => <th style={{textAlign: "center"}}>{field}</th> )
  }

  const dataRows = () => {
    return dataFields.map( (field) => <td style={{textAlign: "center"}}>{ isLoading ? <Spinner type="grow" color="secondary" /> : (field || <span aria-hidden>&ndash;</span>)}</td> )
  }

  return (
    <Table striped>

      <thead>
        <tr>
          {headRows()}
        </tr>
      </thead>

      <tbody>
        <tr key={dataFields[0].field}>
          {dataRows()}
        </tr>
      </tbody>

    </Table>
  )
}

export default OneRowTable