import { Stack } from 'expo-router';
import { I18nManager, StatusBar, useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';

// Force RTL for Arabic
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Custom theme with our design system colors
  const customLightTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#1e40af',
      secondary: '#f59e0b',
      surface: '#ffffff',
      background: '#f8fafc',
      error: '#ef4444',
      onPrimary: '#ffffff',
      onSecondary: '#ffffff',
      onSurface: '#1f2937',
      onBackground: '#1f2937',
    },
  };

  const customDarkTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: '#1e40af',
      secondary: '#f59e0b',
      surface: '#1f2937',
      background: '#0f172a',
      error: '#ef4444',
      onPrimary: '#ffffff',
      onSecondary: '#ffffff',
      onSurface: '#ffffff',
      onBackground: '#ffffff',
    },
  };

  return (
    <PaperProvider theme={colorScheme === 'dark' ? customDarkTheme : customLightTheme}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#0f172a"
        translucent={false}
      />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0f172a',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          contentStyle: {
            backgroundColor: colorScheme === 'dark' ? '#0f172a' : '#f8fafc',
          },
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="+not-found" 
          options={{ 
            title: 'الصفحة غير موجودة',
            headerTitle: 'خطأ 404'
          }} 
        />
      </Stack>
    </PaperProvider>
  );
}
