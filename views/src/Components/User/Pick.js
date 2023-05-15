import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#ECC94B',
  backgroundColor: 'white',
};


const Pick = () => {
  const cookies = new Cookies();
  const token = cookies.get('token')
  const navigate = useNavigate();
  const [unique_no, setUnique_no] = useState("");
  const [pieces, setPieces] = useState("");
  const [city, setCity] = useState("");
  const [err, setErr] = useState(null);

  const changeUnique_no = (e) => {
    setUnique_no(e.target.value)
  }
  const changeCity = (e) => {
    setCity(e.target.value)
  }
  const changePieces = (e) => {
    setPieces(e.target.value)
  }


  const data = { pieces, city, unique_no, token }
  // const api = process.env.REACT_APP_API_URL;
  const api = "https://saisamarthlogistic.com";

  const getToken = async(e) =>{
    console.log("object")
    console.log(token)
    await axios.get(`${api}/admin/getUserByToken?token=${token}`).then((e)=>{
      const data = e.data.data
      console.log(e)
      console.log('object')
    })
  }
  useEffect(() => {
    getToken()
  }, [])
  const sumbmitHandler = async (e) => {
    try {
      e.preventDefault();
      await axios.post(`${api}/create_pick_product`, data, {
        headers: { 'Content-Type': 'application/json' }
      })
      navigate('/sucees')
    } catch (error) {
      navigate("/error")
      console.log(error)
      console.log(error.response.data)
      setErr(error.response.data)
    }
  }


  return (
    <>
      <Container h={'100vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'6'}>
          <Heading textTransform={'uppercase'} fontSize={'2xl'} children={'SEHDULE A PICKUP'} />
          <form style={{ width: '100%' }} onSubmit={sumbmitHandler}>
            <Box my="4" display={'flex'} justifyContent="center">
            </Box>
            <Box my={'2'}>
              <FormLabel children="CONSIGNMENT_NO:" />
              <Input
                required
                name="unique_no"
                onChange={changeUnique_no}
                placeholder=">ENTER CONSIGNMENT NO"
                type={'text'}
                focusBorderColor="yellow.500"
              />
            </Box>
            <Box my={'2'} key="pieces" >
              <FormLabel htmlFor="pieces" children="NO_OF_PIECES:" />
              <Input
                required
                id="pieces"
                name={pieces}
                onChange={changePieces}
                placeholder=">NO OF PIECES "
                type={'text'}
                focusBorderColor="yellow.500"
              />
            </Box>
            <Box my={'2'} >
              <FormLabel htmlFor="City" children="CITY_NAME:" />
              <Input
                required
                id="city"
                name="city"
                onChange={changeCity}
                placeholder=">ENTER CITY NAME"
                type={'text'}
                focusBorderColor="yellow.500"
              />
            </Box>
            <Box my="3"> {err && err} </Box>
            <Button my="2" colorScheme={'yellow'} type="submit">
              SUBMIT
            </Button>
          </form>
        </VStack>
      </Container>
    </>
  )
}

export default Pick