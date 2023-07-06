import { Box, Button, Container, FormLabel, HStack, Heading, Input, Select, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useDispatch } from "react-redux";
import Header from '../Admin/Header';
import { states } from './User/states';
const Genarate = () => {
    const [uniqueNO, setUniqueNO] = useState('');
    const [logined, setLogined] = useState(false);
  const [state,setState] = useState('');
    const [quantity, setQuantity] = useState('');
    const dispatch = useDispatch();
    const [err, setErr] = useState(null);
    const navigate = useNavigate();
    const cookies = new Cookies();
  //  const api = process.env.REACT_APP_API_URL;
    const api = "https://saisamarthlogistic.com";
  
    const sumbmitHandler = async (e) => {
      e.preventDefault();
      await axios.post(`${api}/admin/genarete_staet_consignment_no`, { uniqueNO, quantity , state }, {
        headers: { 'Content-Type': 'application/json' }
      })
        .then((data) => {
          console.log(data)
          navigate('/sucees')
        }).catch(error => {
          navigate("/error")
          setErr(error.response.data.message)
          console.log(error)
        })
  
    }
    const  changeHander =(e)=>{
      console.log(e)
        }
  return (
    <>
    <Header />
   <Container h={'85vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'16'}>
          <Heading children={'GENERATE CONSIGNMENT NUMBER'} />


          <form onSubmit={sumbmitHandler} style={{ width: '100%' }}>
            <Box my={'4'}>
              <FormLabel htmlFor="name" children="SERIES: " />
              <Input
                required
                id="name"
                value={uniqueNO}
                onChange={e => setUniqueNO(e.target.value)}
                placeholder="Enter your Name"
                type={'text'}
                focusBorderColor="yellow.500"
              />
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="password" children="QUANITY:" />
              <Input
                required
                id="text"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                placeholder="Enter Your Password"
                type={'number'}
                focusBorderColor="yellow.500"
              />
            </Box>
            <Box my={'4'}>
            <FormLabel htmlFor="SELECT STATE" children="SELECT_STATE:" />
            <Select onChange={e => setState(e.target.value)} >
            <option  value="" selected hidden disable> SELECT_STATE </option>
      {states.map((state) => (
     
        <option  onChange={changeHander}  key={state.value}  value={state.value}>
          {state.label}
        </option>
      ))}
    </Select>
          </Box>
            <HStack>
              <Button variant={'ghost'} colorScheme={'yellow'}>
                {err && err}
              </Button>
            </HStack>
            <Button my="4" colorScheme={'yellow'} type="submit">
              SUBMIT
            </Button>
          </form>
        </VStack>
      </Container>
    </>
  )
}

export default Genarate