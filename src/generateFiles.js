const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

async function generateFiles() {
  const templatesPath = path.join(__dirname, '../templates');

  const files = [
    // Constants
    {
      template: path.join(templatesPath, 'constants/SIZINGS.ts.template'),
      destination: 'src/constants/sizings/SIZINGS.ts',
    },
    {
      template: path.join(templatesPath, 'constants/COLORS.ts.template'),
      destination: 'src/constants/styles/COLORS.ts',
    },
    {
      template: path.join(templatesPath, 'constants/splash.constants.ts.template'),
      destination: 'src/constants/splash/splash.constants.ts',
    },

    // Types
    {
      template: path.join(templatesPath, 'types/Type.ts.template'),
      destination: 'src/types/Type.ts',
    },

    // Utils
    {
      template: path.join(templatesPath, 'utils/Util.ts.template'),
      destination: 'src/utils/Util.ts',
    },

    // Navigation
    {
      template: path.join(templatesPath, 'navigation/StackNavigation.tsx.template'),
      destination: 'src/navigation/stack/StackNavigation.tsx',
    },
    {
      template: path.join(templatesPath, 'navigation/BottomTabNavigation.tsx.template'),
      destination: 'src/navigation/bottom/BottomTabNavigation.tsx',
    },

    // Screens
    {
      template: path.join(templatesPath, 'screens/SplashScreen.tsx.template'),
      destination: 'src/screens/splash/SplashScreen.tsx',
    },
    {
      template: path.join(templatesPath, 'screens/HomeScreen.tsx.template'),
      destination: 'src/screens/home/HomeScreen.tsx',
    },
    {
      template: path.join(templatesPath, 'screens/ProfileScreen.tsx.template'),
      destination: 'src/screens/profile/ProfileScreen.tsx',
    },
    {
      template: path.join(templatesPath, 'screens/SettingsScreen.tsx.template'),
      destination: 'src/screens/settings/SettingsScreen.tsx',
    },

    // Hooks
    {
      template: path.join(templatesPath, 'hooks/useSplashNavigation.ts.template'),
      destination: 'src/hooks/splash/useSplashNavigation.ts',
    },

    // Styles
    {
      template: path.join(templatesPath, 'styles/splash.styles.ts.template'),
      destination: 'src/styles/splash/splash.styles.ts',
    },
    {
      template: path.join(templatesPath, 'styles/home.styles.ts.template'),
      destination: 'src/styles/home/home.styles.ts',
    },
    {
      template: path.join(templatesPath, 'styles/profile.styles.ts.template'),
      destination: 'src/styles/profile/profile.styles.ts',
    },
    {
      template: path.join(templatesPath, 'styles/settings.styles.ts.template'),
      destination: 'src/styles/settings/settings.styles.ts',
    },

    // Root level - App.tsx
    {
      template: path.join(templatesPath, 'root/App.tsx.template'),
      destination: 'App.tsx',
    },
  ];

  // Generate all files
  for (const file of files) {
    const content = await fs.readFile(file.template, 'utf-8');
    const destPath = path.join(process.cwd(), file.destination);
    await fs.writeFile(destPath, content);
    console.log(chalk.gray(`   ✓ Created ${file.destination}`));
  }

  // Copy PROJECT_ARCHITECTURE.md
  const architectureMdSource = path.join(templatesPath, 'PROJECT_ARCHITECTURE.md');
  const architectureMdDest = path.join(process.cwd(), 'PROJECT_ARCHITECTURE.md');

  if (await fs.pathExists(architectureMdSource)) {
    await fs.copy(architectureMdSource, architectureMdDest);
    console.log(chalk.gray('   ✓ Created PROJECT_ARCHITECTURE.md'));
  } else {
    console.log(chalk.yellow('   ⚠ PROJECT_ARCHITECTURE.md template not found, skipping'));
  }
}

module.exports = { generateFiles };
