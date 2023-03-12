import React, { useEffect, useState } from "react";
import { Flex, Box, Avatar, Text, Badge, Container } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ModalForUserProfileImageUpdate from "../components/modal/ModalForUserProfileImageUpdate";
import { IUserProfile } from "../types/user/user_types";
import { getProfile } from "../apis/user_api";
import { useQuery } from "@tanstack/react-query";
import useUser from "../lib/useUser";

interface IProfileImage {
    file: string | undefined
}

// type IProps =  {
//     userPk: number
// }

const UserProfile = () => {
    // const { userPk } = useParams();
    // const { isLoading, data: userProfileData } = useQuery<IUserProfile>([`user_profile`, userPk], getProfile);
    const [profileImage, setProfileImage] = useState<string | undefined>();
    const { userLoading, isLoggedIn, user } = useUser();
    
    // useEffect(() => {
    //   setProfileImage(userProfileData?.profileImages[0].file)
    // }, [userProfileData])
    

    return (
        <>
            {!userLoading && user ? (
                <Container maxW="100%" margin="auto" bgColor={"green.100"}>
                    {/* {userProfileData ? userProfileData : ""} */}
                    <Flex
                        direction={{ base: "column", md: "row" }}
                        align={{ base: "center", md: "flex-start" }}
                        justify="space-between"
                        maxW={{ base: "100%", md: "1200px" }}
                        m="0 auto"
                        p={8}
                    >
                        <Box flex="1">
                            <Avatar
                                size="2xl"
                                name="John Doe"
                                src={user?.profileImages[0] ? user.profileImages[0].file : "https://bit.ly/broken-link"}
                                mb={4}
                            />
                            <Text fontSize="xl" fontWeight="bold" mb={2}>
                                {user?.name}
                            </Text>
                            <Text fontSize="md" mb={4}>
                                {user?.position !== null ? user?.position?.position_name: "default"}
                            </Text>
                            <Box>
                                {user?.skill_for_frameWork.map((row) => {
                                    return (
                                        <Box>
                                            <Badge colorScheme="orange" mb={2}>
                                                {row.frame_work_name}
                                            </Badge>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                        <Box ml={{ md: 8 }} flex="2">
                            <Text fontSize="lg" fontWeight="bold" mb={4}>
                                About Me
                            </Text>
                            <Text fontSize="md" mb={4}>
                                {user?.about_me}
                            </Text>
                            <Text fontSize="md" mb={4}>
                                {user?.email}
                            </Text>
                        </Box>
                        <Box flex="1" w="100%" p={4} color="white" ml={5}>
                            <ModalForUserProfileImageUpdate setProfileImage={setProfileImage} userPk={user.pk} profile_image={profileImage} />
                        </Box>
                    </Flex>
                </Container>
            ) : (
                "loading2"
            )}
        </>
    );
};

export default UserProfile;
