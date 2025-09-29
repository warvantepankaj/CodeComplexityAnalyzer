import type { ComplexityAnalysis } from "@/app/analyze/page"

// Mock complexity analysis engine
export function analyzeCode(code: string, language: string, fileName: string): ComplexityAnalysis {
  const lines = code.split("\n")
  const totalLines = lines.length

  // Basic line counting
  let codeLines = 0
  let commentLines = 0
  let blankLines = 0

  const commentPatterns = getCommentPatterns(language)

  lines.forEach((line) => {
    const trimmed = line.trim()
    if (trimmed === "") {
      blankLines++
    } else if (isComment(trimmed, commentPatterns)) {
      commentLines++
    } else {
      codeLines++
    }
  })

  // Mock complexity calculations based on code patterns
  const cyclomaticComplexity = calculateCyclomaticComplexity(code, language)
  const cognitiveComplexity = calculateCognitiveComplexity(code, language)
  const functions = extractFunctions(code, language)
  const classes = extractClasses(code, language)
  const maintainabilityIndex = calculateMaintainabilityIndex(codeLines, cyclomaticComplexity)
  const recommendations = generateRecommendations(cyclomaticComplexity, codeLines, functions)
  const bigOAnalysis = analyzeBigO(code, language, functions)

  return {
    fileName,
    language,
    totalLines,
    codeLines,
    commentLines,
    blankLines,
    cyclomaticComplexity,
    cognitiveComplexity,
    functions,
    classes,
    maintainabilityIndex,
    recommendations,
    bigOAnalysis,
  }
}

function getCommentPatterns(language: string): { single: string[]; multi: { start: string; end: string }[] } {
  const patterns: Record<string, { single: string[]; multi: { start: string; end: string }[] }> = {
    java: { single: ["//"], multi: [{ start: "/*", end: "*/" }] },
    javascript: { single: ["//"], multi: [{ start: "/*", end: "*/" }] },
    typescript: { single: ["//"], multi: [{ start: "/*", end: "*/" }] },
    c: { single: ["//"], multi: [{ start: "/*", end: "*/" }] },
    cpp: { single: ["//"], multi: [{ start: "/*", end: "*/" }] },
    csharp: { single: ["//"], multi: [{ start: "/*", end: "*/" }] },
    python: {
      single: ["#"],
      multi: [
        { start: '"""', end: '"""' },
        { start: "'''", end: "'''" },
      ],
    },
    go: { single: ["//"], multi: [{ start: "/*", end: "*/" }] },
    rust: { single: ["//"], multi: [{ start: "/*", end: "*/" }] },
  }

  return patterns[language] || patterns.javascript
}

function isComment(line: string, patterns: { single: string[]; multi: { start: string; end: string }[] }): boolean {
  return (
    patterns.single.some((pattern) => line.startsWith(pattern)) ||
    patterns.multi.some((pattern) => line.startsWith(pattern.start))
  )
}

function calculateCyclomaticComplexity(code: string, language: string): number {
  // Mock cyclomatic complexity calculation
  const complexityKeywords = getComplexityKeywords(language)
  let complexity = 1 // Base complexity

  complexityKeywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "g")
    const matches = code.match(regex)
    if (matches) {
      complexity += matches.length
    }
  })

  return Math.min(complexity, 50) // Cap at reasonable maximum
}

function calculateCognitiveComplexity(code: string, language: string): number {
  // Simplified cognitive complexity (usually higher than cyclomatic)
  const cyclomaticComplexity = calculateCyclomaticComplexity(code, language)
  return Math.floor(cyclomaticComplexity * 1.3)
}

function getComplexityKeywords(language: string): string[] {
  const keywords: Record<string, string[]> = {
    java: ["if", "else", "while", "for", "do", "switch", "case", "catch", "finally", "&&", "\\|\\|", "\\?"],
    javascript: ["if", "else", "while", "for", "do", "switch", "case", "catch", "finally", "&&", "\\|\\|", "\\?"],
    typescript: ["if", "else", "while", "for", "do", "switch", "case", "catch", "finally", "&&", "\\|\\|", "\\?"],
    python: ["if", "elif", "else", "while", "for", "try", "except", "finally", "and", "or"],
    c: ["if", "else", "while", "for", "do", "switch", "case", "&&", "\\|\\|", "\\?"],
    cpp: ["if", "else", "while", "for", "do", "switch", "case", "catch", "&&", "\\|\\|", "\\?"],
    csharp: ["if", "else", "while", "for", "do", "switch", "case", "catch", "finally", "&&", "\\|\\|", "\\?"],
    go: ["if", "else", "for", "switch", "case", "select", "&&", "\\|\\|"],
    rust: ["if", "else", "while", "for", "loop", "match", "&&", "\\|\\|"],
  }

  return keywords[language] || keywords.javascript
}

