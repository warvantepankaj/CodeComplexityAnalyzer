"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { BarChart3, PieChartIcon, TrendingUp } from "lucide-react"
import type { ComplexityAnalysis } from "@/app/analyze/page"

interface ComplexityChartProps {
  analysis: ComplexityAnalysis
}

export function ComplexityChart({ analysis }: ComplexityChartProps) {
  // Prepare data for function complexity chart
  const functionData = analysis.functions.map((func, index) => ({
    name: func.name.length > 12 ? func.name.substring(0, 12) + "..." : func.name,
    complexity: func.complexity,
    lines: func.lines,
  }))

  // Prepare data for complexity distribution pie chart
  const complexityDistribution = [
    {
      name: "Low (1-5)",
      value: analysis.functions.filter((f) => f.complexity <= 5).length,
      color: "hsl(var(--chart-1))",
    },
    {
      name: "Moderate (6-10)",
      value: analysis.functions.filter((f) => f.complexity > 5 && f.complexity <= 10).length,
      color: "hsl(var(--chart-2))",
    },
    {
      name: "High (11-20)",
      value: analysis.functions.filter((f) => f.complexity > 10 && f.complexity <= 20).length,
      color: "hsl(var(--chart-3))",
    },
    {
      name: "Very High (20+)",
      value: analysis.functions.filter((f) => f.complexity > 20).length,
      color: "hsl(var(--chart-4))",
    },
  ].filter((item) => item.value > 0)

  // Prepare data for lines vs complexity scatter
  const scatterData = analysis.functions.map((func, index) => ({
    name: func.name,
    lines: func.lines,
    complexity: func.complexity,
  }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Function Complexity Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Function Complexity</span>
            </CardTitle>
            <CardDescription>Cyclomatic complexity for each function</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                complexity: {
                  label: "Complexity",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={functionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="complexity" fill="var(--color-complexity)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Complexity Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChartIcon className="h-5 w-5" />
              <span>Complexity Distribution</span>
            </CardTitle>
            <CardDescription>Distribution of functions by complexity level</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                low: {
                  label: "Low",
                  color: "hsl(var(--chart-1))",
                },
                moderate: {
                  label: "Moderate",
                  color: "hsl(var(--chart-2))",
                },
                high: {
                  label: "High",
                  color: "hsl(var(--chart-3))",
                },
                veryHigh: {
                  label: "Very High",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={complexityDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {complexityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Lines vs Complexity Scatter Plot */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Function Size vs Complexity</span>
          </CardTitle>
          <CardDescription>Relationship between function length and complexity</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              complexity: {
                label: "Complexity",
                color: "hsl(var(--chart-1))",
              },
              lines: {
                label: "Lines",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scatterData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="lines"
                  type="number"
                  domain={["dataMin", "dataMax"]}
                  label={{ value: "Lines of Code", position: "insideBottom", offset: -10 }}
                />
                <YAxis dataKey="complexity" label={{ value: "Complexity", angle: -90, position: "insideLeft" }} />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">{data.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Lines: {data.lines}, Complexity: {data.complexity}
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="complexity"
                  stroke="var(--color-complexity)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-complexity)", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
