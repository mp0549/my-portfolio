const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const files = process.argv.slice(2);

if (!files.length) {
  console.error('Usage: node scripts/resize-thumbnail.js <image1> [image2] ...');
  console.error('Example: node scripts/resize-thumbnail.js src/assets/images/myproject.png');
  process.exit(1);
}

async function resize(file) {
  const filepath = path.resolve(file);
  const tmp = filepath + '.tmp';
  await sharp(filepath)
    .resize(1024, 720, { fit: 'cover', position: 'centre' })
    .toFile(tmp);
  fs.renameSync(tmp, filepath);
  console.log(`Resized: ${file}`);
}

Promise.all(files.map(resize)).catch(err => {
  console.error(err.message);
  process.exit(1);
});
