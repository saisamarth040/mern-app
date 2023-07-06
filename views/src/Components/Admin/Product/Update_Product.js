import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useDispatch } from "react-redux";
import Sidebar from '../Sidebar';
import Header from '../Header';
const Update_Product = () => {

  const [unique_no, setUnique_no] = useState('');
  const [pick_pieces, setPick_pieces] = useState('');
  const [pick_city,setPick_city] = useState('');
  const [deliver_pieces, setDeliver_pieces] = useState('');
  const [deliver_city, setDeliver_city] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const data = {
    unique_no,
    pick_pieces,
    pick_city,
    deliver_pieces,
    deliver_city,id
  }

  const api = process.env.REACT_APP_API_URL;
  // const api = "https://saisamarthlogistic.com";
const getuser = async()=>{
  await axios.get(`${api}/admin/get_one_product?id=${id}`).then((e)=>{
    const data = e.data.product;
    setUnique_no(data.unique_no);
    setPick_pieces(data.pick_pieces);
    setPick_city(data.pick_city);
    setDeliver_pieces(data.setDeliver_pieces);
    setDeliver_city(data.deliver_city);
  })
}
  const cookies = new Cookies();
  const sumbmitHandler = async (e) => {
    e.preventDefault();
    await axios.post(`${api}/admin/update_product`,data ,{
      headers: { 'Content-Type': 'application/json' }
    })
      .then((data) => {
        navigate('/admin/show_products')
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
        <Heading id='create_heading' children={'UPDATE PRODUCT'} />      
        <form onSubmit={sumbmitHandler} style={{ width: '100%' }}>
        <Box my={'4'}>
            <FormLabel htmlFor="Name" children="CONSINMENT_NO:" />
            <Input
              required
              id="unique_no"
              value={unique_no}
              onChange={e => setUnique_no(e.target.value)}
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="PICK_PIECES" children="PICK_PIECES:" />
            <Input
              required
              id="PICK_PIECES"
              value={pick_pieces}
              onChange={e => setPick_pieces(e.target.value)}
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
            <Box my={'4'}>
            <FormLabel htmlFor="PICK_CITY" children="PICK_CITY:" />
            <Input
              required
              id="PICK_CITY"
              value={pick_city}
              onChange={e => setPick_city(e.target.value)}
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="deliver_pieces" children="DELIVER_PIECES" />
            <Input
              required
              id="deliver_pieces"
              value={deliver_pieces}
              onChange={e => setDeliver_pieces(e.target.value)}
               type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="deliver_city" children="DELIVER_CITY:" />
            <Input
              required
              id="deliver_city"
              value={deliver_city}
              onChange={e => setDeliver_city(e.target.value)}

              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
         
          <Button my="4" colorScheme={'yellow'} type="submit">
           UPDATE PRODUCT
          </Button>
        </form>
        </VStack>
    </Container>
</>
  )
}

export default Update_Product

