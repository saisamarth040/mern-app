import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
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

const Sidebar = () => {
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
        <DrawerHeader borderBottomWidth={'1px'}>nav</DrawerHeader>
        <DrawerBody>
        <VStack spacing={'4'} alignItems="flex-start">
                  <>     
                <Link onClick={onClose} to="/main">
                  <Button variant={'ghost'} colorScheme={'yellow'}>
                 INSERT
                  </Button>
                </Link>
                <Link onClick={onClose} to="/">
                  <Button variant={'ghost'} colorScheme={'yellow'}>
                   LOGIN
                  </Button>
                </Link>

                  
            
                    </>  


        </VStack>



        </DrawerBody>

        </DrawerContent>



      </Drawer>



    </>
  );
};

export default Sidebar;
