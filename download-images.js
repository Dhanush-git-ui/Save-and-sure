// This script downloads placeholder images for the project
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Service image URLs - using Pexels free images
const serviceImages = [
  {
    id: 'electrical-panels',
    url: 'https://images.pexels.com/photos/236089/pexels-photo-236089.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'automation',
    url: 'https://images.pexels.com/photos/3846005/pexels-photo-3846005.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'engineering',
    url: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'material-handling',
    url: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'weighing',
    url: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

// Industry image URLs
const industryImages = [
  {
    id: 'manufacturing',
    url: 'https://images.pexels.com/photos/3846005/pexels-photo-3846005.jpeg?auto=compress&cs=tinysrgb&w=800',
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
    id: 'cement',
    url: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'power',
    url: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=800',
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

// Project image URLs
const projectImages = [
  {
    id: 'cement-plant',
    url: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'pharma-packaging',
    url: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'metro-rail',
    url: 'https://images.pexels.com/photos/3866816/pexels-photo-3866816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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

// Download service images
async function downloadServiceImages() {
  const serviceDir = path.join(__dirname, 'public', 'images', 'services');

  for (const service of serviceImages) {
    const filepath = path.join(serviceDir, `${service.id}.jpg`);
    try {
      await downloadImage(service.url, filepath);
    } catch (error) {
      console.error(`Failed to download service image for ${service.id}:`, error);
    }
  }
}

// Download industry images
async function downloadIndustryImages() {
  const industryDir = path.join(__dirname, 'public', 'images', 'industries');

  for (const industry of industryImages) {
    const filepath = path.join(industryDir, `${industry.id}.jpg`);
    try {
      await downloadImage(industry.url, filepath);
    } catch (error) {
      console.error(`Failed to download industry image for ${industry.id}:`, error);
    }
  }
}

// Download project images
async function downloadProjectImages() {
  const projectDir = path.join(__dirname, 'public', 'images', 'projects');

  for (const project of projectImages) {
    const filepath = path.join(projectDir, `${project.id}.jpg`);
    try {
      await downloadImage(project.url, filepath);
    } catch (error) {
      console.error(`Failed to download project image for ${project.id}:`, error);
    }
  }
}

// Run the downloads
async function main() {
  try {
    await downloadServiceImages();
    await downloadIndustryImages();
    await downloadProjectImages();
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

main();
