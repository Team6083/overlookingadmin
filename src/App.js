import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PageRouter from './PageRouter';
import NavBar from './composment/layout/navbar/NavBar';
import routes from './routes';
import NotificationArea from './composment/layout/notification/NotificationArea';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="mb-3"><NavBar links={routes} /></div>
        <div className="container" id="notificationArea">
          <NotificationArea />
        </div>
        <PageRouter routes={routes} />
      </div>
    </BrowserRouter>
  );
}

export default App;
