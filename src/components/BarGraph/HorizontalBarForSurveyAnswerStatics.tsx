import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { ISurveyOptionCount } from "../../types/type_for_survey";

interface HorizontalBarForSurveyAnswerStaticsProps {
  count_for_options: ISurveyOptionCount[];
}

const HorizontalBarForSurveyAnswerStatics: React.FC<
  HorizontalBarForSurveyAnswerStaticsProps
> = ({ count_for_options }) => {
  // Check if count_for_options is undefined or empty
  if (!count_for_options || count_for_options.length === 0) {
    return <Text>No answers data</Text>;
  }

  return (
    <Box>
      {count_for_options.map((option, index) => (
        <Box
          key={`option-${index}`}
          display="flex"
          textAlign="start"
          flexDirection="column"
        >
          <Box>
            {/* Display option name */}
            {option.option_content}
          </Box>
          {option.count > 0 && (
            <Box display="flex" alignItems="center">
              <Box>
                <BarChart
                  width={400}
                  height={10}
                  data={[{ count: option.count }]}
                  margin={{ top: 0, right: 0, bottom: 0, left: -45 }}
                >
                  <XAxis hide />
                  <YAxis hide />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </Box>
              <Box>{option.count} 명</Box>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default HorizontalBarForSurveyAnswerStatics;
