import Login from './components/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import { createContext, useState } from 'react';
import HandleClientDialog from './components/HandleClientDialog/HandleClientDialog';
import TypeDialog from './components/TypeDialog/TypeDialog';
import ServiceAgeDialog from './components/ServiceAgeDialog/ServiceAgeDialog';
import DeleteService from './components/DeleteService/DeleteService';
import RentedDialog from './components/RentedDialog/RentedDialog';
import AddService from './components/AddService/AddService';
import NewDateTime from './components/NewDateTime/NewDateTime';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const collectionContext = createContext()
function App() {
  const center = {
    lat: 22.356852,
    lng: 91.783180
  };
  const [longAndLat, setLongAndLat] = useState(center);
  return (
    <collectionContext.Provider value={{ value1: [longAndLat, setLongAndLat] }}>
      <Router>
        <Switch>
          <PrivateRoute exact path="/">
            <Dashboard />
          </PrivateRoute>
          {/* <Route exact path="/">
            <Dashboard />
          </Route> */}
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/client-edit/:clientId">
            <HandleClientDialog />
          </Route>
          <Route path="/type-edit/:typeId">
            <TypeDialog />
          </Route>
          <Route path="/service-edit/:serviceId">
            <ServiceAgeDialog />
          </Route>
          <Route path="/delete-service/:deleteServiceId/:docId">
            <DeleteService />
          </Route>
          <Route path="/rent-service/:rentId">
            <RentedDialog />
          </Route>

          <Route path="/add-service/:addServiceId">
            <AddService />
          </Route>
          <Route path="/newAdd-service/:addNewServiceId">
            <NewDateTime />
          </Route>
        </Switch>
      </Router>
    </collectionContext.Provider>
  );
}

export default App;
