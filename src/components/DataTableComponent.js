import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from "axios"

var columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];

var rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
 
];

async function getDataByAssetName (assetName) {
   // get data from api
   await axios.post('https://dataasasset.herokuapp.com/app/findasset', {
    assetName
  }, {
  })
    .then(response => {
      if (response.status == 200) {
        console.log(response.data.data) 
        
       
      }
    }); 
}

function DataTable(props) {

  getDataByAssetName(props.name);

  return (
    <>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
    </>
  );
}

export default DataTable