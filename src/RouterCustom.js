import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useUserContext } from './contexts/userContext';



export function RouterCustom({ isPrivate, ...rest}) {
    
    const { userData, setUserData } = useUserContext();

  if(isPrivate && !userData) {
    return <Redirect to="/login"/>;
  };

  return (
    <Route {...rest} />
  )
}