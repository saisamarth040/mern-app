import React from 'react';
import Sidebar from './Sidebar';
import { Box, Link } from '@chakra-ui/react';

const Dashboard = () => {
  return (
    <>
    <Sidebar />
<Box id='right' w={'70'} > 
<a href="/" >home</a></Box>
    </>
  )
}

export default Dashboard