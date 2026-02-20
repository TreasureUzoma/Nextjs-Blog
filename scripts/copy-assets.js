const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "../content/blog");
const targetDir = path.join(__dirname, "../public/blog");

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    // Only copy image files
    if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(src)) {
      // Flatten the structure for public/blog/
      const fileName = path.basename(src);
      fs.copyFileSync(src, path.join(targetDir, fileName));
      console.log(`Copied ${fileName} to ${targetDir}`);
    }
  }
}

copyRecursiveSync(sourceDir, targetDir);
