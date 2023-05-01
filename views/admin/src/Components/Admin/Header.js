import { Box, Button, HStack, Heading, Image, Link, VStack } from '@chakra-ui/react'
import React from 'react'
import logo from '../assest/img/logo144.png';
import '../styleSheets/style.css'
const Header = () => {
  return (
    <>
    <Box className='header_nav'>
<HStack className='nav'><Link to="/admin"  ><Image className='logo' src={logo} /> <Heading className='logoHeading' children={'SAI SAMARTH LOGISTIC'} /> </Link></HStack>
<VStack>
<Link  to="/show">
                    <Button variant={'ghost'} colorScheme={'white'}>
                      DASHBOARD
                    </Button>
                  </Link>

                  <Link  to="/show">
                    <Button variant={'ghost'} colorScheme={'white'}>
                      All Data
                    </Button>
                  </Link>
</VStack>
    </Box>
    </>
  )
}

export default Header