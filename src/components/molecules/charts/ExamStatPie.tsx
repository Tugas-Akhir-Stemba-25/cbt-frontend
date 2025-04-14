'use client'

import * as React from 'react'

import { Label, Pie, PieChart } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

interface ExamTotals {
  finished: number
  actives: number
  soon: number
}

interface ExamStatPieProps {
  totals: ExamTotals
}

const chartConfig = {
  exams: {
    label: 'Ujian'
  },
  finished: {
    label: 'Ujian Selesai',
    color: 'hsl(var(--success))'
  },
  actives: {
    label: 'Ujian Aktif',
    color: 'hsl(var(--destructive-text))'
  },
  soon: {
    label: 'Ujian Mendatang',
    color: 'hsl(var(--secondary-text))'
  }
} satisfies ChartConfig

export function ExamStatPie({ totals }: ExamStatPieProps) {
  const chartData = React.useMemo(() => {
    return [
      { exam: 'finished', totals: totals.finished, fill: 'var(--color-finished)' },
      { exam: 'actives', totals: totals.actives, fill: 'var(--color-actives)' },
      { exam: 'soon', totals: totals.soon, fill: 'var(--color-soon)' }
    ]
  }, [totals])

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.totals, 0)
  }, [totals])

  return (
    <Card className="flex basis-1/3 flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-base font-semibold">Statistik Ujian</CardTitle>
        <CardDescription className="text-sm text-muted">
          {new Date().toLocaleDateString('id-ID', {
            month: 'long',
            year: 'numeric'
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="totals" nameKey="exam" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-primary text-3xl font-bold">
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted">
                          Ujian
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
