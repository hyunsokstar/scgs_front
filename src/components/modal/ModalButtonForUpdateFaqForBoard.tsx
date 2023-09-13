import React from "react";
import {
  useDisclosure,
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import TinyMCEEditor from "../RichEditor/TinyMCEEditor";
import { useForm } from "react-hook-form"; // react-hook-form 임포트 추가

interface Props {
  id: string | number;
  title: string;
  content: string;
}

const ModalButtonForUpdateFaqForBoard: React.FC<Props> = ({
  id,
  title,
  content,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [contentForUpdate, setContentForUpdate] = React.useState<string>(
    content
  );

  // react-hook-form 초기화
  const { handleSubmit, register, getValues } = useForm();

  const handleContentChange = (value: string) => {
    setContentForUpdate(value);
  };

  const onSubmit = (data: any) => {
    console.log(data); // Form 입력 데이터 확인

    // title 값 가져오기
    const titleValue = getValues("title");

    // mutationForUpdateNoteFaq.mutate({
    //   pk,
    //   title: titleValue,
    //   content: contentForUpdate,
    // });
  };

  return (
    <Box>
      <IconButton
        aria-label="수정"
        onClick={onOpen}
        icon={<EditIcon />}
        size="sm"
        _hover={{ bgColor: "yellow.100" }}
        variant="ghost"
      />
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>FAQ 수정</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Stack spacing={4}>
                <input type="hidden" value={id} />
                {/* react-hook-form을 사용하여 title 필드 등록 */}
                <Input {...register("title")} defaultValue={title} placeholder="제목" />
              </Stack>

              <FormControl isInvalid={false}>
                <FormLabel htmlFor="content">내용</FormLabel>
                <Box zIndex={9999}>
                  {/* TinyMCEEditor 컴포넌트 */}
                  <TinyMCEEditor
                    initialValue={contentForUpdate}
                    onChange={handleContentChange}
                    apiKey="mj1ss81rnxfcig1ol8gp6j8oui9jpkp61hw3m901pbt14ei1"
                  />
                </Box>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              {/* <Button type="submit" colorScheme="blue" mr={3}>
                수정하기
              </Button> */}
              <Button onClick={onClose}>취소</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForUpdateFaqForBoard;
