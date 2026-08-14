'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { useInView } from 'framer-motion'
import { AspectRatio } from '@/components/ui/aspect-ratio'

interface LazyImageProps {
  alt: string
  src: string
  className?: string
  AspectRatioClassName?: string
  fallback?: string
  ratio: number
  inView?: boolean
}

export function LazyImage({
  alt,
  src,
  ratio,
  fallback,
  inView = false,
  className,
  AspectRatioClassName,
}: LazyImageProps) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const imgRef = React.useRef<HTMLImageElement | null>(null)
  const isInView = useInView(ref, { once: true })

  const [imgSrc, setImgSrc] = React.useState<string | undefined>(
    inView ? undefined : src,
  )
  const [isLoading, setIsLoading] = React.useState(true)

  const handleError = () => {
    if (fallback) setImgSrc(fallback)
    setIsLoading(false)
  }

  const handleLoad = () => setIsLoading(false)

  React.useEffect(() => {
    if (inView && isInView && !imgSrc) setImgSrc(src)
  }, [inView, isInView, src, imgSrc])

  React.useEffect(() => {
    if (imgRef.current && imgRef.current.complete) handleLoad()
  }, [imgSrc])

  return (
    <AspectRatio
      ref={ref}
      ratio={ratio}
      className={cn(
        'relative size-full overflow-hidden rounded-lg',
        AspectRatioClassName,
      )}
    >
      {/* Skeleton */}
      <div
        className={cn(
          'absolute inset-0 animate-pulse rounded-lg transition-opacity',
          isLoading ? 'opacity-100' : 'opacity-0',
        )}
        style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
      />

      {imgSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          alt={alt}
          src={imgSrc}
          className={cn(
            'size-full rounded-lg object-cover transition-opacity duration-700',
            isLoading ? 'opacity-0' : 'opacity-100',
            className,
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
          fetchPriority={inView ? 'high' : 'low'}
        />
      )}
    </AspectRatio>
  )
}
