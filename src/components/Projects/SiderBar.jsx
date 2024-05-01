import { CheckCircleOutlined, OrderedListOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Link from "next/link";
import { useRouter } from 'next/router';
import React from 'react';
const { Header, Content, Footer, Sider } = Layout;




const SiderBar = () => {
    const router = useRouter()
    const items = [{ key: `/projects/${router.query.id}`, icon: OrderedListOutlined, title: "All Tasks", href: `/projects/${router.query.id}` }, { key: `/projects/${router.query.id}/team-members`, icon: UserOutlined, title: "Team Members", href: `/projects/${router.query.id}/team-members` }, { key: `/projects/${router.query.id}/recent-activities`, icon: CheckCircleOutlined, title: "Recent Activities", href: `/projects/${router.query.id}/recent-activities` }].map(
        (item, index) => ({
            key: String(index + 1),
            icon: React.createElement(item.icon),
            label: <Link href={item.href}>{item.title}</Link>,
        }),
    );
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
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
        </Sider>
    );
};

export default SiderBar;