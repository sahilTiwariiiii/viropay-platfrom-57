
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { format, subMonths } from 'date-fns';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface MonthlySpendChartProps {
  applicationCost: number;
  yearlySpend: number;
  applicationId?: string;
}

const MonthlySpendChart: React.FC<MonthlySpendChartProps> = ({
  applicationCost,
  yearlySpend,
  applicationId = 'default'
}) => {
  // Generate spending data for the last year with some realistic fluctuations
  const generateMonthlySpendData = () => {
    const data = [];
    const monthlyCost = applicationCost || yearlySpend / 12;
    const baseAmount = monthlyCost;
    
    // Create different growth patterns based on the application ID
    // This ensures each application has a unique but consistent chart
    let growthPattern;
    
    // Generate a consistent seed from the application ID
    const seed = applicationId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Use the seed to determine which pattern to use
    const patternType = seed % 5; // 5 different pattern types
    
    switch(patternType) {
      case 0: // Steady growth
        growthPattern = [
          0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 
          0.90, 0.95, 1.00, 1.05, 1.10, 1.15
        ];
        break;
      case 1: // Spike in the middle
        growthPattern = [
          0.40, 0.42, 0.45, 0.48, 0.50, 0.55, 
          0.70, 1.2, 2.8, 2.5, 2.3, 2.5
        ];
        break;
      case 2: // Decreasing trend
        growthPattern = [
          1.8, 1.7, 1.6, 1.5, 1.4, 1.3,
          1.2, 1.1, 1.0, 0.9, 0.8, 0.7
        ];
        break;
      case 3: // Seasonal fluctuation
        growthPattern = [
          0.8, 0.9, 1.2, 1.5, 1.3, 1.0,
          0.8, 0.9, 1.2, 1.5, 1.3, 1.0
        ];
        break;
      case 4: // Recent growth
        growthPattern = [
          0.5, 0.5, 0.5, 0.5, 0.6, 0.7,
          0.8, 0.9, 1.1, 1.3, 1.6, 2.0
        ];
        break;
      default: // Fallback to original pattern
        growthPattern = [
          0.40, 0.42, 0.45, 0.48, 0.50, 0.55, 
          0.70, 1.2, 2.8, 2.5, 2.3, 2.5
        ];
    }
    
    // Apply small random variations to make each chart unique
    // but still consistent for the same application
    const randomizedPattern = growthPattern.map(value => {
      // Use a seeded random calculation
      const randomFactor = ((seed * (value * 100)) % 30) / 100; // Random fluctuation up to 30%
      return value * (1 + (randomFactor / 10 - 0.015)); // Small adjustment centered around the original value
    });
    
    for (let i = 11; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      // Add some variance to the monthly amounts based on the randomized growth pattern
      const amount = Math.round(baseAmount * randomizedPattern[11-i]);
      
      data.push({
        month: format(date, 'MMM-yyyy'),
        shortMonth: format(date, 'MMM'),
        year: format(date, 'yyyy'),
        amount
      });
    }
    return data;
  };

  const monthlySpendData = generateMonthlySpendData();
  
  // Calculate current month and previous month amounts for comparison
  const currentMonth = monthlySpendData[monthlySpendData.length - 1];
  const previousMonth = monthlySpendData[monthlySpendData.length - 2];
  
  // Calculate percentage change
  const percentChange = previousMonth && currentMonth 
    ? ((currentMonth.amount - previousMonth.amount) / previousMonth.amount) * 100
    : 0;

  // Format currency
  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString('en-EU')}`;
  };

  return (
    <Card className="shadow-sm bg-white mt-8 w-full">
      <CardContent className="p-6">
        <div className="flex flex-row justify-between items-center mb-6">
          <div>
            <h3 className="text-base font-medium text-gray-900">Monthly Software Spend</h3>
            <div className="flex items-baseline mt-1">
              <span className="text-2xl font-bold text-black">
                {formatCurrency(currentMonth.amount)}
              </span>
              <span className={`ml-2 text-sm ${percentChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
                <span className="text-gray-500 ml-1">vs previous period</span>
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Projected - {format(new Date(), 'MMMM, yyyy')}
          </div>
        </div>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlySpendData}
              margin={{ top: 10, right: 5, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="#e5e7eb"
              />
              <XAxis 
                dataKey="shortMonth" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickMargin={10}
                tickFormatter={(value) => `€${value}`}
                domain={[0, 'dataMax + 500']}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
                        <p className="font-medium">{`${data.shortMonth} ${data.year}`}</p>
                        <p className="text-blue-600 font-bold mt-1">
                          {`€${data.amount.toLocaleString('en-EU')}`}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine y={0} stroke="#e5e7eb" />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fill="url(#colorAmount)"
                animationDuration={1500}
                dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ r: 6, fill: '#3b82f6' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-5 gap-4 mt-6 border-t pt-6">
          <div className="col-span-1">
            <div className="text-xs text-gray-500 uppercase">CURRENT MONTH</div>
            <div className="text-lg font-bold mt-1">{formatCurrency(currentMonth.amount)}</div>
            <div className={`text-xs ${percentChange >= 0 ? 'text-emerald-600' : 'text-red-600'} mt-1`}>
              {percentChange >= 0 ? '↑' : '↓'} {Math.abs(percentChange).toFixed(2)}%
            </div>
          </div>
          
          <div className="col-span-1">
            <div className="text-xs text-gray-500 uppercase">LAST MONTH</div>
            <div className="text-lg font-bold mt-1">{formatCurrency(previousMonth.amount)}</div>
          </div>
          
          <div className="col-span-1">
            <div className="text-xs text-gray-500 uppercase">3 MONTHS AGO</div>
            <div className="text-lg font-bold mt-1">
              {formatCurrency(monthlySpendData[monthlySpendData.length - 4]?.amount || 0)}
            </div>
          </div>
          
          <div className="col-span-1">
            <div className="text-xs text-gray-500 uppercase">6 MONTHS AGO</div>
            <div className="text-lg font-bold mt-1">
              {formatCurrency(monthlySpendData[monthlySpendData.length - 7]?.amount || 0)}
            </div>
          </div>
          
          <div className="col-span-1">
            <div className="text-xs text-gray-500 uppercase">12 MONTHS AGO</div>
            <div className="text-lg font-bold mt-1">
              {formatCurrency(monthlySpendData[0]?.amount || 0)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlySpendChart;
