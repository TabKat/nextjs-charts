import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const ExportPDF: React.FC = () => {
  return (
    <Button
      icon={<DownloadOutlined />}
      iconPosition="end"
    >
      Export PDF
    </Button>
  );
};

export default ExportPDF;
