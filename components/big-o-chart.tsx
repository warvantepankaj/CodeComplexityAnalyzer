"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface BigOChartProps {
  timeComplexity: string
  spaceComplexity: string
}

export function BigOChart({ timeComplexity, spaceComplexity }: BigOChartProps) {
  // Generate data points for different Big O complexities
  const generateComplexityData = (complexity: string, maxN = 100) => {
    const data = []
    const step = Math.max(1, Math.floor(maxN / 20))

    for (let n = 1; n <= maxN; n += step) {
      let value = 0

      switch (complexity) {
        case "O(1)":
          value = 1
          break
        case "O(log n)":
          value = Math.log2(n)
          break
        case "O(n)":
          value = n
          break
        case "O(n log n)":
          value = n * Math.log2(n)
          break
        case "O(n²)":
          value = n * n
          break
        case "O(n³)":
          value = n * n * n
          break
        case "O(2ⁿ)":
          // Cap exponential growth for visualization
          value = Math.min(Math.pow(2, Math.min(n, 20)), 1000000)
          break
        default:
          value = n
      }

      data.push({
        n,
        value: Math.round(value),
        complexity,
      })
    }

    return data
  }

  // Generate comparison data showing common complexities
  const comparisonData = []
  const maxN = 50
  const step = 2

  for (let n = 1; n <= maxN; n += step) {
    const dataPoint: any = { n }

    // Add common complexity curves for comparison
    dataPoint["O(1)"] = 1
    dataPoint["O(log n)"] = Math.log2(n)
    dataPoint["O(n)"] = n
    dataPoint["O(n log n)"] = n * Math.log2(n)
    dataPoint["O(n²)"] = n * n

    // Limit exponential for visualization
    if (n <= 10) {
      dataPoint["O(2ⁿ)"] = Math.pow(2, n)
    }

    comparisonData.push(dataPoint)
  }

  const getComplexityColor = (complexity: string) => {
    const colors: Record<string, string> = {
      "O(1)": "hsl(142, 76%, 36%)", // Green
      "O(log n)": "hsl(217, 91%, 60%)", // Blue
      "O(n)": "hsl(45, 93%, 47%)", // Yellow
      "O(n log n)": "hsl(25, 95%, 53%)", // Orange
      "O(n²)": "hsl(0, 84%, 60%)", // Red
      "O(n³)": "hsl(348, 83%, 47%)", // Dark Red
      "O(2ⁿ)": "hsl(291, 64%, 42%)", // Purple
    }
    return colors[complexity] || "hsl(210, 40%, 50%)"
  }

  const chartConfig = {
    "O(1)": {
      label: "O(1) - Constant",
      color: getComplexityColor("O(1)"),
    },
    "O(log n)": {
      label: "O(log n) - Logarithmic",
      color: getComplexityColor("O(log n)"),
    },
    "O(n)": {
      label: "O(n) - Linear",
      color: getComplexityColor("O(n)"),
    },
    "O(n log n)": {
      label: "O(n log n) - Linearithmic",
      color: getComplexityColor("O(n log n)"),
    },
    "O(n²)": {
      label: "O(n²) - Quadratic",
      color: getComplexityColor("O(n²)"),
    },
    "O(2ⁿ)": {
      label: "O(2ⁿ) - Exponential",
      color: getComplexityColor("O(2ⁿ)"),
    },
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getComplexityColor(timeComplexity) }} />
            <span className="text-sm font-medium">Time: {timeComplexity}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getComplexityColor(spaceComplexity) }} />
            <span className="text-sm font-medium">Space: {spaceComplexity}</span>
          </div>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={comparisonData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="n"
              className="text-xs"
              label={{ value: "Input Size (n)", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              className="text-xs"
              label={{ value: "Operations", angle: -90, position: "insideLeft" }}
              domain={[0, "dataMax"]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />

            {/* Render lines for common complexities */}
            <Line
              type="monotone"
              dataKey="O(1)"
              stroke={getComplexityColor("O(1)")}
              strokeWidth={timeComplexity === "O(1)" || spaceComplexity === "O(1)" ? 3 : 1}
              dot={false}
              name="O(1)"
            />
            <Line
              type="monotone"
              dataKey="O(log n)"
              stroke={getComplexityColor("O(log n)")}
              strokeWidth={timeComplexity === "O(log n)" || spaceComplexity === "O(log n)" ? 3 : 1}
              dot={false}
              name="O(log n)"
            />
            <Line
              type="monotone"
              dataKey="O(n)"
              stroke={getComplexityColor("O(n)")}
              strokeWidth={timeComplexity === "O(n)" || spaceComplexity === "O(n)" ? 3 : 1}
              dot={false}
              name="O(n)"
            />
            <Line
              type="monotone"
              dataKey="O(n log n)"
              stroke={getComplexityColor("O(n log n)")}
              strokeWidth={timeComplexity === "O(n log n)" || spaceComplexity === "O(n log n)" ? 3 : 1}
              dot={false}
              name="O(n log n)"
            />
            <Line
              type="monotone"
              dataKey="O(n²)"
              stroke={getComplexityColor("O(n²)")}
              strokeWidth={timeComplexity === "O(n²)" || spaceComplexity === "O(n²)" ? 3 : 1}
              dot={false}
              name="O(n²)"
            />
            {comparisonData.some((d) => d["O(2ⁿ)"]) && (
              <Line
                type="monotone"
                dataKey="O(2ⁿ)"
                stroke={getComplexityColor("O(2ⁿ)")}
                strokeWidth={timeComplexity === "O(2ⁿ)" || spaceComplexity === "O(2ⁿ)" ? 3 : 1}
                dot={false}
                name="O(2ⁿ)"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="text-xs text-muted-foreground text-center">
        Your algorithm's complexity is highlighted with thicker lines. Lower curves indicate better performance.
      </div>
    </div>
  )
}
