import { Box } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRelatedShortCutList } from "../apis/api_for_shortcut";
import { ResponseTypeForApiForRelatedShortCutList } from "../types/type_for_shortcut";
import PresenterForOriginalShortcut from "../components/Presenter/PresenterForOriginalShortcut";
import ListForRelatedShortcutList from "../components/List/ListForRelatedShortcutList";

interface Props {}

const ShortCutDetail = (props: Props) => {
  const { shortcut_pk } = useParams();
  const {
    data: dataForRelatedShortCutList,
    isLoading: isLoadingForRelatedShortCutList,
    refetch: refecthForRelatedShortCutList,
  } = useQuery<ResponseTypeForApiForRelatedShortCutList>(
    ["getRelatedShortCutList", shortcut_pk, "getRelatedShortCutList"],
    getRelatedShortCutList
  );

  console.log("dataForRelatedShortCutList : ", dataForRelatedShortCutList);

  return (
    <Box>
      ShortCutDetail for {shortcut_pk}
      {dataForRelatedShortCutList && (
        <Box>
          <PresenterForOriginalShortcut
            shortcutData={dataForRelatedShortCutList.data_for_original_shortcut}
          />

          <br /><br />

          <ListForRelatedShortcutList
            data={dataForRelatedShortCutList.data_for_related_shortcut}
          />
        </Box>
      )}
    </Box>
  );
};

export default ShortCutDetail;
