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

  console.log(
    "dataForRelatedShortCutList.data_for_original_shortcut : ",
    dataForRelatedShortCutList?.data_for_original_shortcut
  );

  return (
    <Box>
      {dataForRelatedShortCutList &&
      dataForRelatedShortCutList.data_for_related_shortcut ? (
        <Box>
          <PresenterForOriginalShortcut
            shortcutData={dataForRelatedShortCutList.data_for_original_shortcut}
          />

          <br />
          <br />

          <ListForRelatedShortcutList
            shortcutId = {dataForRelatedShortCutList.data_for_original_shortcut.id}
            data={dataForRelatedShortCutList.data_for_related_shortcut}
          />

        </Box>
      ) : (
        "no data"
      )}
    </Box>
  );
};

export default ShortCutDetail;
