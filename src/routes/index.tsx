import React from 'react';

import {useAppContext} from '../contexts/AppContext';
import Home from '../screens/home';

const Routes = () => {
  const scenario = useAppContext();
  switch (scenario) {
    default:
      return <Home />;
  }
};

export default Routes;