function extractFunctions(
  code: string,
  language: string,
): Array<{
  name: string
  complexity: number
  lines: number
  startLine: number
  endLine: number
}> {
  const functions: Array<{
    name: string
    complexity: number
    lines: number
    startLine: number
    endLine: number
  }> = []

  const functionPatterns = getFunctionPatterns(language)
  const lines = code.split("\n")

  functionPatterns.forEach((pattern) => {
    const regex = new RegExp(pattern, "gm")
    let match

    while ((match = regex.exec(code)) !== null) {
      const functionName = match[1] || match[2] || "anonymous"
      const startLine = code.substring(0, match.index).split("\n").length

      // Mock function analysis
      const functionCode = extractFunctionBody(code, match.index, language)
      const complexity = calculateCyclomaticComplexity(functionCode, language)
      const functionLines = functionCode.split("\n").length

      functions.push({
        name: functionName,
        complexity,
        lines: functionLines,
        startLine,
        endLine: startLine + functionLines - 1,
      })
    }
  })

  // Add some mock functions if none found
  if (functions.length === 0) {
    functions.push(
      { name: "main", complexity: 5, lines: 15, startLine: 1, endLine: 15 },
      { name: "processData", complexity: 8, lines: 25, startLine: 17, endLine: 41 },
      { name: "validateInput", complexity: 3, lines: 10, startLine: 43, endLine: 52 },
    )
  }

  return functions.slice(0, 10) // Limit to 10 functions for display
}

function getFunctionPatterns(language: string): string[] {
  const patterns: Record<string, string[]> = {
    csharp: [
      "(?:public|private|protected|internal|static)?\\s*(?:virtual|override|abstract)?\\s*\\w+\\s+(\\w+)\\s*$$[^)]*$$\\s*\\{",
      "(?:public|private|protected|internal)?\\s*(?:static)?\\s*(?:async)?\\s*\\w+\\s+(\\w+)\\s*$$[^)]*$$",
      "(?:public|private|protected|internal)?\\s*(?:static)?\\s*void\\s+(\\w+)\\s*$$[^)]*$$",
    ],
    java: [
      "(?:public|private|protected|static)?\\s*\\w+\\s+(\\w+)\\s*$$[^)]*$$\\s*\\{",
      "(?:public|private|protected|static)?\\s*(?:static)?\\s*\\w+\\s+(\\w+)\\s*$$[^)]*$$",
    ],
    javascript: [
      "function\\s+(\\w+)\\s*$$[^)]*$$",
      "(?:const|let|var)\\s+(\\w+)\\s*=\\s*(?:function|$$[^)]*$$\\s*=>)",
      "(\\w+)\\s*:\\s*function\\s*$$[^)]*$$",
    ],
    typescript: [
      "function\\s+(\\w+)\\s*$$[^)]*$$",
      "(?:const|let|var)\\s+(\\w+)\\s*=\\s*(?:function|$$[^)]*$$\\s*=>)",
      "(\\w+)\\s*$$[^)]*$$\\s*:\\s*\\w+\\s*\\{",
    ],
    python: ["def\\s+(\\w+)\\s*$$[^)]*$$\\s*:", "async\\s+def\\s+(\\w+)\\s*$$[^)]*$$\\s*:"],
    c: ["\\w+\\s+(\\w+)\\s*$$[^)]*$$\\s*\\{", "static\\s+\\w+\\s+(\\w+)\\s*$$[^)]*$$\\s*\\{"],
    cpp: ["\\w+\\s+(\\w+)\\s*$$[^)]*$$\\s*\\{", "(?:virtual|static|inline)?\\s*\\w+\\s+(\\w+)\\s*$$[^)]*$$\\s*\\{"],
  }

  return patterns[language] || patterns.javascript
}

