import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from '@chakra-ui/react';

interface ModalButtonForShortcutHubDetailProps {
    size: string;
}

const ModalButtonForShortcutHubDetail: React.FC<ModalButtonForShortcutHubDetailProps> = ({ size }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <Button
                variant="outline"
                borderWidth="1px"
                borderColor="black"
                size="sm"
                onClick={openModal}
                fontSize="sm"
            >
                Detail
            </Button>

            <Modal isOpen={isOpen} onClose={closeModal} size={size}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Your simple table here */}
                        {/* Chakra-UI로 간단한 테이블을 만들어 추가 */}
                        <table>
                            <thead>
                                <tr>
                                    <th>Header 1</th>
                                    <th>Header 2</th>
                                    {/* Add more header columns if needed */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Data 1</td>
                                    <td>Data 2</td>
                                    {/* Add more table rows and data if needed */}
                                </tr>
                            </tbody>
                        </table>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalButtonForShortcutHubDetail;
