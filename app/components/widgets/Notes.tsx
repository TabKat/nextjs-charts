import { AlignRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Notes: React.FC = () => {
  return (
    <Button icon={<AlignRightOutlined />} iconPosition="end">
      <span>(3)</span> Notes
    </Button>
  );
};

export default Notes;
