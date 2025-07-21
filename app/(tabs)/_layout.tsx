import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { StyleSheet, useColorScheme, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide the top bar completely
        tabBarActiveTintColor: '#f59e0b',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e7eb',
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 15,
          paddingTop: 10,
          elevation: 12,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 12,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 6,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'الرئيسية',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              {focused ? (
                <LinearGradient
                  colors={['#f59e0b', '#d97706']}
                  style={styles.activeIconBackground}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}>
                  <MaterialIcons name="home" size={26} color="#ffffff" />
                </LinearGradient>
              ) : (
                <View style={styles.inactiveIconBackground}>
                  <MaterialIcons name="home" size={26} color={color} />
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="properties"
        options={{
          title: 'العقارات',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              {focused ? (
                <LinearGradient
                  colors={['#f59e0b', '#d97706']}
                  style={styles.activeIconBackground}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}>
                  <MaterialIcons name="apartment" size={26} color="#ffffff" />
                </LinearGradient>
              ) : (
                <View style={styles.inactiveIconBackground}>
                  <MaterialIcons name="apartment" size={26} color={color} />
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'الخريطة',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              {focused ? (
                <LinearGradient
                  colors={['#f59e0b', '#d97706']}
                  style={styles.activeIconBackground}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}>
                  <MaterialIcons name="map" size={26} color="#ffffff" />
                </LinearGradient>
              ) : (
                <View style={styles.inactiveIconBackground}>
                  <MaterialIcons name="map" size={26} color={color} />
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'اتصل بنا',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              {focused ? (
                <LinearGradient
                  colors={['#f59e0b', '#d97706']}
                  style={styles.activeIconBackground}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}>
                  <MaterialIcons name="contact-phone" size={26} color="#ffffff" />
                </LinearGradient>
              ) : (
                <View style={styles.inactiveIconBackground}>
                  <MaterialIcons name="contact-phone" size={26} color={color} />
                </View>
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
    width: 50,
    height: 50,
  },
  activeIconBackground: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#f59e0b',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  inactiveIconBackground: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(107, 114, 128, 0.1)',
  },
});
