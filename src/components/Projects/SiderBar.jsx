import { CheckCircleOutlined, OrderedListOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
const { Header, Content, Footer, Sider } = Layout;



const items = [{ icon: OrderedListOutlined, title: "All Tasks" }, { icon: UserOutlined, title: "Team Members" }, { icon: CheckCircleOutlined, title: "Recent Activities" }].map(
    (item, index) => ({
        key: String(index + 1),
        icon: React.createElement(item.icon),
        label: item.title,
    }),
);
const SiderBar = () => {
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            style={{
                overflow: "auto",
                height: "100vh",
                position: "sticky",
                left: 0,
                top: 0,
                bottom: 0,
            }}
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
        </Sider>
    );
};

export default SiderBar;