# React Native Clean Architecture Guide

## 🎯 Architecture Principles

This project follows **Clean Architecture** principles to ensure:
- **Separation of Concerns**: Each part of the code has a single responsibility
- **Maintainability**: Easy to update and modify code
- **Testability**: Components and logic can be tested independently
- **Scalability**: Structure supports growth without refactoring

## 📁 Directory Structure

```
src/
├── assets/              # Static resources
│   ├── images/          # Image files
│   ├── fonts/           # Custom fonts
│   └── icons/           # Icon files
├── components/          # Reusable UI components
│   └── common/          # Shared components across the app
├── constants/           # Application constants
│   ├── sizings/         # Size-related constants
│   │   └── SIZINGS.ts
│   └── styles/          # Color and theme constants
│       └── COLORS.ts
├── hooks/               # Custom React hooks (business logic)
├── navigation/          # Navigation configuration
│   ├── stack/           # Stack navigator configurations
│   └── bottom/          # Bottom tab navigator configurations
├── screens/             # Screen components (UI only)
├── state/               # State management
│   ├── zustand/         # Zustand stores
│   └── context/         # React Context providers
├── styles/              # StyleSheet definitions
├── types/               # TypeScript type definitions
│   └── Type.ts
└── utils/               # Utility functions
```

## 🏗️ Architecture Patterns

### 1. Screen Component Pattern

**Screens are PRESENTATION ONLY** - they only render UI and handle user interactions by calling hook functions.

**File Structure:**
```
src/
├── screens/
│   └── home/
│       └── HomeScreen.tsx
├── hooks/
│   └── home/
│       └── useHomeLogic.ts
├── styles/
│   └── home/
│       └── home.styles.ts
└── constants/
    └── home/
        └── home.constants.ts
```

**Example HomeScreen.tsx:**
```typescript
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useHomeLogic } from '../../hooks/home/useHomeLogic';
import { styles } from '../../styles/home/home.styles';

export const HomeScreen: React.FC = () => {
  const { data, loading, handleRefresh } = useHomeLogic();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <TouchableOpacity onPress={handleRefresh}>
        <Text>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};
```

**Example useHomeLogic.ts:**
```typescript
import { useState, useEffect } from 'react';
import { HOME_CONSTANTS } from '../../constants/home/home.constants';

export const useHomeLogic = () => {
  const [data, setData] = useState({ title: HOME_CONSTANTS.DEFAULT_TITLE });
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    // Business logic here
    setLoading(false);
  };

  useEffect(() => {
    // Initial data fetch
  }, []);

  return {
    data,
    loading,
    handleRefresh,
  };
};
```

**Example home.styles.ts:**
```typescript
import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles/COLORS';
import { SIZINGS } from '../../constants/sizings/SIZINGS';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colors.background,
    padding: SIZINGS.spacing.md,
  },
  title: {
    fontSize: SIZINGS.fontSizings.large_3,
    color: COLORS.colors.text,
  },
});
```

**Example home.constants.ts:**
```typescript
export const HOME_CONSTANTS = {
  DEFAULT_TITLE: 'Welcome Home',
  MAX_ITEMS: 10,
  REFRESH_INTERVAL: 5000,
};
```

### 2. Component Pattern

**Components should be PURE and REUSABLE**.

**File Structure:**
```
src/
├── components/
│   └── button/
│       └── CustomButton.tsx
└── styles/
    └── components/
        └── button.styles.ts
```

**Example CustomButton.tsx:**
```typescript
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../../styles/components/button.styles';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant]]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
```

### 3. State Management Pattern

Use **Zustand** for global state and **React Context** for feature-specific state.

**Zustand Store Example:**
```typescript
// src/state/zustand/authStore.ts
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```

### 4. Navigation Pattern

**Stack Navigation Example:**
```typescript
// src/navigation/stack/MainStack.tsx
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../../screens/home/HomeScreen';
import { RootStackParamList } from '../../types/Type';

const Stack = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
```

