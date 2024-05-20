import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../page/Home'
import Login from '../page/Login'
import Register from '../page/Register'
import PrivateRoute from './PrivateRoute'
import LogoutRoute from './LogoutRoute'

const Router = () => {

    // electron 배포 문제로 우선 HOME만 사용할
    return <Home />

    return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <PrivateRoute component={Home} />
            } />
            <Route path="/login" element={
              <LogoutRoute component={Login} />
            } />
            <Route path="/signup" element={
              <LogoutRoute component={Register} />
            } />
          </Routes>
      </BrowserRouter>
    );
};

export default Router