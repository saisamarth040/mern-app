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

export default function Main() {
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
                const sortedData = [...d].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setData(sortedData)
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
        navigate(`/update_product/${id}`);
    }

    return (
        <>
        <Sidebar />
                <ChakraProvider >
                    <Box className="SHow_user_main" w="95vw" m="5">
                        <TableContainer>
                            <Heading className="SHOW_USER_HEADING" mt={'5'} my="4" textAlign={'center'} size={'lg'}>
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
                                        <th> DELIVER_PIECES</th>
                                        <th>TO CITY</th>
                                        <th>DELIVER DATE </th>
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
    
                                                    <Link   to='/update_user'>
                                                        <Button onClick={updateHnadler} key={e._id} value={e._id} variant={'ghost'} colorScheme={'yellow'} data-key={e._id}>
                                                            <AddIcon w={4} h={4} color="red.500" />
                                                        </Button>
                                                    </Link>
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