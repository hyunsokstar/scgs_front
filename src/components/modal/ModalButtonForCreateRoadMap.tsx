import { useState } from "react";
import {
  Button,
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForCreateRoadMap } from "../../apis/study_note_api";

interface ModalButtonForCreateRoadMapProps {
  buttonText: string;
}

const ModalButtonForCreateRoadMap: React.FC<
  ModalButtonForCreateRoadMapProps
> = ({ buttonText }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();

  const mutationForCreateRoadMap = useMutation(apiForCreateRoadMap, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("data : ", data);
      queryClient.refetchQueries(["apiForGetRoloadMapList"]);

      toast({
        title: "challenge register 성공",
        description: data.message,
        status: "success",
        duration: 1800,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      console.log("error.response : ", error.response);
      console.log("mutation has an error", error.response.data);

      // 에러 메시지를 토스트로 표시
      toast({
        title: "에러 발생",
        description: error.response.data.message, // 에러 메시지를 사용
        status: "error",
        duration: 1800,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: any) => {
    console.log(data); // 여기서 데이터를 처리하거나 전달할 수 있습니다.
    mutationForCreateRoadMap.mutate({
      title: data.title,
      subTitle: data.subTitle,
    });
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        border="blue 1px solid"
        onClick={() => setIsOpen(true)}
      >
        {buttonText}
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Create Roadmap</ModalHeader>
            <ModalBody display={"flex"} flexDirection={"column"} gap={2}>
              <FormControl>
                <Input
                  isInvalid={Boolean()}
                  {...register("title", {
                    required: "Please write a title",
                  })}
                  variant="filled"
                  placeholder="Title"
                />
              </FormControl>

              <FormControl>
                <Input
                  isInvalid={Boolean()}
                  {...register("subTitle", {
                    required: "Please write a subtitle",
                  })}
                  variant="filled"
                  placeholder="Subtitle"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForCreateRoadMap;