function extractFunctionBody(code: string, startIndex: number, language: string): string {
  // Simplified function body extraction
  const remainingCode = code.substring(startIndex)
  const lines = remainingCode.split("\n")

  // Mock extraction - take next 10-30 lines
  const functionLines = Math.min(lines.length, Math.floor(Math.random() * 20) + 10)
  return lines.slice(0, functionLines).join("\n")
}

function extractClasses(
  code: string,
  language: string,
): Array<{
  name: string
  complexity: number
  methods: number
  lines: number
}> {
  const classes: Array<{
    name: string
    complexity: number
    methods: number
    lines: number
  }> = []

  const classPatterns = getClassPatterns(language)

  classPatterns.forEach((pattern) => {
    const regex = new RegExp(pattern, "gm")
    let match

    while ((match = regex.exec(code)) !== null) {
      const className = match[1]

      // Mock class analysis
      const classComplexity = Math.floor(Math.random() * 15) + 5
      const methodCount = Math.floor(Math.random() * 8) + 2
      const classLines = Math.floor(Math.random() * 100) + 20

      classes.push({
        name: className,
        complexity: classComplexity,
        methods: methodCount,
        lines: classLines,
      })
    }
  })

  return classes.slice(0, 5) // Limit to 5 classes for display
}

function getClassPatterns(language: string): string[] {
  const patterns: Record<string, string[]> = {
    csharp: [
      "(?:public|private|protected|internal)?\\s*(?:static|abstract|sealed)?\\s*class\\s+(\\w+)",
      "(?:public|private|protected|internal)?\\s*(?:static)?\\s*struct\\s+(\\w+)",
      "(?:public|private|protected|internal)?\\s*interface\\s+(\\w+)",
    ],
    java: ["(?:public|private|protected)?\\s*class\\s+(\\w+)"],
    javascript: ["class\\s+(\\w+)"],
    typescript: ["(?:export\\s+)?class\\s+(\\w+)"],
    python: ["class\\s+(\\w+)\\s*(?:$$[^)]*$$)?\\s*:"],
    c: ["(?:typedef\\s+)?struct\\s+(\\w+)"],
    cpp: ["(?:class|struct)\\s+(\\w+)"],
  }

  return patterns[language] || []
}

function calculateMaintainabilityIndex(codeLines: number, complexity: number): number {
  // Simplified maintainability index calculation
  // Real formula: 171 - 5.2 * ln(Halstead Volume) - 0.23 * (Cyclomatic Complexity) - 16.2 * ln(Lines of Code)
  const baseScore = 100
  const complexityPenalty = complexity * 2
  const sizePenalty = Math.log(codeLines) * 5

  const score = Math.max(0, Math.min(100, baseScore - complexityPenalty - sizePenalty))
  return Math.round(score)
}

function generateRecommendations(complexity: number, codeLines: number, functions: any[]): string[] {
  const recommendations: string[] = []

  if (complexity > 15) {
    recommendations.push("Consider breaking down complex functions into smaller, more manageable pieces")
  }

  if (complexity > 25) {
    recommendations.push("High cyclomatic complexity detected - refactor conditional logic")
  }

  if (codeLines > 500) {
    recommendations.push("Large file detected - consider splitting into multiple modules")
  }

  const highComplexityFunctions = functions.filter((f) => f.complexity > 10)
  if (highComplexityFunctions.length > 0) {
    recommendations.push(
      `${highComplexityFunctions.length} function(s) have high complexity - focus refactoring efforts here`,
    )
  }

  if (functions.some((f) => f.lines > 50)) {
    recommendations.push("Some functions are quite long - consider breaking them into smaller functions")
  }

  if (recommendations.length === 0) {
    recommendations.push("Code complexity is within acceptable ranges")
    recommendations.push("Consider adding more comments for better maintainability")
  }

  return recommendations
}

export interface BigOAnalysis {
  timeComplexity: string
  spaceComplexity: string
  explanation: string
  confidence: number
}

