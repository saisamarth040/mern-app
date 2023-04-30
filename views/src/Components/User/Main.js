import { Button, Container, HStack, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Main = () => {
  return (
    <>

      <Container mt={'30vh'} h="90vh" p="8">

        <Heading my="8" textAlign={'center'} size={'lg'}>
          SELECT YOUR RESPONSE
        </Heading>
        <VStack boxShadow={'lg'} pb="16" alignItems={'center'} borderRadius="lg">

          <VStack>
            <HStack gap="16">
              <Link to="/pick">
                <Button colorScheme={'yellow'}>PICK</Button>
              </Link>
              <Link to="/deliver">
                <Button colorScheme={'yellow'}>DELIVER</Button>
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </>
  )
}

export default Main