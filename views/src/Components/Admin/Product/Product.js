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
    VStack,
    FormLabel,
    Input,
    Stack
} from '@chakra-ui/react'
import axios from "axios";

import Cookies from "universal-cookie";
import { Link, useNavigate } from 'react-router-dom';
import { writeFile } from 'xlsx';
import * as XLSX from 'xlsx';

import { DeleteIcon, AddIcon, } from '@chakra-ui/icons'
import Sidebar from "../Sidebar";
import Header from "../Header";
import { cityStateMapping } from "./CityState";
import { apiurl } from "../../../store";

export default function Product() {
    const [data, setData] = React.useState([])
    const cookies = new Cookies();
    const token = cookies.get('token')
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState('');
const [searchResults, setSearchResults] = React.useState([]);
 
    const submitHandler = async (e) => {
        await axios
          .get(`${apiurl}/admin/get_all_products`)
          .then((response) => {
            const allProducts = response.data.products;
            const searchData = allProducts.filter((product) => {
              const uniqueNo = product.unique_no.toLowerCase();
              const searchTermLower = searchTerm.toLowerCase();
              const uniqueNoParts = uniqueNo.split(" ");
              return uniqueNoParts.some((part) => part.includes(searchTermLower));
            });
      
            const sortedData = [...searchData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setData(sortedData);

            // console.log(sortedData);
          })
          .catch((error) => {
            console.log(error);
          });
      };


 

      const exdata = async () => {
        const esxl = await Promise.all(data.map(async (e, i) => {
          const mystate = getStateOfCity(e.deliver_city);
          let result;
          if (mystate && mystate) {
            result = mystate;
          } else {
            result = e.deliver_city;
          }
          return {
            "SNO": `${i + 1}`,
            "CONSIGNMENTS_NO": `${e.unique_no}`,
            "PICK PIECES": `${e.pick_pieces}`,
            "PICK CITY": `${e.pick_city}`,
            "PICK DATE": `${e.pick_time?.toString().split("T")[0] ?? ""}`,
            "PICK TIME": `${e.pick_time?.toString().split("T")[1]?.split('.')[0] ?? ""}`,
            "PICK DAY": `${checkDayOfWeek(e.pick_time?.toString()) ?? ""}`,
            "DELIVER PIECES": `${e.deliver_pieces}`,
            "DELIVER CITY": result,
            "DELIVER DATE": `${e.deliver_time?.toString().split("T")[0] ?? ""}`,
            "DELIVER TIME": `${e.deliver_time?.toString().split("T")[1]?.split('.')[0] ?? ""}`,
            "DELIVER DAY": `${checkDayOfWeek(e.deliver_time?.toString()) ?? ""}`,
            "BILL": `${e.file?.url ?? ""}`
          };
        }));
      
        console.log(esxl);
        return esxl;
      };
      React.useEffect(() => {
        submitHandler();
        exdata()
    }, [])
      

      const downloadExcel = async() => {
        const data = await exdata();
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.xlsx';
        link.click();
        window.URL.revokeObjectURL(url);
      };
      
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

   

    const delete_handler = async (e) => {
        const id = e.target.closest('[data-key]').getAttribute('data-key');
        console.log(id)
       const data = await axios.get(`${apiurl}/admin/delete_product?id=${id}`)
       console.log(data)
       submitHandler();
    }
    const updateHnadler = (e) => {
        const id = e.target.closest('[data-key]').getAttribute('data-key');
        console.log(id)
        navigate(`/admin/update_product/${id}`);
    }
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        submitHandler();
      };
    return (
        <>
        <Header />
                <ChakraProvider >
                    <Box className="SHow_user" w="99vw" m="5">
                        <TableContainer>
                            <HStack w={'90%'} justify={"space-between"} m={'auto'} >
                                  <Heading className="SHOW_HEAD" mt={'5'} my="4" textAlign={'left'} size={'lg'}>
                               THIS MONTH PRODUCTS DATA HERE...
                            </Heading>
                            <button className="btn btn-primary" onClick={downloadExcel}>Download Excel</button>
                            <Stack  direction="row" justify="center" align="center" >
              <Heading size={'md'}>Search by Consignment No: </Heading>
              <Input
                type="text"
                value={searchTerm} 
                onChange={handleSearch}
                placeholder="Search by unique_no"
                focusBorderColor="yellow.500"
              />
            </Stack>
                            </HStack>
                          
                           
                            <table class="table  table-striped table-bordered">
                                <thead className="bg-primary-subtle">
                                    <tr>
                                        <th>S.NO</th>
                                        <th>CONSIGNMENTS_NO</th>
                                        <th> PICK_PIECES</th>
                                        <th>FROM CITY</th>
                                        <th>PICK DATE </th>
                                        <th>PICK TIME </th>
                                        <th>PICK DAY </th>
                                        <th>DELIVER_PIECES</th>
                                        <th>TO CITY</th>
                                        <th>DELIVER DATE </th>
                                        <th>DELIVER TIME </th>
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
                                            <td className="text-center">  {e.pick_time ? e.pick_time.toString().split("T")[0] : "--"}     </td>
                                            <td className="text-center">  {e.pick_time ?(  e.pick_time.toString().split("T")[1].split('.')[0] ): "--"}     </td>

                                            <td className="text-center">  {e.pick_time ? checkDayOfWeek(e.pick_time.toString()) : "--"}     </td>
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
                                            <td className="text-center">    {e.deliver_time ? e.deliver_time.toString().split("T")[0] : "--"}   </td>
                                            <td className="text-center">  {e.deliver_time ?(  e.deliver_time.toString().split("T")[1].split('.')[0] ): "--"}     </td>
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

function getStateOfCity(city) {
  if (typeof city !== 'string' || city.trim().length === 0) {
    return null;
  }

  const cityStateMapping = new Map([
    ["ALWAR", "JAIPUR"],
    ["BHARATPUR", "JAIPUR"],
    ["CHURU", "JAIPUR"],
    ["DHOLPUR", "JAIPUR"],
    ["HNUMANGARH", "JAIPUR"],
    ["JAIPUR", "JAIPUR"],
    ["JHUNJHUNU", "JAIPUR"],
    ["KARAULI", "JAIPUR"],
    ["SIKAR", "JAIPUR"],
    ["SRI GANGANAGAR", "JAIPUR"],
    ["TONK", "JAIPUR"],
    ["MGH JAIPUR", "JAIPUR"],
    ["JNU JAIPUR", "JAIPUR"],
    ["NIMS JAIPUR", "JAIPUR"],

    ["AJMER", "JODHPUR"],
    ["BARMER", "JODHPUR"],
    ["BIKANER", "JODHPUR"],
    ["PALI", "JODHPUR"],
    ["JALORE", "JODHPUR"],
    ["JODHPUR", "JODHPUR"],
    ["NAGAUR", "JODHPUR"],
    ["SIROHI", "JODHPUR"],

    ["BHILWARA", "UDAIPUR"],
    ["BANSWARA", "UDAIPUR"],
    ["CHHITORGARH", "UDAIPUR"],
    ["DUNGARPUR", "UDAIPUR"],
    ["SAGWARA DUNGARPUR", "UDAIPUR"],
    ["JHALAWAR", "UDAIPUR"],
    ["KOTA", "UDAIPUR"],
    ["RAJSAMAND", "UDAIPUR"],
    ["UDAIPUR", "UDAIPUR"],
    ["PIMS UDAIPUR", "UDAIPUR"],
    ["GMCG UDAIPUR", "UDAIPUR"],
    ["AIIMS UDAIPUR", "UDAIPUR"],
    ["AIMS RAJSAMAND", "UDAIPUR"],

    ["Coronation Hospital, Dehradun ", "IGMC HP"],
    ["Haldwani", "IGMC HP"],
    ["Pithoragrh", "IGMC HP"],
    ["AIIMS Rishikesh,", "IGMC HP"],
    ["Mahant Indresh Hospital,Dehradun", "IGMC HP"],
    ["Roorkee", "IGMC HP"],
    ["Himalayan Institute Hospital,Dehradun", "IGMC HP"],
    
    ["BHOPAL", "MGM INDORE"],
    ["BARWANI", "MGM INDORE"],
    ["BALAGHAT", "MGM INDORE"],
    ["BURHANPUR", "MGM INDORE"],
    ["DEWAS", "MGM INDORE"],
    ["DHAR", "MGM INDORE"],
    ["GWALIOR", "MGM INDORE"],
    ["INDORE", "MGM INDORE"],
    ["JABALPUR", "MGM INDORE"],
    ["KHANDWA", "MGM INDORE"],
    ["KHARGONE", "MGM INDORE"],
    ["NEEMUCH", "MGM INDORE"],
    ["RATLAM", "MGM INDORE"],
    ["REWA", "MGM INDORE"],
    ["SAGAR", "MGM INDORE"],
    ["SEONI", "MGM INDORE"],
    ["SHIVPURI", "MGM INDORE"],
    ["UJJAIN", "MGM INDORE"],
    ["MORENA", "MGM INDORE"],
    ["SIDHI", "MGM INDORE"],
    ["SHAHDOL", "MGM INDORE"],
    ["CHHINDWARA", "MGM INDORE"],

    ["BALAGHAT", "PJLN RAIPUR"],
    ["JABALPUR", "PJLN RAIPUR"],
    ["SEONI", "PJLN RAIPUR"],

    ["DURG", "PJLN RAIPUR"],
    ["BILASPUR", "PJLN RAIPUR"],
    ["SARGUJA", "PJLN RAIPUR"],
    ["BASTAR", "PJLN RAIPUR"],
    ["KORBA", "PJLN RAIPUR"],
    ["RAIGARH", "PJLN RAIPUR"],
    ["RAJNANDGAON", "PJLN RAIPUR"],
    

    // Add more city-state mappings as needed
  ]);

  const state = [...cityStateMapping.entries()]
    .filter(([key, value]) => key.toUpperCase() === city.toUpperCase())
    .map(([key, value]) => value);

  return state.length > 0 ? state[0] : null;
}