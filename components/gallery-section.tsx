import Image from 'next/image'
import { Card } from '@/components/ui/card'

interface Image {
  src: string
  alt: string
}

interface GallerySectionProps {
  title: string
  images: Image[]
}

export function GallerySection({ title, images }: GallerySectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 