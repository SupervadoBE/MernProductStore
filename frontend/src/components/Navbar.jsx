import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { FiPlusSquare, FiSun } from "react-icons/fi"
import { FaMoon } from "react-icons/fa"
import { useColorMode } from './ui/color-mode'

const Navbar = () => {
  const { colorMode, toggleColorMode} = useColorMode()
  return (
    <Container maxW={"1140px"} px={4}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDir={{
            base:"column",
            sm:"row"
          }}
        >
            <Text
              fontStyle={{ base:"22", sm: "28" }}
              fontWeight={"bold"}
              textTransform={"uppercase"}
              textAlign={"center"}
              bgGradient={"to-r"}
              gradientFrom={"cyan.400"}
              gradientTo={"blue.500"}
              bgClip={"text"}
            >
                <Link to={"/"}>Product Store 🛒</Link>
            </Text>

            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/create"}>
                    <Button variant="subtle">
                        <FiPlusSquare size={20} />
                    </Button>
                </Link>
                <Button onClick={toggleColorMode} variant={"subtle"}>
                    {colorMode === "light" ? <FaMoon size={20} /> : <FiSun size={20} /> }
                </Button>
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar