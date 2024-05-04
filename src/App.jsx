import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
// import LandingPage from './components/LandingPage';
import Signup from './components/Signup';
import Login from './components/Login';
import PropertyEnlistForm from './components/PropertyEnlistForm';
// import TestPage from './components/TestPage';
// import PropertyDetails from './components/PropertyDetails';
// import UserProfile from './components/UserProfile';
// import SearchResults from './components/SearchResults';
// import NotFound from './components/NotFound';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import LandingPage from './components/LandingPage';
import PersistLogin from './components/PersistentLogin';
import Layout from './components/Layout'
import TestPage from './components/TestPage';
import PropertyDetailsScreen from './components/PropertyDetails';
import PropertiesScreen from './components/PopertiesScreen';
import axios from './api/axios';
import AddImages from './components/AddImages';
import ShowImages from './components/ShowImages';

import { isDarkState } from './components/Atom/ThemeStateAtom';
import Profile from './components/Profile';
import EnlistedPGs from './components/EnlistedPGs';
const ROLES = {
  'Tenant': 'tenant',
  'Owner': 'owner',
  'Admin': 'admin'
}
function App() {
  const [properties, setProperties] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
    // get the local storage variable if present for theme, if 'theme' is 'dark' or 'light' set the theme accordingly
    const savedTheme = localStorage.getItem('theme');
    console.log(`savedTheme: ${savedTheme}`);
    if (savedTheme === 'light') {
      setIsDarkMode(false);
    }
    else{
      setIsDarkMode(true);
    }

    // Fetch properties from the server
    axios.get('/api/properties')
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error('Error fetching properties:', error);
      });
  }, []);
  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
  };

  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Layout />} >
          {/* public routes */} 
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/property/:id" element={<PropertyDetailsScreen />} />
          <Route path="showImages/:id" element={<ShowImages />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/properties"
            element={
             (
                <PropertiesScreen
                setProperties={setProperties}
                  properties={properties}
                  onPropertyClick={handlePropertyClick}
                />
              )
            }
          />

          {/* private routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.Tenant, ROLES.Owner]} />}>
              <Route path="/" element={<LandingPage />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={ROLES.Owner} />}>
              <Route path='/enlistedPGs' element={<EnlistedPGs />} />
          <Route path="/addimages" element={<AddImages />} />

              <Route path="/services" element={<PropertyEnlistForm />} />
            </Route>
          </Route>
          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>

    </RecoilRoot >
  );
}

export default App;
