import React from "react";
import { Box, Checkbox } from "@chakra-ui/react";

type Props = {
  checkedIds: number[];
  setCheckedIds: React.Dispatch<React.SetStateAction<number[]>>;
  listData: any[];
};

const MasterCheckBox = ({ checkedIds, setCheckedIds, listData }: Props) => {
  return (
    <Box>
      <Checkbox
        isChecked={checkedIds.length == listData.length}
        onChange={() => {
          if (checkedIds.length == listData.length) {
            setCheckedIds([]);
          } else {
            setCheckedIds(
              listData.map((row) => {
                return row.pk;
              })
            );
          }
        }}
      />
    </Box>
  );
};

export default MasterCheckBox;
