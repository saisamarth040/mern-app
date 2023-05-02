import { Box, Button, Container, FormLabel, Heading, Input,Select, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useDispatch } from "react-redux";
import { states } from './states';
import Header from '../Header';

const Create_user = () => {

  const [name, setName] = useState('');
  const [contact_no, setContact_no] = useState('');
  const [date_of_birth,setDate_of_birth] = useState('');
  const [state,setState] = useState('');
  const [permanent_add, setPermanent_add] = useState('');
  const [aadhar_no, setAadhar_no] = useState('');
  const [err, setErr] = useState('');
  const data = {
    name,
    contact_no,
    date_of_birth,
    permanent_add,
    aadhar_no,
    state
  }
  const  changeHander =(e)=>{
console.log(e)
  }
  const navigate = useNavigate();
  const cookies = new Cookies();
  const sumbmitHandler = async (e) => {
    e.preventDefault();
    // const api = process.env.REACT_APP_API_URL;
    const api = "https://saisamarthlogistic.com";
    await axios.post(`${api}/admin/create_user`,data ,{
      headers: { 'Content-Type': 'application/json' }
    })
      .then((data) => {
        navigate('/admin/dashboard')
      }).catch(error => {
        console.log(error.response.data.message)
        setErr(error.response.data.message)
      })
    }

  return (
    <>
    <Header/>
  <Container h={'95vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'16'}>
        <Heading id='create_heading' children={'CREATE USER'} /> 
        <form onSubmit={sumbmitHandler} style={{ width: '100%' }}>
        <Box mb={'4'}>
            <FormLabel htmlFor="Name" children=" USER_NAME:" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="ENTER USER NAME"
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="Date_of_birth" children="DATE_OF_BIRTH:" />
            <Input
              required
              id="date_of_birth"
              value={date_of_birth}
              onChange={e => setDate_of_birth(e.target.value)}
              placeholder="ENTER BIRTH DATE"
              type={'date'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="Contact_no" children="CONTACT:" />
            <Input
              required
              id="date_of_birth"
              value={contact_no}
              onChange={e => setContact_no(e.target.value)}
              placeholder="ENTER CONTACT NO"
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="Permanent_add" children="PERMANENT_ADDRESS:" />
            <Input
              required
              id="permanent_add"
              value={permanent_add}
              onChange={e => setPermanent_add(e.target.value)}
              placeholder="ENTER PERMANENT ADDRESS"
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="Aadhar_no" children="AADHAR_N0:" />
            <Input
              required
              id="aadhar_no"
              value={aadhar_no}
              onChange={e => setAadhar_no(e.target.value)}
              placeholder="ENTER AADHAR NUMBER"
              type={'text'}
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
           <Box>{err && err}</Box>
          <Button my="4" colorScheme={'yellow'} type="submit">
           CREATE USER
          </Button>
        </form>
        </VStack>
    </Container>
</>
  )
}

export default Create_user