import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Button, Container, FormLabel, Heading, Input, Select, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { citys } from './city';
import { apiurl } from '../../store';

const Pick = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [consignments, setConsignments] = useState("");
  const [err, setErr] = useState(null);
  const [pieces, setPieces] = useState('');
  const [art, setArt] = useState('');
  const [myState, setMyState] = useState('');
  const [unique_no, setUnique_no] = useState('');

  const changeCity = (event) => {
    setCity(event.target.value);
  };
  const consignmentHandler = (event) => {
    console.log(event.target)
    setUnique_no(event.target.value);
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

  const downloadPDF = async () => {
    try {
      const response = await axios.get(`${apiurl}/pdf-download/${unique_no}`, {
        responseType: 'blob',
      });
  
      if (!response.data) {
        throw new Error('Error downloading PDF');
      }
  
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
  
      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.download = `${unique_no}.pdf`;
  
      // Simulate a click on the link element to trigger the download
      link.click();
  
      // Clean up by revoking the temporary URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      // Handle the error, e.g., display an error message to the user
    }
  };


  useEffect(() => {
    fetchData();
  }, [city]); // Fetch data whenever the selected city changes

  const data = { pieces, city, unique_no:unique_no, token, art };
 console.log(data)
      const sumbmitHandler = async (e) => {
        try {
          e.preventDefault();
          await axios.post(`${apiurl}/create_pick_product`, data, {
            headers: { 'Content-Type': 'application/json' },
          });
          downloadPDF()
          navigate('/success');
        } catch (error) {
          navigate('/error');
          console.log(error);
          console.log(error.response.data);
          setErr(error.response.data);
        }
      };



     
  return (
    <>
      <Container h={'100vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'6'}>
          <Heading textTransform={'uppercase'} fontSize={'2xl'} children={'SCHEDULE A PICKUP'} />
          <form style={{ width: '100%' }} onSubmit={sumbmitHandler}>
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
            <Box my={'2'}>
              <FormLabel htmlFor="pieces" children="NO OF PIECES:" />
              <Input
                required
                id="pieces"
                name={pieces}
                onChange={(event) => setPieces(event.target.value)}
                placeholder="Enter number of pieces"
                type={'text'}
                focusBorderColor="yellow.500"
              />
            </Box>
            {/* <Box my={'4'}>
              <FormLabel htmlFor="art" children="SELECT ART CENTER:" />
              <Select onChange={(event) => setArt(event.target.value)}>
                <option value="" disabled>
                  SELECT ART CENTER
                </option>
                Add options for art centers 
              </Select>
            </Box> */}
            <Box my="3">{err && err}</Box>
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
