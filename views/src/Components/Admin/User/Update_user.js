import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useDispatch } from "react-redux";
import Sidebar from '../Sidebar';
import Header from '../Header';
const Update_user = () => {

  const [logined, setLogined] = useState(false);
  const [name, setName] = useState('');
  const [contact_no, setContact_no] = useState('');
  const [date_of_birth,setDate_of_birth] = useState('');
  const [permanent_add, setPermanent_add] = useState('');
  const [aadhar_no, setAadhar_no] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const data = {
    name,
    contact_no,
    date_of_birth,
    permanent_add,
    aadhar_no,id
  }

  // const api = process.env.REACT_APP_API_URL;
  const api = "https://saisamarthlogistic.com";
const getuser = async()=>{
  axios.get(`${api}/admin/get_one_user?id=${id}`).then((e)=>{
    const data = e.data.user;
    console.log(data)
    const inputDate = data.date_of_birth
    let formattedDate = formatDate(inputDate);
    console.log(date_of_birth)
    console.log(formattedDate)
    setName(data.name)
    setPermanent_add(data.permanent_add)
    setAadhar_no(data.aadhar_no)
    setContact_no(data.contact_no)
    setPassword(data.password)
    setDate_of_birth(formattedDate)
  })
}
  const cookies = new Cookies();
  const sumbmitHandler = async (e) => {
    e.preventDefault();
    await axios.post(`${api}/admin/update_user`,data ,{
      headers: { 'Content-Type': 'application/json' }
    })
      .then((data) => {
        navigate('/admin/show_user')
      }).catch(error => {
        navigate("/error")
        console.log(error)
      })
    }


    useEffect(() => {
      getuser()
    }, [])
    
  return (
    <>
    <Header />
  <Container h={'95vh'}>
  <VStack h={'full'} justifyContent="center" spacing={'16'}>
        <Heading id='create_heading' children={'UPDATE USER'} />      
        <form onSubmit={sumbmitHandler} style={{ width: '100%' }}>
        <Box my={'4'}>
            <FormLabel htmlFor="Name" children="Name" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="john Doe"
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="Date_of_birth" children="date_of_birth" />
            <Input
              required
              id="date_of_birth"
              value={date_of_birth}
              onChange={e => setDate_of_birth(e.target.value)}
              placeholder="Enter birth date"
              type={'date'}
              focusBorderColor="yellow.500"
            />
          </Box>
            <Box my={'4'}>
            <FormLabel htmlFor="Contact_no" children="Contact_no" />
            <Input
              required
              id="date_of_birth"
              value={contact_no}
              onChange={e => setContact_no(e.target.value)}
              placeholder="Enter Contact No"
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="Permanent_add" children="Permanent_add" />
            <Input
              required
              id="permanent_add"
              value={permanent_add}
              onChange={e => setPermanent_add(e.target.value)}
              placeholder="Enter Permanent address"
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="password" children="password" />
            <Input
              required
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="Aadhar_no" children="Aadhar_no" />
            <Input
              required
              id="aadhar_no"
              value={aadhar_no}
              onChange={e => setAadhar_no(e.target.value)}
              placeholder="Enter Aadhar number"
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Button my="4" colorScheme={'yellow'} type="submit">
           UPDATE USER
          </Button>
        </form>
        </VStack>
    </Container>
</>
  )
}

export default Update_user

function formatDate(inputDate) {
  let parts = inputDate.split('/');
  let year = parts[2];
  let month = parts[1];
  let day = parts[0];
  let formattedDate = year + '-' + month + '-' + day;
  return formattedDate;
}