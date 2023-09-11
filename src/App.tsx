import React from 'react';
import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './screens/Landing';
import ShowDetails from './screens/ShowDetails';

const routes = [
  {
    path: '/',
    element: <Landing />,
    exact: true,
  },
  {
    path: '/:showId',
    element: <ShowDetails />,
    exact: true,
  },
];

function App() {
  return (
    <div className="app">
      <Routes>
          {routes.map(r => (
            <Route
              key={r.path}
              path={r.path}
              element={r.element}
            />
          ))}
        </Routes>
    </div>
  );
}

export default App;