function analyzeBigO(code: string, language: string, functions: any[]): BigOAnalysis {
  // Analyze code patterns to determine Big O complexity
  const patterns = {
    // Nested loops patterns
    nestedLoops:
      /for\s*\([^}]*for\s*\(|while\s*\([^}]*while\s*\(|for\s*\([^}]*while\s*\(|foreach\s*\([^}]*foreach\s*\(/gi,
    tripleNested: /for\s*\([^}]*for\s*\([^}]*for\s*\(|foreach\s*\([^}]*foreach\s*\([^}]*foreach\s*\(/gi,

    // Single loop patterns (including C# foreach)
    singleLoop: /(?:for|while|foreach)\s*\(/gi,

    // Recursive patterns
    recursion: new RegExp(`\\b(?:${functions.map((f) => f.name).join("|")})\\s*\\(`, "gi"),

    // Binary search patterns
    binarySearch: /(?:mid|middle)\s*=.*\/\s*2|low.*high.*mid/gi,

    // Hash table / dictionary access (C# specific)
    hashAccess: /\[.*\]|\.ContainsKey\(|\.TryGetValue\(|\.Add\(|Dictionary|HashSet/gi,

    // Sorting algorithms (C# specific)
    sorting: /\.Sort\(|\.OrderBy\(|\.OrderByDescending\(|Array\.Sort|List\.Sort/gi,

    // LINQ operations that might affect complexity
    linq: /\.Where\(|\.Select\(|\.GroupBy\(|\.Join\(/gi,
  }

  let timeComplexity = "O(1)"
  let spaceComplexity = "O(1)"
  let explanation = "Constant time and space complexity"
  let confidence = 85

  // Check for different complexity patterns
  const nestedLoopMatches = code.match(patterns.nestedLoops)
  const tripleNestedMatches = code.match(patterns.tripleNested)
  const singleLoopMatches = code.match(patterns.singleLoop)
  const recursionMatches = code.match(patterns.recursion)
  const binarySearchMatches = code.match(patterns.binarySearch)
  const sortingMatches = code.match(patterns.sorting)
  const linqMatches = code.match(patterns.linq)

  if (tripleNestedMatches && tripleNestedMatches.length > 0) {
    timeComplexity = "O(n³)"
    spaceComplexity = "O(1)"
    explanation = "Triple nested loops detected, resulting in cubic time complexity"
    confidence = 90
  } else if (nestedLoopMatches && nestedLoopMatches.length > 0) {
    timeComplexity = "O(n²)"
    spaceComplexity = "O(1)"
    explanation = "Nested loops detected, resulting in quadratic time complexity"
    confidence = 88
  } else if (sortingMatches && sortingMatches.length > 0) {
    timeComplexity = "O(n log n)"
    spaceComplexity = "O(log n)"
    explanation = "Sorting operations detected, typically O(n log n) for efficient algorithms"
    confidence = 82
  } else if (recursionMatches && recursionMatches.length > 2) {
    // Check if it might be exponential (like fibonacci)
    if (code.includes("fibonacci") || /return.*\+.*\(/gi.test(code)) {
      timeComplexity = "O(2ⁿ)"
      spaceComplexity = "O(n)"
      explanation = "Exponential recursion detected (like naive Fibonacci), very inefficient"
      confidence = 75
    } else {
      timeComplexity = "O(n)"
      spaceComplexity = "O(n)"
      explanation = "Recursive algorithm detected with linear time and space complexity"
      confidence = 70
    }
  } else if (binarySearchMatches && binarySearchMatches.length > 0) {
    timeComplexity = "O(log n)"
    spaceComplexity = "O(1)"
    explanation = "Binary search pattern detected, logarithmic time complexity"
    confidence = 85
  } else if (linqMatches && linqMatches.length > 0) {
    timeComplexity = "O(n)"
    spaceComplexity = "O(n)"
    explanation = "LINQ operations detected, typically linear time complexity"
    confidence = 75
  } else if (singleLoopMatches && singleLoopMatches.length > 0) {
    timeComplexity = "O(n)"
    spaceComplexity = "O(1)"
    explanation = "Single loop detected, linear time complexity"
    confidence = 80
  }

  // Adjust space complexity based on C# data structures
  if (
    code.includes("new ") &&
    (code.includes("List") || code.includes("Array") || code.includes("Dictionary") || code.includes("HashSet"))
  ) {
    if (spaceComplexity === "O(1)") {
      spaceComplexity = "O(n)"
      explanation += ". Additional space used for C# collections"
    }
  }

  return {
    timeComplexity,
    spaceComplexity,
    explanation,
    confidence,
  }
}
