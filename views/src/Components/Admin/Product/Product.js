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
    Button
} from '@chakra-ui/react'
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, useNavigate } from 'react-router-dom';

import { DeleteIcon, AddIcon, } from '@chakra-ui/icons'
import Sidebar from "../Sidebar";
import Header from "../Header";

export default function Product() {
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
                const a = d.filter((e) => {
                    const today = new Date();
                    const yyyy = today.getFullYear();
                    let mm = today.getMonth() + 1;
                    if (mm < 10) mm = '0' + mm;
                    const dateNow = yyyy + "-" + mm;
                    const createDate = e.createdAt.split("T")[0].slice(0, 7);
                    return dateNow === createDate;
                })
                const sortedData = [...a].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setData(sortedData)
                console.log(data)
            }).catch(error => {
                console.log(error)
            })
    }
    function checkDayOfWeek(dateString) {
        try {
          const date = new Date(dateString);
          const options = { weekday: 'long' };
          const day = date.toLocaleDateString('en-US', options);
          return day;
        } catch (error) {
          return 'Invalid date format';
        }
      }

    React.useEffect(() => {
        sumbmitHandler();
    }, [])

    const delete_handler = async (e) => {
        const id = e.target.closest('[data-key]').getAttribute('data-key');
        console.log(id)
       const data = await axios.get(`${api}/admin/delete_product?id=${id}`)
       console.log(data)
        sumbmitHandler();
    }
    const updateHnadler = (e) => {
        const id = e.target.closest('[data-key]').getAttribute('data-key');
        console.log(id)
        navigate(`/admin/update_product/${id}`);
    }

    return (
        <>
        <Header />
                <ChakraProvider >
                    <Box className="SHow_user" w="99vw" m="5">
                        <TableContainer>
                            <Heading className="SHOW_HEAD" mt={'5'} my="4" textAlign={'center'} size={'lg'}>
                               THIS MONTH PRODUCTS DATA HERE...
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
                                        <th>PICK DAY </th>
                                        <th>DELIVER_PIECES</th>
                                        <th>TO CITY</th>
                                        <th>DELIVER DATE </th>
                                        <th>DELIVER DAY </th>
                                        <th>VIEW BILL </th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
    
    
                                {data && data.map((e, i) => {
                                    const id = e._id
                                    return <tbody>
                                        <tr>
                                            <td className="text-center">  {i + 1}  </td>
                                            <td >   {e.unique_no ? e.unique_no : '--'}   </td>
                                            <td className="text-center">   {e.pick_pieces ? e.pick_pieces : "--"}  </td>
                                            <td>  {e.pick_city ?  <>
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

                                             </>  : "--"}   </td>
                                            <td className="text-center">  {e.pick_time ? e.pick_time.split(",")[0] : "--"}     </td>
                                            <td className="text-center">  {e.pick_time ?(  e.pick_time.split(" ")[1].split(":")[0] +":" +e.pick_time.split(" ")[1].split(":")[1]+ " "+ e.pick_time.split(" ")[2] ): "--"}     </td>

                                            <td className="text-center">  {e.pick_time ? checkDayOfWeek(e.pick_time) : "--"}     </td>
                                            <td className="text-center"> {e.deliver_pieces ? e.deliver_pieces : "--"}   </td>
                                            <td>   {e.deliver_city ?  <>
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

                                             </>  : "--"} </td>
                                            <td className="text-center">   {e.deliver_time ? e.deliver_time.split(",")[0] : "--"} </td>
                                            <td className="text-center">  {e.deliver_time ? checkDayOfWeek(e.deliver_time) : "--"}     </td>
                                            <td className="text-center">  {e.file.url?  <Link  to={`${e.file.url}`}>VIEW</Link> : "--"} </td>
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