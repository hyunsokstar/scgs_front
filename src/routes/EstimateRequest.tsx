import {
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  Text,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";

interface Props {}

function EstimateRequest({}: Props): ReactElement {
  return (
    <div>
      <Container maxW="container.md" bg="white.200" color="#262626">
        <Text fontSize="5xl" mb={1}>견적 문의</Text>
            <FormControl>
          <HStack>
            <FormLabel>제목</FormLabel>
            <Input type="text" />
          </HStack>
        </FormControl>

        <FormControl>
          <HStack>
            <FormLabel>제품</FormLabel>
            <Input type="text" />
          </HStack>
        </FormControl>

        <FormControl>
          <HStack>
            <FormLabel>담당자</FormLabel>
            <Input type="text" />
          </HStack>
        </FormControl>

        <FormControl>
          <HStack>
            <FormLabel>이메일</FormLabel>
            <Input type="text" />
          </HStack>
        </FormControl>

        <FormControl>
          <HStack>
            <FormLabel>연락처</FormLabel>
            <Input type="text" />
          </HStack>
        </FormControl>

        <FormControl>
          <HStack>
            <FormLabel>내용</FormLabel>
            <Textarea placeholder="내용" />
          </HStack>
        </FormControl>

        <FormControl>
          <HStack>
            <FormLabel>제목</FormLabel>
            <RadioGroup>
              <HStack>
                <Radio value="true">관리자</Radio>
                <Radio value="false">직원</Radio>
              </HStack>
            </RadioGroup>
          </HStack>
        </FormControl>
        <Divider mt={2} mb={3} />
        <FormControl>
          <HStack>
            <FormLabel>메모</FormLabel>
            <Textarea placeholder="메모" />
          </HStack>
        </FormControl>
      </Container>
    </div>
  );
}

export default EstimateRequest;
