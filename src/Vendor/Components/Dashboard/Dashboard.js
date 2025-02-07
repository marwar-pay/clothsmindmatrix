'use client';
import { useEffect } from 'react';
import Chart from 'chart.js/auto';
import {
  WalletOutlined,
  HourglassOutlined,
  CheckCircleOutlined,
  GoldOutlined,
  BoxPlotOutlined,
  SoundOutlined,
  ShoppingCartOutlined,
  LikeOutlined,
  LineChartOutlined,
  CalendarOutlined,
  HistoryOutlined,
} from '@ant-design/icons';

export default function Dashboard() {
  useEffect(() => {
    const weeklyEarnings = [0, 1000, 2000, 1500, 2500, 3000, 3500];
    const monthlyEarnings = [0, 15000, 12000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000];

    const ctx = document.getElementById('earningsGraph').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Yearly Income Statement',
            data: monthlyEarnings,
            borderColor: '#4caf50',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            fill: true,
            tension: 0.1,
          },
          {
            label: 'This Week Earnings',
            data: weeklyEarnings,
            borderColor: '#ff9800',
            backgroundColor: 'rgba(255, 152, 0, 0.2)',
            fill: true,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Months',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Earnings (₹)',
            },
          },
        },
      },
    });
  }, []);

  return (
    <div className="dashboard">
      <div className="summary-cards">
        <div className="card">
          <div>Current Balance: ₹0.00</div>
          <WalletOutlined className="icon" />
        </div>
        <div className="card">
          <div>Pending Balance: ₹0.00</div>
          <HourglassOutlined className="icon" />
        </div>
        <div className="card">
          <div>Order Completed Balance: ₹0.00</div>
          <CheckCircleOutlined className="icon" />
        </div>
        <div className="card">
          <div>Total Earning: ₹0.00</div>
          <GoldOutlined className="icon" />
        </div>
        <div className="card">
          <div>Total Product: 0</div>
          <BoxPlotOutlined className="icon" />
        </div>
        <div className="card">
          <div>Total Campaign: 0</div>
          <SoundOutlined className="icon" />
        </div>
        <div className="card">
          <div>Total Order: 0</div>
          <ShoppingCartOutlined className="icon" />
        </div>
        <div className="card">
          <div>Success Order: 0</div>
          <LikeOutlined className="icon" />
        </div>
      </div>

      <div className="earnings-history">
        <div>
          <div>Last Week Earning: ₹0.00</div>
          <LineChartOutlined className="icon" />
        </div>
        <div>
          <div>This Month Earning: ₹0.00</div>
          <CalendarOutlined className="icon" />
        </div>
        <div>
          <div>Last Month Earning: ₹0.00</div>
          <HistoryOutlined className="icon" />
        </div>
        <div>
          <div>This Year Earning: ₹0.00</div>
          <CalendarOutlined className="icon" />
        </div>
      </div>

      <div className="graph-container">
        <canvas id="earningsGraph"></canvas>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(to bottom right, #6a11cb, #2575fc);
          color: #333;
        }

        .dashboard {
          width: 80%;
          margin: 50px auto;
        }

        .summary-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .card {
          background: linear-gradient(to bottom right, #ffffff, #dbeafe);
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          font-size: 1.2em;
          color: #444;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .card .icon {
          font-size: 3em;
          padding: 10px;
          background: linear-gradient(to bottom right, #2575fc, #6a11cb);
          border-radius: 50%;
          color: white;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .card .icon:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .earnings-history {
          margin-bottom: 30px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .earnings-history div {
          background: linear-gradient(to bottom right, #ffffff, #ffe5b4);
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          font-size: 1.2em;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .earnings-history div:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .earnings-history .icon {
          font-size: 2.5em;
          padding: 10px;
          background: linear-gradient(to bottom right, #ff9800, #ff5722);
          border-radius: 50%;
          color: white;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .earnings-history .icon:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .graph-container {
          background: linear-gradient(to bottom right, #ffffff, #f1f8e9);
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        canvas {
          width: 100% !important;
          height: 400px;
        }
      `}</style>
    </div>
  );
}
