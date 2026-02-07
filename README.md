# rnca

🏗️ **Instantly create a complete, production-ready React Native app with Clean Architecture**

Transform your empty React Native project into a fully functional app with navigation, sample screens, and clean architecture patterns - all in under a minute!

## ✨ Features

- 🚀 **Complete Working App**: Creates a fully functional app with 4 screens ready to run
- 📱 **Full Navigation Setup**: Stack navigation + Bottom tabs pre-configured
- 📁 **Clean Architecture**: Organized directory structure with proper separation of concerns
- 🎨 **Design System**: Pre-configured colors, sizings, and styling constants
- 📝 **Sample Screens**: Splash, Home, Profile, and Settings screens with clean patterns
- 🔧 **Automatic Dependencies**: Checks and installs required navigation packages
- 📖 **Comprehensive Guide**: Detailed PROJECT_ARCHITECTURE.md with best practices
- ✅ **Type-Safe**: Full TypeScript support with proper navigation types
- 🎯 **Zero Configuration**: Works immediately after scaffolding

## 🚀 Quick Start

### Prerequisites

- Node.js >= 14.0.0
- A React Native project created with `npx react-native init MyApp`

### Usage

Navigate to your React Native project directory and run:

```bash
npx rnca
```

Or install globally:

```bash
npm install -g rnca
rnca
```

### What Happens Next?

1. ✅ Validates your React Native project
2. ✅ Creates complete directory structure
3. ✅ Generates 4 working screens with navigation
4. ✅ Sets up hooks, styles, and constants
5. ✅ Updates your App.tsx
6. ✅ Checks and installs navigation dependencies
7. ✅ Copies architecture documentation
8. 🎉 **Your app is ready to run!**

## 📦 What Gets Created

### Complete Directory Structure

```
src/
├── assets/
│   ├── images/
│   ├── fonts/
│   └── icons/
├── components/
│   └── common/
├── constants/
│   ├── sizings/
│   │   └── SIZINGS.ts              ✓ Generated
│   ├── styles/
│   │   └── COLORS.ts               ✓ Generated
│   └── splash/
│       └── splash.constants.ts     ✓ Generated
├── hooks/
│   └── splash/
│       └── useSplashNavigation.ts  ✓ Generated
├── navigation/
│   ├── stack/
│   │   └── StackNavigation.tsx     ✓ Generated
│   └── bottom/
│       └── BottomTabNavigation.tsx ✓ Generated
├── screens/
│   ├── splash/
│   │   └── SplashScreen.tsx        ✓ Generated
│   ├── home/
│   │   └── HomeScreen.tsx          ✓ Generated
│   ├── profile/
│   │   └── ProfileScreen.tsx       ✓ Generated
│   └── settings/
│       └── SettingsScreen.tsx      ✓ Generated
├── state/
│   ├── zustand/
│   └── context/
├── styles/
│   ├── splash/
│   │   └── splash.styles.ts        ✓ Generated
│   ├── home/
│   │   └── home.styles.ts          ✓ Generated
│   ├── profile/
│   │   └── profile.styles.ts       ✓ Generated
│   └── settings/
│       └── settings.styles.ts      ✓ Generated
├── types/
│   └── Type.ts                     ✓ Generated
└── utils/
    └── Util.ts                     ✓ Generated

Root Level:
├── App.tsx                         ✓ Updated
└── PROJECT_ARCHITECTURE.md         ✓ Generated
```

### 🎯 4 Ready-to-Use Screens

#### 1. Splash Screen
- Auto-navigates to main app after 2 seconds
- Uses custom hook for navigation logic
- Demonstrates proper hook usage pattern

#### 2. Home Screen
- Part of bottom tab navigation
- Example of presentation-only component
- Uses centralized styles and constants

#### 3. Profile Screen
- Part of bottom tab navigation
- Ready for user profile implementation
- Follows clean architecture patterns

#### 4. Settings Screen
- Part of bottom tab navigation
- Prepared for app configuration
- Demonstrates consistent structure

### 📝 Generated Core Files

#### `src/utils/Util.ts`
```typescript
// Pre-configured navigator creators
export const Stack = createNativeStackNavigator<STACK_NAVIGATOR_PARAMS>();
export const Tab = createBottomTabNavigator<BOTTOM_TAB_NAVIGATOR_PARAMS>();
```

#### `src/types/Type.ts`
```typescript
// Complete navigation types
export type STACK_NAVIGATOR_PARAMS = {
  Splash: undefined;
  Home: undefined;
  BottomTab: undefined;
};

export type BOTTOM_TAB_NAVIGATOR_PARAMS = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};
```

#### `src/constants/sizings/SIZINGS.ts`
- Border sizings (1-13px)
- Font sizings (12-28px)
- Spacing scale (4-48px)
- Border radius values

