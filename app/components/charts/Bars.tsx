'use client';

import React, { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';
import { IBars } from '@/app/types/ui';

const Bars: React.FC<IBars> = ({ data, x, y, z }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const chart = new Chart({
      container: chartRef.current!,
      autoFit: true,
      height: 340,
    });

    chart.data(data);

    chart.scale(y, {
      nice: true,
    });

    chart.tooltip({
      showMarkers: false,
      shared: true,
    });

    chart
      .interval()
      .position(`${x}*${y}`)
      .color(z)
      .adjust([{ type: 'dodge', marginRatio: 0 }]);

    chart.interaction('element-highlight-by-x');

    chart.render();

    return () => {
      chart.destroy();
    };
  });

  return <div ref={chartRef}></div>;
};

export default Bars;
