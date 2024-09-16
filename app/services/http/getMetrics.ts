export default async function getMetrics(metrics: string): Promise<[]> {
  const url = `https://api.ukhsa-dashboard.data.gov.uk/v2/themes/infectious_disease/sub_themes/respiratory/topics/COVID-19/geography_types/Nation/geographies/England/metrics/${metrics}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return await response.json();
}