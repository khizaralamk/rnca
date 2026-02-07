const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { createDirectories } = require('./createDirectories');
const { generateFiles } = require('./generateFiles');
const { checkAndInstallDependencies } = require('./checkDependencies');

async function scaffold() {
  console.log(chalk.blue.bold('\n🏗️  React Native Clean Architecture Scaffold\n'));

  // Check if in a project directory (has package.json)
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.log(chalk.yellow('⚠️  No package.json found in current directory.'));
    console.log(chalk.gray('   This tool is typically used in a React Native project,'));
    console.log(chalk.gray('   but will continue anyway.\n'));
  } else {
    // Check if it's a React Native or Expo project
    const packageJson = await fs.readJson(packageJsonPath);
    const isReactNative =
      packageJson.dependencies?.['react-native'] ||
      packageJson.devDependencies?.['react-native'];
    const isExpo =
      packageJson.dependencies?.['expo'] ||
      packageJson.devDependencies?.['expo'];

    if (!isReactNative && !isExpo) {
      console.log(chalk.yellow('⚠️  This doesn\'t appear to be a React Native or Expo project.'));
      const { continueAnyway } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'continueAnyway',
          message: 'Continue anyway?',
          default: false,
        },
      ]);

      if (!continueAnyway) {
        console.log(chalk.gray('Cancelled.'));
        process.exit(0);
      }
    } else if (isExpo) {
      console.log(chalk.cyan('✓ Expo project detected!\n'));
    } else if (isReactNative) {
      console.log(chalk.cyan('✓ React Native CLI project detected!\n'));
    }
  }

  // Check if src directory already exists
  const srcPath = path.join(process.cwd(), 'src');
  if (fs.existsSync(srcPath)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'src/ directory already exists. Continue and potentially overwrite files?',
        default: false,
      },
    ]);

    if (!overwrite) {
      console.log(chalk.gray('Cancelled.'));
      process.exit(0);
    }
  }

  // Ask for confirmation to proceed
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'This will create a complete React Native app with navigation and sample screens. Continue?',
      default: true,
    },
  ]);

  if (!confirm) {
    console.log(chalk.yellow('Cancelled.'));
    process.exit(0);
  }

  try {
    // Create directories
    console.log(chalk.cyan('\n📁 Creating directories...'));
    await createDirectories();

    // Generate all files
    console.log(chalk.cyan('\n📝 Generating files...'));
    await generateFiles();

    // Check and install dependencies
    await checkAndInstallDependencies();

    // Success message
    console.log(chalk.green.bold('\n✅ Clean architecture structure created successfully!\n'));
    console.log(chalk.green('🎉 Your app is ready to run!\n'));

    console.log(chalk.white('📂 What was created:'));
    console.log(chalk.gray('   ✓ Complete directory structure'));
    console.log(chalk.gray('   ✓ 4 sample screens (Splash, Home, Profile, Settings)'));
    console.log(chalk.gray('   ✓ Navigation setup (Stack + Bottom Tabs)'));
    console.log(chalk.gray('   ✓ Hooks, styles, and constants'));
    console.log(chalk.gray('   ✓ Updated App.tsx ready to run'));
    console.log(chalk.gray('   ✓ PROJECT_ARCHITECTURE.md guide\n'));

    console.log(chalk.white('📋 Next steps:'));
    console.log(chalk.gray('   1. Review PROJECT_ARCHITECTURE.md for complete guidelines'));
    console.log(chalk.gray('   2. Run: npm start (or yarn start)'));
    console.log(chalk.gray('   3. Your app now has complete navigation and sample screens!'));
    console.log(chalk.gray('   4. Customize the screens and styles to match your needs\n'));

    console.log(chalk.cyan('📚 Learn more:'));
    console.log(chalk.gray('   - All screens follow clean architecture patterns'));
    console.log(chalk.gray('   - Logic is separated in hooks'));
    console.log(chalk.gray('   - Styles use centralized constants'));
    console.log(chalk.gray('   - Ready to build upon!\n'));
  } catch (error) {
    console.log(chalk.red('\n❌ Error creating structure:'), error.message);
    console.error(error);
    process.exit(1);
  }
}

module.exports = { scaffold };