## 🚫 NO Barrel Exports

**NEVER use index.ts files for re-exporting.**

❌ **Bad:**
```typescript
// src/components/index.ts
export { CustomButton } from './button/CustomButton';
export { CustomInput } from './input/CustomInput';
```

✅ **Good:**
```typescript
// Direct imports
import { CustomButton } from '../../components/button/CustomButton';
import { CustomInput } from '../../components/input/CustomInput';
```

## 📝 Naming Conventions

### Files
- **Screens**: `PascalCase` + `Screen` suffix → `HomeScreen.tsx`
- **Components**: `PascalCase` → `CustomButton.tsx`
- **Hooks**: `camelCase` + `use` prefix → `useHomeLogic.ts`
- **Styles**: `camelCase` + `.styles` suffix → `home.styles.ts`
- **Constants**: `camelCase` + `.constants` suffix → `home.constants.ts`
- **Types**: `PascalCase` → `Type.ts`

### Variables
- **Components**: `PascalCase` → `CustomButton`
- **Hooks**: `camelCase` + `use` prefix → `useHomeLogic`
- **Constants**: `SCREAMING_SNAKE_CASE` → `API_BASE_URL`
- **Functions**: `camelCase` → `handlePress`
- **Variables**: `camelCase` → `userData`

## 🎨 Styling Guidelines

1. **Always use constants** from `COLORS.ts` and `SIZINGS.ts`
2. **Create separate style files** for each screen/component
3. **Use StyleSheet.create()** for performance
4. **Group related styles** together

```typescript
export const styles = StyleSheet.create({
  // Container styles
  container: { ... },
  wrapper: { ... },

  // Text styles
  title: { ... },
  subtitle: { ... },

  // Button styles
  button: { ... },
  buttonText: { ... },
});
```

## 🔧 Best Practices

### 1. Keep Screens Simple
- Screens should ONLY contain JSX and call hook functions
- No business logic in screens
- No direct API calls in screens
- No complex calculations in screens

### 2. Use Custom Hooks
- All business logic goes in custom hooks
- Hooks handle state, side effects, and data fetching
- Hooks are reusable and testable

### 3. Separate Concerns
- **UI**: Screens and Components
- **Logic**: Hooks
- **Styles**: StyleSheets
- **Constants**: Constant files
- **Types**: Type definition files

### 4. Import Organization
```typescript
// 1. React and React Native imports
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

// 2. Third-party libraries
import { useNavigation } from '@react-navigation/native';

// 3. Hooks
import { useHomeLogic } from '../../hooks/home/useHomeLogic';

// 4. Components
import { CustomButton } from '../../components/button/CustomButton';

// 5. Styles
import { styles } from '../../styles/home/home.styles';

// 6. Constants and Types
import { HOME_CONSTANTS } from '../../constants/home/home.constants';
import { Navigation } from '../../types/Type';
```

### 5. Type Safety
- Always define TypeScript types and interfaces
- Use type inference when possible
- Avoid `any` type
- Define navigation types in `Type.ts`

## 🧪 Testing Strategy

### Unit Tests
- Test hooks independently
- Test utility functions
- Mock API calls

### Component Tests
- Test component rendering
- Test user interactions
- Mock hook return values

### Integration Tests
- Test screen flows
- Test navigation
- Test state management

## 📦 Recommended Packages

```json
{
  "dependencies": {
    "zustand": "^4.x.x",
    "@react-navigation/native": "^6.x.x",
    "@react-navigation/stack": "^6.x.x",
    "@react-navigation/bottom-tabs": "^6.x.x"
  }
}
```

## 🚀 Getting Started

1. Create a new screen following the pattern above
2. Implement the custom hook with business logic
3. Create styles using constants
4. Define any constants needed
5. Update navigation types in `Type.ts`
6. Add the screen to your navigator

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [Clean Architecture Principles](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

**Remember**: The goal is to keep code organized, maintainable, and scalable. Always follow these patterns and principles!
