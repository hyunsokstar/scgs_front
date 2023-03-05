import { useRef } from "react";
import { Button } from "@chakra-ui/react";
import React from "react";

function FileInputButton() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current !== null) {
            fileInputRef.current.click();
        }
    };

    const handleFileInputChange = (event) => {
        console.log("Selected file:", event.target.files[0]);
    };

    return (
        <>
<Grid templateColumns="5fr 1fr" gap={4}>
                                <GridItem colSpan={1} border="0px solid black">
                                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" width={"80%"} height={"100%"} border="0px solid black" mx={"auto"}>
                                        <Box border={"1px solid green"} position={"relative"}>
                                            {/* just card start */}

                                            <Image src={selectedImage ? selectedImage : alt_image} alt={"hello world"} objectFit={"cover"} height={240} width={"100%"} />
                                            <Box p="6" border="0px solid black" height={200}>
                                                <Flex justify="space-between" align="center">
                                                    <Text fontSize={"20px"} as="h3" fontWeight="bold">
                                                        {/* {tutorial.title} */}
                                                        show me the monety
                                                    </Text>
                                                    <Text fontWeight="bold">$20</Text>
                                                </Flex>
                                                <Box overflow="hidden" textOverflow="ellipsis" border="0px solid black" height={20}>
                                                    <Text mt="2" fontSize="md">
                                                        this is cheat key !!
                                                    </Text>
                                                </Box>
                                                <Box position={"absolute"} bottom={2}>
                                                    <Button colorScheme="blue">Add to Cart</Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>{" "}
                                    {/* just card end */}
                                </GridItem>
                                <GridItem colSpan={1}>
                                    {" "}
                                    {/* just 두번째 영역 end */}
                                    <VStack spacing={2}>
                                        {/* <Input type="file" accept="image/*" /> */}
                                        <FormControl>
                                            <input
                                                type="file"
                                                {...register("tutorial_images", { required: true })}
                                                accept="image/*"
                                                ref={fileInputRef}
                                                style={{ display: "none" }}
                                                onChange={handleImageChange}
                                            />
                                            <Button onClick={handleButtonClick} colorScheme="twitter">
                                                Select file
                                            </Button>
                                        </FormControl>
                                        <Button size="md" colorScheme="facebook">
                                            이미지 취소
                                        </Button>
                                        <Button size="md" colorScheme="whatsapp">
                                            전체 초기화
                                        </Button>
                                        <Button type="submit" ml={2} colorScheme="whatsapp">
                                            Submit
                                        </Button>
                                        <Button size="md" colorScheme="red" onClick={onClose}>
                                            창 닫기
                                        </Button>
                                    </VStack>
                                </GridItem>
                            </Grid>
        </>
    );
}
