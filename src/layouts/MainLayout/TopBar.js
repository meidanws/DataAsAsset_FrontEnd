import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  makeStyles,Avatar,Typography
} from '@material-ui/core';
import Logo from 'src/components/Logo';

const useStyles = makeStyles(({
  root: {},
  toolbar: {
    height: 64
  },
  white:{
    backgroundColor:'white',
    height:'60px',
    width:'60px',
    margin:'10px'
  }

}));

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          {/* <Logo /> */}
          <Avatar className={classes.white} > 
          <img src={'images/DataAsAssetLogo.png'} alt="A"  width= "50px" />
          </Avatar>
        </RouterLink>
        <Typography variant="body2" align="center" margintop="20px"  >
        {'Data as Asset'}
        </Typography> 
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
