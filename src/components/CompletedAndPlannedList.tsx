import { Box, Text, UnorderedList, ListItem } from "@chakra-ui/react";

const CompletedAndPlannedList = () => {
    const completedItems = ["로그인", "회원가입", "강의 목록 출력(이미지 슬라이드)", "회원 가입후 crud(로그인 하면 crud 버튼 보임)"];
    const plannedItems = ["todo 관리", "채팅", "결제 시스템 도입"];

    return (
        <Box mt={3}>
            <Text fontSize="lg" fontWeight="bold" mb="4">
                완료한 목록
            </Text>
            <UnorderedList>
                {completedItems.map((item, index) => (
                    <ListItem key={index}>{item}</ListItem>
                ))}
            </UnorderedList>

            <Text fontSize="lg" fontWeight="bold" mt="8" mb="4">
                개발 예정 항목
            </Text>
            <UnorderedList>
                {plannedItems.map((item, index) => (
                    <ListItem key={index}>{item}</ListItem>
                ))}
            </UnorderedList>
        </Box>
    );
};

export default CompletedAndPlannedList;
