import React from 'react';
import {StatusBar} from 'react-native';

import Routes from '../../routes';
import {AppProvider} from '../../contexts/AppContext';

const main: React.FC = () => {
  return (
    <>
      <StatusBar translucent barStyle="dark-content" />
      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  );
};

export default main;
