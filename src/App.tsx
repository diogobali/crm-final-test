
import { BrowserRouter, Route, Switch} from 'react-router-dom'


import { Crm } from './pages/Crm';
import { LoginPage } from './pages/Login';
import { UserProvider } from './contexts/userContext'

import { RouterCustom } from './RouterCustom';


function App() {

  

  return(
    <BrowserRouter>  
        <Switch>
          <UserProvider>
            <RouterCustom isPrivate path="/crm" exact component={Crm} />
            <Route path="/login" component={LoginPage} />
          </UserProvider>
        </Switch> 
    </BrowserRouter>
  );

}

export default App;