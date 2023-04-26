import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Box,
  Th,
  Td,
  TableContainer,
  ChakraProvider,
  Heading,
  HStack,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";

export default function Show() {
  // const api = process.env.REACT_APP_API_URL;
  const api = "https://saisamarthlogistic.com";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [deliverData, setDeliverData] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get("token");

  const sumbmitHandler = async () => {
    try {
      const response = await axios.get(`${api}/getdata?token=${token}`);
      setDeliverData(response.data.deliver_products);
      setData(response.data.products);
      console.log(response.data.products);
      console.log(response.data);
      data.map((e)=>{
        console.log(e)
        const deliveryData = deliverData.find((delivery)=>{
          console.log(delivery,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        })
        
        console.log(deliveryData,">>>>>>>>>>.");
      })

    } catch (error) {
      console.log(error);
    }
  };
  const deleteHandler = async (e) => {
    const id = e.target.closest("[data-key]").getAttribute("data-key");
    const api = process.env.REACT_APP_API_URL;
    try {
      await axios.get(`${api}/delete_product?id=${id}`);
      sumbmitHandler();
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = (e) => {
    const id = e.target.closest("[data-key]").getAttribute("data-key");
    navigate(`/update_product/${id}`);
  };

  useEffect(() => {
    sumbmitHandler();
  }, []);

  return (
    <ChakraProvider>
      <Box w="95vw" m="10">
        <TableContainer>
          <Heading my="8" textAlign={"center"} size={"lg"}>
            Total data is here!
          </Heading>
          <table className="table table-striped table-bordered">
            <thead className="bg-primary-subtle">
              <tr>
                <th>NO.</th>
                <th>CONSIGNMENT_NO</th>
                <th> PIC PIECES</th>
                <th> DELIVER PIECES</th>
                <th>TO CITY</th>
                <th>FROM CITY</th>
                <th>PICKUP DATE</th>
                <th>DELIVER DATE</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{e.unique_no && e.unique_no ? e.unique_no : "NOP!"}</td>
                      <td>{e.pick_pieces && e.pick_pieces ? e.pick_pieces : "NOP!"}</td>
                      <td>{e.deliver_pieces && e.deliver_pieces ? e.deliver_pieces : "NOP!"}</td>
                      <td>{e.pick_city && e.pick_city ? e.pick_city : "NOP!"}</td>
                      <td>{e.deliver_city && e.deliver_city ? e.deliver_city : "NOP!"}</td>
                      <td>{e.pick_time && e.pick_time ? e.pick_time : "NOP!"}</td>
                      <td>{e.pick_time && e.deliver_time ? "NOP!": e.deliver_time }</td>
                  

                    
                <td> {e._id ? (
                  <>
                    <HStack>
                      <Button key={i} value={e._id} onClick={deleteHandler} data-key={e._id} variant={'ghost'} colorScheme={'yellow'}>
                        <DeleteIcon key={i} w={4} h={4} color="red.500" />
                      </Button>
                      <Button onClick={updateHandler} key={i} value={e._id} variant={'ghost'} colorScheme={'yellow'} data-key={e._id}>
                        <AddIcon w={4} h={4} color="red.500" />
                      </Button>
                    </HStack>
                  </>
                ) : "noop..."}   </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableContainer>
  </Box>
</ChakraProvider>
  );
}