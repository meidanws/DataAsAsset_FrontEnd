import React, { useState } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,Typography,
  makeStyles,Avatar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import auth from "../../views/auth/auth";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }, white:{
    backgroundColor:'white',
    height:'60px',
    width:'60px',
    marginRight:'10px'
  }
}));




const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const [loggedOut, setLoggedOut] = useState(false)
  
  const HandleLogout = () =>{
    auth.logout()
    localStorage.removeItem("user")
    setLoggedOut(true) 
  };

  if (loggedOut) {
    return <Navigate to="/" push={true} />
  }
  
  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/dashboard">
          {/* <Logo  />   */}
          <Avatar className={classes.white} > 
          <img src={'../images/DataAsAssetLogo.png'} alt="A"  width= "50px" marginBottom="15px"/>
          </Avatar>
        </RouterLink>
        <Typography variant="body2" align="center" marginTop="20px"  >
        {'Data as Asset'}
        </Typography> 

        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit"  onClick={HandleLogout}>
            <InputIcon onClick={HandleLogout} /> 
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
