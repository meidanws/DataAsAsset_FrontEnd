import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Divider,Drawer, Hidden, List,Typography,makeStyles} from '@material-ui/core';
import { AlertCircle as AlertCircleIcon,BarChart as BarChartIcon,Lock as LockIcon,Settings as SettingsIcon,ShoppingBag as ShoppingBagIcon,User as UserIcon,UserPlus as UserPlusIcon,Users as UsersIcon,Star as StarIcon,Share2 as NetworkIcon, Briefcase as CompanyIcon } from 'react-feather';
import NavItem from './NavItem';
import auth from "../../../views/auth/auth";
import { Navigate,useNavigate  } from "react-router-dom";

const items = [
  {
    href: '/app/account',
    icon: StarIcon,
    title: 'Favorites'
  },
  {
    href: '/app/dataAssets',
    icon: ShoppingBagIcon,
    title: 'Data Assets'
  },
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboards'
  },
  {
    href: '/app/account',
    icon: NetworkIcon,
    title: 'Trust Networks'
  },
  {
    href: '/app/account',
    icon: CompanyIcon,
    title: 'Companies'
  },
  {
    href: '/app/account',
    icon: LockIcon,
    title: 'Admin'
  },
  {
    href: '/app/account',
    icon: UsersIcon,
    title: 'Users'
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const userData =  JSON.parse(localStorage.getItem("user"))
  var fullName = "";
  var job ="";
  
    if(userData == null){
     
    }
    else{
      fullName = userData.fullName;
      job = userData.JobTitle
    }

    const user = {
      avatar: '/static/images/avatars/avatar_0.png',
      jobTitle: job,
      name: fullName
    }

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );


  

  if(auth.authenticated || userData != null){  
  
   

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}
else{  return <Navigate to="/" push={true} />}
}



NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
