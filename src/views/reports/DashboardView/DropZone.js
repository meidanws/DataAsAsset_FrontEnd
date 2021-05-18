import React, { Component, useState } from 'react'
import { DropzoneDialog } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import readXlsxFile from 'read-excel-file'
import axios from "axios"
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DropZone from './DropZone.css'
import { string } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {makeStyles } from '@material-ui/core';

export default class DropzoneDialogExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: [],
      assetName: props.assetName,
      data: [],
      descreption: props.des
    };
  }


  handleClose() {
    this.setState({
      open: false
    });
  }

   handleSave(files) {
    var data = [];
    var assetName = this.props.assetName
    var descreption = this.props.descreption
    
    readXlsxFile(files[0]).then((rows) => {
      // `rows` is an array of rows
      // each row being an array of cells.
      data = rows;
      console.log(data)
     
      // Saving the data into database
      axios.post('http://localhost:8080/http://localhost:4000/app/uploadDataAseet', {
        assetName, descreption, data
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*'
          // Overwrite Axios's automatically set Content-Type
          //'Content-Type': 'application/json'
          //'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(response => {
          console.log(response.data)
          if (response.status == 200) {
            console.log("sucsess!")
          }
        })
    })

    //Saving files to state for further use and closing Modal.
    this.setState({
      assetName: assetName,
      descreption: descreption,
      data: data,
      open: false
    });

  };

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  render() {
    if (this.props.assetName != "" && this.props.descreption != "") {
      return (
        <div>
          <Button onClick={this.handleOpen.bind(this)}
            variant="contained"
            color="primary"
            style={{  marginLeft: '25%' }} 
            startIcon={<CloudUploadIcon />}
          >
            Import Data Asset
        </Button>
          <DropzoneDialog
            dropzoneText="Drag/Click to import data file"
            open={this.state.open}
            onSave={this.handleSave.bind(this)}
            acceptedFiles={['.csv', '.xlsx', '.json']}
            showPreviews={true}
            maxFileSize={5000000}
            filesLimit={1}
            onClose={this.handleClose.bind(this)}
          />
        </div>
      );
    }
    else {
      return (
        <>
        <Typography display="block" align="center">Enter name and description</Typography>
       
        </>
      )
    }

  }
}






{/* <DropzoneArea
dropzoneText="Drag/Click to import data file"
useChipsForPreview={true}
showPreviews={false}
acceptedFiles={['.csv','.xlsx','.json']}
onChange={this.handleChange.bind(this)}
cancelButtonText={"cancel"}
submitButtonText={"submit"}
/>
<IconButton
style={{right: '12px', top: '8px', position: 'absolute'}}
onClick={() => setOpen(false)}>
<CloseIcon />
</IconButton>  */}