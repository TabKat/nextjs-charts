import { Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import MetricsByYears from '../metrics-by-years';
import MetricsByAge from '../metrics-by-age';

export default function HomeLayout() {
  return (
    <Content>
      <Row style={{ margin: 0 }} gutter={20}>
        <Col className="mb-4" xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <MetricsByYears />
        </Col>
        <Col className="mb-4" xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <MetricsByAge />
        </Col>
      </Row>
    </Content>
  );
}
