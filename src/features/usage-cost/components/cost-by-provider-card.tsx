'use client';

import { Bar, BarChart, Cell, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { costByProvider, providerColors, providerLabels } from '../constants/mock-data';

const chartData = costByProvider.map((row) => ({
  provider: providerLabels[row.provider],
  cost: row.cost,
  fill: providerColors[row.provider]
}));

export function CostByProviderCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost by Provider</CardTitle>
        <CardDescription>Spending distribution across AI providers</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className='h-[280px] w-full'>
          <BarChart data={chartData} layout='vertical' margin={{ left: 8 }}>
            <XAxis
              type='number'
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toFixed(4)}`}
            />
            <YAxis
              type='category'
              dataKey='provider'
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value) => `$${Number(value).toFixed(4)}`}
                />
              }
            />
            <Bar dataKey='cost' radius={4}>
              {chartData.map((entry) => (
                <Cell key={entry.provider} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
