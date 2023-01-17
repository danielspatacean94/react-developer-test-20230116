import React, {
  useState,
} from 'react';
import {
  Provider,
} from 'react-redux';
import {
  Box,
  Container,
  Tab,
  Tabs,
} from '@material-ui/core';
import {
  makeStyles,
} from '@material-ui/core/styles';

import Users    from '../containers/Users/Users';
import Projects from '../containers/Projects/Projects';

// store
import store from '../store';

const useStyles = makeStyles((_theme) => ({
  appBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },
}));

export const App = () => {
  const classes       = useStyles();
  const [tab, setTab] = useState(0);

  const handleTabChange = (_event, newTab) => {
    setTab(newTab);
  };

  const renderTab = () => {
    switch(tab) {
      case 0:
        return <Users />;
      case 1:
        return <Projects />;
      default:
        return 'Missing tab information';
    }
  };

  return (
    <Provider store={store}>
      <Container className="app">
        <Box className={classes.appBox} data-testid="app-box" m={2} >
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Users" />
          <Tab label="Projects" />
        </Tabs>
        {renderTab()}
        </Box>
      </Container>
    </Provider>
  );
};

export default App;
