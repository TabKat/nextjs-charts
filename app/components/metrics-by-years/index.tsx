'use client'

import { MessageOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex, Tooltip } from 'antd';
import Bars from '../charts/Bars';
import { avatar } from '../const/mock-data';
import { useEffect, useId, useState } from 'react';
import Loader from '../common/loader';
import getMetrics from '@/app/services/http/getMetrics';

const actions: React.ReactNode[] = [
  <Flex key={useId.toString()}>
    <Avatar.Group>
      <Tooltip title="Ant User 1" placement="top">
        <Avatar className="ml-3" src={avatar.url1} />
      </Tooltip>
    </Avatar.Group>
    <div className="mt-0 mr-2 mb-0 ml-auto">
      3 <MessageOutlined className="mt-2 text-xl" />
    </div>
  </Flex>,
];

const MetricsByYears = () => {
  const [dosesByDay, setDosesByDay] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      getMetrics('COVID-19_vaccinations_spring23_dosesByDay'),
      getMetrics('COVID-19_vaccinations_spring24_dosesByDay'),
    ])
      .then((val) => {
        setDosesByDay(val[0].results.concat(val[1].results));
      })
      .catch((e) => setError(e));
  }, []);

  return (
    <>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          {!dosesByDay && !error && (
            <Card>
              <Loader />
            </Card>
          )}
          {dosesByDay && (
            <Card title="Chart Title" actions={actions}>
              <Bars data={dosesByDay} x="age" y="metric_value" z="metric" />
            </Card>
          )}
        </>
      )}
    </>
  );
};

export default MetricsByYears;
