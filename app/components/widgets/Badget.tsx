import { FilterOutlined } from '@ant-design/icons';
import { Badge, Button } from 'antd';

const Badget: React.FC = () => {
  return (
    <Button icon={<FilterOutlined />} iconPosition="end">
      <Badge color="cyan" count={'9+'} /> Filter
    </Button>
  );
};

export default Badget;
