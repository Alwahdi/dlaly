import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { StyleSheet, useColorScheme, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1e40af',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e7eb',
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 12,
          paddingTop: 12,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        headerStyle: {
          backgroundColor: '#0f172a',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'الرئيسية',
          headerTitle: 'عقارات الرياض',
          headerBackground: () => (
            <LinearGradient
              colors={['#0f172a', '#1e293b']}
              style={StyleSheet.absoluteFillObject}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              {focused ? (
                <LinearGradient
                  colors={['#1e40af', '#1e3a8a']}
                  style={styles.activeIconBackground}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}>
                  <MaterialIcons name="home" size={24} color="#ffffff" />
                </LinearGradient>
              ) : (
                <MaterialIcons name="home" size={24} color={color} />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="properties"
        options={{
          title: 'العقارات',
          headerTitle: 'تصفح العقارات',
          headerBackground: () => (
            <LinearGradient
              colors={['#0f172a', '#1e293b']}
              style={StyleSheet.absoluteFillObject}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              {focused ? (
                <LinearGradient
                  colors={['#1e40af', '#1e3a8a']}
                  style={styles.activeIconBackground}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}>
                  <MaterialIcons name="apartment" size={24} color="#ffffff" />
                </LinearGradient>
              ) : (
                <MaterialIcons name="apartment" size={24} color={color} />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'الخريطة',
          headerTitle: 'خريطة العقارات',
          headerBackground: () => (
            <LinearGradient
              colors={['#0f172a', '#1e293b']}
              style={StyleSheet.absoluteFillObject}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              {focused ? (
                <LinearGradient
                  colors={['#1e40af', '#1e3a8a']}
                  style={styles.activeIconBackground}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}>
                  <MaterialIcons name="map" size={24} color="#ffffff" />
                </LinearGradient>
              ) : (
                <MaterialIcons name="map" size={24} color={color} />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'اتصل بنا',
          headerTitle: 'تواصل معنا',
          headerBackground: () => (
            <LinearGradient
              colors={['#0f172a', '#1e293b']}
              style={StyleSheet.absoluteFillObject}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              {focused ? (
                <LinearGradient
                  colors={['#1e40af', '#1e3a8a']}
                  style={styles.activeIconBackground}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}>
                  <MaterialIcons name="contact-phone" size={24} color="#ffffff" />
                </LinearGradient>
              ) : (
                <MaterialIcons name="contact-phone" size={24} color={color} />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#1e40af',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
