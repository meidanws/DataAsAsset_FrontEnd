import React, { useEffect } from 'react';
import { Container, Grid, makeStyles, Button } from '@material-ui/core';
import Page from 'src/components/Page';
import Budget from './Budget';
import LatestOrders from './LatestOrders';
import LatestProducts from './LatestProducts';
import Sales from './Sales';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import TrafficByDevice from './TrafficByDevice';
import Dropzone from './DropZone'
import DataTable from '../../../components/DataTableComponent'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios"
import { object } from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  DataAssetButton: {
    margin: theme.spacing(3),
    marginRight: theme.spacing(1),
    marginLeft: '80%'
  },
  labels: {
    margin: "5px"
  },
  dropzone: {
    marginTop: '5px',
    display: "contents"
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [assetName, setAssetName] = React.useState("");
  const [assetDescription, setAssetDescription] = React.useState("");
  const [currentValue, setCurrentValue] = React.useState("");
  const [columns, setCurrentColumns] = React.useState([]);
  const [rows, setCurrentRows] = React.useState([]);

  //var columns = []
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAssetName("")
    setAssetDescription("")
    setOpen(false);
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
          var objects = {
           
          };

          //build the rows of the table
          for (const [i, value] of Tempcolumns.entries()) {
            response.data.data.forEach(function (item) {
              console.log("item: " + item)
              objects = [];
              counter = 0; 
              item.forEach(function (r) {
              console.log("r: " + r)
              objects.push({[counter++]: r}) })  
              console.log("objects: " + objects)

              //Temprows.push({ id: counter2++ , }) 
               
            })
          }

          console.log(Temprows);

          setCurrentColumns(Tempcolumns);
          setCurrentRows(Temprows)
        }
      });
  }

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
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

      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={9}
            sm={12}
            xl={9}
            xs={16}
          >

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

            {/* <Budget /> */}
            <DataTable name={currentValue} columns={columns} rows={rows} />

          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers />

          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress />

          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <iframe src='https://www.israelweather.co.il/weather_out.asp?code_width=150&height=200&code_color=white&code_font_color=black' name='in_frame' frameborder='0' scrolling='No'></iframe>
            {/* <TotalProfit /> */}
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            {/* <Sales /> */}
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            {/* <TrafficByDevice /> */}
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            {/* <LatestProducts /> */}
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            {/* <LatestOrders /> */}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
