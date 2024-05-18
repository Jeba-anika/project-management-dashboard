import { Select, Space } from 'antd';




const CommonSelectDropdown = ({ options, handleChangeOption, isLoading }) => (
    <Space
        style={{
            width: '100%',
        }}
        direction="vertical"
    >
        <Select
            mode="multiple"
            allowClear
            style={{
                width: '100%',
            }}
            placeholder="Please select"
            onChange={handleChangeOption}
            options={options}
            loading={isLoading}
        />

    </Space>
);
export default CommonSelectDropdown;