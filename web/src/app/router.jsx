import React from 'react';
import { Route } from 'react-router-dom';

import signin from './signin';

export default function router() {
  return (
    <div>
      <Route exact path="/" component={signin} />
    </div>
  );
}
