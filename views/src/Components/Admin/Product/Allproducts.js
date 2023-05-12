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
    FormLabel,
    Stack
} from '@chakra-ui/react'
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, useNavigate } from 'react-router-dom';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import '../../styleSheets/style.css'
import { DeleteIcon, AddIcon, } from '@chakra-ui/icons'
import Sidebar from "../Sidebar";
import { useState } from "react";
import { Calendar } from "react-date-range";
import Header from "../Header";

export default function Allproducts() {
     // const api = process.env.REACT_APP_API_URL;
     const api = "https://saisamarthlogistic.com";
    

    const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const sumbmitHandler = async (e) => {
    await axios.get(`${api}/admin/get_all_products`)
        .then((e) => {
            const d = e.data.products
           
            const searchData = d.filter((product) => {

              return product.unique_no.toLowerCase().includes(searchTerm.toLowerCase());
            });
            const sortedData = [...searchData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setApiData(sortedData)
            setFilteredData(sortedData)
            console.log(sortedData)
        }).catch(error => {
            console.log(error)
        })
}
  // setApiData(response.data.products);
  // setFilteredData(response.data.products);
  React.useEffect(() => {
    sumbmitHandler();
  }, []);

  const delete_handler = async (e) => {
    const id = e.target.closest('[data-key]').getAttribute('data-key');
    await axios.get(`${api}/admin/delete_product?id=${id}`)
    sumbmitHandler()
  }

  const updateHnadler = (e) => {
    const id = e.target.closest('[data-key]').getAttribute('data-key');
    console.log(id)
    navigate(`/admin/update_product/${id}`);
  }


  const handleDateRangeChange = (ranges) => {
    setDateRange([ranges.selection]);
    const filtered = apiData.filter((data) => {
      const createdAt = new Date(data.createdAt);
      return (
        createdAt >= ranges.selection.startDate &&
        createdAt <= ranges.selection.endDate
      );
    });
    setFilteredData(filtered);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    sumbmitHandler();
  };
    return (
        <>
        <Header />
                <ChakraProvider >
           
                <HStack w={'90%'} justify={"space-between"} m={'auto'} >
                                  <Heading className="SHOW_HEAD" mt={'5'} my="4" textAlign={'left'} size={'lg'}>
                              PRODUCTS DATA HERE...
                            </Heading>
                           
                            <Stack style={{marginTop:"4vh"}} mt={'20'}  direction="column" justify="center" align="center" >
              <Heading  size={'md'}>Search by Consignment No: </Heading>
              <Input
                type="text"
                value={searchTerm} 
                onChange={handleSearch}
                placeholder="Search by unique_no"
                focusBorderColor="yellow.500"
              />
            </Stack>
                            </HStack>
                          
                <Box  className="caleder" >
        <DateRangePicker mt={'5'}
          onChange={handleDateRangeChange}
          ranges={dateRange}
        />
      </Box>
                   
                    <Box className="SHow_user_main" w="95vw" m="5">
                        <TableContainer>
                            
                      
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
                                            <td>  {e.pick_city ? <>
                                              <p>
                                              {e.pick_city.split(' ')[0]}{' '}
                                              {e.pick_city.split(' ')[1]}{' '}
                                              {e.pick_city.split(' ')[2]}{' '}
                                             </p>
                                             <p>
                                              {e.pick_city.split(' ')[3]}{' '}
                                              {e.pick_city.split(' ')[4]}{' '}
                                              {e.pick_city.split(' ')[5]}{' '}
                                             </p>

                                             <p>
                                              {e.pick_city.split(' ')[6]}{' '}
                                              {e.pick_city.split(' ')[7]}{' '}
                                              {e.pick_city.split(' ')[8]}{' '}
                                             </p>
                                             <p>
                                              {e.pick_city.split(' ')[9]}{' '}
                                              {e.pick_city.split(' ')[10]}{' '}
                                              {e.pick_city.split(' ')[12]}{' '}
                                             </p>

                                             <p>
                                              {e.pick_city.split(' ')[12]}{' '}
                                              {e.pick_city.split(' ')[13]}{' '}
                                              {e.pick_city.split(' ')[14]}{' '}
                                             </p>

                                             </> : "--"}   </td>
                                            <td className="text-center">  {e.pick_time ? e.pick_time.toString().split("T")[0] : "--"}     </td>
                                            <td className="text-center">  {e.pick_time ?(  e.pick_time.toString().split("T")[1].split(".")[0] ): "--"}     </td>
                                            <td className="text-center"> {e.deliver_pieces ? e.deliver_pieces : "--"}   </td>
                                            <td>   {e.deliver_city ? <>
                                              <p>
                                              {e.deliver_city.split(' ')[0]}{' '}
                                              {e.deliver_city.split(' ')[1]}{' '}
                                              {e.deliver_city.split(' ')[2]}{' '}
                                             </p>
                                             <p>
                                              {e.deliver_city.split(' ')[3]}{' '}
                                              {e.deliver_city.split(' ')[4]}{' '}
                                              {e.deliver_city.split(' ')[5]}{' '}
                                             </p>

                                             <p>
                                              {e.deliver_city.split(' ')[6]}{' '}
                                              {e.deliver_city.split(' ')[7]}{' '}
                                              {e.deliver_city.split(' ')[8]}{' '}
                                             </p>
                                             <p>
                                              {e.deliver_city.split(' ')[9]}{' '}
                                              {e.deliver_city.split(' ')[10]}{' '}
                                              {e.deliver_city.split(' ')[12]}{' '}
                                             </p>

                                             <p>
                                              {e.deliver_city.split(' ')[12]}{' '}
                                              {e.deliver_city.split(' ')[13]}{' '}
                                              {e.deliver_city.split(' ')[14]}{' '}
                                             </p>

                                             </> : "--"} </td>
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