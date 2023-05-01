import * as React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr, Box,
    Th,
    Td,
    TableContainer,
    ChakraProvider,
    Heading,
    HStack,
    Button,
    Input,
    FormLabel
} from '@chakra-ui/react'
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import '../../styleSheets/style.css'
import { DeleteIcon, AddIcon, } from '@chakra-ui/icons'
import Sidebar from "../Sidebar";
import { useState } from "react";
import { Calendar } from "react-date-range";

export default function Allproducts() {
    const [data, setData] = React.useState([])
    const cookies = new Cookies();
    const token = cookies.get('token')
    const navigate = useNavigate();
    // const api = process.env.REACT_APP_API_URL;
    const api = "https://saisamarthlogistic.com";
    const sumbmitHandler = async (e) => {
        await axios.get(`${api}/admin/get_all_products`)
            .then((e) => {
                const d = e.data.products
                console.log(d)
                setData(d)
                const sortedData = [...d].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }).catch(error => {
                console.log(error)
            })
    }

    React.useEffect(() => {
        sumbmitHandler();
    }, [])

    const delete_handler = async (e) => {
        const id = e.target.closest('[data-key]').getAttribute('data-key');
        await axios.get(`${api}/admin/delete_product?id=${id}`)
        sumbmitHandler();
    }
    const updateHnadler = (e) => {
        const id = e.target.closest('[data-key]').getAttribute('data-key');
        console.log(id)
        navigate(`/admin/update_product/${id}`);
    }

    const [filter, setFilter] = useState('today');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
  
    const filterData = () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const thisWeek = new Date(today);
      thisWeek.setDate(today.getDate() - today.getDay());
      const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const filterStartDate = new Date(startDate);
      const filterEndDate = new Date(endDate);
data.map(e=>{
    console.log(new Date(e.createdAt).toDateString())
    console.log(today.toDateString())
})
      switch (filter) {
        case 'today':
          return data.filter((item) => new Date(item.createdAt).toDateString() === today.toDateString());
        case 'yesterday':
          return data.filter((item) => new Date(item.createdAt).toDateString() === yesterday.toDateString());
        case 'thisWeek':
          return data.filter((item) => new Date(item.createdAt).toDateString() >= thisWeek && new Date(item.createdAt).toDateString() <= today);
        case 'thisMonth':
          return data.filter((item) => new Date(item.createdAt).toDateString() >= thisMonth && new Date(item.createdAt).toDateString() <= endDate);
        case 'lastMonth':
          return data.filter((item) => new Date(item.createdAt).toDateString() >= lastMonth && new Date(item.createdAt).toDateString() < thisMonth);
        case 'custom':
          return data.filter((item) => new Date(item.createdAt).toDateString() >= filterStartDate && new Date(item.createdAt).toDateString() <= filterEndDate);
        default:
          return data;
      }
    };

  const filteredData = filterData();
  const changeStartHandler = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    setFilter({ startDate: newStartDate, endDate });
  };

  const changeEndHandler = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    setFilter({ startDate, endDate: newEndDate });
  };
    return (
        <>
        <Sidebar />
                <ChakraProvider >
                    <Box className="SHow_user_main" w="95vw" m="5">
                        <TableContainer>
                            <Heading className="SHOW_USER_HEADING" mt={'5'} my="4" textAlign={'center'} size={'lg'}>
                                PRODUCTS DATA HERE...
                            </Heading>
                            <Box className="box-container">
  <Box className="select-box">
    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
      <option value="today">Today</option>
      <option value="yesterday">Yesterday</option>
      <option value="thisWeek">This week</option>
      <option value="thisMonth">This month</option>
      <option value="lastMonth">Last month</option>
      <option value="custom">Custom date range</option>
    </select>
    {filter === 'custom' && (
      <Box className="calendar-box">
       <HStack>
       <Box my={'4'}>
            <FormLabel htmlFor="startDate" children="SELECT STARTING :" />
            <Input
              required
              id="startDate"
              value={startDate}
              onChange={changeStartHandler}
              type={'date'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="endDate" children="SELECT ENDING:" />
            <Input
              required
              id="endDate"
              value={endDate}
              onChange={changeEndHandler}
              type={'date'}
              focusBorderColor="yellow.500"
            />
          </Box>
       </HStack>
      </Box>
    )}
  </Box>
</Box>
                            <table class="table  table-striped table-bordered">
                                <thead className="bg-primary-subtle">
                                    <tr>
                                        <th>NO.</th>
                                        <th>CONSIGNMENTS_NO</th>
                                        <th> PICK_PIECES</th>
                                        <th>FROM CITY</th>
                                        <th>PICK DATE </th>
                                        <th>PICK TIME </th>
                                        <th> DELIVER_PIECES</th>
                                        <th>TO CITY</th>
                                        <th>DELIVER DATE </th>
                                        <th>VIEW BILL </th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
    
    
                                {filteredData && filteredData.map((e, i) => {
                                    const id = e._id
                                    return <tbody>
                                        <tr>
                                            <td className="text-center">  {i + 1}  </td>
                                            <td >   {e.unique_no ? e.unique_no : '--'}   </td>
                                            <td className="text-center">   {e.pick_pieces ? e.pick_pieces : "--"}  </td>
                                            <td>  {e.pick_city ? e.pick_city : "--"}   </td>
                                            <td className="text-center">  {e.pick_time ? e.pick_time.split(",")[0] : "--"}     </td>
                                            <td className="text-center">  {e.pick_time ?(  e.pick_time.split(" ")[1].split(":")[0] +":" +e.pick_time.split(" ")[1].split(":")[1]+ " "+ e.pick_time.split(" ")[2] ): "--"}     </td>
                                            <td className="text-center"> {e.deliver_pieces ? e.deliver_pieces : "--"}   </td>
                                            <td>   {e.deliver_city ? e.deliver_city : "--"} </td>
                                            <td className="text-center">   {e.deliver_time ? e.deliver_time.split(",")[0] : "--"} </td>
                                            <td className="text-center">  VIEW </td>
                                            <td>  {e._id ? (<>
                                                <p>
    
                                                    <Button key={e._id} value={e._id} onClick={delete_handler} data-key={e._id} variant={'ghost'} colorScheme={'yellow'}>
                                                        <DeleteIcon key={e._id} w={4} h={4} color="red.500" />
                                                    </Button>
    
                                                    
                                                        <Button onClick={updateHnadler} key={e._id} value={e._id} variant={'ghost'} colorScheme={'yellow'} data-key={e._id}>
                                                            <AddIcon w={4} h={4} color="red.500" />
                                                        </Button>
                                                
                                                </p>
                                            </>
                                            ) : "--"}  </td>
    
    
                                        </tr>
                                    </tbody>
    
                                })}
    
                            </table>
    
    
    
    
                        </TableContainer>
                    </Box>
                </ChakraProvider>
    
    
    
            </>
    );
}