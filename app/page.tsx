import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, BarChart3, FileText, Zap, Shield, Gauge } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              <Zap className="h-3 w-3 mr-1" />
              Advanced Code Analysis
            </Badge>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-balance mb-6">
              The Code Complexity
              <span className="text-primary block">Analysis Tool</span>
            </h1>

            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto mb-8">
              Analyze your code complexity with advanced metrics and beautiful visualizations. Support for Java, C,
              Python, JavaScript, and more programming languages.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="text-base px-8">
                <Link href="/analyze">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Start Analysis
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8 bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                View Documentation
              </Button>
            </div>

            <div className="mt-12 text-sm text-muted-foreground">
              <code className="bg-muted px-3 py-1 rounded-md font-mono">
                Upload your .java, .c, .py, .js files and get instant complexity metrics
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Powerful Code Analysis Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to understand and improve your code quality with comprehensive metrics and insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Gauge className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Cyclomatic Complexity</CardTitle>
                <CardDescription>
                  Measure the complexity of your code with industry-standard cyclomatic complexity metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Function-level analysis</li>
                  <li>• Class-level metrics</li>
                  <li>• Overall project complexity</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Visual Analytics</CardTitle>
                <CardDescription>
                  Beautiful charts and graphs to visualize your code complexity patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Interactive complexity charts</li>
                  <li>• Trend analysis graphs</li>
                  <li>• Comparative visualizations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Multi-Language Support</CardTitle>
                <CardDescription>Support for popular programming languages with accurate parsing</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Java, C/C++, Python</li>
                  <li>• JavaScript, TypeScript</li>
                  <li>• More languages coming soon</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Detailed Reports</CardTitle>
                <CardDescription>Comprehensive analysis reports with actionable insights</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Function complexity breakdown</li>
                  <li>• Code quality recommendations</li>
                  <li>• Maintainability scores</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Fast Analysis</CardTitle>
                <CardDescription>Lightning-fast code analysis with real-time results</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Instant file processing</li>
                  <li>• Real-time complexity calculation</li>
                  <li>• Optimized parsing algorithms</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>Your code stays private with client-side processing</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• No code uploaded to servers</li>
                  <li>• Local processing only</li>
                  <li>• Complete privacy protection</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Code2 className="h-5 w-5 text-primary" />
              <span className="font-semibold">CodeAnalyzer</span>
            </div>
            <p className="text-sm text-muted-foreground">Built with Next.js and modern web technologies</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
