import * as React from 'react';
import { DataGrid,  GridToolbarContainer,GridToolbarExport } from '@material-ui/data-grid';
import axios from "axios"
 

// var columns = [
  // { field: 'id', headerName: 'ID', width: 70 },
  // { field: 'firstName', headerName: 'First name', width: 130 },
  // { field: 'lastName', headerName: 'Last name', width: 130 },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  // },
// ];

// var rows = [
//   // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
 
// ];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function DataTable(props) {
  
  return (
    <>
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid loading={false} rows={props.rows} columns={props.columns} pageSize={8} re checkboxSelection autoHeight={true}
       components={{
          Toolbar: CustomToolbar,
        }} />
    </div>
    </>
  );
}

export default DataTable