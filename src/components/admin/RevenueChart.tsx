import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Chart from "react-apexcharts";
import axiosJWT from "../../utils/axiosService";
import { ADMIN_API } from "../../constants";

// Define the type for the chart data
interface ChartData {
  series: { name: string; data: number[] }[];
  options: {
    chart: {
      toolbar: { show: boolean };
      height: number;
    };
    title: { show: boolean };
    dataLabels: { enabled: boolean };
    colors: string[];
    stroke: { lineCap: string; curve: "smooth" | "straight" | "stepline" | "linestep" | "monotoneCubic" };
    markers: { size: number };
    xaxis: {
      axisTicks: { show: boolean };
      axisBorder: { show: boolean };
      labels: {
        style: {
          colors: string;
          fontSize: string;
          fontFamily: string;
          fontWeight: number;
        };
      };
      categories: string[];
    };
    yaxis: {
      labels: {
        style: {
          colors: string;
          fontSize: string;
          fontFamily: string;
          fontWeight: number;
        };
      };
    };
    grid: {
      show: boolean;
      borderColor: string;
      strokeDashArray: number;
      xaxis: { lines: { show: boolean } };
      padding: { top: number; right: number };
    };
    fill: { opacity: number; type: string; gradient: { shade: string; type: string; shadeIntensity: number; gradientToColors: string[]; inverseColors: boolean; opacityFrom: number; opacityTo: number; stops: number[] } };
    tooltip: { theme: string };
  };
}

const RevenueChart: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const [chartData, setChartData] = useState<ChartData>({
    series: [
      {
        name: "Revenue",
        data: [],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        height: 200,
      },
      title: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#00BFFF", "#00CED1"], // Define gradient colors
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616160",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616160",
            fontSize: "10px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        type: "gradient", // Set fill type to gradient
        gradient: {
          shade: "light",
          type: "vertical", // You can use "horizontal" or "vertical"
          shadeIntensity: 0.5,
          gradientToColors: ["#00CED1"], // Second gradient color
          inverseColors: false,
          opacityFrom: 0.8,
          opacityTo: 0.4,
          stops: [0, 100],
        },
      },
      tooltip: {
        theme: "dark",
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosJWT.get(`${ADMIN_API}/bookings`);
        console.log(response.data, "///response data////");
        setData(response.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      console.log("Processing data:", data);
      const now = new Date();
      const currentYear = now.getFullYear();

      // Array to hold total platform fee for each month of the current year
      const monthlyPlatformFee = Array(12).fill(0);

      data.result.forEach((booking: any) => {
        const bookingDate = new Date(booking.createdAt);
        if (bookingDate.getFullYear() === currentYear) {
          const month = bookingDate.getMonth(); // getMonth() returns month (0-11)
          const platformFee = parseFloat(booking.platformFee);
          if (!isNaN(platformFee)) {
            monthlyPlatformFee[month] += platformFee;
          } else {
            console.warn(`Invalid platformFee for booking: ${booking}`);
          }
        }
      });

      console.log("Monthly Platform Fee:", monthlyPlatformFee);

      const categories = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      setChartData((prevState) => ({
        ...prevState,
        series: [
          {
            name: "Revenue",
            data: monthlyPlatformFee,
          },
        ],
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories,
          },
        },
      }));
    }
  }, [data]);

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <Typography align="center" gutterBottom>
        Revenue Chart
      </Typography>
      <Card>
        <CardContent>
          <Chart options={chartData.options} series={chartData.series} type="line" height={250} />
        </CardContent>
      </Card>
    </>
  );
};

export default RevenueChart;
