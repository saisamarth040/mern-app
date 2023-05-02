import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import logo from '../../../src/Components/assest/img/logo144.png';
const Logo = () => {
  return (
    <>
    <Box>
        <Image w={'45px'} src={logo} />
    </Box>
    </>
  )
}

export default Logo