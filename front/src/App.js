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

function App() {
  return (
    <>
      {/* <Header/> */}
      <BrowserRouter>
        <Routes>

          <Route element={<PrivateRouter/>}>
            <Route path='/' element={<DefaultLayout><Home/></DefaultLayout>}/>
            
          </Route>
          <Route path='/login' element={<SimpleLayout><Login/></SimpleLayout>} />
          <Route path='/register' element={<SimpleLayout><Register/></SimpleLayout>} />
          <Route path='/recoveryPassword' element={<SimpleLayout><RecoveryPassword/></SimpleLayout>} />
          <Route path='/recoveryPassword/code' element={<SimpleLayout><RecoveryCode/></SimpleLayout>} />
        </Routes>
      </BrowserRouter>
      {/* <Footer/> */}
    </>
  );
}

export default App;
