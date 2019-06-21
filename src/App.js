import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import PageRouter from './PageRouter';
import NavBar from './composment/layout/navbar/NavBar';
import routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar links={routes} />
        <PageRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
