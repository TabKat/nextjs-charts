"use client";

import React, { useEffect, useState } from "react";
import {
  Flex,
  Layout,
  Card,
  Row,
  Col,
  Space,
  Button,
  Avatar,
  Tooltip,
  Badge,
} from "antd";
import Donat from "./components/charts/Donat";
import Bars from "./components/charts/Bars";
import {
  AlignRightOutlined,
  FilterOutlined,
  MessageOutlined,
  UploadOutlined,
} from "@ant-design/icons";
const { Header, Footer, Content } = Layout;

async function getData(metrics: string): Promise<[]> {
  const url = `https://api.ukhsa-dashboard.data.gov.uk/v2/themes/infectious_disease/sub_themes/respiratory/topics/COVID-19/geography_types/Nation/geographies/England/metrics/${metrics}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}

const actions1: React.ReactNode[] = [
  <Flex key="100">
    <Avatar.Group>
      <Tooltip title="Ant User 1" placement="top">
        <Avatar
          style={{ marginLeft: "10px" }}
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </Tooltip>
    </Avatar.Group>
    <div style={{ margin: "0 10px 0 auto" }}>
      3 <MessageOutlined style={{ fontSize: "20px", marginTop: "5px" }} />
    </div>
  </Flex>,
];

const actions2: React.ReactNode[] = [
  <Flex key="101">
    <Avatar.Group>
      <Tooltip title="Ant User 1" placement="top">
        <Avatar
          style={{ marginLeft: "10px" }}
          src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
        />
      </Tooltip>
    </Avatar.Group>
    <div style={{ margin: "0 10px 0 auto" }}>
      5 <MessageOutlined style={{ fontSize: "20px", marginTop: "5px" }} />
    </div>
  </Flex>,
];

const headerStyle: React.CSSProperties = {
  backgroundColor: 'white',
};

const Home: React.FC = () => {
  const [dosesByDay, setDosesByDay] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      getData("COVID-19_vaccinations_spring23_dosesByDay"),
      getData("COVID-19_vaccinations_spring24_dosesByDay"),
    ])
      .then((val) => {
        setDosesByDay(val[0].results.concat(val[1].results));
      })
      .catch((e) => setError(e));
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={headerStyle} className="shadow-lg"><h1>App title</h1></Header>
      <Flex style={{ margin: '1rem 10px'}}>
        <h2>Page title</h2>
        <Space style={{ marginLeft: "auto" }}>
          <Button icon={<UploadOutlined />} iconPosition='end'>Export PDF</Button>
          <Button icon={<AlignRightOutlined />} iconPosition='end'><span>(3)</span> Notes</Button>
          <Button icon={<FilterOutlined />} iconPosition='end'><Badge color="cyan" count={'9+'} /> Filter</Button>
        </Space>
      </Flex>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <Content>
          <Row style={{margin: 0}} gutter={20}>
            <Col style={{marginBottom: '10px'}} xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Card title="Chart Title" actions={actions1}>
                {dosesByDay && (
                  <Bars data={dosesByDay} x="age" y="metric_value" z="metric" />
                )}
              </Card>
            </Col>
            <Col style={{marginBottom: '10px'}} xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Card title="Chart Title" actions={actions2}>
                {dosesByDay && (
                  <Donat data={dosesByDay} x="age" y="metric_value" />
                )}
              </Card>
            </Col>
          </Row>
        </Content>
      )}
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default Home;
