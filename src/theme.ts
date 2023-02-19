import { extendTheme, type ThemeConfig } from "@chakra-ui/react";


// initialColorMode : 최초 다크 모드 설정
// useSystemColorMode : 시스템 설정을 사용할것인가?
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;