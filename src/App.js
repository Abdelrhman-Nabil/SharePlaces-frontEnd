import { Routes, Route } from 'react-router-dom';
import Home from './App/routes/home/home';
import Auth from './App/routes/auth/auth.jsx';
import Navigation from './App/routes/navigation/navigation.jsx'
import NewPlace from './App/routes/places/newPlaces/newPlace.jsx';
import UserPlaces from './App/routes/places/userPlaces/userPlaces.jsx'
import UpdatePlace from './App/routes/places/UpdatePlace/updataPlace.jsx';
import { AuthContext } from './App/context/auth.context.jsx';
import { useContext, useEffect } from 'react';

const App=()=>{
  const{token,login}=useContext(AuthContext);
  useEffect(()=>{
    const storeData=JSON.parse(localStorage.getItem('userData'));
    if(storeData && storeData.token && new Date(storeData.expiration) > new Date()){
      login(storeData.userId,storeData.token,new Date(storeData.expiration))
    }
  },[login])
return(
<Routes>
  <Route path='/' element={<Navigation />}>
  <Route index element={<Home/>} />
  <Route path='/:userId/places' element={<UserPlaces/>} />
   {token &&<Route path='/places/new' element={<NewPlace/>} />}
   {token &&<Route path="/places/:placeId" element={<UpdatePlace/>} />}
  <Route path="/auth" element={<Auth/>} />
  </Route>
  
</Routes>
)
}
export default App
