import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";

import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Box,
    Grid,
    Checkbox,
    Container,
    InputGroup,
    InputLeftAddon,
    Textarea,
    Select,
    Button,
    useToast,
    Text,
} from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { FaBed, FaMoneyBill, FaToilet } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";

// 1122
import { getAmenities, getCategories, IUploadRoomVariables, uploadRoom } from "../api";
import { IAmenity, ICategory, IRoomDetail } from "../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function UploadRoom() {
    const { register, handleSubmit, watch } = useForm<IUploadRoomVariables>();

    const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<IAmenity[]>(["amenities"], getAmenities);
    const { data: categories, isLoading: isCategoriesLoading } = useQuery<ICategory[]>(["categories"], getCategories);

    const toast = useToast();
    const navigate = useNavigate();

    const mutation = useMutation(uploadRoom, {
        onSuccess: (data: IRoomDetail) => {
            toast({
                status: "success",
                title: "Room created",
                position: "bottom-right",
            });
            navigate(`/rooms/${data.id}`);
        },
    });

    console.log(watch());
    const onSubmit = (data: IUploadRoomVariables) => {
        mutation.mutate(data);
    };

    return (
        <Box
            pb={40}
            mt={10}
            px={{
                base: 10,
                lg: 40,
            }}
        >
            <Container>
                <Heading textAlign={"center"}>Upload Room</Heading>
                {/* <VStack spacing={5} as="form" mt={5}> */}
                <VStack spacing={10} as="form" onSubmit={handleSubmit(onSubmit)} mt={5}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        {/* <Input required type="text" /> */}
                        <Input {...register("name", { required: true })} required type="text" />
                        <FormHelperText>Write the name of your room.</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Country</FormLabel>
                        {/* <Input required type="text" /> */}
                        <Input {...register("country", { required: true })} required type="text" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>City</FormLabel>
                        {/* <Input required type="text" /> */}
                        <Input {...register("city", { required: true })} required type="text" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Address</FormLabel>
                        {/* <Input required type="text" /> */}
                        <Input {...register("address", { required: true })} required type="text" />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Price</FormLabel>
                        <InputGroup>
                            <InputLeftAddon children={<FaMoneyBill />} />
                            {/* <Input type="number" min={0} /> */}
                            <Input {...register("price", { required: true })} type="number" min={0} />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Rooms</FormLabel>
                        <InputGroup>
                            <InputLeftAddon children={<FaBed />} />
                            {/* <Input type="number" min={0} /> */}
                            <Input {...register("rooms", { required: true })} type="number" min={0} />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Toilets</FormLabel>
                        <InputGroup>
                            <InputLeftAddon children={<FaToilet />} />
                            {/* <Input type="number" min={0} /> */}
                            <Input {...register("toilets", { required: true })} type="number" min={0} />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        {/* <Textarea /> */}
                        <Textarea {...register("description", { required: true })} />
                    </FormControl>

                    <FormControl>
                        <Checkbox>Pet friendly?</Checkbox>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Kind of room</FormLabel>
                        {/* <Select placeholder="Choose a kind"> */}
                        <Select {...register("kind", { required: true })} placeholder="Choose a kind">
                            <option value="entire_place">Entire Place</option>
                            <option value="private_room">Private Room</option>
                            <option value="shared_room">Shared Room</option>
                        </Select>
                        <FormHelperText>What kind of room are you renting?</FormHelperText>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Category</FormLabel>
                        {/* <Select placeholder="Choose a kind"> */}
                        <Select {...register("category", { required: true })} placeholder="Choose a category">
                            {categories?.map((category) => (
                                <option key={category.pk} value={category.pk}>
                                    {category.name}
                                </option>
                            ))}
                        </Select>
                        <FormHelperText>What category describes your room?</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Amenities</FormLabel>
                        <Grid templateColumns={"1fr 1fr"} gap={5}>
                            {amenities?.map((amenity) => (
                                <Box key={amenity.pk}>
                                    {/* <Checkbox> */}
                                    <Checkbox value={amenity.pk} {...register("amenities", { required: true })}>
                                        {amenity.name}
                                    </Checkbox>
                                    <FormHelperText>{amenity.description}</FormHelperText>
                                </Box>
                            ))}
                        </Grid>
                    </FormControl>                    
                    {mutation.isError ? <Text color="red.500">Something went wrong</Text> : null}

                    <Button type="submit" isLoading={mutation.isLoading} colorScheme={"red"} size="lg" w="100%">
                        Upload Room
                    </Button>
                </VStack>
            </Container>
        </Box>
    );
}
