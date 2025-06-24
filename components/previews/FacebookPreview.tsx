import { MetadataResult } from "@/lib/fetchMetadata"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface FacebookPreviewProps {
  metadata: MetadataResult
}

export function FacebookPreview({ metadata }: FacebookPreviewProps) {
  const title = metadata.openGraph.title || metadata.title
  const description = metadata.openGraph.description || metadata.description
  const image = metadata.openGraph.image
  const siteName = metadata.openGraph.siteName || new URL(metadata.url).hostname

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-5 h-5 bg-blue-600 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">f</span>
          </div>
          Facebook Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          {image && (
            <div className="relative w-full h-64 bg-muted">
              <Image
                src={image}
                alt="Preview image"
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
                unoptimized
              />
            </div>
          )}
          <div className="p-3 bg-muted/50">
            <div className="text-muted-foreground text-xs uppercase tracking-wide mb-1">
              {siteName}
            </div>
            {title && (
              <div className="font-semibold text-card-foreground text-base mb-1 line-clamp-2">
                {title}
              </div>
            )}
            {description && (
              <div className="text-muted-foreground text-sm line-clamp-2">
                {description}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 