#### `src/constants/styles/COLORS.ts`
- Primary and secondary colors
- Gray scale (9 shades)
- Status colors (success, warning, error, info)
- Semantic colors (background, surface, text, border)

### 🔗 Complete Navigation Setup

The package creates a fully configured navigation system:

**Stack Navigator** (Root):
- Splash Screen → Bottom Tab Navigator

**Bottom Tab Navigator**:
- Home Tab
- Profile Tab
- Settings Tab

**App.tsx** automatically wired up and ready to run!

## 🎯 Architecture Principles

All generated code follows clean architecture patterns:

1. **Screens = Presentation Only**
   - No business logic in screen components
   - Only UI rendering and event handling

2. **Hooks = Business Logic**
   - All logic extracted to custom hooks
   - Reusable and testable

3. **Styles = Separate Files**
   - StyleSheets in dedicated files
   - Uses centralized constants

4. **Constants = Centralized**
   - Colors, sizes, and config in one place
   - Easy to maintain and update

5. **No Barrel Exports**
   - Direct imports only
   - Better tree-shaking and clarity

## 📚 Example: Clean Architecture Pattern

### Screen Component (Presentation)
```typescript
// src/screens/home/HomeScreen.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles/home/home.styles';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};
```

### Styles (Separate File)
```typescript
// src/styles/home/home.styles.ts
import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colors.background,
  },
  title: {
    fontSize: SIZINGS.fontSizings.large_4,
    color: COLORS.colors.text,
  },
});
```

## 🔧 Automatic Dependency Management

The CLI automatically detects and offers to install required packages:

**Installed Automatically:**
- `@react-navigation/native`
- `@react-navigation/native-stack`
- `@react-navigation/bottom-tabs`
- `react-native-safe-area-context`
- `react-native-screens`

**iOS Note**: After installation, remember to run:
```bash
cd ios && pod install && cd ..
```

## 🎨 Customization

### Changing Colors
Edit `src/constants/styles/COLORS.ts`:
```typescript
export const COLORS = {
  colors: {
    primary: '#YOUR_COLOR',    // Change primary color
    secondary: '#YOUR_COLOR',  // Change secondary color
    // ... customize all colors
  },
};
```

### Adding New Screens
1. Create screen directory: `src/screens/newscreen/`
2. Create screen file: `NewScreen.tsx`
3. Create styles: `src/styles/newscreen/newscreen.styles.ts`
4. Add to navigation types in `src/types/Type.ts`
5. Add to navigator in `src/navigation/`

### Adding Business Logic
1. Create hook directory: `src/hooks/feature/`
2. Create hook file: `useFeatureLogic.ts`
3. Import and use in screen component

## 📖 Documentation

The package includes `PROJECT_ARCHITECTURE.md` with:
- Complete architecture guidelines
- Best practices and patterns
- Code examples for common scenarios
- Naming conventions
- Testing strategies
- State management patterns

## ✅ Success Criteria

After running the tool:
- ✅ App runs immediately with `npm start`
- ✅ Navigation works between all screens
- ✅ Splash screen auto-navigates after 2 seconds
- ✅ Bottom tabs switch between Home, Profile, Settings
- ✅ All TypeScript types are properly configured
- ✅ No errors or warnings in console
- ✅ Ready to customize and build upon

## 🎯 CLI Output Example

```
🏗️  React Native Clean Architecture Scaffold

? This will create a complete React Native app with navigation and sample screens. Continue? Yes

📁 Creating directories...
   ✓ Created src/assets/images
   ✓ Created src/constants/sizings
   ... (all directories)

📝 Generating files...
   ✓ Created src/constants/sizings/SIZINGS.ts
   ✓ Created src/constants/styles/COLORS.ts
   ✓ Created src/navigation/stack/StackNavigation.tsx
   ✓ Created src/screens/splash/SplashScreen.tsx
   ... (all files)

📦 Checking dependencies...
   ⚠ Missing required navigation dependencies
? Would you like to install them now? Yes
   Installing dependencies...
   ✓ Dependencies installed successfully!

✅ Clean architecture structure created successfully!
🎉 Your app is ready to run!

📂 What was created:
   ✓ Complete directory structure
   ✓ 4 sample screens (Splash, Home, Profile, Settings)
   ✓ Navigation setup (Stack + Bottom Tabs)
   ✓ Hooks, styles, and constants
   ✓ Updated App.tsx ready to run

📋 Next steps:
   1. Review PROJECT_ARCHITECTURE.md for complete guidelines
   2. Run: npm start (or yarn start)
   3. Your app now has complete navigation and sample screens!
```

## 📝 License

MIT © Khizar

## 💡 Feedback & Suggestions

Found a bug or have a suggestion? Please email: **khizaralam20@gmail.com**

## 🌟 Show Your Support

If this package helped you build better React Native apps, consider sharing it with others!

---

**Made with ❤️ for the React Native community**
