"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { CodeInput } from "@/components/code-input"
import { ComplexityResults } from "@/components/complexity-results"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Upload, Code2 } from "lucide-react"

export interface BigOAnalysis {
  timeComplexity: string
  spaceComplexity: string
  explanation: string
  confidence: number
}

export interface ComplexityAnalysis {
  fileName: string
  language: string
  totalLines: number
  codeLines: number
  commentLines: number
  blankLines: number
  cyclomaticComplexity: number
  functions: Array<{
    name: string
    complexity: number
    lines: number
    startLine: number
    endLine: number
  }>
  classes: Array<{
    name: string
    complexity: number
    methods: number
    lines: number
  }>
  maintainabilityIndex: number
  cognitiveComplexity: number
  recommendations: string[]
  bigOAnalysis: BigOAnalysis
}

export default function AnalyzePage() {
  const [analysis, setAnalysis] = useState<ComplexityAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalysis = (result: ComplexityAnalysis) => {
    setAnalysis(result)
  }

  const handleAnalyzing = (analyzing: boolean) => {
    setIsAnalyzing(analyzing)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Code Complexity Analysis</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Upload your code files or paste code directly to analyze complexity metrics and get detailed insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Code Input</span>
                </CardTitle>
                <CardDescription>Upload a file or paste your code to begin analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeInput onAnalysis={handleAnalysis} onAnalyzing={handleAnalyzing} />
              </CardContent>
            </Card>

            {/* Supported Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code2 className="h-5 w-5" />
                  <span>Supported Languages</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Java</Badge>
                  <Badge variant="secondary">C/C++</Badge>
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">C#</Badge>
                  <Badge variant="secondary">Go</Badge>
                  <Badge variant="secondary">Rust</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  More languages are being added regularly. The analyzer automatically detects the programming language
                  from file extensions or code patterns.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {analysis ? (
              <ComplexityResults analysis={analysis} />
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center">
                  <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {isAnalyzing ? "Analyzing Code..." : "Ready for Analysis"}
                  </h3>
                  <p className="text-muted-foreground">
                    {isAnalyzing
                      ? "Processing your code and calculating complexity metrics..."
                      : "Upload a file or paste your code to see detailed complexity analysis and visualizations."}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
