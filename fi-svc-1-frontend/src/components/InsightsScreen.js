import { Box, Typography, ToggleButton, ToggleButtonGroup, Grid, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import axios from 'axios';

const InsightsScreen = () => {
  const [transactionsInfo, setTransactionsInfo] = useState([]);
  const [isList, setIsList] = useState(true);
  const [chartData, setChartData] = useState({ options: {}, series: [] });

  const handleToggleButton = (value) => {
    setIsList(value);
  };

  useEffect(() => {
    getTransactionsHistory();
  }, []);

  const getTransactionsHistory = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/transactions');
      console.log("res: ", response?.data?.transactions)
      // Calculate category-wise total spending
      const categoryWiseSpending = response?.data?.transactions.reduce((acc, curr) => {
        if (acc[curr.category]) {
          acc[curr.category] += curr.amount;
        } else {
          acc[curr.category] = curr.amount;
        }
        return acc;
      }, {});

      console.log("categoryWiseSpending", categoryWiseSpending);
      // Extract categories and amounts for chart options and series
      const categories = Object.keys(categoryWiseSpending);
      const amounts = Object.values(categoryWiseSpending);

      const options = {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: categories // Set categories as labels on X-axis
        }
      };

      const series = [
        {
          name: "Spending",
          data: amounts // Set category-wise total spending as data
        }
      ];

      setChartData({ options, series });
      setTransactionsInfo(categories.map((category, index) => ({
        id: index, // Assign unique ID for each category
        category: category,
        totalAmount: amounts[index] // Set total amount for each category
      })));
    } catch (error) {
      console.log("Error while getting Transactions history: ", error)
    }
  }



  return (
    <Box>
      <Typography variant='h5' paddingTop='12px'>Insights: Analyze Spending by Category</Typography>

      {/* ToggleButton */}
      <Grid container justifyContent="flex-start" sx={{ paddingLeft: '40px' }}>
        <ToggleButtonGroup
          color="primary"
          value={isList}
          exclusive
          onChange={(e, value) => handleToggleButton(value)}
        >
          <ToggleButton value={true}>List</ToggleButton>
          <ToggleButton value={false}>Chart</ToggleButton>
        </ToggleButtonGroup>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {isList ? (
          <Grid container justifyContent="center" padding='20px'>
            {transactionsInfo?.map((transaction, index) => (
              <Grid item key={index}>
                <Card variant="outlined" sx={{ width: "200px", marginBottom: '10px' }}>
                  <CardContent>
                    <Typography variant="h6">{transaction.category}</Typography>
                    <Typography variant="text">Total: {transaction.totalAmount}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            width="500"
          />
        )}
      </Box>


    </Box>
  );
}

export default InsightsScreen;
