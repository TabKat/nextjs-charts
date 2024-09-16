import { Flex, Spin } from 'antd';

const Loader: React.FC = () => {
  return (
    <Flex className="justify-center">
      <Spin size="large" />
    </Flex>
  );
};

export default Loader;
