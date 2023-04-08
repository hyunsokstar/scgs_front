import {
    Grid, GridItem, Box,
    Card, CardHeader, CardBody,
    CardFooter, Image,
    Heading, Text
} from "@chakra-ui/react";


const frame_work_info = [
    {
        framework: "django-drf study",
        description: "python 프레임 워크",
        like: 10,
        front: "react"
    },
    {
        framework: "fast-api study",
        description: "fast api",
        like: 10,
        front: "react"
    },
    {
        framework: "spring-boot study",
        description: "java framework",
        like: 10,
        front: "react"
    },
    {
        framework: "nest-js study",
        description: "js 프레임 워크",
        like: 10,
        front: "react"
    },
    {
        framework: "express",
        description: "js 기본 프레임 워크",
        like: 10,
        front: "react"
    },

]

interface IProps {
    title: string;
    description: string;
    ranking: number
}

const MyCard = ({ title, description, ranking }: IProps) => {
    return (
        <Card>
            <Box position={"relative"}>
                <Image src="https://via.placeholder.com/300x200" width={"100%"} objectFit={"cover"}/>
                <Box
                    position={"absolute"}
                    top={0}
                    w="24px"
                    h="24px"
                    bgColor={"skyblue" || "blue.1000"}
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    fontSize="sm"
                >
                    <Text fontFamily="Montserrat, sans-serif">{ranking}</Text>
                </Box>
            </Box>
            <CardHeader>
                <Heading as="h3" size="md" mt="2">
                    {title}
                </Heading>
            </CardHeader>
            <CardBody>
                <Text>
                    {description}
                </Text>
            </CardBody>
            <CardFooter>
                <Box flex="flex" alignItems="center" justifyContent="space-between">
                    <Text fontSize="sm" color="gray.500">
                        Card footer
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                        March 6, 2023
                    </Text>
                </Box>
            </CardFooter>
        </Card>
    );
};

const BoilerPlates = () => {
    return (
        <Grid templateColumns="repeat(4, 1fr)">

            {frame_work_info &&
                frame_work_info.map((row, index) => {

                    return (
                        <div>
                            <GridItem>
                                <Box p="4" bg="red.200">
                                    <MyCard title={row.framework} description={row.description} ranking={index + 1} />
                                </Box>
                            </GridItem>

                        </div>
                    )
                })
            }
        </Grid>
    );
};

export default BoilerPlates;
