import { Flex, Space } from 'antd';
import ExportPDF from '../../widgets/ExportPdf';
import Notes from '../../widgets/Notes';
import Badget from '../../widgets/Badget';

const SubHeader: React.FC = () => {
  return (
    <Flex className="m-4 items-end">
      <h2>Page title</h2>
      <Space className="ml-auto">
        <ExportPDF />
        <Notes />
        <Badget />
      </Space>
    </Flex>
  );
};

export default SubHeader;
