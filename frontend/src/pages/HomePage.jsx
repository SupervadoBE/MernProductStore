import { useProductStore } from '@/store/product'
import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCart from '@/components/ProductCart'
import { Toaster } from '@/components/ui/toaster'

const HomePage = () => {
  const { fetchProducts, products } = useProductStore()
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])
  console.log("products", products)
  return (
    <Container maxW={"breakpoint-lg"} py={12}>
      <VStack gap={8}>
        <Text
          textStyle={"2xl"}
          fontWeight={"bold"}
          bgGradient={"to-r"}
          gradientFrom={"cyan.400"}
          gradientTo={"blue.500"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products 🚀
        </Text>


        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            xl: 3
          }}
          gap={10}
          w={"full"}
        >
          {products.map((product) =>(
            <ProductCart key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text textStyle={'xl'} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
            No Products found 😕 {" "}
            <Link to={"/create"}>
              <Text as={'span'} color={'blue.500'} _hover={{ textDecoration: 'underline' }}>
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
      <Toaster />
    </Container>
  )
}

export default HomePage