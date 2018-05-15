import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Pass from './components/changePass'

const App = () => (
  <Router>
    <div>
      <main>
        <Route path='/' component={Pass} />
      </main>
    </div>
  </Router>
)

export default App
