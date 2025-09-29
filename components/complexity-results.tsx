"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FunctionTable } from "@/components/function-table"
import { BigOChart } from "@/components/big-o-chart"
import { FileText, BarChart3, AlertTriangle, CheckCircle, TrendingUp, Code2, Zap } from "lucide-react"
import type { ComplexityAnalysis } from "@/app/analyze/page"

interface ComplexityResultsProps {
  analysis: ComplexityAnalysis
}

export function ComplexityResults({ analysis }: ComplexityResultsProps) {
  const getComplexityLevel = (complexity: number) => {
    if (complexity <= 5) return { level: "Low", color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/20" }
    if (complexity <= 10)
      return { level: "Moderate", color: "text-yellow-600", bg: "bg-yellow-100 dark:bg-yellow-900/20" }
    if (complexity <= 20) return { level: "High", color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/20" }
    return { level: "Very High", color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/20" }
  }

  const getMaintainabilityLevel = (index: number) => {
    if (index >= 80) return { level: "Excellent", color: "text-green-600", icon: CheckCircle }
    if (index >= 60) return { level: "Good", color: "text-blue-600", icon: CheckCircle }
    if (index >= 40) return { level: "Fair", color: "text-yellow-600", icon: AlertTriangle }
    return { level: "Poor", color: "text-red-600", icon: AlertTriangle }
  }

  const getBigOComplexityLevel = (complexity: string) => {
    if (complexity === "O(1)")
      return { level: "Excellent", color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/20" }
    if (complexity === "O(log n)")
      return { level: "Very Good", color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/20" }
    if (complexity === "O(n)")
      return { level: "Good", color: "text-yellow-600", bg: "bg-yellow-100 dark:bg-yellow-900/20" }
    if (complexity === "O(n log n)")
      return { level: "Fair", color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/20" }
    if (complexity === "O(n²)") return { level: "Poor", color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/20" }
    if (complexity === "O(n³)")
      return { level: "Very Poor", color: "text-red-700", bg: "bg-red-200 dark:bg-red-900/30" }
    if (complexity === "O(2ⁿ)") return { level: "Terrible", color: "text-red-800", bg: "bg-red-300 dark:bg-red-900/40" }
    return { level: "Unknown", color: "text-gray-600", bg: "bg-gray-100 dark:bg-gray-900/20" }
  }

  const complexityInfo = getComplexityLevel(analysis.cyclomaticComplexity)
  const maintainabilityInfo = getMaintainabilityLevel(analysis.maintainabilityIndex)
  const timeComplexityInfo = getBigOComplexityLevel(analysis.bigOAnalysis.timeComplexity)
  const spaceComplexityInfo = getBigOComplexityLevel(analysis.bigOAnalysis.spaceComplexity)
  const MaintainabilityIcon = maintainabilityInfo.icon

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cyclomatic Complexity</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analysis.cyclomaticComplexity}</div>
            <Badge variant="secondary" className={`${complexityInfo.bg} ${complexityInfo.color} mt-2`}>
              {complexityInfo.level}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Complexity</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{analysis.bigOAnalysis.timeComplexity}</div>
            <Badge variant="secondary" className={`${timeComplexityInfo.bg} ${timeComplexityInfo.color} mt-2`}>
              {timeComplexityInfo.level}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintainability</CardTitle>
            <MaintainabilityIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analysis.maintainabilityIndex}</div>
            <div className="flex items-center space-x-2 mt-2">
              <Progress value={analysis.maintainabilityIndex} className="flex-1" />
              <span className={`text-sm ${maintainabilityInfo.color}`}>{maintainabilityInfo.level}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Functions</CardTitle>
            <Code2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analysis.functions.length}</div>
            <p className="text-xs text-muted-foreground mt-2">{analysis.classes.length} classes</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="big-o">Big O</TabsTrigger>
          <TabsTrigger value="functions">Functions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>File Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">File Name:</span>
                  <span className="text-sm text-muted-foreground">{analysis.fileName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Language:</span>
                  <Badge variant="outline">{analysis.language}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Lines:</span>
                  <span className="text-sm">{analysis.totalLines}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Code Lines:</span>
                  <span className="text-sm">{analysis.codeLines}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Comment Lines:</span>
                  <span className="text-sm">{analysis.commentLines}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Blank Lines:</span>
                  <span className="text-sm">{analysis.blankLines}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Complexity Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Cyclomatic Complexity:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold">{analysis.cyclomaticComplexity}</span>
                    <Badge variant="secondary" className={`${complexityInfo.bg} ${complexityInfo.color}`}>
                      {complexityInfo.level}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Cognitive Complexity:</span>
                  <span className="text-sm font-bold">{analysis.cognitiveComplexity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Maintainability Index:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold">{analysis.maintainabilityIndex}</span>
                    <span className={`text-xs ${maintainabilityInfo.color}`}>{maintainabilityInfo.level}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Maintainability Score</span>
                    <span>{analysis.maintainabilityIndex}/100</span>
                  </div>
                  <Progress value={analysis.maintainabilityIndex} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="big-o" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Big O Analysis</span>
                </CardTitle>
                <CardDescription>Algorithm complexity in Big O notation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Time Complexity:</span>
                    <div className="flex items-center space-x-2">
                      <code className="text-lg font-bold font-mono bg-muted px-2 py-1 rounded">
                        {analysis.bigOAnalysis.timeComplexity}
                      </code>
                      <Badge variant="secondary" className={`${timeComplexityInfo.bg} ${timeComplexityInfo.color}`}>
                        {timeComplexityInfo.level}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Space Complexity:</span>
                    <div className="flex items-center space-x-2">
                      <code className="text-lg font-bold font-mono bg-muted px-2 py-1 rounded">
                        {analysis.bigOAnalysis.spaceComplexity}
                      </code>
                      <Badge variant="secondary" className={`${spaceComplexityInfo.bg} ${spaceComplexityInfo.color}`}>
                        {spaceComplexityInfo.level}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Confidence:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold">{analysis.bigOAnalysis.confidence}%</span>
                      <Progress value={analysis.bigOAnalysis.confidence} className="w-20 h-2" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Analysis Explanation:</h4>
                  <p className="text-sm text-muted-foreground">{analysis.bigOAnalysis.explanation}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Big O Complexity Chart</CardTitle>
                <CardDescription>Visual representation of algorithm complexity growth</CardDescription>
              </CardHeader>
              <CardContent>
                <BigOChart
                  timeComplexity={analysis.bigOAnalysis.timeComplexity}
                  spaceComplexity={analysis.bigOAnalysis.spaceComplexity}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="functions">
          <FunctionTable functions={analysis.functions} classes={analysis.classes} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
