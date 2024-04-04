import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../CardCss.css';

import SharingsIframe from './SharingsIframe';
import { getCategories } from '../../Redux/Actions/categoryActions';

import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';
import NewCard from '../NewCard';


export default function Category() {

  const dispatch = useDispatch();

  const location = useLocation();
  const searchId = new URLSearchParams(location.search);
  const categoryId = searchId.get('id');

  const sharings = useSelector((state) => state.sharings.sharingsList);
  console.log("sharings",sharings)



  const categories = useSelector((state) => state.categories.categoriesList);
   console.log("categories",categories)
  const categoryById = categories && categoryId ? categories.find(category => category.id === parseInt(categoryId)) : {};


  const sharingsByCategory = sharings.filter(sharing => sharing.category.id === parseInt(categoryId));
  console.log("sharingsByCategory",sharingsByCategory)

  // מחזירה את כל הקטגוריות
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8585/api/categories/getCategory');
        dispatch(getCategories(response.data));
      } catch (error) {
        console.log('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [dispatch]);


  return (
    <>
      <SharingsIframe />

      {categoryById ? (
        <>
          <h1 style={{ textAlign: 'center' }}>{categoryById.name}</h1>
          <p style={{ textAlign: 'center', marginBottom: '30vh' }}>{categoryById.description}</p>
        </>
      ) : (
        <Box sx={{ display: 'flex', marginTop: '10vh', marginBottom: '40vh', alignSelf: 'center' }}>
          <CircularProgress sx={{ color: 'black' }} />
        </Box>)}

      <NewCard sharings={sharingsByCategory} type={0} />
    </>
  )
}

