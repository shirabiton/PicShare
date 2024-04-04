import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getSharings } from './Redux/Actions/sharingActions';
import React, {useEffect } from "react";
import Iframe from './Components/Iframe';
import Footer from './Components/footer';
import HomePage from './Components/header/HomePage';
import About from './Components/header/About';
import Profile from './Components/header/Profile';
import SignIn from './Components/header/SignIn';
import SignUp from './Components/header/SignUp';
import SharingsIframe from './Components/header/SharingsIframe';
import AddNewPost from './Components/AddNewPost';
import ForgotPassword from './Components/header/ForgotPassword';
import Category from './Components/header/Category';
import ScrollToTop from './Components/ScrollToTop';
import AddContent from './Components/POST/AddContent';
import AddImg from './Components/POST/AddImg';
import SelectionCategory from './Components/POST/SelectionCategory';
import BySearch from './Components/BySearch';
import SinglePost from './Components/SinglePost';
import NewCard from './Components/NewCard';


function App() {

  const dispatch = useDispatch();

  // מחזירה את כל השיתופים
  useEffect(() => {
    const fetchSharings = async () => {
      try {
        const response = await axios.get('http://localhost:8585/api/sharings/get');
        dispatch(getSharings(response.data));
      } catch (error) {
        console.log('Error fetching sharings:', error);
      }
    };
    fetchSharings();
  }, [dispatch]);

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '10vh',
      }}>
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/HomePage' element={<HomePage />} />
            <Route path='/About' element={<About />} />
            <Route path='/SharingsIframe' element={<SharingsIframe />} />
            <Route path='/Profile' element={<Profile />} />

            <Route path='/AddNewPost' element={<AddNewPost />} />
            <Route path='/ForgotPassword' element={<ForgotPassword />} />
            <Route path='/Category' element={<Category />} />

            <Route path='/AddContent' element={<AddContent />} />
            <Route path='/AddImg' element={<AddImg />} />
            <Route path='/SelectionCategory' element={<SelectionCategory />} />
            <Route path='/BySearch' element={<BySearch />} />
            <Route path='/SinglePost' element={<SinglePost />} />
            <Route path='/NewCard' element={<NewCard />} />

          </Routes>

          <Iframe />

          <ScrollToTop />

          <Footer />

        </BrowserRouter>

      </div>
    </>
  )
}

export default App
