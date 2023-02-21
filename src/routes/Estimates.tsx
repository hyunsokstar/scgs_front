import { Container } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getEstimates } from "../api";

interface Props {}

interface IEstimateRequire {
  title: string;
  product: string;
  manager: string;
  email: string;
  phone_number: string;
  estimate_content: string;
  content: string;
  completion_status: string;
}

function Estimates({}: Props): ReactElement {
  const { isLoading, data } = useQuery<IEstimateRequire[]>(
    ["rooms"],
    getEstimates
  );

  console.log("견적 요청 리스트 데이터 : ", data);

  return (
    <div>
      <Container maxW="80%" bg="green.100" color="#262626" mt={5}>
        <Text fontSize="5xl" mb={2} color="blue">
          견적 문의
        </Text>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>제목</Th>
                <Th>제품</Th>
                <Th>담당자(이메일)</Th>
                <Th>phone</Th>
                <Th>내용</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((row: IEstimateRequire) => {
                return (
                  <Tr>
                    <Td>{row.title}</Td>
                    <Td>{row.product}</Td>
                    <Td>{row.manager}</Td>
                    <Td>{row.phone_number}</Td>
                    <Td>{row.content}</Td>
                  </Tr>
                );
              })}

              {/* <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td>0.91444</Td>
              </Tr> */}
            </Tbody>
            {/* <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot> */}
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Estimates;
