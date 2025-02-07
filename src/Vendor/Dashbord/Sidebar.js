// import React, { useState, useEffect } from 'react';
// import {
//   DashboardOutlined,
//   UserOutlined,
//   AppstoreAddOutlined,
//   WalletOutlined,
//   ShoppingCartOutlined,
//   ToolOutlined,
//   OrderedListOutlined,
//   ThunderboltOutlined,
//   MessageOutlined,
//   LogoutOutlined,
//   BellOutlined,
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   GlobalOutlined,
// } from '@ant-design/icons';
// import { Button, Layout, Menu, theme, Dropdown, Switch, SubMenu } from 'antd';
// import moment from 'moment';
// import '../../styles/sidebar.css'; // Import CSS file for custom styling
// import Image from 'next/image';
// import logo from '../../assets/pinkcityimg/logo.png';
// import Link from 'next/link';

// const { Header, Sider, Content } = Layout;

// const Sidebar = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [currentDateTime, setCurrentDateTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
//   const [greeting, setGreeting] = useState('');
//   const [dayName, setDayName] = useState(moment().format('dddd')); // Day name (e.g., Monday, Tuesday)

//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   // Update the time every second and update the greeting
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = moment();
//       setCurrentDateTime(now.format('YYYY-MM-DD HH:mm:ss'));
//       setDayName(now.format('dddd'));
      
