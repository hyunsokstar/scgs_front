import { Box, Container, Grid, Image } from "@chakra-ui/react";
import ImageSlider from "../components/ImageSlider";
// import PhotoUploadButton from "../components/PhotoUploadButton";
// import RoomsList from "../components/RoomsList";
// import UsersList from "../components/UsersList";

const image_array = [
    { image_url: "https://a0.muscache.com/im/pictures/f18bc1db-e914-4931-aa9f-8f3a03bc22c2.jpg?im_w=720" },
    { image_url: "https://a0.muscache.com/im/pictures/fe92456e-6d0b-4758-a0fa-bb80bf4f4ac1.jpg?im_w=720" },
    { image_url: "https://a0.muscache.com/im/pictures/miso/Hosting-614812324007668898/original/c4465c6c-e664-4a7d-a313-1282656e423e.jpeg?im_w=720" },
    { image_url: "https://a0.muscache.com/im/pictures/ad1357d0-306c-41b9-a96b-4934f3966ae5.jpg?im_w=720" },
    { image_url: "https://a0.muscache.com/im/pictures/8340b03d-6405-4a61-ac8a-fc9d9d445f0f.jpg?im_w=720" },
];

export default function Home() {
    return (
        <Container maxW={"80%"} >
            <ImageSlider />
        </Container>
    );
}
