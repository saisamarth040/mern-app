import { Image, Box, Button, Container, FormLabel, Heading, Input, VStack, HStack, Select } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { MpState } from './state/mp';
import { citys } from './city';
import { apiurl } from '../../store';

const fileUploadCss = {
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
  const [unique_no, setUnique_no] = useState('');
  const [pieces, setPieces] = useState('');
  const [city, setCity] = useState('');
  const [err, setErr] = useState(null);
  const [file, setFile] = useState(null);
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');
  const [art, setArt] = useState('');
  const [consignment, setConsigmnet] = useState([]);
  const [myState, setMyState] = useState('');
  const [consignments, setConsignments] = useState("");

  const changeUnique_no = (e) => {
    setUnique_no(e.target.value);
  };
  const consignmentHandler = (event) => {
    console.log(event.target)
    setUnique_no(event.target.value);
  };

  const changeCity = (e) => {
    setCity(e.target.value);
  };

  const changePieces = (e) => {
    setPieces(e.target.value);
  };

  const getToken = async () => {
    try {
      const response = await axios.get(`${apiurl}/admin/getUserByToken?token=${token}`);
      const data = response.data;
      setMyState(data.state);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiurl}/admin/getOneConsignmentForState?city=${city}`);
      setConsignments(response.data.consignments);
      console.log(response.data.consignments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
    fetchData();
  }, [city]); // Fetch data whenever the selected city changes


  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${apiurl}/admin/getConsignment?token=${token}`);
  //     setConsigmnet(response.data.consignments);
  //     console.log(response.data.consignments);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const consignmentChange = (e) => {
    setUnique_no(e.target.value);
  };



  const changeImage = (e) => {
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
      formData.append('file', file);
      formData.append('unique_no', unique_no);
      formData.append('pieces', pieces);
      formData.append('city', city);
      formData.append('token', token);

      await axios.post(`${apiurl}/deliver`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/success');
    } catch (error) {
      setErr(error.response.data);
      setTimeout(() => {
        navigate('/error');
      }, 2000);
    }
  };

  function renderTableRows() {
    if (myState.trim() === 'MP') {
      return (
        <Box my={'4'}>
          <FormLabel htmlFor="SELECT STATE" children="SELECT_STATE:" />
          <Select onChange={(e) => setArt(e.target.value)}>
            <option value="" selected hidden disabled>
              SELECT_ART_CENTER
            </option>
            {MpState.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </Select>
        </Box>
      );
    }
    if (myState.trim() === 'Lakshadweep') {
      return (
        <Box my={'4'}>
          <FormLabel htmlFor="SELECT STATE" children="SELECT_STATE:" />
          <Select onChange={(e) => setArt(e.target.value)}>
            <option value="" selected hidden disabled>
              SELECT_STATE
            </option>
            {MpState.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </Select>
        </Box>
      );
    }
  }

  return (
    <>
      <Container h={'100vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'6'}>
          <Heading textTransform={'uppercase'} fontSize={'2xl'} children={'DELIVER A PRODUCT'} />
          <form style={{ width: '100%' }} onSubmit={sumbmitHandler}>
            <Box my="4" display={'flex'} justifyContent="center"></Box>
            <Box my={'4'}>
              <FormLabel htmlFor="city" children="SELECT CITY:" />
              <Select onChange={changeCity} value={city}>
                <option value="" disabled>
                  SELECT CITY
                </option>
                {citys.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </Select>
            </Box>
            {consignments.length > 0 && (
              <Box my={'4'}>
              <FormLabel htmlFor="consignment" children="SELECT CONSIGNMENT:" />
              <Select onChange={consignmentHandler}>
                <option value="" disabled>
                  SELECT CONSIGNMENT
                </option>
                {consignments.map((consignment, index) => (
                  <option
                    key={consignment.unique_no}
                    value={consignment.unique_no}
                    selected={index === 0} // Set selected attribute for the first option
                  >
                    {consignment.unique_no}
                  </option>
                ))}
              </Select>
            </Box>
            
            )}
            <Box my={'2'} key="pieces">
              <FormLabel htmlFor="pieces" children="NO_OF_PIECES:" />
              <Input
                required
                id="pieces"
                name="pieces"
                value={pieces}
                onChange={changePieces}
                placeholder=">NO OF PIECES"
                type={'text'}
                focusBorderColor="yellow.500"
              />
            </Box>
          
            {renderTableRows()}
            <Box className="avtar1" my={'2'}>
              <FormLabel htmlFor="chooseAvatar" children="CHOOSE FILE" />
              <Input
                accept="image/*"
                required
                id="chooseAvatar"
                type={'file'}
                name="file"
                focusBorderColor="yellow.500"
                css={{ '&::file-selector-button': fileUploadCss }}
                onChange={changeImage}
              />
            </Box>
            {imagePrev && (
              <HStack>
                <Image className="avtar" src={imagePrev} boxSize={'30'} />
                <Heading textTransform={'uppercase'} fontSize={'xl'} children={'PREVIEW'} />
              </HStack>
            )}
            <Box my="3"> {err && err} </Box>
            <Button my="2" colorScheme={'yellow'} type="submit">
             SUBMIT
            </Button>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default Deliver;
