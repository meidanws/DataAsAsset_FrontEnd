import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import MetaTags from 'react-meta-tags';

const App = () => {
  const routing = useRoutes(routes);

  return (
 
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MetaTags>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </MetaTags>
      {routing}
    </ThemeProvider>
  );
};

export default App;
