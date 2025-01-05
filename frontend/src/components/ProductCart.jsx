import { Box, Button, Heading, HStack, IconButton, Image, Input, Text, VStack } from '@chakra-ui/react'
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { MdDeleteForever } from "react-icons/md"
import { CiEdit } from "react-icons/ci"
import { useColorModeValue } from './ui/color-mode'
import { useProductStore } from '@/store/product'
import { toaster } from "@/components/ui/toaster"


const ProductCart = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product)
  const textColor = useColorModeValue("gray.500", "gray.400")
  const bg = useColorModeValue("white", "gray.800")

  const { deleteProduct, updateProduct } = useProductStore()
  const handleDeleteProduct = async (pid) =>{
    const { success, message } = await deleteProduct(pid)
    if(!success){
      toaster.create({
        description: message,
        type: "error",
        placement: "bottom-end"
      })
    } else {
      toaster.create({
        description: message,
        type: "success",
        placement: "bottom-end"
      })
    }
  }

  const [open, setOpen] = useState(false)

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct)
    setOpen(false)

    if(!success){
      toaster.create({
        description: message,
        type: "error",
        placement: "bottom-end"
      })
    }else {
      toaster.create({
        description: message,
        type: "success",
        placement: "bottom-end"
      })
    }
  }

  return (
    <Box
      bg={bg}
      colSpan={{ base:1, md:1, lg: 1}}
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all 0.3s'}
      _hover={{ transform: "translateY(-5px)", shadow:"xl" }}
    >
      <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={'bold'} textStyle={'xl'} mb={4} color={textColor}>
          ${product.price}
        </Text>
        <HStack gap={2}>
          <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)} placement={'top'}>
            <DialogTrigger asChild>
              <IconButton colorPalette={'blue'}><CiEdit /></IconButton>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Product</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <VStack spaceY={2}>
                  <Input
                    placeholder='Product Name'
                    name='name'
                    value={updatedProduct.name}
                    onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                  />
                  <Input
                    placeContent='Product Price'
                    name='price'
                    type='number'
                    value={updatedProduct.price}
                    onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                  />
                  <Input
                    placeContent='Image URL'
                    name='image'
                    value={updatedProduct.image}
                    onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                  />
                </VStack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button colorPalette={'red'}>Cancel</Button>
                </DialogActionTrigger>
                <Button colorPalette={'teal'} onClick={() => handleUpdateProduct(product._id, updatedProduct)} >Update</Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          
          </DialogRoot>

          <IconButton colorPalette={'red'} onClick={() => handleDeleteProduct(product._id)}><MdDeleteForever /></IconButton>
        </HStack>
      </Box>
    </Box>
  )
}

export default ProductCart