"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, Loader2 } from "lucide-react"
import { analyzeCode } from "@/lib/code-analyzer"
import type { ComplexityAnalysis } from "@/app/analyze/page"

interface CodeInputProps {
  onAnalysis: (analysis: ComplexityAnalysis) => void
  onAnalyzing: (analyzing: boolean) => void
}

export function CodeInput({ onAnalysis, onAnalyzing }: CodeInputProps) {
  const [code, setCode] = useState("")
  const [fileName, setFileName] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const detectLanguage = (filename: string): string => {
    const extension = filename.split(".").pop()?.toLowerCase()
    const languageMap: { [key: string]: string } = {
      js: "javascript",
      ts: "typescript",
      jsx: "javascript",
      tsx: "typescript",
      py: "python",
      java: "java",
      cs: "csharp",
      cpp: "cpp",
      c: "c",
      php: "php",
      rb: "ruby",
      go: "go",
      rs: "rust",
      kt: "kotlin",
      swift: "swift",
    }
    return languageMap[extension || ""] || "javascript"
  }

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setCode(content)
      setFileName(file.name)
      setLanguage(detectLanguage(file.name))
    }
    reader.readAsText(file)
  }, [])

  const handleAnalyze = async () => {
    if (!code.trim()) return

    setIsAnalyzing(true)
    onAnalyzing(true)

    try {
      // Simulate analysis delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const analysis = analyzeCode(code, language, fileName || `code.${language === "csharp" ? "cs" : "txt"}`)
      onAnalysis(analysis)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
      onAnalyzing(false)
    }
  }

  const handleClear = () => {
    setCode("")
    setFileName("")
    setLanguage("javascript")
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="paste" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="paste">Paste Code</TabsTrigger>
          <TabsTrigger value="upload">Upload File</TabsTrigger>
        </TabsList>

        <TabsContent value="paste" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Code</Label>
            <Textarea
              id="code"
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <div className="space-y-2">
              <Label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-sm font-medium">Click to upload a code file</span>
                <span className="text-sm text-muted-foreground block">or drag and drop your file here</span>
              </Label>
              <input id="file-upload" type="file" onChange={handleFileUpload} className="hidden" />
            </div>
            {fileName && (
              <div className="mt-4 p-3 bg-muted rounded-md">
                <div className="flex items-center justify-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">{fileName}</span>
                  <span className="text-xs text-muted-foreground">({language})</span>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex space-x-3">
        <Button onClick={handleAnalyze} disabled={!code.trim() || isAnalyzing} className="flex-1">
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Analyzing Code...
            </>
          ) : (
            <>
              <FileText className="h-4 w-4 mr-2" />
              Analyze Code
            </>
          )}
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={isAnalyzing}>
          Clear
        </Button>
      </div>
    </div>
  )
}
