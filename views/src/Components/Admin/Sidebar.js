import { Box, Button, HStack, Heading, Image, Link, VStack } from '@chakra-ui/react'
import React from 'react'
import logo from '../assest/img/logo144.png';
const Sidebar = () => {
  return (
    <>
    


<aside id="nav"  className="main-sidebar sidebar-dark-primary elevation-4">



<div id="nav" className="sidebar">

<Box className='header_nav'>
<HStack className='nav'><a   href="/admin/dashboard"  ><Image className='logo' src={logo} />  SAI SAMARTH LOGISTIC</a></HStack>
</Box>


<VStack>
                  <a  href="/admin/dashboard">
                    <Button style={{fontSize:"19px"}} variant={'ghost'} colorScheme={'white'}>
                      DASHBOARD
                    </Button>
                  </a>
                  <a  href="/admin/create_user">
                    <Button style={{fontSize:"19px"}} variant={'ghost'} colorScheme={'white'}>
                      CREATE USER
                    </Button>
                  </a>
                  <a  href="/admin/show_user">
                    <Button style={{fontSize:"19px"}} variant={'ghost'} colorScheme={'white'}>
                      VIEW USER
                    </Button>
                  </a>
                  <a  href="/admin/show_products">
                    <Button style={{fontSize:"19px"}} variant={'ghost'} colorScheme={'white'}>
                      THIS MONTH 
                    </Button>
                  </a>
                  <a  href=" /admin/show_all_products">
                    <Button style={{fontSize:"19px"}} variant={'ghost'} colorScheme={'white'}>
                      VIEW ALL PRODUCTS
                    </Button>
                  </a>
                  /admin/show_all_products
                  
</VStack>

</div>

</aside>






    </>
  )
}

export default Sidebar