import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단

//
import GanttChartForLongTermPlan from "../Chart/GanttChartForLongTermPlan";
import { getContentsListForPlan } from "../../apis/api_for_long_term_plan";
import { LongTermPlanContentList } from "../../types/type_for_plan_maker";

type ModalButtonProps = {
  modal_text: string;
  plan_pk: number;
};

const ModalButtonForPlanContents: React.FC<ModalButtonProps> = ({
  modal_text,
  plan_pk,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal_title, setModalTitle] = useState("일정 차트");

  const handleButtonClick = () => {
    onOpen();
  };

  // plan_pk
  const {
    data: dataForPlanContents,
    isLoading: isLoadingForPlanContents,
    refetch: refetchForPlanContents,
  } = useQuery<LongTermPlanContentList>(
    ["getContentsListForPlan", plan_pk, "getContentsListForPlan"],
    getContentsListForPlan
  );

  console.log("plan_pk : ", plan_pk);
  console.log("dataForPlanContents : ", dataForPlanContents);

  return (
    <Box>
      <Button onClick={handleButtonClick}>{modal_text}</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="7xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            borderBottom="1px solid"
            borderColor="gray.200"
            bg="purple.100"
            color="purple.900"
          >
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box>{modal_title}</Box>
              <Box textAlign={"right"}>
                <Button
                  variant="outline"
                  border={"1px solid green"}
                  size="md"
                  _hover={{ bg: "gray.100" }}
                  onClick={onClose}
                >
                  <MdClose />
                </Button>
              </Box>
            </Box>
          </ModalHeader>
          <ModalBody
            borderBottom="1px solid"
            borderColor="gray.200"
            bg="pink.100"
            color="gray.800"
          >
            모달 contents for {plan_pk}
            {dataForPlanContents ? (
              <GanttChartForLongTermPlan
                dataForPlanContents={dataForPlanContents}
              />
            ) : (
              "no data"
            )}
          </ModalBody>
          <ModalFooter
            borderTop="1px solid"
            borderColor="gray.200"
            bg="blue.100"
          >
            <Button
              variant="outline"
              borderColor="black"
              mr={3}
              onClick={onClose}
              _hover={{ bg: "blue.200" }}
            >
              Close
            </Button>
            {/* <Button colorScheme="blue" onClick={onClose}>
              Save
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForPlanContents;
