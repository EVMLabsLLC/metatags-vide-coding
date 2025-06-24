import { PlatformScore } from "@/lib/scoring"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ScoreCardProps {
  title: string
  score: PlatformScore
  icon: React.ReactNode
  color: string
}

export function ScoreCard({ title, score, icon, color }: ScoreCardProps) {
  const percentage = Math.round((score.score / score.maxScore) * 100)
  
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score Display */}
        <div className="text-center">
          <div className={`text-4xl font-bold ${getScoreColor(percentage)}`}>
            {percentage}
          </div>
          <div className="text-sm text-muted-foreground">
            {score.score}/{score.maxScore} points
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(percentage)}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        {/* Strengths */}
        {score.strengths.length > 0 && (
          <div>
            <h4 className="font-medium text-green-700 text-sm mb-2">✓ Strengths</h4>
            <ul className="text-xs text-green-600 space-y-1">
              {score.strengths.slice(0, 3).map((strength, index) => (
                <li key={index} className="flex items-start gap-1">
                  <span className="text-green-500 mt-0.5">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Issues */}
        {score.issues.length > 0 && (
          <div>
            <h4 className="font-medium text-red-700 text-sm mb-2">⚠ Issues</h4>
            <ul className="text-xs text-red-600 space-y-1">
              {score.issues.slice(0, 3).map((issue, index) => (
                <li key={index} className="flex items-start gap-1">
                  <span className="text-red-500 mt-0.5">•</span>
                  {issue}
                </li>
              ))}
            </ul>
            {score.issues.length > 3 && (
              <p className="text-xs text-gray-500 mt-2">
                +{score.issues.length - 3} more issue{score.issues.length - 3 !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 