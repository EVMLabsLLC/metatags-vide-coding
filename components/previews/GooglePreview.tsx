import { MetadataResult } from "@/lib/fetchMetadata"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface GooglePreviewProps {
  metadata: MetadataResult
}

export function GooglePreview({ metadata }: GooglePreviewProps) {
  const title = metadata.title
  const description = metadata.description || metadata.openGraph.description
  const url = metadata.url

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-1 h-1 bg-red-500 rounded-full -ml-1"></div>
            <div className="w-1 h-1 bg-yellow-500 rounded-full -ml-0.5"></div>
            <div className="w-1 h-1 bg-green-500 rounded-full -ml-0.5"></div>
          </div>
          Google Search Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground truncate">
            {url}
          </div>
          {title && (
            <h3 className="text-blue-600 dark:text-blue-400 text-xl hover:underline cursor-pointer line-clamp-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 