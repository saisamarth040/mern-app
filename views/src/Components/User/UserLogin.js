import { Box, Button, Container, FormLabel, HStack, Heading, Input, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useDispatch } from "react-redux";
import Navbar from '../Admin/Navbar';

const UserLogin = () => {
  const [name, setName] = useState('');
  const [logined, setLogined] = useState(false);
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const cookies = new Cookies();
//  const api = process.env.REACT_APP_API_URL;
  const api = "https://saisamarthlogistic.com";

  const sumbmitHandler = async (e) => {
    e.preventDefault();
    await axios.post(`${api}/signin`, { name, password }, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then((data) => {
       const token = data.data.datas.user.token
       console.log(token)
     console.log(data)
       cookies.set('token', token);
        const dataType = data.data.datas.user.type
        if(dataType==="admin"){
          setLogined(true)
          dispatch({ type: "login" })
          return navigate('/admin/show_products')
        }
        navigate('/main')
      }).catch(error => {
        setErr(error.response.data.message)
        console.log(error)
      })

  }

  return (
    <>
     <Navbar />
      <Container h={'85vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'16'}>
          <Heading children={'SAI SAMARTH LOGISTIC'} />


          <form onSubmit={sumbmitHandler} style={{ width: '100%' }}>
            <Box my={'4'}>
              <FormLabel htmlFor="name" children="NAME: " />
              <Input
                required
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your Name"
                type={'text'}
                focusBorderColor="yellow.500"
              />
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="password" children="PASSWORD:" />
              <Input
                required
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                type={'password'}
                focusBorderColor="yellow.500"
              />
            </Box>
            <HStack>
              <Button variant={'ghost'} colorScheme={'yellow'}>
                {err && err}
              </Button>
            </HStack>
            <Button my="4" colorScheme={'yellow'} type="submit">
              Login
            </Button>
          </form>
        </VStack>
      </Container>
    </>
  )
}

export default UserLogin