import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Button, Container, FormLabel, Heading, Input, Select, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { MpState } from './state/mp';
import { citys } from './city';

const Pick = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const navigate = useNavigate();
  const [unique_no, setUnique_no] = useState('');
  const [pieces, setPieces] = useState('');
  const [city, setCity] = useState('');
  const [err, setErr] = useState(null);
  const [art, setArt] = useState('');
  const [myState, setMyState] = useState('');
  const [consignment, setConsigmnet] = useState([]);

  const changeUnique_no = (e) => {
    setUnique_no(e.target.value);
  };

  const changeCity = (e) => {
    setCity(e.target.value);
  };
const consignmentChange = (e)=>{
  console.log(e)
  setUnique_no(e.target.value);
}
  const changePieces = (e) => {
    setPieces(e.target.value);
  };

  const data = { pieces, city, unique_no, token, art };
  const api = process.env.REACT_APP_API_URL;

  const getToken = async () => {
    try {
      const response = await axios.get(`${api}/admin/getUserByToken?token=${token}`);
      const { data } = response;
      console.log(response);
      setMyState(data.state);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    try {
      const response = await axios.get(`${api}/admin/getConsignment?token=${token}`);
      setConsigmnet(response.data.consignments)
      console.log(response.data.consignments);
    } catch (error) {
      console.log(error);
    }
  };

  const sumbmitHandler = async (e) => {
    try {
      e.preventDefault();
      await axios.post(`${api}/create_pick_product`, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      navigate('/success');
    } catch (error) {
      navigate('/error');
      console.log(error);
      console.log(error.response.data);
      setErr(error.response.data);
    }
  };

  const changeHander = (e) => {
    console.log(e);
  };

  const renderTableRows = () => {
    if (myState.trim() === 'MP' || myState.trim() === 'madhya pradesh') {
      return (
        <Box my={'4'}>
          <FormLabel htmlFor="SELECT STATE" children="SELECT_STATE:" />
          <Select onChange={(e) => setArt(e.target.value)}>
            <option value="" disabled>
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
            <option value="" disabled>
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
    return null; // Added return statement for the case when no table rows need to be rendered
  };

  return (
    <>
      <Container h={'100vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'6'}>
          <Heading textTransform={'uppercase'} fontSize={'2xl'} children={'SEHDULE A PICKUP'} />
          <form style={{ width: '100%' }} onSubmit={sumbmitHandler}>
            <Box my={'4'}>
              <FormLabel htmlFor="SELECT CONSIGNMENT_NO:" children="CONSIGNMENT_NO:" />
              <Select onChange={consignmentChange}>
                <option value="" disabled>
                  Select Consignment
                </option>
                {consignment.map((consignment) => (
                  <option key={consignment.unique_no} value={consignment.unique_no}>
                    {consignment.unique_no}
                  </option>
                ))}
              </Select>
            </Box>
            <Box my={'2'} key="pieces">
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
            <Box my={'4'}>
              <FormLabel htmlFor="SELECT CITY" children="SELECT_CITY:" />
              <Select onChange={changeCity}>
                <option value="" disabled>
                  SELECT_CITY
                </option>
                {citys.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </Select>
            </Box>
            {renderTableRows()}
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

export default Pick;
