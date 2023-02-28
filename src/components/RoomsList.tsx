import Room from "../components/Room";
import { getRooms } from "../api";
import { Box, Grid } from "@chakra-ui/react";
import RoomSkeleton from "../components/RoomSkeleton";
import { useQuery } from "@tanstack/react-query";

type Props = {};

interface IPhoto {
    pk: string;
    file: string;
    description: string;
}

interface IRoom {
    pk: number;
    name: string;
    country: string;
    city: string;
    price: number;
    rating: number;
    is_owner: boolean;
    photos: IPhoto[];
}

function RoomsList({}: Props) {
    const { isLoading, data } = useQuery<IRoom[]>(["rooms"], getRooms);

    return (
        <div>
            <Grid
                // mt={10}
                px={40}
                columnGap={4}
                rowGap={8}
                gap={10}
                // templateColumns={"repeat(5, 1fr)"}
                templateColumns={{
                    sm: "1fr",
                    md: "1fr 1fr",
                    lg: "repeat(3, 1fr)",
                    xl: "repeat(4, 1fr)",
                    "2xl": "repeat(5, 1fr)",
                }}
            >
                {isLoading ? (
                    <>
                        <RoomSkeleton />
                        <RoomSkeleton />
                        <RoomSkeleton />
                        <RoomSkeleton />
                        <RoomSkeleton />
                        <RoomSkeleton />
                        <RoomSkeleton />
                        <RoomSkeleton />
                        <RoomSkeleton />
                        <RoomSkeleton />
                    </>
                ) : null}
                {data?.map((room) => (
                    <Room
                        pk={room.pk}
                        imageUrl={
                            room.photos[0]
                                ? room.photos[0]?.file
                                : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                        }
                        name={room.name}
                        rating={room.rating}
                        city={room.city}
                        country={room.country}
                        price={room.price}
                    />
                ))}
            </Grid>
        </div>
    );
}

export default RoomsList;
