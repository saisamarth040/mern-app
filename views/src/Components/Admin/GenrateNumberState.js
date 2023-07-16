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
import '../styleSheets/style.css'
import Header from "./Header";
import { apiurl } from "../../store";
const GenrateNumberState = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = React.useState([])
    const cookies = new Cookies();

    const token = cookies.get('token')
    const sumbmitHandler = async (e) => {
        console.log(token)
        await axios.get(`${apiurl}/admin/getgenrateConsginmentState`)
            .then((e) => {
                console.log(e.data)
                setData(e.data)
                console.log(data)
            }).catch(error => {
                console.log(error)
            })
    }


    
    useEffect(() => {
        sumbmitHandler();

    }, [])

  
    return (
        <>
    <Header />
            <ChakraProvider >
                <Box className="SHow_user" w="95vw" m="5">
                    <TableContainer>
                        <Heading className="SHOW_HEAD" mt={'5'} my="4"  size={'lg'}>
                            GENRATE STATE NUMBER HERE...
                        </Heading>
                        <table class="table  table-striped table-bordered">
                            <thead className="bg-primary-subtle">
                                <tr>
                                    <th>NO.</th>
                                    <th>DATE</th>
                                    <th>C_NOTE  </th>
                                    <th>STATE  </th>
                                </tr>
                            </thead>


                            {data && data.map((e, i) => {
                               const firstEntry = e.entries[0].uniqueNO;
                               const lastEntry = e.entries[e.entries.length - 1].uniqueNO;
                                return <tbody>
                                    <tr>
                                        <td>  {i + 1}  </td>
                                        <td>   {e.date ? e.date : "--" }  </td>
                                        <td>{`${firstEntry} - ${lastEntry}`}</td>
                                        <td>{e.state}</td>
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

export default GenrateNumberState