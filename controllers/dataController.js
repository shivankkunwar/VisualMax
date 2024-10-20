const xlsx = require('xlsx');
const { processData } = require('../utils/dataProcessor');

const workbook = xlsx.readFile('./data/Frontend Developer Assignment Data.xlsx');
const processedData = processData(workbook);

exports.getData = (req, res) => {
    const { startDate, endDate, ageFilter, genderFilter } = req.body;

  // Filter data based on user selection
  const filteredData = processedData.filter((row) => {
    const rowDate = new Date(row.day);
    return (
      rowDate >= new Date(startDate) &&
      rowDate <= new Date(endDate) &&
      (ageFilter === 'all' || row.age === ageFilter) &&
      (genderFilter === 'all' || row.gender === genderFilter)
    );
  });

  // Aggregate data for bar chart
  const aggregatedData = filteredData.reduce((acc, row) => {
    Object.keys(row.features).forEach((feature) => {
      acc[feature] = (acc[feature] || 0) + row.features[feature];
    });
    return acc;
  }, {});

  // Format data for response (consider a data model for better structure)
  const result = Object.keys(aggregatedData).map((feature) => ({
    feature,
    value: aggregatedData[feature],
  }));

  res.json(result);
  };

 exports.getTrend = (req, res) => {
    const { feature, startDate, endDate } = req.body;
    console.log("reched 1")
    // Filter processedData based on feature and date range
    const filteredData = processedData.filter(row => {
      const rowDate = row.day;
      return (
        rowDate >= new Date(startDate) &&
        rowDate <= new Date(endDate)
      );
    });
  
    console.log("reched 2")
    const trendData = filteredData.map(row => ({
      date: row.day.toISOString().split('T')[0], 
      value: row.features[feature] || 0, 
    }));
  console.log(trendData)
    res.json(trendData);
  }