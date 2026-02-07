const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { execSync } = require('child_process');

const REQUIRED_DEPENDENCIES = [
  '@react-navigation/native',
  '@react-navigation/native-stack',
  '@react-navigation/bottom-tabs',
  'react-native-safe-area-context',
  'react-native-screens',
];

async function checkAndInstallDependencies() {
  console.log(chalk.cyan('\n📦 Checking dependencies...'));

  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);

  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const missingDeps = REQUIRED_DEPENDENCIES.filter((dep) => !dependencies[dep]);

  if (missingDeps.length === 0) {
    console.log(chalk.green('   ✓ All required dependencies are already installed!'));
    return true;
  }

  console.log(chalk.yellow('   ⚠ Missing required navigation dependencies:'));
  missingDeps.forEach((dep) => {
    console.log(chalk.gray(`      - ${dep}`));
  });

  const { install } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'install',
      message: 'Would you like to install them now?',
      default: true,
    },
  ]);

  if (!install) {
    const isExpo = dependencies['expo'];
    console.log(
      chalk.yellow(
        '\n   ⚠ Skipping installation. You will need to install them manually later.'
      )
    );
    console.log(chalk.gray('\n   Run this command to install:'));
    if (isExpo) {
      console.log(chalk.cyan(`   npx expo install ${REQUIRED_DEPENDENCIES.join(' ')}\n`));
    } else {
      console.log(chalk.cyan(`   npm install ${REQUIRED_DEPENDENCIES.join(' ')}\n`));
    }
    return false;
  }

  try {
    console.log(chalk.cyan('\n   Installing dependencies... (this may take a minute)'));

    // Check if it's an Expo project
    const isExpo = dependencies['expo'];

    // Check if yarn.lock exists
    const useYarn = await fs.pathExists(path.join(process.cwd(), 'yarn.lock'));
    const packageManager = useYarn ? 'yarn' : 'npm';
    const installCmd = useYarn
      ? `yarn add ${REQUIRED_DEPENDENCIES.join(' ')}`
      : `npm install ${REQUIRED_DEPENDENCIES.join(' ')}`;

    execSync(installCmd, { stdio: 'inherit', cwd: process.cwd() });

    console.log(chalk.green('\n   ✓ Dependencies installed successfully!'));

    // Check if iOS folder exists and remind about pod install (skip for Expo)
    if (!isExpo) {
      const iosExists = await fs.pathExists(path.join(process.cwd(), 'ios'));
      if (iosExists) {
        console.log(
          chalk.yellow('\n   📱 iOS detected - Remember to run:')
        );
        console.log(chalk.cyan('      cd ios && pod install && cd ..\n'));
      }
    } else {
      console.log(chalk.green('\n   ℹ️  Expo project - native dependencies handled automatically!\n'));
    }

    return true;
  } catch (error) {
    const isExpo = dependencies['expo'];
    console.log(chalk.red('\n   ❌ Failed to install dependencies'));
    console.log(chalk.gray(`   Error: ${error.message}`));
    console.log(chalk.yellow('\n   Please install them manually:'));
    if (isExpo) {
      console.log(chalk.cyan(`   npx expo install ${REQUIRED_DEPENDENCIES.join(' ')}\n`));
    } else {
      console.log(chalk.cyan(`   npm install ${REQUIRED_DEPENDENCIES.join(' ')}\n`));
    }
    return false;
  }
}

module.exports = { checkAndInstallDependencies };
