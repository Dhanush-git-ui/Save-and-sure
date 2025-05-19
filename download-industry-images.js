// This script downloads new industry images for the project
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Industry image URLs - new images for Power & Energy and Steel & Cement
const industryImages = [
  {
    id: 'power-&-energy',
    url: 'https://cdn.pixabay.com/photo/2019/07/19/23/16/power-plant-4349830_1280.jpg',
    description: 'Power plant with cooling towers representing the power and energy industry'
  },
  {
    id: 'steel-&-cement',
    url: 'https://cdn.pixabay.com/photo/2018/09/24/20/32/industry-3700766_1280.jpg',
    description: 'Steel mill industrial facility representing the steel and cement industry'
  }
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

// Download industry images
async function downloadIndustryImages() {
  const industryDir = path.join(__dirname, 'public', 'images', 'industries');

  for (const industry of industryImages) {
    const filepath = path.join(industryDir, `${industry.id}.jpg`);
    try {
      await downloadImage(industry.url, filepath);
      console.log(`Successfully downloaded image for ${industry.id}: ${industry.description}`);
    } catch (error) {
      console.error(`Failed to download industry image for ${industry.id}:`, error);
    }
  }
}

// Run the downloads
async function main() {
  try {
    await downloadIndustryImages();
    console.log('All industry images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

main();
