import Login from '@/components/Login/Login';
import { Card } from 'antd';

export default function Home() {
  return <div className='flex justify-center items-center h-screen'>
    <Card
      style={{
        minWidth: 400,
      }}
    >
      <Login />
    </Card>
  </div>
}
