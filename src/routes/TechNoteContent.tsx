import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import { getTechNoteContentListByPk } from "../apis/tech_note_api";
import {
  TechNoteContentListType,
  TechNoteContentRowType,
} from "../types/tech_note_type";
import { Box, Button, Flex, HStack, VStack } from "@chakra-ui/react";
import CardForTechNoteContent from "../components/CardForTechNoteContent";
import ModalButtonForCreateTechNoteContent2 from "../components/modal/ModalButtonForCreateTechNoteContent2";
import TinyMCEEditor from "../components/RichEditor/TinyMCEEditor";

interface Props {}

function TechNoteContent({}: Props): ReactElement {
  const { notePk } = useParams();
  console.log("notePk check : ", notePk);

  const {
    data: techNoteContentListData,
    isLoading: isLodaingFortechNoteContentList,
    refetch: RefetchFortechNoteContentList,
  } = useQuery<TechNoteContentListType>(
    ["getOneProjectTask", notePk, "ProjectProgressDetail"],
    getTechNoteContentListByPk
  );

  console.log("techNoteContentListData : ", techNoteContentListData);
  console.log(
    "techNoteContentListData.tech_note_title : ",
    techNoteContentListData?.tech_note_title
  );

  return (
    <VStack>
      <Box>tech note 주제: {techNoteContentListData?.tech_note_title}</Box>
      <Box width={"100%"}>
        <Flex>
          <Box flex={1}>메타 정보</Box>
          <Box flex={3}>
            <VStack>
              <Flex
                border="1px solid black"
                width={"100%"}
                justifyContent={"space-between"}
                py={3}
              >
                <Box>
                  <Button>create</Button>
                </Box>
              </Flex>
              <Box width={"100%"}>
                {techNoteContentListData
                  ? techNoteContentListData.data.map(
                      (row: TechNoteContentRowType) => {
                        return (
                          <Box>
                            <CardForTechNoteContent
                              pk={row.pk}
                              title={row.note_content_title}
                              file={row.note_content_file}
                              content={row.note_content_content}
                              created_at={row.created_at}
                            />
                          </Box>
                        );
                      }
                    )
                  : "no techNoteContentListData"}
              </Box>

              <Box width={"100%"}>
                <TinyMCEEditor
                  apiKey={"mj1ss81rnxfcig1ol8gp6j8oui9jpkp61hw3m901pbt14ei1"}
                />
              </Box>
            </VStack>
          </Box>

          <Box flex={1}>버튼 영역</Box>
        </Flex>
      </Box>
    </VStack>
  );
}

export default TechNoteContent;
