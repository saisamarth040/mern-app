import { ReactNode, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
  Heading,
  FormLabel,
  Input,
  List,
  ListItem,
  ListIcon,
  TableContainer,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import Logo from '../Request/Logo';
import axios from 'axios';
import "./style.css" 

const NavLink = (children) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Navbar() {
  const [inputValue, setInputValue] = useState("");
  const [text, setText] = useState("");
  const [state, setState] = useState(false)
  const [result, setResult] = useState([]);
  const [loading, setLoadng] = useState(false);
  const [table, setTable] = useState(false);
  const [searchState, setSearchState] = useState(false);
  console.log(searchState)
  
  const api = process.env.REACT_APP_API_URL;
  // const api = "https://saisamarthlogistic.com";
  const ApiHandler = async(e)=>{
    try {
     setLoadng(true)
     console.log(searchState)
     if(searchState){
      console.log("Api working")
      const data = await axios.post(`${api}/admin/search`, { text }, {
        headers: { 'Content-Type': 'application/json' }
      })
      setLoadng(false)
      setResult(data.data)
     }
 
    
    } catch (error) {
      setLoadng(false)
    }
  }

const SubmitHanlder = async (e)=>{
  e.preventDefault();
try {
  console.log(inputValue)
  const data = await axios.post(`${api}/admin/searchdetails`, { inputValue }, {
    headers: { 'Content-Type': 'application/json' }
  })
  console.log(data)
  setTable(true)
  setState(data.data)
} catch (error) {
  console.log(error)
}
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
  useEffect(() => {
    ApiHandler()
    SubmitHanlder()
  
  }, [ApiHandler])


  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
    <Box className='serachBox'>
    { (
          <Box py={4} px={8}>
            <List spacing={2}>
              {result.map((number) => (
                <ListItem key={number}>
               <h1 onClick={(e) => { setInputValue(number.unique_no); setState(true); }} className='searchValue'>{number.unique_no}</h1>

                </ListItem>
              ))}
            </List>
          </Box>
        )}
    </Box>
    <Box className=''>
    {table && (
          <Box className='TAbleBox' py={4} px={8}>
         <h1 onClick={(e)=>setTable(false)} className='close'>close</h1>
         <TableContainer>
                            
                      
                            <table id='tabledata' class="table  table-striped table-bordered">
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
                                    </tr>
                                </thead>
              {  state.map((e,i) => (
               <tbody>
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
                  <td>   {e.deliver_city ?  (
                   <>
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
                   </>

                   )  : "--"} </td>
                  <td className="text-center">    {e.deliver_time ? e.deliver_time.toString().split("T")[0] : "--"}   </td>
                  <td className="text-center">  {e.deliver_time ?(  e.deliver_time.toString().split("T")[1].split('.')[0] ): "--"}     </td>
                  <td className="text-center">  {e.deliver_time ? checkDayOfWeek(e.deliver_time) : "--"}     </td>
                  <td className="text-center">  {e.file.url?  <Link  to={`${e.file.url}`}>VIEW</Link> : "--"} </td>
                  
                


              </tr>
          </tbody>
              ))}
         </table>
         </TableContainer>
          </Box>
        )}
    </Box>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box >

            <HStack justifyContent={'space-between'}> 
<HStack w={500}>
              <Link to="/admin/dashboard">
                <Logo />
              </Link>
              <Heading size={'sm'}>
                SAI SAMARTH LOGISTIC
              </Heading>
            </HStack>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <form onSubmit={ApiHandler} style={{ width: '100%',display:"flex" }} >
            <Box my={'4'}>
            <Input
              required
              id="name"
              placeholder="Search here!"
              value={inputValue}
              focusBorderColor="yellow.500"
              onChange={(e) => {setInputValue(e.target.value);setSearchState(true);}}
            />
            </Box>
           <Box ms={4}> 
           <Button onClick={SubmitHanlder}  my="4" colorScheme={'yellow'} type="submit">
              Search
            </Button>
           </Box>
          </form>
            </Flex>
       
            </HStack>

            
           
          </Box>

          
        </Flex>
      </Box>
    </>
  );
}