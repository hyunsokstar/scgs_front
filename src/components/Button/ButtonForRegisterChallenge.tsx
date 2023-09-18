import React from 'react';
import { Button } from '@chakra-ui/react';

interface IProps {
  challengeId: string;
}

const ButtonForRegisterChallenge: React.FC<IProps> = ({ challengeId }) => {
  const handleButtonClick = () => {
    // 버튼이 클릭되었을 때 실행될 동작을 여기에 추가합니다.
    // 예를 들어, 클릭 시 어떤 함수를 호출하거나 상태를 변경할 수 있습니다.
    alert(`Clicked on Register for Challenge ${challengeId}`);
  };

  return (
    <Button
      variant="outline" // outlined 스타일
      size="sm" // 작은 크기
      _hover={{ bg: 'teal.400' }} // 호버 시 배경색 변경
      onClick={handleButtonClick} // 클릭 이벤트 설정
    >
      Register for Challenge {challengeId}
      {/* 버튼 텍스트와 기능을 필요에 따라 수정하세요. */}
    </Button>
  );
};

export default ButtonForRegisterChallenge;
