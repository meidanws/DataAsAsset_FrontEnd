import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import Dropzone from '../../reports/DashboardView/DropZone'
import Autocomplete from '@material-ui/lab/Autocomplete';
import DataTable from '../../../components/DataTableComponent'
import axios from "axios"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [assetName, setAssetName] = React.useState("");
  const [assetDescription, setAssetDescription] = React.useState("");
  const [currentValue, setCurrentValue] = React.useState("");
  const [columns, setCurrentColumns] = React.useState([]);
  const [rows, setCurrentRows] = React.useState([]);
  const [currentData, setCurrentData] = React.useState([]);

  var assetNameList = ['']

  useEffect(() => {
    uploadData()
  })

  const uploadData = async () => {
    await getDataAssetsNames();
    if (currentValue == "") {
      setCurrentValue(assetNameList[0])
      getDataByAssetName(assetNameList[0])
    }

    console.log(currentValue)
  };

  // Get all data assets
  const getDataAssetsNames = async () => {
    await axios.get('https://dataasasset.herokuapp.com/app/dataassetsNames', {
    }, {
    })
      .then(response => {
        if (response.status == 200) {
          // remove the empty title if exist  
          const index = assetNameList.indexOf('');
          if (index > -1) {
            assetNameList.splice(index, 1);
          }

          response.data.forEach(function (item) {
            //setDataAssetNames(item.assetName)
            if (!assetNameList.includes(item.assetName)) {
              assetNameList.push(item.assetName)
            }
          })
        }
      })
  }

  const handleComboBoxChange = async (newValue) => {
    //await getDataAssetsNames();
    console.log(newValue);
    setCurrentValue(newValue)
    //getDataAssetsNames();
    getDataByAssetName(newValue)
  }

  // get specific data asset

  async function getDataByAssetName(assetName) {
    var Tempcolumns = [];
    var Temprows = [];
    var columnsCounter = 0;
    // get data from api
    await axios.post('https://dataasasset.herokuapp.com/app/findasset', {
      assetName
    }, {
    })
      .then(response => {
        if (response.status == 200) {
          //build the columns of the table
          

          response.data.data[0].forEach(function (item) {
            if (!Tempcolumns.includes(item) && item != null) {
              Tempcolumns.push({ field: columnsCounter++, headerName: item, width: 150 },)
            }
          })

          var counter = 0;
          var counter2 = 0;
          
          var pair = {id: counter2}
          var pairs = []

          //build the rows of the table
            response.data.data.forEach(function (item) {
          
              item.forEach(function (row) {
                if(counter == Tempcolumns.length){
                  counter = 0; 
                  pair = {id: counter2}
                  counter2++;
                }
                
                Tempcolumns.forEach(function (header){
                  if(header.headerName == row){
                    console.log("return")
                    return;
                  }
                  else{
                     
                  }
                })

                console.log("id:"+ counter  + " row: " + row)
                var pair1 = {[counter++]: row }
                Object.assign(pair,pair1);  
                if(!Temprows.includes(pair) ){
                  Temprows.push(pair);
                }
             })})
            
          console.log(Temprows);
          setCurrentData(response.data.data);
          setCurrentColumns(Tempcolumns);
          setCurrentRows(Temprows)
        }
      });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAssetName("")
    setAssetDescription("")
    setOpen(false);
  };


  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        {/* <Button className={classes.importButton}>
          Import
        </Button> */}
        <Button className={classes.exportButton}>
          Export
        </Button>
        {/* <Button
          color="primary"
          variant="contained"
        >
          Add product
        </Button> */}
        {/* <Dropzone /> */}
        <Button variant="contained" color="primary" className={classes.DataAssetButton} onClick={handleClickOpen} startIcon={<PublishOutlinedIcon />}>
        Create Data Asset
          </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New Data Asset</DialogTitle>
        <DialogContent>
          <TextField id="outlined-basic" label="Enter Asset name" variant="outlined" className={classes.labels} onChange={({ target }) => setAssetName(target.value)} />
          <TextField id="outlined-basic" label="Enter Asset descreption" variant="outlined" className={classes.labels} onChange={({ target }) => setAssetDescription(target.value)} />
          <div className={classes.dropzone}>
            <Dropzone assetName={assetName} descreption={assetDescription} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" disabled={!(assetName != "" && assetDescription != "")}>
            Got it!
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
      <Box mt={3}>
        {/* <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search data asset"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card> */}
         <Autocomplete
              id="combo-box-demo"
              options={assetNameList}
              value={currentValue}
              onChange={(event, newValue) => {
                handleComboBoxChange(newValue);
              }}
              // onChange={handleComboBoxChange} 
              // defaultValue={[assetNameList[0]]}
              getOptionLabel={(option) => option}
              style={{ width: 300, margin: "5px" }}
              renderInput={(params) => <TextField {...params} label="Select Data Asset" variant="outlined" />}
            />
         <DataTable name={currentValue} columns={columns} rows={rows} />
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
