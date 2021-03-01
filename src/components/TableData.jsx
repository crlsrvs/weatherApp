import React from 'react'
import { Table, Spinner   } from 'reactstrap'

const TableData = ({ headFields, objectRow, data, isLoading }) => {


  const headRows = () => {
    return headFields.map( (field) => <th style={{textAlign: "center"}}>{field}</th> )
  }


  const dataRows = () => {

    return data.map( (group) => {

      const rowFields = objectRow(group)

      return(
        <tr key={rowFields[0].dt} >
          {
            rowFields.map( (field) =>
              <td style={{textAlign: "center"}}>
                { isLoading ? <Spinner type="grow" color="secondary" /> : ( (field || field===0) ? field : <span aria-hidden>&ndash;</span> ) }
              </td>
            )
          }
        </tr>
      )

    })
  }

  return (
    <Table striped>

      <thead>
        <tr>
          {headRows()}
        </tr>
      </thead>

      <tbody>
        {dataRows()}
      </tbody>

    </Table>
  )
}

export default TableData