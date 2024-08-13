import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RestaurantsContextProvider } from './context/RestaurantsContext';
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import RestaurantDetailPage from './routes/RestaurantDetailPage';

function App() {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants/:id/update" element={<UpdatePage />} />
            <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
          </Routes>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
}

export default App;
