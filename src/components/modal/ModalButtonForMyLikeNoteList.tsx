import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
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
import { apiForMyLikeNoteList } from '../../apis/study_note_api';
import { IRowForLike } from '../../types/study_note_type';
import { Link } from "react-router-dom";


interface ModalButtonForMyLikeNoteListProps {
    // 필요한 props가 있으면 추가하세요
}

const ModalButtonForMyLikeNoteList: React.FC<ModalButtonForMyLikeNoteListProps> = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    const {
        isLoading: isLoadingForLikes,
        data: dataForLikeListForNote,
        refetch: refetchForLikeListForNote,
    } = useQuery<IRowForLike[]>(
        [
            "apiForMyLikeNoteList",
        ],
        apiForMyLikeNoteList,
        {
            enabled: true,
        }
    );

    if (!dataForLikeListForNote) {
        return (
            <Box>
                Loading..
            </Box>
        )
    }

    return (
        <>
            <Button
                onClick={onOpen}
                variant="outline"
                border="1px solid black"
                size="sm"
                fontSize="sm"
            >
                My Like List
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="6xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Like Note List</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>
                                        <Checkbox defaultChecked />
                                    </Th>
                                    <Th>Note Writer</Th>
                                    <Th>Note Title</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {/* 여기에 테이블 데이터를 매핑하세요 */}
                                {/* <Tr>
                                    <Td>
                                        <Checkbox />
                                    </Td>
                                    <Td>노트 작성자</Td>
                                    <Td>노트 제목</Td>
                                    <Td>
                                        <Button size="sm">삭제</Button>
                                    </Td>
                                </Tr> */}
                                {dataForLikeListForNote ? dataForLikeListForNote.map((row) => {
                                    return (
                                        <Tr>
                                            <Td>
                                                <Checkbox />
                                            </Td>
                                            <Td>{row.study_note.writer.username}</Td>
                                            <Td>
                                                <Link
                                                to={`/study-note/${row.study_note.id}/1`}
                                                style={{ textDecoration: "underline" }}
                                            >
                                                {row.study_note.title}
                                            </Link></Td>
                                            <Td>
                                                <Button size="sm">삭제</Button>
                                            </Td>
                                        </Tr>
                                    )
                                }) : "no data"}

                            </Tbody>
                        </Table>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForMyLikeNoteList;
