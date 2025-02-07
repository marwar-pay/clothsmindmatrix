'use client';
import React, { useEffect } from 'react';
import { Layout, Switch, Button, Dropdown } from 'antd';
import { UserOutlined, BellOutlined, MenuUnfoldOutlined, MenuFoldOutlined, GlobalOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import moment from 'moment';
import Sidebar from './Dashbord/Sidebar';
import Link from 'next/link';
import { format } from 'date-fns';

const { Header, Content } = Layout;

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const [currentDateTime, setCurrentDateTime] = React.useState(moment().format('YYYY-MM-DD HH:mm:ss'));
  // const [currentDateTime, setCurrentDateTime] = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  const [greeting, setGreeting] = React.useState('');
  const [dayName, setDayName] = React.useState(moment().format('dddd'));
  const router = useRouter();

  React.useEffect(() => {
    // Retrieve dark mode setting from local storage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     const now = moment();
  //     setCurrentDateTime(now.format('YYYY-MM-DD HH:mm:ss'));
  //     setDayName(now.format('dddd'));

  //     const hour = now.hour();
  //     if (hour >= 5 && hour < 12) {
  //       setGreeting('Good Morning');
  //     } else if (hour >= 12 && hour < 17) {
  //       setGreeting('Good Afternoon');
  //     } else if (hour >= 17 && hour < 20) {
  //       setGreeting('Good Evening');
  //     } else {
  //       setGreeting('Good Night');
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
        const interval = setInterval(() => {
          const now = moment();
          setCurrentDateTime(now.format('YYYY-MM-DD HH:mm:ss'));
          setDayName(now.format('dddd'));
          
          const hour = now.hour();
          if (hour >= 5 && hour < 12) {
            setGreeting('Good Morning');
          } else if (hour >= 12 && hour < 17) {
            setGreeting('Good Afternoon');
          } else if (hour >= 17 && hour < 20) {
            setGreeting('Good Evening');
          } else {
            setGreeting('Good Night');
          }
        }, 1000);
        return () => clearInterval(interval);
      }, []);
  const handleDarkModeChange = (checked) => {
    setDarkMode(checked);
    localStorage.setItem('darkMode', checked); // Save dark mode state to local storage
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} darkMode={darkMode} setCollapsed={setCollapsed} />

      <Layout>
        <Header
        // collapsible
        // collapsed={collapsed}
          className="header"
          style={{
            // height: '100vh',
            position: 'fixed',
            right: 0,
            top: 0,
            width:'100%',
            backgroundColor: darkMode ? '#001529' : '#fff',
            
            transition: 'width 0.3s ease',
            color: darkMode ? '#fff' : '#000', 
            zIndex: 10,
            padding: '0 15px',
            background: darkMode ? '#001529' : '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: darkMode ? '#fff' : '#000',
            marginBottom: '20px',
          }}
        >
          <div>
          <div>{`${greeting}, ${dayName}`} 
               <span style={{marginLeft:'5px'}}>{currentDateTime}</span></div>
          </div>

          <div>
            <Switch checked={darkMode} onChange={handleDarkModeChange} />
            <Button type="text" icon={<BellOutlined />} style={{ marginLeft: 16, color: darkMode ? '#fff' : '#000' }} />
            {/* <Dropdown overlay={<div>Profile Menu</div>} trigger={['click']}>
              <Button type="text" icon={<UserOutlined />} style={{ marginLeft: 16, color: darkMode ? '#fff' : '#000' }} />
            </Dropdown> */}
            <span className="dropdown" >
  <Button
    className="btn btn-secondary "
    type="button"
    id="dropdownMenuButton"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style={{
      backgroundColor: 'transparent',
      border: 'none',
      color: darkMode ? '#fff' : '#000', position:'relative',bottom:'3px',
    }}
  >
    <UserOutlined />
  </Button>
  <ul
    className="dropdown-menu"
    aria-labelledby="dropdownMenuButton"
    style={{
      backgroundColor: darkMode ? '#001529' : '#fff',
      color: darkMode ? '#fff' : '#000',
    }}
  >
    <li>
      <a className="dropdown-item" href="/profile">
        Profile
      </a>
    </li>
    <li>
      <a className="dropdown-item" href="/settings">
        Settings
      </a>
    </li>
    <li>
      <a className="dropdown-item" href="/logout">
        Logout
      </a>
    </li>
  </ul>
</span>

            
            <Link href="/" style={{ marginLeft: 16, color: darkMode ? '#fff' : '#000', fontSize: '18px', position:'relative',top:'4px', }}>
              <GlobalOutlined />
            </Link>
          </div>

          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: darkMode ? '#fff' : '#000',
            }}
          />
        </Header>

        <Content
          style={{
            marginLeft: collapsed ? '90px' : '220px',
            padding: 24,
            minHeight: '280px',
            background: darkMode ? '#333' : '#fff',
            borderRadius: '10px',
            transition: 'margin-left 0.3s ease',
            overflowY: 'auto',
            height: 'calc(100vh - 100px)',
            marginTop:'6%',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
