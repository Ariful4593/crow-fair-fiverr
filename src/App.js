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
import AddTribe from './components/AddTribe/AddTribe';

export const collectionContext = createContext()
function App() {
  const center = {
    lat: 45.59558868,
    lng: -107.45098877
  };
  const [longAndLat, setLongAndLat] = useState(center);
  const [alllng, setAlllng] = useState([]);

  const [newAddservice, setNewAddService] = useState([])
  return (
    <collectionContext.Provider value={{ value1: [longAndLat, setLongAndLat], value2: [alllng, setAlllng], value3: [newAddservice, setNewAddService] }}>
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
          <Route path="/addNew-tribe/:lat/:lng">
            <AddTribe />
          </Route>
        </Switch>
      </Router>
    </collectionContext.Provider>
  );
}

export default App;
