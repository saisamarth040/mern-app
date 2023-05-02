import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Image,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import '../styleSheets/style.css'
import axios from 'axios';
import React from 'react';
import {  RiMenu5Fill } from 'react-icons/ri';
import {  useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Logo from '../Request/Logo';
const cookies = new Cookies();
const token = cookies.get('token')
const LinkButton = ({ url = '/', title = 'Home', onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={'ghost'}>{title}</Button>
  </Link>
);

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated } = useSelector((state) => state.root);
  const navigate = useNavigate();

const LogoutHander = async ()=>{
  console.log("first")
  const api = process.env.REACT_APP_API_URL;
await axios.get(`${api}/signout?token=${token}`)
cookies.remove("token")
navigate('/login')
}
  return (
    <>
     

    
      <Box className='HeaderNav' w={'22vw'} h={'100vh'} >
   
      <HStack>
                        <Link  to="/admin/dashboard">
                      
                          <Box  w={'22vw'} className='headerLogo'  borderBottomWidth={'1px'}><Logo />  SAI SAMARTH LOGISTIC</Box>

                        </Link>
                      </HStack>
      
        <VStack className='headerBody' spacing={'5'} alignItems="flex-center">
      
                  <> 
                       <HStack>
                        <Link  to="/admin/dashboard">
                          DESHBOARD
                        </Link>
                      </HStack>
                      <HStack>
                        <Link  to="/admin/create_user">
                          CREATE USER
                        </Link>
                      </HStack>
                      <HStack>
                        <Link  to="/admin/show_user">
                          VIEW USER
                        </Link>
                      </HStack>
                      <HStack>
                        <Link  to="/admin/show_products">
                          THIS MONTH 
                        </Link>
                      </HStack>
                      <HStack>
                        <Link  to="/admin/show_all_products">
                          VIEW ALL PRODUCTS 
                        </Link>
                      </HStack>
                
                  </> 
       
        </VStack>
 
      </Box>

    </>
  );
};

export default Header;
