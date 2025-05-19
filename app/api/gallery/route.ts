import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.mkv']

export async function GET() {
  try {
    const galleryPath = path.join(process.cwd(), 'public', 'gallary')
    
    // Check if directory exists
    if (!fs.existsSync(galleryPath)) {
      return NextResponse.json({ error: 'Gallery directory not found' }, { status: 404 })
    }

    // Get all files recursively
    const getAllFiles = (dir: string): string[] => {
      const files: string[] = []
      const items = fs.readdirSync(dir)
      
      for (const item of items) {
        const fullPath = path.join(dir, item)
        if (fs.statSync(fullPath).isDirectory()) {
          files.push(...getAllFiles(fullPath))
        } else {
          const ext = path.extname(fullPath).toLowerCase()
          if (VALID_EXTENSIONS.includes(ext)) {
            files.push(fullPath)
          }
        }
      }
      
      return files
    }

    const allFiles = getAllFiles(galleryPath)
    
    // Group files by their parent folder
    const folderMap = new Map<string, string[]>()
    
    allFiles.forEach(filePath => {
      const relativePath = path.relative(galleryPath, filePath)
      const parentFolder = path.dirname(relativePath).split(path.sep)[0]
      if (!folderMap.has(parentFolder)) {
        folderMap.set(parentFolder, [])
      }
      folderMap.get(parentFolder)?.push(filePath)
    })

    // Convert folders to gallery sections
    const sections = Array.from(folderMap.entries()).map(([folderName, files]) => {
      const items = files.map(filePath => {
        const relativePath = path.relative(path.join(process.cwd(), 'public'), filePath).replace(/\\/g, '/')
        const fileName = path.basename(filePath)
        const ext = path.extname(filePath).toLowerCase()
        const isVideo = ['.mp4', '.mkv'].includes(ext)
        
        // Get subfolder if it exists
        const subfolder = path.dirname(path.relative(galleryPath, filePath))
        const category = subfolder !== '.' ? subfolder : folderName
        
        // Format title
        let title = fileName.split('.')[0]
        if (title.match(/^\d{4}$/)) {
          title = `Frame ${title}`
        } else if (title.match(/^\d{4}-\d{4}$/)) {
          title = `Sequence ${title}`
        } else {
          title = title.replace(/[-_]/g, ' ')
        }

        return {
          id: `IMG-${fileName}`,
          title,
          description: `A ${isVideo ? 'video' : 'image'} from ${category}`,
          image: `/${relativePath}`,
          type: isVideo ? 'video' : 'image',
          videoUrl: isVideo ? `/${relativePath}` : undefined,
          category
        }
      })

      // Sort items by name, but handle numeric names specially
      items.sort((a, b) => {
        const aNum = parseInt(a.title.match(/\d+/)?.[0] || '0')
        const bNum = parseInt(b.title.match(/\d+/)?.[0] || '0')
        if (aNum && bNum) {
          return aNum - bNum
        }
        return a.title.localeCompare(b.title)
      })

      return {
        name: folderName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        path: folderName,
        items
      }
    })

    // Sort sections by name
    sections.sort((a, b) => a.name.localeCompare(b.name))

    return NextResponse.json({ sections })
  } catch (error) {
    console.error('Error in gallery route:', error)
    return NextResponse.json({ error: 'Failed to load gallery' }, { status: 500 })
  }
}
