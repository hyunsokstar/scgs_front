// modalButtonForGridTableForPlanContents.tsx
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
} from "@chakra-ui/react";
import GridTableForPlanContents from "../GridTable/GridTableForPlanContents";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import { getContentsListForPlan } from "../../apis/api_for_long_term_plan";
import { LongTermPlanContentList } from "../../types/type_for_plan_maker";

interface IProps {
  button_text: string;
  plan_pk: number;
}

const ModalButtonForGridTableForPlanContents = ({
  button_text,
  plan_pk,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // plan_pk
  const {
    data: dataForPlanContents,
    isLoading: isLoadingForPlanContents,
    refetch: refetchForPlanContents,
  } = useQuery<LongTermPlanContentList>(
    ["getContentsListForPlan", plan_pk, "getContentsListForPlan"],
    getContentsListForPlan
  );

  console.log("dataForPlanContents for gird table : ", dataForPlanContents);

  const headerBgColor = "pastelBlue";
  const bodyBgColor = "pastelGreen";
  const footerBgColor = "pastelYellow";
  const closeBtnBgColor = "pastelOrange";
  const closeBtnHoverBgColor = "pastelPink";

  return (
    <Box>
      <Button onClick={onOpen}>{button_text}</Button>

      <Modal isOpen={isOpen} size={"7xl"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={headerBgColor}>일정 테이블</ModalHeader>
          <ModalCloseButton
            bg={closeBtnBgColor}
            _hover={{ bg: "lightblue" }}
            border="1px solid black"
            variant="outline"
          />
          <ModalBody bg={bodyBgColor}>
            {dataForPlanContents ? (
              <GridTableForPlanContents
                plan_pk={plan_pk}
                dataForPlanContents={dataForPlanContents}
              />
            ) : (
              "no data"
            )}
          </ModalBody>
          <ModalFooter bg={footerBgColor}>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForGridTableForPlanContents;
