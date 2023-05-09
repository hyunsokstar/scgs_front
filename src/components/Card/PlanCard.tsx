import { useState } from "react";
import {
  Box,
  Button,
  CloseButton,
  Heading,
  Text,
  useColorModeValue,
  useToken,
  useToast,
} from "@chakra-ui/react";
import { row_for_long_term_plan } from "../../types/type_for_plan_maker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFordeleteOnePlan } from "../../apis/api_for_long_term_plan";
import ModalButtonForPlanContents from "../modal/modalButtonForPlanContents";
import MoModalContenModalButtonForGridTableForPlanContents from "../modal/MoModalContenModalButtonForGridTableForPlanContents";

// 1122
const PlanCard: React.FC<row_for_long_term_plan> = ({
  pk,
  title,
  category,
  description,
  writer,
  created_at,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const backgroundColor = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [bgColor, titleColor, bodyColor, footerColor] = useToken("colors", [
    "gray.50",
    "blue.500",
    "purple.500",
    "teal.500",
  ]);

  const toast = useToast();
  const queryClient = useQueryClient();

  const mutationForDeleteOnePlan = useMutation(
    (plan_pk: number) => {
      return apiFordeleteOnePlan(plan_pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        queryClient.refetchQueries(["get_plan_list"]);

        toast({
          title: "delete api docu 성공!",
          status: "success",
        });
      },
    }
  );

  const deletePlanHandler = (plan_pk: number) => {
    mutationForDeleteOnePlan.mutate(plan_pk);
  };

  console.log("pk : ", pk);

  // 2244
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      borderColor={borderColor}
      backgroundColor={bgColor}
      p={4}
      position="relative"
      width={"100%"}
    >
      <CloseButton
        position="absolute"
        top={2}
        right={2}
        variant="outline"
        colorScheme="blue"
        // onClick={() => setShowDetails(false)}
        onClick={() => deletePlanHandler(pk)}
      />

      <Heading size="md" mb={2} color={titleColor}>
        {category}
      </Heading>
      <Text mb={2} color={bodyColor}>
        {title}
      </Text>
      <Text fontWeight="bold" color={footerColor}>
        Written by {writer.username}
      </Text>

      <Box display={"flex"} justifyContent={"flex-start"} gap={2} mt={2}>
        <MoModalContenModalButtonForGridTableForPlanContents
          plan_pk={pk}
          button_text={"일정 테이블"}
        />
        
        <ModalButtonForPlanContents plan_pk={pk} modal_text={"계획표 보기"} />
      </Box>

      {/* {!showDetails && (
        <Button mt={4} onClick={() => setShowDetails(true)}>
          Show Plans
        </Button>
      )}

      {showDetails && (
        <Box mt={4}>
          <Text mb={2}>{description}</Text>
          <Button onClick={() => setShowDetails(false)}>Hide details</Button>
        </Box>
      )} */}
    </Box>
  );
};

export default PlanCard;
