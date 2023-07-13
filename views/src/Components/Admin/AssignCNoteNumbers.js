import { Box, Button, Container, FormLabel, Input, Select, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiurl } from '../../store';
import Header from '../Admin/Header';
import { states } from './User/states';
import Cookies from 'universal-cookie';

const AssignCNoteNumbers = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [state, setState] = useState('');
  const [quantity, setQuantity] = useState('');
  const [c_note, setC_note] = useState('');
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
console.log(state,quantity)
const getConsignment =  async(cnotes)=>{
try{
  const res = await axios.get(`${apiurl}/admin/getOneConsignment?token=${token}`);
  console.log(res)
  setC_note(res.data.consignments.unique_no)
}catch(err){
console.log(err)
}
}
useEffect(() => {
  getConsignment()
}, [])
  const sumbmitHandler = async (e) => {
    e.preventDefault();

    await axios
      .post(`${apiurl}/admin/assignCNoteNumbers`, { state, quantity,c_note }, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => {
        console.log(response.data);
        navigate('/success');
      })
      .catch((error) => {
        navigate('/error');
        setErr(error.response.data.message);
        console.log(error);
      });
  };
  const  changeHander =(e)=>{
    console.log(e)
      }
  return (
    <>
      <Header />
      <Container h={'85vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'16'}>
          <form onSubmit={sumbmitHandler} style={{ width: '100%' }}>
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

export default AssignCNoteNumbers;
