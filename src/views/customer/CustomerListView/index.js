import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles,Grid,
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import ProductCard from '../../product/ProductListView/ProductCard';
import productsData from '../../product/ProductListView/data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }, 
   productCard: {
    height: '100%'
  }
}));


const CustomerListView = () => {
  const classes = useStyles();
  const [customers] = useState(data);
  const [products] = useState(productsData);

  return (
    <Page
      className={classes.root}
      title="Companies"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          {/* <Results customers={customers} /> */}
          <Grid
            container
            spacing={3}
          >
        
            {products.map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard
                  className={classes.productCard}
                  product={product}
                />
              </Grid>
            ))}
          </Grid>
       
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
