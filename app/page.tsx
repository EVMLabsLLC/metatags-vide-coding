"use client"

import { useState } from "react"
import { UrlInput } from "@/components/UrlInput"
import { MetadataResult } from "@/lib/fetchMetadata"
import { TwitterPreview } from "@/components/previews/TwitterPreview"
import { FacebookPreview } from "@/components/previews/FacebookPreview"
import { GooglePreview } from "@/components/previews/GooglePreview"
import { ScoreCard } from "@/components/ScoreCard"
import { scoreMetadata, ScoreResult } from "@/lib/scoring"

export default function Home() {
  const [metadata, setMetadata] = useState<MetadataResult | null>(null)
  const [scores, setScores] = useState<ScoreResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (url: string) => {
    setIsLoading(true)
    setError(null)
    setMetadata(null)
    setScores(null)

    try {
      const response = await fetch('/api/metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze URL')
      }

      const result = await response.json()
      setMetadata(result)
      setScores(scoreMetadata(result))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto py-8">
        <UrlInput onAnalyze={handleAnalyze} isLoading={isLoading} />
        
        {error && (
          <div className="max-w-2xl mx-auto mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-destructive text-lg">⚠️</div>
              <div>
                <h3 className="text-destructive font-medium text-sm mb-1">Analysis Failed</h3>
                <p className="text-destructive/80 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="max-w-2xl mx-auto mt-6 p-8 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <p className="text-primary font-medium">Analyzing metadata...</p>
            </div>
            <p className="text-primary/80 text-sm text-center mt-2">This may take a few seconds</p>
          </div>
        )}

        {metadata && scores && (
          <div className="max-w-6xl mx-auto mt-8 space-y-12">
            {/* Overall Score */}
            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-card rounded-lg shadow-sm border border-border p-6">
                <div className="text-3xl font-bold text-card-foreground">
                  Overall Score: {scores.overall}/100
                </div>
                <div className={`text-lg font-medium ${
                  scores.overall >= 80 ? 'text-green-600 dark:text-green-400' : 
                  scores.overall >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {scores.overall >= 80 ? 'Excellent' : 
                   scores.overall >= 60 ? 'Good' : 'Needs Improvement'}
                </div>
              </div>
            </div>

            {/* Platform Analysis - Aligned 2 Column Layout */}
            <div>
              {/* Column Headers */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8">
                <h2 className="text-2xl font-bold text-center">Platform Scores</h2>
                <h2 className="text-2xl font-bold text-center">Platform Previews</h2>
              </div>

              {/* Aligned Platform Rows */}
              <div className="space-y-6">
                {/* Twitter / X Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                  <ScoreCard 
                    title="Twitter / X"
                    score={scores.twitter}
                    icon={<div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">𝕏</span>
                    </div>}
                    color="black"
                  />
                  <TwitterPreview metadata={metadata} />
                </div>

                {/* Facebook Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                  <ScoreCard 
                    title="Facebook"
                    score={scores.facebook}
                    icon={<div className="w-5 h-5 bg-blue-600 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">f</span>
                    </div>}
                    color="blue"
                  />
                  <FacebookPreview metadata={metadata} />
                </div>

                {/* Google Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                  <ScoreCard 
                    title="Google"
                    score={scores.google}
                    icon={<div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="w-1 h-1 bg-red-500 rounded-full -ml-1"></div>
                      <div className="w-1 h-1 bg-yellow-500 rounded-full -ml-0.5"></div>
                      <div className="w-1 h-1 bg-green-500 rounded-full -ml-0.5"></div>
                    </div>}
                    color="multicolor"
                  />
                  <GooglePreview metadata={metadata} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
