import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Logo from '../Request/Logo';
import axios from 'axios';
import React from 'react';
import { RiMenu5Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
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

  const LogoutHander = async () => {
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
        <DrawerOverlay backdropFilter={"blur(4px)"} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'} alignItems="flex-center"  > 


<HStack>
<Link to="/admin/dashboard">

<Logo /> 

            </Link>
             
<Heading size={'sm'}>
SAI SAMARTH LOGISTIC
</Heading>
</HStack>
         


          </DrawerHeader>
          <DrawerBody>





            <VStack mt={'3'} className='headerBody' spacing={'3'} alignItems="flex-center">

              <>
              <Link   onClick={onClose} to="/main">
                  <Button variant={'ghost'} colorScheme={'yellow'}>
                  Insert
                  </Button>
                </Link>
              <Link   onClick={onClose} to="/admin/show_products">
                  <Button variant={'ghost'} colorScheme={'yellow'}>
                  DESHBOARD
                  </Button>
                </Link>
                <Link onClick={onClose} to="/admin/create_user">
                  <Button variant={'ghost'} colorScheme={'yellow'}>
                  CREATE USER
                  </Button>
                </Link>

                <Link onClick={onClose} to="/admin/show_user">
                  <Button variant={'ghost'} colorScheme={'yellow'}>
                  VIEW USER
                  </Button>
                </Link>

                {/* <Link onClick={onClose} to="/admin/show_products">
                  <Button variant={'ghost'} colorScheme={'yellow'}>
THIS MONTH
                  </Button>
                </Link> */}
                <Link onClick={onClose} to="/admin/show_all_products">
                  <Button variant={'ghost'} colorScheme={'yellow'}>
                  VIEW ALL PRODUCTS

                  </Button>
                </Link>

                <HStack>
                  <Link to="/admin/show_all_products">
                  </Link>
                </HStack>

              </>

            </VStack>



          </DrawerBody>

        </DrawerContent>



      </Drawer>



    </>
  );
};

export default Header;
