import { MetadataResult } from './fetchMetadata'

export interface PlatformScore {
  score: number
  maxScore: number
  issues: string[]
  strengths: string[]
}

export interface ScoreResult {
  twitter: PlatformScore
  facebook: PlatformScore
  google: PlatformScore
  overall: number
}

export function scoreMetadata(metadata: MetadataResult): ScoreResult {
  const twitterScore = scoreTwitter(metadata)
  const facebookScore = scoreFacebook(metadata)
  const googleScore = scoreGoogle(metadata)
  
  const overall = Math.round(
    (twitterScore.score + facebookScore.score + googleScore.score) / 3
  )

  return {
    twitter: twitterScore,
    facebook: facebookScore,
    google: googleScore,
    overall
  }
}

function scoreTwitter(metadata: MetadataResult): PlatformScore {
  let score = 0
  const maxScore = 100
  const issues: string[] = []
  const strengths: string[] = []

  // Twitter Card Type (10 points)
  if (metadata.twitter.card) {
    score += 10
    strengths.push('Twitter card type specified')
  } else {
    issues.push('Missing twitter:card meta tag')
  }

  // Title (20 points)
  const title = metadata.twitter.title || metadata.openGraph.title || metadata.title
  if (title) {
    score += 20
    if (title.length >= 30 && title.length <= 70) {
      score += 10
      strengths.push('Title length is optimal (30-70 chars)')
    } else if (title.length > 70) {
      issues.push('Title too long (over 70 chars)')
    } else {
      issues.push('Title too short (under 30 chars)')
    }
  } else {
    issues.push('Missing title for Twitter card')
  }

  // Description (20 points)
  const description = metadata.twitter.description || metadata.openGraph.description || metadata.description
  if (description) {
    score += 20
    if (description.length >= 100 && description.length <= 200) {
      score += 10
      strengths.push('Description length is optimal (100-200 chars)')
    } else if (description.length > 200) {
      issues.push('Description too long (over 200 chars)')
    } else {
      issues.push('Description too short (under 100 chars)')
    }
  } else {
    issues.push('Missing description for Twitter card')
  }

  // Image (25 points)
  const image = metadata.twitter.image || metadata.openGraph.image
  if (image) {
    score += 25
    strengths.push('Twitter card image present')
  } else {
    issues.push('Missing twitter:image or og:image')
  }

  // Creator/Site (5 points)
  if (metadata.twitter.creator || metadata.twitter.site) {
    score += 5
    strengths.push('Twitter creator/site attribution present')
  } else {
    issues.push('Consider adding twitter:creator or twitter:site')
  }

  return { score, maxScore, issues, strengths }
}

function scoreFacebook(metadata: MetadataResult): PlatformScore {
  let score = 0
  const maxScore = 100
  const issues: string[] = []
  const strengths: string[] = []

  // OpenGraph Title (20 points)
  if (metadata.openGraph.title) {
    score += 20
    if (metadata.openGraph.title.length >= 40 && metadata.openGraph.title.length <= 60) {
      score += 5
      strengths.push('OG title length is optimal (40-60 chars)')
    } else if (metadata.openGraph.title.length > 60) {
      issues.push('OG title too long (over 60 chars)')
    } else {
      issues.push('OG title could be longer (under 40 chars)')
    }
  } else {
    issues.push('Missing og:title meta tag')
  }

  // OpenGraph Description (20 points)
  if (metadata.openGraph.description) {
    score += 20
    if (metadata.openGraph.description.length >= 150 && metadata.openGraph.description.length <= 300) {
      score += 5
      strengths.push('OG description length is optimal (150-300 chars)')
    } else if (metadata.openGraph.description.length > 300) {
      issues.push('OG description too long (over 300 chars)')
    } else {
      issues.push('OG description could be longer (under 150 chars)')
    }
  } else {
    issues.push('Missing og:description meta tag')
  }

  // OpenGraph Image (25 points)
  if (metadata.openGraph.image) {
    score += 25
    strengths.push('OpenGraph image present')
  } else {
    issues.push('Missing og:image meta tag')
  }

  // OpenGraph Type (10 points)
  if (metadata.openGraph.type) {
    score += 10
    strengths.push('OpenGraph type specified')
  } else {
    issues.push('Missing og:type meta tag')
  }

  // OpenGraph URL (5 points)
  if (metadata.openGraph.url) {
    score += 5
    strengths.push('OpenGraph URL specified')
  } else {
    issues.push('Missing og:url meta tag')
  }

  // Site Name (5 points)
  if (metadata.openGraph.siteName) {
    score += 5
    strengths.push('Site name specified')
  } else {
    issues.push('Missing og:site_name meta tag')
  }

  return { score, maxScore, issues, strengths }
}

function scoreGoogle(metadata: MetadataResult): PlatformScore {
  let score = 0
  const maxScore = 100
  const issues: string[] = []
  const strengths: string[] = []

  // Title Tag (30 points)
  if (metadata.title) {
    score += 30
    if (metadata.title.length >= 30 && metadata.title.length <= 60) {
      score += 15
      strengths.push('Title length is optimal (30-60 chars)')
    } else if (metadata.title.length > 60) {
      issues.push('Title too long (over 60 chars) - may be truncated')
    } else {
      issues.push('Title too short (under 30 chars)')
    }
  } else {
    issues.push('Missing title tag')
  }

  // Meta Description (30 points)
  if (metadata.description) {
    score += 30
    if (metadata.description.length >= 120 && metadata.description.length <= 160) {
      score += 15
      strengths.push('Meta description length is optimal (120-160 chars)')
    } else if (metadata.description.length > 160) {
      issues.push('Meta description too long (over 160 chars)')
    } else {
      issues.push('Meta description too short (under 120 chars)')
    }
  } else {
    issues.push('Missing meta description')
  }

  // Structured Data (10 points)
  if (metadata.schema.type) {
    score += 10
    strengths.push('Structured data (Schema.org) present')
  } else {
    issues.push('No structured data (Schema.org) found')
  }

  return { score, maxScore, issues, strengths }
} 