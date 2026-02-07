const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const directories = [
  'src/assets/images',
  'src/assets/fonts',
  'src/assets/icons',
  'src/components/common',
  'src/constants/sizings',
  'src/constants/styles',
  'src/constants/splash',
  'src/hooks/splash',
  'src/navigation/stack',
  'src/navigation/bottom',
  'src/screens/splash',
  'src/screens/home',
  'src/screens/profile',
  'src/screens/settings',
  'src/state/zustand',
  'src/state/context',
  'src/styles/splash',
  'src/styles/home',
  'src/styles/profile',
  'src/styles/settings',
  'src/types',
  'src/utils',
];

async function createDirectories() {
  for (const dir of directories) {
    const dirPath = path.join(process.cwd(), dir);
    await fs.ensureDir(dirPath);
    console.log(chalk.gray(`   ✓ Created ${dir}`));
  }
}

module.exports = { createDirectories };
