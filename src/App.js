import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Pass from './components/changePass'
import Confirm from './components/changeSuccess'

const App = () => (
  <Router>
    <div>
      <main>
        <Route path='/' component={Pass} />
        <Route path='/confirm' component={Confirm} />
      </main>
    </div>
  </Router>
)

export default App
