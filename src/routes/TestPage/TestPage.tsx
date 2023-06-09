import { Box, Table, Tbody, Tr, Td } from "@chakra-ui/react";
import { useState } from "react";
import PaginationComponent from "../../components/PaginationComponent";

interface DataItem {
  id: number;
  name: string;
  age: number;
}

function YourComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 3; // Set the number of items per page

  const data: DataItem[] = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Alice", age: 32 },
    { id: 3, name: "Bob", age: 28 },
    { id: 4, name: "Emma", age: 29 },
    { id: 5, name: "James", age: 31 },
    { id: 6, name: "Lily", age: 27 },
    { id: 7, name: "Oliver", age: 26 },
    { id: 8, name: "Sophia", age: 30 },
    { id: 9, name: "William", age: 33 },
    { id: 10, name: "Charlotte", age: 24 },
  ];

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Perform any other actions when the page changes
  };

  // Calculate the start and end indexes of the data to display on the current page
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  const currentPageData = data.slice(startIndex, endIndex);

  return (
    <Box>
      <Table>
        <Tbody>
          {currentPageData.map((item) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.name}</Td>
              <Td>{item.age}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <PaginationComponent
        current_page_num={currentPage}
        total_page_num={data.length}
        setCurrentPageNum={setCurrentPage}
        task_number_for_one_page={perPage}
      />
    </Box>
  );
}

export default YourComponent;
