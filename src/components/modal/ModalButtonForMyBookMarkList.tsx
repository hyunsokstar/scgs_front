import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Checkbox,
    Box,
} from '@chakra-ui/react';
import { useQuery } from "@tanstack/react-query";
import { apiForGetBookMarkList } from '../../apis/study_note_api';
import { IRowForBookMark } from '../../types/study_note_type';
import { Link } from "react-router-dom";


interface ModalButtonForMyBookMarkListProps {
    // 여기에 필요한 props를 추가하세요
}

const ModalButtonForMyBookMarkList: React.FC<ModalButtonForMyBookMarkListProps> = () => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const {
        isLoading: loadingForBookMarkList,
        data: dataForBookMarkList,
        refetch: studyNoteListRefatch,
    } = useQuery<IRowForBookMark[]>(
        [
            "apiForGetBookMarkList",
        ],
        apiForGetBookMarkList,
        {
            enabled: true,
        }
    );

    console.log("dataForBookMarkList : ", dataForBookMarkList);

    if (!dataForBookMarkList) {
        return <Box>loading..</Box>
    }

    return (
        <>
            <Button
                onClick={openModal}
                variant="outline"
                border="1px solid black"
                size="sm"
                fontSize="sm" // 사이즈 조절
            >
                My BookMarks
            </Button>

            <Modal isOpen={isOpen} onClose={closeModal} size="6xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Bookmark List</ModalHeader>
                    <ModalBody>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>
                                        <Checkbox defaultChecked />
                                    </Th>
                                    <Th>Writer</Th>
                                    <Th>Title</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {/* 여기에 테이블 데이터 매핑 */}
                                {
                                    dataForBookMarkList ?
                                        dataForBookMarkList.map((row) => {
                                            return (
                                                <Tr>
                                                    <Td><Checkbox /></Td>
                                                    <Td>{row.study_note.writer.username}</Td>
                                                    <Td>
                                                        <Link
                                                            to={`/study-note/${row.study_note.id}/1`}
                                                            style={{ textDecoration: "underline" }}
                                                        >
                                                            {row.study_note.title}
                                                        </Link>

                                                    </Td>
                                                    <Td></Td>
                                                </Tr>)
                                        })
                                        : "no data"
                                }
                            </Tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={closeModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};


export default ModalButtonForMyBookMarkList;