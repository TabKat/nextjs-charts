"use client";

import React, { useEffect, useState } from "react";
import Donat from "./components/charts/Donat";
import Bars from "./components/charts/Bars";

async function getData(metrics: string): Promise<[]> {
  const url = `https://api.ukhsa-dashboard.data.gov.uk/v2/themes/infectious_disease/sub_themes/respiratory/topics/COVID-19/geography_types/Nation/geographies/England/metrics/${metrics}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}

const Home: React.FC = () => {
  const [dosesByDay, setDosesByDay] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      getData("COVID-19_vaccinations_spring23_dosesByDay"),
      getData("COVID-19_vaccinations_spring24_dosesByDay"),
    ]).then((val) => {
      setDosesByDay(val[0].results.concat(val[1].results));
    }).catch(e => setError(e));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <div>
            {dosesByDay && (
              <Bars data={dosesByDay} x="age" y="metric_value" z="metric" />
            )}
          </div>
          <div>
            {dosesByDay && <Donat data={dosesByDay} x="age" y="metric_value" />}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;