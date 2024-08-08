import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Chart from "react-apexcharts";
import axiosJWT from "../../utils/axiosService";
import { ADMIN_API } from "../../constants";
import { ApexOptions } from "apexcharts";

const RevenueChart: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const [chartData, setChartData] = useState<{
    series: { name: string; data: number[] }[];
    options: ApexOptions;
  }>({
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
        text: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#00BFFF", "#00CED1"],
      stroke: {
        curve: "smooth",
        lineCap: "round" as "round" | "square" | "butt", // Cast to the appropriate type
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
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: ["#00CED1"],
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
      const now = new Date();
      const currentYear = now.getFullYear();
      const monthlyPlatformFee = Array(12).fill(0);

      data.result.forEach((booking: any) => {
        const bookingDate = new Date(booking.createdAt);
        if (bookingDate.getFullYear() === currentYear) {
          const month = bookingDate.getMonth();
          const platformFee = parseFloat(booking.platformFee);
          if (!isNaN(platformFee)) {
            monthlyPlatformFee[month] += platformFee;
          }
        }
      });

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
