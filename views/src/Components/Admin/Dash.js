import React from 'react';
import Sidebar from './Sidebar';
import { Box, Link } from '@chakra-ui/react';
import Header from './Header';

const Dashboard = () => {
  return (
    <>
    <Header />
<Box id='right' w={'70'} > 
<a href="/" >This Is Dashboard</a></Box>
    </>
  )
}

export default Dashboard