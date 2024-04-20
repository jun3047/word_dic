import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import PrivateRoute from './PrivateRoute'
import LogoutRoute from './LogoutRoute'

const Router = () => {

    // electron 배포 문제로 HOME을 기본으로
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