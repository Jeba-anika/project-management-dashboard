import { Flex, Spin } from 'antd';
const Loader = ({ size }) => (
    <Flex align="center" gap="middle">
        <Spin size={size} />
    </Flex>
);
export default Loader;