

import React from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SearchResultList from '../pages/SearchResultList';
import TourDetails from '../pages/TourDetails';
import Tours from '../pages/Tours';
import ThankYou from '../pages/ThankYou';
import AdminPage from '../pages/AdminPage';
import AddTours from '../pages/AddTours';
import ViewBookings from '../pages/ViewBookings';
import ViewReviews from '../pages/ViewReviews';
import ViewUsers from '../pages/ViewUsers';
import DeleteTours from '../pages/DeleteTours';
import Payment from '../pages/Payment'
const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to = '/home'/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/tours' element={<Tours/>}/>
        <Route path='/tours/:id' element={<TourDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/thank-you' element={<ThankYou/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/tours/search' element={<SearchResultList/>}/>
        <Route path="/add-tours" element={<AddTours/>} />
        <Route path="/view-bookings" element={<ViewBookings/>} />
        <Route path="/view-reviews" element={<ViewReviews/>} />
        <Route path="/view-users" element={<ViewUsers/>} />
        <Route path="/delete-tours" element={<DeleteTours/>} />
        <Route path="/payment" element={<Payment />} />
        
    </Routes>
  );
};

export default Router;
