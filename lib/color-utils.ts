import { createWorker } from 'tesseract.js';

export async function getDominantColor(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const colorCounts: { [key: string]: number } = {};
      const totalPixels = imageData.length / 4;

      // Sample pixels to get dominant color
      for (let i = 0; i < imageData.length; i += 16) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const color = `rgb(${r},${g},${b})`;
        colorCounts[color] = (colorCounts[color] || 0) + 1;
      }

      // Find the most common color
      let dominantColor = '';
      let maxCount = 0;
      for (const color in colorCounts) {
        if (colorCounts[color] > maxCount) {
          maxCount = colorCounts[color];
          dominantColor = color;
        }
      }

      resolve(dominantColor);
    };
    img.onerror = reject;
    img.src = imageUrl;
  });
}

export function adjustColorForBackground(color: string): string {
  // Convert RGB to HSL for better color manipulation
  const rgb = color.match(/\d+/g)?.map(Number) || [0, 0, 0];
  const [r, g, b] = rgb.map(x => x / 255);
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  // Adjust lightness for better contrast
  l = Math.max(0.1, Math.min(0.9, l));
  
  // Convert back to RGB
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h * 6) % 2 - 1));
  const m = l - c / 2;
  
  let r1, g1, b1;
  if (h < 1/6) {
    [r1, g1, b1] = [c, x, 0];
  } else if (h < 2/6) {
    [r1, g1, b1] = [x, c, 0];
  } else if (h < 3/6) {
    [r1, g1, b1] = [0, c, x];
  } else if (h < 4/6) {
    [r1, g1, b1] = [0, x, c];
  } else if (h < 5/6) {
    [r1, g1, b1] = [x, 0, c];
  } else {
    [r1, g1, b1] = [c, 0, x];
  }

  const rgb1 = [
    Math.round((r1 + m) * 255),
    Math.round((g1 + m) * 255),
    Math.round((b1 + m) * 255)
  ];

  return `rgb(${rgb1.join(',')})`;
} 