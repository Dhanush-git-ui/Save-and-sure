// This script downloads partner logo images for the project
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Partner logo URLs
const partnerLogos = [
  {
    id: 'siemens',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg',
    description: 'Siemens logo'
  },
  {
    id: 'allen-bradley',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Allen-Bradley.svg',
    description: 'Allen-Bradley logo'
  },
  {
    id: 'mettler-toledo',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Mettler-Toledo_Logo.svg',
    description: 'Mettler-Toledo logo'
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

// Download partner logos
async function downloadPartnerLogos() {
  const logosDir = path.join(__dirname, 'public', 'images', 'logos');

  // Create the directory if it doesn't exist
  if (!fs.existsSync(logosDir)) {
    fs.mkdirSync(logosDir, { recursive: true });
    console.log(`Created directory: ${logosDir}`);
  }

  for (const partner of partnerLogos) {
    const filepath = path.join(logosDir, `${partner.id}.png`);
    try {
      await downloadImage(partner.url, filepath);
      console.log(`Successfully downloaded logo for ${partner.id}: ${partner.description}`);
    } catch (error) {
      console.error(`Failed to download partner logo for ${partner.id}:`, error);
    }
  }
}

// Run the downloads
async function main() {
  try {
    await downloadPartnerLogos();
    console.log('All partner logos downloaded successfully!');
  } catch (error) {
    console.error('Error downloading logos:', error);
  }
}

main();
