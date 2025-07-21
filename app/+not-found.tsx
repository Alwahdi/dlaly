import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, Stack } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Surface } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'الصفحة غير موجودة' }} />
      
      <LinearGradient
        colors={['#0f172a', '#1e293b', '#334155']}
        style={styles.heroSection}>
        <View style={styles.heroContent}>
          <View style={styles.errorIcon}>
            <MaterialIcons name="error-outline" size={120} color="#fbbf24" />
          </View>
          
          <Text style={styles.errorTitle}>404</Text>
          <Text style={styles.errorSubtitle}>عذراً، الصفحة غير موجودة</Text>
          <Text style={styles.errorDescription}>
            يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها
          </Text>
          
          <View style={styles.errorStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>500+</Text>
              <Text style={styles.statLabel}>عقار متاح</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>دعم متواصل</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.heroDecoration}>
          <View style={styles.decorationCircle1} />
          <View style={styles.decorationCircle2} />
        </View>
      </LinearGradient>

      {/* Action Section */}
      <View style={styles.actionSection}>
        <Surface style={styles.actionSurface} elevation={4}>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>ماذا تريد أن تفعل؟</Text>
            <Text style={styles.actionSubtitle}>
              اختر من الخيارات التالية للعودة إلى التصفح
            </Text>
            
            <View style={styles.actionButtons}>
              <Link href="/(tabs)" asChild>
                <TouchableOpacity style={styles.primaryButton}>
                  <LinearGradient
                    colors={['#f59e0b', '#d97706']}
                    style={styles.primaryButtonGradient}>
                    <MaterialIcons name="home" size={20} color="#ffffff" />
                    <Text style={styles.primaryButtonText}>العودة للرئيسية</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Link>
              
              <Link href="/(tabs)/properties" asChild>
                <TouchableOpacity style={styles.secondaryButton}>
                  <LinearGradient
                    colors={['#3b82f6', '#1e40af']}
                    style={styles.secondaryButtonGradient}>
                    <MaterialIcons name="search" size={20} color="#ffffff" />
                    <Text style={styles.secondaryButtonText}>تصفح العقارات</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Link>
              
              <Link href="/(tabs)/contact" asChild>
                <TouchableOpacity style={styles.tertiaryButton}>
                  <LinearGradient
                    colors={['#10b981', '#059669']}
                    style={styles.tertiaryButtonGradient}>
                    <MaterialIcons name="support-agent" size={20} color="#ffffff" />
                    <Text style={styles.tertiaryButtonText}>تواصل معنا</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </Surface>
      </View>

      {/* Help Section */}
      <View style={styles.helpSection}>
        <Surface style={styles.helpSurface} elevation={4}>
          <View style={styles.helpContent}>
            <View style={styles.helpIcon}>
              <MaterialIcons name="help-outline" size={40} color="#92400e" />
            </View>
            <View style={styles.helpText}>
              <Text style={styles.helpTitle}>تحتاج مساعدة؟</Text>
              <Text style={styles.helpSubtitle}>
                فريق الدعم متاح على مدار الساعة لمساعدتك
              </Text>
            </View>
            <TouchableOpacity style={styles.helpButton}>
              <LinearGradient
                colors={['#25d366', '#128c7e']}
                style={styles.helpButtonGradient}>
                <MaterialIcons name="chat" size={20} color="#ffffff" />
                <Text style={styles.helpButtonText}>تواصل فوري</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Surface>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  heroSection: {
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
    minHeight: height * 0.5,
  },
  heroContent: {
    alignItems: 'center',
    zIndex: 2,
  },
  errorIcon: {
    marginBottom: 24,
  },
  errorTitle: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 16,
  },
  errorSubtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorDescription: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  errorStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  statLabel: {
    fontSize: 12,
    color: '#cbd5e1',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 20,
  },
  heroDecoration: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  decorationCircle1: {
    position: 'absolute',
    top: 50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
  },
  decorationCircle2: {
    position: 'absolute',
    bottom: 50,
    left: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  actionSection: {
    padding: 20,
    marginTop: -20,
  },
  actionSurface: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  actionContent: {
    padding: 24,
  },
  actionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  actionSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  actionButtons: {
    gap: 16,
  },
  primaryButton: {
    borderRadius: 25,
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 25,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  secondaryButton: {
    borderRadius: 25,
  },
  secondaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 25,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  tertiaryButton: {
    borderRadius: 25,
  },
  tertiaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 25,
  },
  tertiaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  helpSection: {
    padding: 20,
    paddingTop: 0,
  },
  helpSurface: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  helpContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fef3c7',
  },
  helpIcon: {
    marginRight: 16,
  },
  helpText: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 4,
  },
  helpSubtitle: {
    fontSize: 14,
    color: '#92400e',
    opacity: 0.8,
  },
  helpButton: {
    borderRadius: 20,
  },
  helpButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  helpButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 8,
  },
});
