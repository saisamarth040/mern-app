import React, { useEffect, useState } from 'react';
import { states } from './User/states';
import { Box, Button, Container, FormLabel, Heading, Input, Select, VStack } from '@chakra-ui/react';
import Header from './Header';
import { MpState } from '../User/state/mp';
import { ChhState } from '../User/state/chh';
import { RJState } from '../User/state/rj';
import { UtdState } from '../User/state/utd';
import { apiurl } from '../../store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignValueForCity = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);
  const [err, setErr] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [c_note, setC_note] = useState('');
  const navigate = useNavigate();
  const handleStateChange = (event) => {
    const stateValue = event.target.value;
    setSelectedState(stateValue);

    let loadedCities = [];
    switch (stateValue) {
      case 'Madhya Pradesh':
        loadedCities = MpState;
        break;
      case 'Rajasthan':
        loadedCities = RJState;
        break;
      case 'Chhattisgarh':
        loadedCities = ChhState;
        break;
      case 'Uttarakhand':
        loadedCities = UtdState;
        break;
      // Add more cases for other states
      default:
        break;
    }

    setCities(loadedCities);
  };

  const handleCityChange = (event) => {
    const cityValue = event.target.value;
    setSelectedCity(cityValue);
  };
  const oneConsignment = async(event) => {
   const OneConsignments = await axios.get(`${apiurl}/admin/getOneConsignmentState`)
   console.log(OneConsignments.data.consignments.unique_no )
   setC_note(OneConsignments.data.consignments.unique_no)
  };
  console.log(c_note)

  useEffect(() => {
    oneConsignment()
  }, [])
  const handleSubmit = async(event) => {
  try {
    event.preventDefault();
    console.log(c_note)
    // Perform form submission or any other necessary actions
   const datas = await axios
    .post(`${apiurl}/admin/assign_for_city`, { city:selectedCity, state:selectedState, quantity,c_note }, {
      headers: { 'Content-Type': 'application/json' }
    })
    navigate('/success');
    console.log('Selected State:', selectedState);
    console.log('Selected City:', selectedCity);
    console.log('Quantity:', quantity);
  } catch (error) {
    navigate('/error');
    setErr(error.response.data.message);
    console.log(error);
  }
  };

  return (
    <>
      <Header />
      <Container h={'85vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'16'}>
        <Heading id='create_heading' children={'Assign Value For City'} />
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box my={'4'}>
              <FormLabel htmlFor="state" children="SELECT STATE:" />
              <Select onChange={handleStateChange} value={selectedState}>
                <option value="" hidden disabled>
                  SELECT STATE
                </option>
                {states.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </Select>
            </Box>
            {selectedState && (
              <Box my={'4'}>
                <FormLabel htmlFor="city" children="SELECT CITY:" />
                <Select onChange={handleCityChange} value={selectedCity}>
                  <option value="" hidden disabled>
                    SELECT CITY
                  </option>
                  {cities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </Select>
              </Box>
            )}
            <Box my={'4'}>
              <FormLabel htmlFor="quantity" children="QUANTITY:" />
              <Input
                required
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                type={'number'}
                focusBorderColor="yellow.500"
              />
            </Box>
            <Box my={'4'}>
              <Button variant={'ghost'} colorScheme={'yellow'}>
                {err && err}
              </Button>
            </Box>
            <Button my="4" colorScheme={'yellow'} type="submit">
              SUBMIT
            </Button>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default AssignValueForCity;
