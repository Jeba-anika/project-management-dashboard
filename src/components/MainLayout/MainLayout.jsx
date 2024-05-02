
import { Layout } from 'antd';
import Link from 'next/link';
const { Header, Content, Footer, Sider } = Layout;

const MainLayout = ({ children }) => {
    const layoutStyle = {
        borderRadius: 8,
        overflow: 'hidden',

    };
    const footerStyle = {
        textAlign: 'center',
        color: '#090909',
        backgroundColor: '#c7f6f85d',
    };
    const headerStyle = {
        textAlign: 'center',
        color: '#090909',
        height: 64,
        paddingInline: 48,
        lineHeight: '64px',
        backgroundColor: '#c7f6f85d',
    };
    const contentStyle = {
        backgroundColor: "#c7f6f85d",
        textAlign: 'center',
        minHeight: 120,
        minWidth: "100%",
        lineHeight: '120px',
        color: '#fff',

    };
    return (
        <Layout style={layoutStyle}>
            <Header style={headerStyle}><Link href="/" className='text-3xl font-bold font-mono text-black'>Project Management</Link></Header>
            <Content style={contentStyle}>{children}</Content>
            <Footer style={footerStyle}>Copyright © 2024</Footer>
        </Layout>
    );
};
export default MainLayout;