import { MetadataResult } from "@/lib/fetchMetadata"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface TwitterPreviewProps {
  metadata: MetadataResult
}

export function TwitterPreview({ metadata }: TwitterPreviewProps) {
  const title = metadata.twitter.title || metadata.openGraph.title || metadata.title
  const description = metadata.twitter.description || metadata.openGraph.description || metadata.description
  const image = metadata.twitter.image || metadata.openGraph.image
  const cardType = metadata.twitter.card || 'summary'

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">𝕏</span>
          </div>
          Twitter / X Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border border-border rounded-2xl overflow-hidden bg-card hover:bg-accent/50 transition-colors">
          {image && (
            <div className="relative w-full h-48 bg-muted">
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
          <div className="p-3">
            <div className="text-muted-foreground text-sm mb-1 truncate">
              {new URL(metadata.url).hostname}
            </div>
            {title && (
              <div className="font-medium text-card-foreground text-sm mb-1 line-clamp-2">
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
        <div className="mt-2 text-xs text-muted-foreground">
          Card Type: {cardType}
        </div>
      </CardContent>
    </Card>
  )
} 