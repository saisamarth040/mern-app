import {
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
import logo from '../assest/img/logo144.png';
import axios from 'axios';
import React from 'react';
import {  RiMenu5Fill } from 'react-icons/ri';
import {  useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
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
      <Button
        onClick={onOpen}
        colorScheme={'yellow'}
        width="12"
        height={'12'}
        rounded="full"
        zIndex={'overlay'}
        position={'fixed'}
        top="6"
        left="6"
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay  backdropFilter={"blur(4px)"}/>
        <DrawerContent>
        <DrawerHeader borderBottomWidth={'1px'}><Image className='logo' src={logo} />  SAI SAMARTH LOGISTIC</DrawerHeader>
        <DrawerBody>
        <VStack spacing={'4'} alignItems="flex-start">
        <HStack>
     
                  <> 
                   <HStack>
                        <Link onClick={onClose} to="/admin/dashboard">
                          <Button variant={'ghost'} colorScheme={'yellow'}>
                            DESHBOARD
                          </Button>
                        </Link>
                       
                       
                      </HStack>

                  <LinkButton onClose={onClose} url="/admin/create_user" title="Insert" /> <Link onClick={onClose} to="/data">
                  <Button variant={'ghost'} colorScheme={'yellow'}>
                  CREATE USER
                  </Button>
                </Link>
                <Link onClick={onClose} to="/admin/show_user">
                  <Button variant={'ghost'} colorScheme={'yellow'}>
                  VIEW USER
                  </Button>
                </Link>
                <Link onClick={onClose} to="/admin/show_products">
                  <Button variant={'ghost'} colorScheme={'yellow'}>
                  THIS MONTH 
                  </Button>
                </Link>
                <Link onClick={onClose} to="/admin/show_all_products">
                  <Button variant={'ghost'} colorScheme={'yellow'}>
                  VIEW ALL PRODUCTS
                  </Button>
                </Link>

                  </> 
              </HStack>
        </VStack>



        </DrawerBody>

        </DrawerContent>



      </Drawer>



    </>
  );
};

export default Header;
