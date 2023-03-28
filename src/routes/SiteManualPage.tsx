import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  VStack,
  Flex,
  Container,
} from "@chakra-ui/react";
function SiteManualPage() {
  return (
    <Flex justifyContent={"center"} width="100%" border={"1px solid green"}>
      <Tabs border={"1px solid red"} my={3} width="60%">
        <Flex>
          <Box>
            <TabList
              display={"flex"}
              flexDirection="column"
              alignItems={"flex-start"}
              gap={3}
              width={"100%"}
            >
              <Tab _selected={{ bg: "blue.400", color: "white" }}>My Tasks</Tab>
              <Tab _selected={{ bg: "blue.400", color: "white" }}>
                Team Task
              </Tab>
              <Tab _selected={{ bg: "blue.400", color: "white" }}>
                Task Status
              </Tab>
              <Tab _selected={{ bg: "blue.400", color: "white" }}>QA Page</Tab>
              <Tab _selected={{ bg: "blue.400", color: "white" }}>
                Tech Note
              </Tab>
              <Tab _selected={{ bg: "blue.400", color: "white" }}>
                Tutorials
              </Tab>
            </TabList>
          </Box>

          <Box border="1px solid green" width={"100%"}>
            <TabPanels border={"0px solid green"}>
              <TabPanel border="0px solid red">
                MyTask 는 개인 업무 관리 페이지 입니다.
              </TabPanel>
              <TabPanel>
                <p>Team Task 는 팀 업무 관리 페이지 입니다</p>
              </TabPanel>
              <TabPanel>
                <p>Task Status는 업무 진행 관련 페이지 입니다</p>
              </TabPanel>
              <TabPanel>
                <p>QA 페이지는 QA 관련 페이지 입니다</p>
              </TabPanel>
              <TabPanel>
                <p>Tech Note 페이지는 Tech Note 관련 페이지 입니다</p>
              </TabPanel>
              <TabPanel>
                <p>Tutorials 페이지는 Tutorials 관련 페이지 입니다</p>
              </TabPanel>
            </TabPanels>
          </Box>
        </Flex>
      </Tabs>
    </Flex>
  );
}

export default SiteManualPage;
