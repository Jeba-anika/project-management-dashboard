import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
// const items = [
//     {
//         label: <a href="https://www.antgroup.com">1st menu item</a>,
//         key: '0',
//     },
//     {
//         label: <a href="https://www.aliyun.com">2nd menu item</a>,
//         key: '1',
//     },
//     {
//         type: 'divider',
//     },
//     {
//         label: '3rd menu item',
//         key: '3',
//     },
// ];
const CommonDropdown = ({ items }) => (
    <Dropdown
        menu={{
            items,
            selectable: true,
            defaultSelectedKeys: ['0'],
        }}
        trigger={['click']}
    >
        <a onClick={(e) => e.preventDefault()}>
            <Space>
                Click me
                <DownOutlined />
            </Space>
        </a>
    </Dropdown>
);
export default CommonDropdown;