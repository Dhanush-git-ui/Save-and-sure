// This script downloads company logos and industry images
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Company logos
const logos = [
  {
    id: 'siemens',
    url: 'https://logodownload.org/wp-content/uploads/2014/07/siemens-logo-1.png',
  },
  {
    id: 'schneider-electric',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Schneider_Electric_2007.svg/1280px-Schneider_Electric_2007.svg.png',
  },
  {
    id: 'abb',
    url: 'https://logodownload.org/wp-content/uploads/2018/03/abb-logo-1.png',
  },
  {
    id: 'allen-bradley',
    url: 'https://seeklogo.com/images/A/allen-bradley-logo-33B70C03E7-seeklogo.com.png',
  },
  {
    id: 'mettler-toledo',
    url: 'https://seeklogo.com/images/M/mettler-toledo-logo-F9F5F78345-seeklogo.com.png',
  },
];

// Industry images - unique for each industry
const industryImages = [
  {
    id: 'manufacturing',
    url: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'pharmaceutical',
    url: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'food-beverage',
    url: 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'power-&-energy',
    url: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'steel-&-cement',
    url: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'water-treatment',
    url: 'https://images.pexels.com/photos/1029635/pexels-photo-1029635.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'bulk-material-handling',
    url: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

// Function to download an image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${filepath}`);
          resolve();
        });
        
        file.on('error', (err) => {
          fs.unlink(filepath, () => {}); // Delete the file if there's an error
          console.error(`Error writing file: ${filepath}`, err);
          reject(err);
        });
      } else {
        console.error(`Failed to download ${url}, status code: ${response.statusCode}`);
        reject(new Error(`Failed to download ${url}, status code: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      console.error(`Error downloading ${url}:`, err);
      reject(err);
    });
  });
}

// Download logos
async function downloadLogos() {
  const logosDir = path.join(__dirname, 'public', 'images', 'logos');
  
  for (const logo of logos) {
    const filepath = path.join(logosDir, `${logo.id}.png`);
    try {
      await downloadImage(logo.url, filepath);
    } catch (error) {
      console.error(`Failed to download logo for ${logo.id}:`, error);
    }
  }
}

// Download updated industry images
async function downloadUpdatedIndustryImages() {
  const industryDir = path.join(__dirname, 'public', 'images', 'industries');
  
  // New unique images for industries
  const newIndustryImages = [
    {
      id: 'power-&-energy',
      url: 'https://images.pexels.com/photos/9800002/pexels-photo-9800002.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'steel-&-cement',
      url: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];
  
  for (const industry of newIndustryImages) {
    const filepath = path.join(industryDir, `${industry.id}.jpg`);
    try {
      await downloadImage(industry.url, filepath);
    } catch (error) {
      console.error(`Failed to download industry image for ${industry.id}:`, error);
    }
  }
}

// Run the downloads
async function main() {
  try {
    await downloadLogos();
    await downloadUpdatedIndustryImages();
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

main();
