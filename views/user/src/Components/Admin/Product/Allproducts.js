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
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import '../../styleSheets/style.css'
import { DeleteIcon, AddIcon, } from '@chakra-ui/icons'
import Sidebar from "../Sidebar";
import { useState } from "react";
import { Calendar } from "react-date-range";
import Header from "../Header";

export default function Allproducts() {
    const [data, setData] = React.useState([])
    const [apiData, setApiData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [dateRange, setDateRange] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
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
                
            }).catch(error => {
                console.log(error)
            })
    }

    React.useEffect(() => {
        sumbmitHandler();
        
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/getdata?token=${token}`);
        setApiData(response.data.products);
        setFilteredData(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

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
    return (
        <>
        <Header />
                <ChakraProvider >
                <Box m="10" w="70vw" textAlign="center">
        <DateRangePicker
          onChange={handleDateRangeChange}
          ranges={dateRange}
        />
      </Box>
                    <Box className="SHow_user_main" w="95vw" m="5">
                        <TableContainer>
                            <Heading className="SHOW_USER_HEADING" mt={'5'} my="4" textAlign={'center'} size={'lg'}>
                                PRODUCTS  HERE...
                            </Heading>
                      
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