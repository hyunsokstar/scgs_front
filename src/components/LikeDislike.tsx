import { useState } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    HStack,
    useToast,
} from "@chakra-ui/react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { minusTutorialLike, plusTutorialLike } from "../apis/tutorial_api";


type Props = {
    likes: number;
    dislikes: number;
    tutorialPk: number;
    refetchTutorialList: any;
};

const LikeDislike = ({ likes, dislikes, tutorialPk, refetchTutorialList }: Props) => {
    const [likeCount, setLikeCount] = useState(likes);
    const [dislikeCount, setDislikeCount] = useState(dislikes);
    const toast = useToast();

    const toastOptions = {
        bg: "#50C878",
        color: "white",
        duration: 3000,
        isClosable: true,
      }

    const updateLikePlusMutation = useMutation(plusTutorialLike, {
        onSuccess: ({ result }: any) => {
            setLikeCount(likeCount + 1);
            console.log("result : ", result);
            toast({
                status: "success",
                title: "like +1 success",
                description: "like +1 success",
                ...toastOptions
            });
            refetchTutorialList();
        },
    });

    const tutorialUnlikeMutation = useMutation(minusTutorialLike, {
        onSuccess: ({ result }: any) => {
            setLikeCount(dislikeCount + 1);
            console.log("result : ", result);
            toast({
                status: "success",
                title: "like -1 success",
                description: "like -1 success",
                ...toastOptions
            });
            refetchTutorialList();
        },
    });

    const handleLikeClick = () => {
        updateLikePlusMutation.mutate(tutorialPk)
    };

    const handleDislikeClick = () => {
        tutorialUnlikeMutation.mutate(tutorialPk)
    };

    return (
        <Container textAlign={"center"}>
            <HStack>
                <Box w={"50%"}>
                    <Button onClick={handleLikeClick}>👍 {likeCount}</Button>
                </Box>
                <Box w={"50%"}>
                    <Button onClick={handleDislikeClick}>👎 {dislikeCount}</Button>
                </Box>
            </HStack>
        </Container>
    );
};

export default LikeDislike;