import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  HStack,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { EditIcon } from "@chakra-ui/icons";
import TagInput from "../Input/TagInput";
import { Shortcut, TagsType } from "../../types/type_for_shortcut";

type FormData = {
  shortcut: string;
  classification: string;
  tags: string;
};

interface IProps {
  shortcutObj: Shortcut;
}

// 1122
const ModalButtonForUpdateShortCut = ({ shortcutObj }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState } = useForm<FormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      classification: "frontend",
    },
  });
  const [selected, setSelected] = useState<string[]>();
  const tagNames = shortcutObj.tags.map((tag) => {
    return tag.name;
  });

  const { errors } = formState;

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const onSubmit = (data: FormData) => {
    console.log(data);
    onClose();
  };

  const handleSelectedChange = (newSelected: string[]) => {
    setSelected(newSelected);
  };

  // 2244
  return (
    <Box>
      <IconButton
        aria-label="수정"
        size="xs"
        variant="outline"
        colorScheme="green"
        icon={<EditIcon />}
        _hover={{ bg: "green.500", color: "white" }}
        // mr={1}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Shorcut</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="4">
              <FormControl isInvalid={!!errors.shortcut}>
                <FormLabel htmlFor="shortcut">Shortcut</FormLabel>
                <Input
                  defaultValue={shortcutObj.shortcut}
                  id="shortcut"
                  placeholder="Shortcut"
                  {...register("shortcut", { required: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="classification">Classification</FormLabel>
                <Select
                  defaultValue={shortcutObj.classification}
                  id="classification"
                  placeholder="Classification"
                  {...register("classification")}
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={!!errors.tags}>
                <FormLabel htmlFor="tags">Tags</FormLabel>
                <TagInput
                  selected={selected?.length ? selected : tagNames}
                  setSelected={handleSelectedChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <HStack justifyContent="flex-end" p="4">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit(onSubmit)}
              isLoading={formState.isSubmitting}
            >
              Submit
            </Button>
          </HStack>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForUpdateShortCut;
