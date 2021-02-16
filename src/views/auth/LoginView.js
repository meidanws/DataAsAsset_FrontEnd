import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinkUI from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import axios from "axios"
import { useState } from "react";
import { useNavigate  } from "react-router-dom";
import auth from "./auth";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Loader from 'react-loader-spinner';
import { usePromiseTracker,trackPromise } from "react-promise-tracker";

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {'Copyright © '}
      <LinkUI color="inherit" >
        DataAsAsset
      </LinkUI>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

 const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
    return promiseInProgress && (
      <div
           style={{
              width: "100%",
              height: "100",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position:"absolute",
              marginTop: "10%"

           }}
          >
            <Loader type="Oval" color="#00BFFF" height="100" width="100" />
         </div>
    );  
  }

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    fontSize:'10px',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:'#fafafa',
    height:'100%'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main 
  },
  form: {
    width: '100%', // Fix IE 11 issue.,
    marginTop:'-20px',
    fontSize:'4px' ,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textAlign: 'center',
    marginLeft:'20px'
  },
  TextField:{
    textAlign: 'center',
    marginLeft:'17%',
    marginTop:'6%'
    
  },
  image:{
   width: '70px',
   margin: '10px',
   
  }
}));


export default function LoginView() {
  const classes = useStyles();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
     
    setOpen(false);
  };

const HandleSubmit = async e => {
  e.preventDefault();

  trackPromise(
axios.post('https://dataasasset.herokuapp.com/app/login', {
  userName,password
}, )
.then(response => { 
  console.log(response.data)
  if(response.status == 200){
  //Go to dashboard page
  auth.login(() =>{
     // store the user in localStorage
    console.log(response.data);
    localStorage.setItem('user', JSON.stringify(response.data));
    navigate('/dashboard')
  })
}
})
.catch(error => {
    console.log(error.response);
    handleClickOpen();
})); 
}

  return (  
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <LoadingIndicator/>
      <img src={'images/logo.png'} alt="A" className={classes.image}/>
     
        <form onSubmit={HandleSubmit} className={classes.form} noValidate>
     
          <TextField
            variant="outlined"
            margin="normal"
            required
            className={classes.TextField}
            id="username"
            name="username"
            autoComplete="username"
            autoFocus
            label="User Name"
            placeholder="User Name"
            onChange={({ target }) => setUsername(target.value)}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon />
                  </InputAdornment>
                 
                ),  }}
          />
         
          <TextField
            variant="outlined"
            margin="normal"
            required
            className={classes.TextField}
            name="password"
            label="Password"
            type="password"
            id="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={({ target }) => setPassword(target.value)}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                   <LockOpenIcon/>
                  </InputAdornment> 
                ),  }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          
          <Button
            type="submit" 
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        {/* <Typography variant="body2" align="center" margin="5px">
        {'By '}
        </Typography>
        <Typography variant="body2" align="center" margin="5px"  >
        {'Data'}
        <img src={'images/DataAsAssetLogo.png'} alt="A"  width= "50px" marginBottom="15px"/>
        {'Asset'}
        </Typography> */}
     
          <Grid container>
            <Grid item xs>
              <LinkUI href="#" variant="body2">
                Forgot password?
              </LinkUI>
            </Grid>
            <Grid item>
              <LinkUI href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </LinkUI>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}  >
        <Copyright />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"    
      > 
        <DialogTitle id="alert-dialog-title">{"Oops!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            User name or Password are not correct
          </DialogContentText>
        </DialogContent>
        <DialogActions>    
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
  
    </Container>
  );
}