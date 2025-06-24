"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UrlInputProps {
  onAnalyze: (url: string) => void
  isLoading: boolean
}

export function UrlInput({ onAnalyze, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")

  const validateUrl = (input: string): boolean => {
    try {
      // Expect input to already be normalized (with protocol)
      const parsedUrl = new URL(input)
      
      // Ensure we're using http or https
      if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
        return false
      }
      
      // Basic hostname validation
      if (!parsedUrl.hostname || parsedUrl.hostname.length < 2) {
        return false
      }
      
      // Check for valid TLD (at least one dot, but allow shorter domains)
      if (!parsedUrl.hostname.includes('.') || parsedUrl.hostname.endsWith('.')) {
        return false
      }
      
      // Only reject localhost for production (removed example.com restriction)
      if (parsedUrl.hostname === 'localhost') {
        return false
      }
      
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!url.trim()) {
      setError("Please enter a URL")
      return
    }
    
    // Normalize URL - automatically add https:// if missing
    const cleanUrl = url.trim()
    const normalizedUrl = cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`
    
    if (!validateUrl(normalizedUrl)) {
      setError("Please enter a valid URL")
      return
    }
    
    // Always pass the normalized URL with https://
    onAnalyze(normalizedUrl)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Metatag Vibe Checker</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Enter URL to analyze (e.g., github.com, lovable.dev)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
              className="w-full"
              aria-label="Website URL"
            />
            {error && (
              <p className="text-sm text-red-500 mt-1" role="alert">{error}</p>
            )}
          </div>
          
          {/* Quick Test Examples */}
          <div className="text-sm text-muted-foreground">
            <p>Try these examples:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                { display: 'cursor.com', url: 'cursor.com' },
                { display: 'lovable.dev', url: 'lovable.dev' },
                { display: 'github.com', url: 'github.com' }
              ].map((example) => (
                <button
                  key={example.display}
                  type="button"
                  onClick={() => setUrl(example.url)}
                  disabled={isLoading}
                  className="px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded border border-border disabled:opacity-50"
                >
                  {example.display}
                </button>
              ))}
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading || !url.trim()}
            className="w-full"
          >
            {isLoading ? "Analyzing..." : "Analyze Metatags"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 