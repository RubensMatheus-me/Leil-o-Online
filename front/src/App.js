import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SimpleLayout from './components/SimpleLayout';
import DefaultLayout from './components/DefaultLayout';
import Register from './pages/register/Register';
import RecoveryPassword from './pages/recovery/RecoveryPassword';
import PrivateRouter from './components/PrivateRouter';
import RecoveryCode from './pages/recoveryCode/RecoveryCode';
import Profile from './pages/profile/Profile';
import CardDetails from './pages/cardDetails/CardDetails';
import MyItems from './pages/myItems/MyItems';
import AddProducts from './pages/addProducts/AddProducts';
import ChangePassword from './pages/changePassword/ChangePassword';

function App() {
  return (
    <>
      {/* <Header/> */}
      <BrowserRouter>
        <Routes>

          <Route element={<PrivateRouter/>}>
            <Route path='/' element={<DefaultLayout><Home/></DefaultLayout>}/>
            <Route path='/user/profile' element={<DefaultLayout><Profile /></DefaultLayout>} />
            <Route path='/card-details/:id' element={<DefaultLayout>{<CardDetails />}</DefaultLayout>} />
            <Route path='/my-items' element={<DefaultLayout><MyItems/></DefaultLayout>} />
            <Route path='/my-items/add-products' element={<DefaultLayout><AddProducts/></DefaultLayout>} />
          </Route>

          <Route path='/login' element={<SimpleLayout><Login/></SimpleLayout>} />
          <Route path='/register' element={<SimpleLayout><Register/></SimpleLayout>} />
          <Route path='/recovery-password' element={<SimpleLayout><RecoveryPassword/></SimpleLayout>} />
          <Route path='/recovery-password/code' element={<SimpleLayout><RecoveryCode/></SimpleLayout>} />
          <Route path='/change-password' element={<SimpleLayout><ChangePassword /></SimpleLayout>} />
          

        </Routes>
      </BrowserRouter>
      {/* <Footer/> */}
    </>
  );
}

export default App;
