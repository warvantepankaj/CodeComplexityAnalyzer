"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code2, Users } from "lucide-react"

interface FunctionTableProps {
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
}

export function FunctionTable({ functions, classes }: FunctionTableProps) {
  const getComplexityBadge = (complexity: number) => {
    if (complexity <= 5)
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
          Low
        </Badge>
      )
    if (complexity <= 10)
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
          Moderate
        </Badge>
      )
    if (complexity <= 20)
      return (
        <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
          High
        </Badge>
      )
    return (
      <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
        Very High
      </Badge>
    )
  }

  return (
    <Tabs defaultValue="functions" className="w-full">
      <TabsList>
        <TabsTrigger value="functions">Functions ({functions.length})</TabsTrigger>
        <TabsTrigger value="classes">Classes ({classes.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="functions">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code2 className="h-5 w-5" />
              <span>Function Analysis</span>
            </CardTitle>
            <CardDescription>Detailed complexity metrics for each function in your code</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Function Name</TableHead>
                    <TableHead>Complexity</TableHead>
                    <TableHead>Lines</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Risk Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {functions.map((func, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium font-mono text-sm">{func.name}</TableCell>
                      <TableCell>
                        <span className="font-bold">{func.complexity}</span>
                      </TableCell>
                      <TableCell>{func.lines}</TableCell>
                      <TableCell className="text-muted-foreground">
                        Lines {func.startLine}-{func.endLine}
                      </TableCell>
                      <TableCell>{getComplexityBadge(func.complexity)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="classes">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Class Analysis</span>
            </CardTitle>
            <CardDescription>Overview of classes and their complexity metrics</CardDescription>
          </CardHeader>
          <CardContent>
            {classes.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class Name</TableHead>
                      <TableHead>Complexity</TableHead>
                      <TableHead>Methods</TableHead>
                      <TableHead>Lines</TableHead>
                      <TableHead>Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classes.map((cls, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium font-mono text-sm">{cls.name}</TableCell>
                        <TableCell>
                          <span className="font-bold">{cls.complexity}</span>
                        </TableCell>
                        <TableCell>{cls.methods}</TableCell>
                        <TableCell>{cls.lines}</TableCell>
                        <TableCell>{getComplexityBadge(cls.complexity)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No classes detected in the analyzed code</p>
                <p className="text-sm">This is common for procedural or functional programming styles</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
