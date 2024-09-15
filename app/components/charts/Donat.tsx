'use client';

import React, { useEffect, useRef } from 'react';
import { Chart, registerShape } from '@antv/g2';

interface DonatProps {
  data: [];
  x: string;
  y: string;
}

const Donat: React.FC<DonatProps> = ({ data, x, y }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    const sliceNumber = 0.01;

    registerShape('interval', 'slice-shape', {
      draw(cfg, container) {
        const points = cfg.points!;
        let path = [];
        
        path.push(['M', points[0].x, points[0].y]);
        path.push(['L', points[1].x, points[1].y - sliceNumber]);
        path.push(['L', points[2].x, points[2].y - sliceNumber]);
        path.push(['L', points[3].x, points[3].y]);
        path.push('Z');
        
        path = this.parsePath(path);
        
        return container.addShape('path', {
          attrs: {
            fill: cfg.color,
            path,
          },
        });
      },
    });

    const chart = new Chart({
      container: chartRef.current!, // Use the ref for the container
      autoFit: true,
      height: 340,
    });

    chart.data(data);

    chart.coordinate('theta', {
      radius: 0.75,
      innerRadius: 0.6,
    });

    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    });

    chart.interval().adjust('stack').position(y).color(x).shape('slice-shape');

    chart.render();

    return () => {
      chart.destroy();
    };
  }, [data, x, y]);

  return (
    <div>
      <div ref={chartRef}></div> {/* Chart will render here */}
    </div>
  );
};

export default Donat;
