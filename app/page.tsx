import React from 'react';
import { Layout } from 'antd';
import MainFooter from './components/common/footer/Footer';
import MainHeader from './components/common/header/Header';
import SubHeader from './components/common/sub-header/SubHeader';
import HomeLayout from './components/layouts/home-layout';

const Home: React.FC = () => {
  return (
    <Layout className="min-h-screen">
      <MainHeader />
      <SubHeader />
      <HomeLayout />
      <MainFooter />
    </Layout>
  );
};

export default Home;