//       const hour = now.hour();
//       if (hour >= 5 && hour < 12) {
//         setGreeting('Good Morning');
//       } else if (hour >= 12 && hour < 17) {
//         setGreeting('Good Afternoon');
//       } else if (hour >= 17 && hour < 20) {
//         setGreeting('Good Evening');
//       } else {
//         setGreeting('Good Night');
//       }
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleDarkModeChange = (checked) => {
//     setDarkMode(checked);
//   };

//   const menu = (
//     <Menu>
//       <Menu.Item key="1">Profile</Menu.Item>
//       <Menu.Item key="2">Logout</Menu.Item>
//     </Menu>
//   );

//   return (
//     <Layout style={{ minHeight: '100vh', background: darkMode ? '#333' : '#fff' }}>
//       <Sider
//         trigger={null}
//         collapsible
//         collapsed={collapsed}
//         style={{
//           background: darkMode ? '#1c1c1c' : '#fff',
//           color: darkMode ? '#fff' : '#000',
//         }}
//         className="sidebar"
//       >
//         {/* Fixed Logo */}
//         <div className="logosidebar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: collapsed ? '5px 10px' : '10px 40px' }}>
//           <Image
//             src={logo}
//             alt="logo"
//             style={{
//               width: collapsed ? '60px' : '100px',
//               padding: '8px',
//               borderRadius: darkMode ? '50%' : '0%',
//               backgroundColor: darkMode ? '#fff' : 'transparent',
//             }}
//           />
//         </div>
//         <div className="menu-container" style={{ height: '75vh', overflowY: 'auto', }}>
//           <Menu
//             theme={darkMode ? 'dark' : 'light'}
//             mode="inline"
//             defaultSelectedKeys={['1']}
//             items={[
//               {
//                 key: '1',
//                 icon: <DashboardOutlined />,
//                 label: 'Dashboard',
//               },
//               {
//                 key: '2',
//                 icon: <UserOutlined />,
//                 label: 'Profile',
//               },
//               {
//                 key: '3',
//                 icon: <AppstoreAddOutlined />,
//                 label: 'Inventory',
//               },
//               {
//                 key: '4',
//                 icon: <WalletOutlined />,
//                 label: 'Wallet Module',
//                 children: [
//                   {
//                     key: '4-1',
//                     label: 'Wallet',
//                   },
//                   {
//                     key: '4-2',
//                     label: 'Wallet settings',
//                   },
//                   {
//                     key: '4-3',
//                     label: 'Withdraw',
//                   },
//                   {
//                     key: '4-4',
//                     label: 'Withdraw request',
//                   },
//                   {
//                     key: '4-5',
//                     label: 'History',
//                   },
//                 ],
//               },
//               {
//                 key: '5',
//                 icon: <ShoppingCartOutlined />,
//                 label: 'Shipping Method',
//               },
//               {
//                 key: '6',
//                 icon: <ToolOutlined />,
//                 label: 'Product Module',
//                 children: [
//                   {
//                     key: '6-1',
//                     label: 'Product List',
//                   },
//                   {
//                     key: '6-2',
//                     label: 'Create Product',
//                   },
//                 ],
//               },
//               {
//                 key: '7',
//                 icon: <OrderedListOutlined />,
//                 label: 'Order Module',
//                 children: [
//                   {
//                     key: '7-1',
//                     label: 'Order List',
//                   },
//                 ]
//               },
//               {
//                 key: '8',
//                 icon: <ThunderboltOutlined />,
//                 label: 'Campaign Module',
//               },
//               {
//                 key: '9',
//                 icon: <MessageOutlined />,
//                 label: 'Support Tickets',
//                 children: [
//                   {
//                     key: '9-1',
//                     label: 'Add New Ticket',
//                   },
//                   {
//                     key: '9-2',
//                     label: 'All Tickets',
//                   },
//                 ]
//               },
//               {
//                 key: '10',
//                 icon: <LogoutOutlined />,
//                 label: 'Logout',
//               },
//             ]}
//             style={{
//               background: darkMode ? '#1c1c1c' : '#fff',
//               color: darkMode ? '#fff' : '#000',
//             }}
//           />
//         </div>
//       </Sider>
//       <Layout>
//         <Header
//           className="header"
//           style={{
//             zIndex: 10,
//             padding: '0 15px',
//             background: darkMode ? '#1c1c1c' : colorBgContainer,
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             color: darkMode ? '#fff' : '#000',
//           }}
//         >
//           {/* Left side: Current Day, Date, and Time with Greeting */}
//           <div>
//             <div>{`${greeting}, ${dayName}`} 
//              <span style={{marginLeft:'5px'}}>{currentDateTime}</span></div>
//           </div>

//           <div>
//             {/* Dark Mode Switch */}
//             <Switch checked={darkMode} onChange={handleDarkModeChange} />

//             {/* Bell Icon */}
//             <Button type="text" icon={<BellOutlined />} style={{ marginLeft: 16, color: darkMode ? '#fff' : '#000' }} />

//             {/* Profile Icon */}
//             <Dropdown overlay={menu} trigger={['click']}>
//               <Button type="text" icon={<UserOutlined />} style={{ marginLeft: 16, color: darkMode ? '#fff' : '#000' }} />
//             </Dropdown>
//             <Link href="/" style={{ marginLeft: 16, color: darkMode ? '#fff' : '#000', fontSize: '18px', marginTop: '30px' }}><GlobalOutlined /></Link>
//           </div>

//           {/* Toggle Sidebar Button */}
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{
//               fontSize: '16px',
//               width: 64,
//               height: 64,
//               color: darkMode ? '#fff' : '#000',
//             }}
//           />
//         </Header>
//         <Content
//           style={{
//             margin: '24px 16px',
//             padding: 24,
//             minHeight: 280,
//             height: '80vh',
//             background: darkMode ? '#333' : colorBgContainer,
//             borderRadius: borderRadiusLG,
//             color: darkMode ? '#fff' : '#000',
//             paddingTop: 80, // This ensures content is below the fixed header
//           }}
//         >
//           Content
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default Sidebar;


'use client';
import React from 'react';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import { DashboardOutlined, UserOutlined, AppstoreAddOutlined, WalletOutlined, 
    ShoppingCartOutlined,
    ToolOutlined,
    OrderedListOutlined,
    ThunderboltOutlined,
    MessageOutlined,
    LogoutOutlined,
    } from '@ant-design/icons';
import Image from 'next/image';
import logo from '../../assets/pinkcityimg/logo.png';

const Sidebar = ({ collapsed, darkMode, setCollapsed }) => {
  const router = useRouter();

  const handleMenuClick = (e) => {
    router.push(e.key); // Navigate to the clicked menu item
  };

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        width: collapsed ? '80px' : '220px',
        backgroundColor: darkMode ? '#001529' : '#fff',
        
        transition: 'width 0.3s ease',
        color: darkMode ? '#fff' : '#000', 
        marginTop:'60px',
      }}
      
    >
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: collapsed ? '5px 10px' : '10px 40px',
        transition: 'all 0.3s ease',
      }}>
        <Image
          src={logo} // Your logo path
          alt="logo"
          style={{
            width: collapsed ? '60px' : '100px',
            padding: '8px',
            borderRadius: darkMode ? '50%' : '0%',
            backgroundColor: darkMode ? '#fff' : 'transparent',
          }}
        />
      </div>

      <div style={{
        overflowY: 'auto',
        height: 'calc(100vh - 100px)', // Adjust this based on your layout
      }}>
        <Menu
          theme={darkMode ? 'dark' : 'light'}
          mode="inline"
          onClick={handleMenuClick}
          items={[
            {
              key: '/vendor/dashboard',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
            },
            {
              key: '/vendor/profile',
              icon: <UserOutlined />,
              label: 'Profile',
            },
            {
              key: '/vendor/inventory',
              icon: <AppstoreAddOutlined />,
              label: 'Inventory',
            },
            {
                              key: '/vendor/wallet',
                              icon: <WalletOutlined />,
                              label: 'Wallet Module',
                              children: [
                                {
                                  key: '/vendor/wallet',
                                  label: 'Wallet',
                                },
                                {
                                  key: '/vendor/walletsettings',
                                  label: 'Wallet settings',
                                },
                                {
                                  key: '/vendor/withdraw',
                                  label: 'Withdraw',
                                },
                                {
                                  key: '/vendor/withdrawrequest',
                                  label: 'Withdraw request',
                                },
                                {
                                  key: '/vendor/history',
                                  label: 'History',
                                },
                              ],
                            },
                            {
                              key: '/vendor/shipping',
                              icon: <ShoppingCartOutlined />,
                              label: 'Shipping Method',
                            },
                            {
                              key: '6',
                              icon: <ToolOutlined />,
                              label: 'Product Module',
                              children: [
                                {
                                  key: '/vendor/productlist',
                                  label: 'Product List',
                                },
                                {
                                  key: '/vendor/createproduct',
                                  label: 'Create Product',
                                },
                              ],
                            },
                            {
                              key: '7',
                              icon: <OrderedListOutlined />,
                              label: 'Order Module',
                              children: [
                                {
                                  key: '/vendor/orders',
                                  label: 'Order List',
                                },
                              ]
                            },
                            {
                              key: '8',
                              icon: <ThunderboltOutlined />,
                              label: 'Campaign Module',
                            },
                            {
                              key: '9',
                              icon: <MessageOutlined />,
                              label: 'Support Tickets',
                              children: [
                                {
                                  key: '9-1',
                                  label: 'Add New Ticket',
                                },
                                {
                                  key: '9-2',
                                  label: 'All Tickets',
                                },
                              ]
                            },
                            {
                              key: '10',
                              icon: <LogoutOutlined />,
                              label: 'Logout',
                            },
          ]}
        />
      </div>
    </Layout.Sider>
  );
};

export default Sidebar;
