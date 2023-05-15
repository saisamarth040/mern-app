import { Box, Button, Container, FormLabel, HStack, Heading, Input, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(null);
    const navigate = useNavigate();
    const cookies = new Cookies();
    const api = process.env.REACT_APP_API_URL;
    // const api = "https://saisamarthlogistic.com";
  
    const sumbmitHandler = async (e) => {
      e.preventDefault();
      await axios.post(`${api}/admin/signin`, { email, password }, {
        headers: { 'Content-Type': 'application/json' }
      })
        .then((data) => {
          cookies.set('token', data['data']['token'])
          navigate('/admin/dashboard')
        }).catch(error => {
          setErr(error.response.data.message)
          console.log(error)
        })
  
    }
  return (
    <>

        
    <Container h={'95vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'16'}>
          <Heading children={'SAI SAMARTH LOGISTIC'} />


          <form onSubmit={sumbmitHandler} style={{ width: '100%' }}>
            <Box my={'4'}>
              <FormLabel htmlFor="name" children="EMAIL: " />
              <Input
                required
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your Email"
                type={'email'}
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

export default Login