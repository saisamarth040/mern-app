import {  Image, Box, Button, Container, FormLabel, Heading, Input, VStack, HStack } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import '../styleSheets/style.css';

export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-3%',
  width: '35%',
  borderRadius: '5%',
  border: '.1vw solid #ECC94B',
  height: '100%',
  color: '#001',
  backgroundColor: 'white',
};


const Deliver = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const navigate = useNavigate();
  const [unique_no, setUnique_no] = useState("");
  const [pieces, setPieces] = useState("");
  const [city, setCity] = useState("");
  const [err, setErr] = useState(null);
  const [file, setFile] = useState(null);
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');

  const changeUnique_no = (e) => {
    setUnique_no(e.target.value)
  }
  const changeCity = (e) => {
    setCity(e.target.value)
  }
  const changePieces = (e) => {
    setPieces(e.target.value)
  }

  // const api = process.env.REACT_APP_API_URL;
  const api = "https://saisamarthlogistic.com";
  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setFile(e.target.files[0]);
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };
  const sumbmitHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("unique_no", unique_no);
      formData.append("pieces", pieces);
      formData.append("city", city);
      formData.append("token", token);
      console.log(formData)
      await axios.post(`${api}/deliver`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/sucees');
    } catch (error) {
      setErr(error.response.data);
      setTimeout(() => {
        navigate("/error")
      }, 2000);
    }
  };

  return (
    <>
      <Container h={'100vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'6'}>
          <Heading textTransform={'uppercase'} fontSize={'2xl'} children={'DELIVER A PRODUCT'} />
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
            <Box className='avtar1' my={'2'}>
              <FormLabel htmlFor="chooseAvatar" children="CHOOSE FILE" />
              <Input
                accept="image/*"
                required
                id="chooseAvatar"
                type={'file'}
                name='file'
                focusBorderColor="yellow.500"
                css={{ '&::file-selector-button': fileUploadCss }}
                onChange={changeImage}
              />
            </Box>
            {imagePrev && <HStack> <Image className='avtar' src={imagePrev} boxSize={'30'} /> <Heading textTransform={'uppercase'} fontSize={'xl'} children={'PREVIEW'} /></HStack>}
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

export default Deliver
