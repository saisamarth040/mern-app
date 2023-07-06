import React, { useEffect } from "react";
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
    Link,
    Button,
    useDisclosure,
    VStack,
    HStack,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, AddIcon, } from '@chakra-ui/icons'
import axios from "axios";
import Cookies from "universal-cookie";
import Sidebar from '../Sidebar';
import '../../styleSheets/style.css'
import Header from "../Header";
const Show_user = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = React.useState([])
    const cookies = new Cookies();
    const api = process.env.REACT_APP_API_URL;
    // const api = "https://saisamarthlogistic.com";
    const token = cookies.get('token')
    const sumbmitHandler = async (e) => {
        console.log(token)
        await axios.get(`${api}/admin/get_all_user`)
            .then((e) => {
                console.log(e)
                setData(e.data.user)
                console.log(data)
            }).catch(error => {
                console.log(error)
            })
    }


    const delete_handler = async (e) => {
        const id = e.target.closest('[data-key]').getAttribute('data-key');
        console.log(id)
        await axios.get(`${api}/admin/delete_user?id=${id}`)
        sumbmitHandler();
    }

    useEffect(() => {
        sumbmitHandler();

    }, [])

    const updateHnadler = (e) => {
        const id = e.target.closest('[data-key]').getAttribute('data-key');
        console.log(id)
        navigate(`/admin/update_user/${id}`);
    }
    return (
        <>
    <Header />
            <ChakraProvider >
                <Box className="SHow_user" w="95vw" m="5">
                    <TableContainer>
                        <Heading className="SHOW_HEAD" mt={'5'} my="4"  size={'lg'}>
                            USER DATA HERE...
                        </Heading>
                        <table class="table  table-striped table-bordered">
                            <thead className="bg-primary-subtle">
                                <tr>
                                    <th>NO.</th>
                                    <th>NAME</th>
                                    <th>DOB  </th>
                                    <th> CONTACT NO</th>
                                    <th>PASSWORD</th>
                                    <th> AADHAR NO </th>
                                    <th> STATE </th>
                                    <th>ADDRESS</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>


                            {data && data.map((e, i) => {
                                const id = e._id
                                return <tbody>
                                    <tr>
                                        <td>  {i + 1}  </td>
                                        <td>   {e.name ? e.name : "--" }  </td>
                                        <td>   {e.date_of_birth ? e.date_of_birth : "--"}  </td>
                                        <td>  {e.contact_no ? e.contact_no : "--"}   </td>
                                        <td>  {e.password ? e.password : "--"}     </td>
                                        <td> {e.aadhar_no ? e.aadhar_no : "--"}   </td>
                                        <td> {e.state ? e.state : "--"}   </td>
                                        <td>    {e.permanent_add ? (<> 
                                            <p>
                                              {e.permanent_add.split(' ')[0]}{' '}
                                              {e.permanent_add.split(' ')[1]}{' '}
                                              {e.permanent_add.split(' ')[2]}{' '}
                                              {e.permanent_add.split(' ')[3]}{' '}
                                            </p>
                                            <p>
                                            {e.permanent_add.split(' ')[4]}{' '}
                                              {e.permanent_add.split(' ')[5]}{' '}
                                              {e.permanent_add.split(' ')[6]}{' '}
                                              {e.permanent_add.split(' ')[7]}{' '}
                                              </p> 
                                              <p>
                                              {e.permanent_add.split(' ')[8]}{' '}
                                              {e.permanent_add.split(' ')[10]}{' '}
                                              {e.permanent_add.split(' ')[11]}{' '}
                                              {e.permanent_add.split(' ')[12]}{' '}
                                              {e.permanent_add.split(' ')[13]}{' '}
                          
                                              </p>
                                              </> ) : '--'}   </td>
                                        <td>  {e._id ? (<>
                                            <p>

                                                <Button key={e._id} value={e._id} onClick={delete_handler} data-key={e._id} variant={'ghost'} colorScheme={'yellow'}>
                                                    <DeleteIcon key={e._id} w={4} h={4} color="red.500" />
                                                </Button>

                                                <Link onClick={onClose} to='/update_user'>
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
    )
}

export default Show_user