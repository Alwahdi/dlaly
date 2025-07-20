import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Divider, Surface } from 'react-native-paper';
import { propertiesData } from '../../constants/PropertiesData';

const { width, height } = Dimensions.get('window');

export default function PropertyDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const property = propertiesData.find(p => p.id === Number(id));

  if (!property) {
    return (
      <View style={styles.errorContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
        <LinearGradient
          colors={['#0f172a', '#1e293b']}
          style={styles.errorGradient}>
          <View style={styles.errorContent}>
            <MaterialIcons name="error-outline" size={80} color="#fbbf24" />
            <Text style={styles.errorTitle}>العقار غير موجود</Text>
            <Text style={styles.errorSubtitle}>
              عذراً، العقار الذي تبحث عنه غير متاح حالياً
            </Text>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.errorButton}>
              <LinearGradient
                colors={['#1e40af', '#1e3a8a']}
                style={styles.errorButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <MaterialIcons name="arrow-back" size={20} color="#ffffff" />
                <Text style={styles.errorButtonText}>العودة للعقارات</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(`مرحباً! أنا مهتم بالعقار ${property.title} بسعر ${property.price}`);
    const phoneNumber = property.agent.phone;
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('خطأ', 'واتساب غير مثبت على هذا الجهاز');
      }
    });
  };

  const handlePhoneCall = () => {
    const url = `tel:${property.agent.phone}`;
    
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('خطأ', 'تطبيق الهاتف غير متاح');
      }
    });
  };

  const handleEmailContact = () => {
    const subject = encodeURIComponent(`استفسار عن ${property.title}`);
    const body = encodeURIComponent(`مرحباً ${property.agent.name}،\n\nأنا مهتم بالعقار ${property.title} بسعر ${property.price}.\n\nيرجى تزويدي بمزيد من المعلومات.\n\nشكراً لك.`);
    const url = `mailto:${property.agent.email}?subject=${subject}&body=${body}`;
    
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('خطأ', 'تطبيق البريد الإلكتروني غير متاح');
      }
    });
  };

  const handleDirections = () => {
    if (property.coordinate) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${property.coordinate.latitude},${property.coordinate.longitude}`;
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Hero Image Gallery */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}>
            {property.images.map((image, index) => (
              <View key={index} style={styles.imageWrapper}>
                <LinearGradient
                  colors={['rgba(0,0,0,0.3)', 'transparent', 'rgba(0,0,0,0.4)']}
                  style={styles.imageOverlay}>
                  <View style={styles.imageContent}>
                    <View style={styles.imageHeader}>
                      <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}>
                        <LinearGradient
                          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)']}
                          style={styles.backButtonGradient}>
                          <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
                        </LinearGradient>
                      </TouchableOpacity>
                      
                      <View style={styles.headerBadges}>
                        <View style={styles.statusBadge}>
                          <LinearGradient
                            colors={['#dcfce7', '#bbf7d0']}
                            style={styles.statusGradient}>
                            <Text style={styles.statusText}>{property.status}</Text>
                          </LinearGradient>
                        </View>
                        
                        <View style={styles.typeBadge}>
                          <LinearGradient
                            colors={['#dbeafe', '#bfdbfe']}
                            style={styles.typeGradient}>
                            <Text style={styles.typeText}>{property.type}</Text>
                          </LinearGradient>
                        </View>
                      </View>
                    </View>
                    
                    <View style={styles.imageFooter}>
                      <View style={styles.priceContainer}>
                        <LinearGradient
                          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)']}
                          style={styles.priceGradient}>
                          <Text style={styles.propertyPrice}>{property.price}</Text>
                        </LinearGradient>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
                <View style={styles.imageBackground}>
                  <View style={styles.actualImage} />
                </View>
              </View>
            ))}
          </ScrollView>
          
          {/* Image Indicators */}
          <View style={styles.imageIndicators}>
            {property.images.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.indicator,
                  index === currentImageIndex && styles.activeIndicator,
                ]}>
                <LinearGradient
                  colors={index === currentImageIndex ? ['#ffffff', '#f1f5f9'] : ['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.3)']}
                  style={styles.indicatorGradient}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Property Info */}
        <View style={styles.contentContainer}>
          {/* Header Section */}
          <Surface style={styles.headerSurface} elevation={4}>
            <View style={styles.headerContent}>
              <Text style={styles.propertyTitle}>{property.title}</Text>
              <View style={styles.locationContainer}>
                <MaterialIcons name="location-on" size={20} color="#1e40af" />
                <Text style={styles.locationText}>{property.location}</Text>
              </View>
              
              <View style={styles.propertyStats}>
                <View style={styles.statItem}>
                  <View style={styles.statIcon}>
                    <MaterialIcons name="bed" size={24} color="#1e40af" />
                  </View>
                  <Text style={styles.statNumber}>{property.bedrooms}</Text>
                  <Text style={styles.statLabel}>غرف نوم</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <View style={styles.statIcon}>
                    <MaterialIcons name="bathroom" size={24} color="#1e40af" />
                  </View>
                  <Text style={styles.statNumber}>{property.bathrooms}</Text>
                  <Text style={styles.statLabel}>حمامات</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <View style={styles.statIcon}>
                    <MaterialIcons name="square-foot" size={24} color="#1e40af" />
                  </View>
                  <Text style={styles.statNumber}>{property.sqft}</Text>
                  <Text style={styles.statLabel}>متر مربع</Text>
                </View>
              </View>
            </View>
          </Surface>

          {/* Description */}
          <Surface style={styles.descriptionSurface} elevation={4}>
            <View style={styles.descriptionContent}>
              <View style={styles.sectionHeader}>
                <MaterialIcons name="description" size={28} color="#1e40af" />
                <Text style={styles.sectionTitle}>وصف العقار</Text>
              </View>
              <Divider style={styles.divider} />
              <Text style={styles.descriptionText}>{property.description}</Text>
            </View>
          </Surface>

          {/* Amenities */}
          <Surface style={styles.amenitiesSurface} elevation={4}>
            <View style={styles.amenitiesContent}>
              <View style={styles.sectionHeader}>
                <MaterialIcons name="star" size={28} color="#1e40af" />
                <Text style={styles.sectionTitle}>المرافق المتوفرة</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.amenitiesGrid}>
                {property.amenities.map((amenity, index) => (
                  <View key={index} style={styles.amenityItem}>
                    <LinearGradient
                      colors={['#dcfce7', '#bbf7d0']}
                      style={styles.amenityGradient}>
                      <MaterialIcons name="check-circle" size={16} color="#166534" />
                      <Text style={styles.amenityText}>{amenity}</Text>
                    </LinearGradient>
                  </View>
                ))}
              </View>
            </View>
          </Surface>

          {/* Agent Information */}
          <Surface style={styles.agentSurface} elevation={4}>
            <View style={styles.agentContent}>
              <View style={styles.sectionHeader}>
                <MaterialIcons name="person" size={28} color="#1e40af" />
                <Text style={styles.sectionTitle}>معلومات المستشار</Text>
              </View>
              <Divider style={styles.divider} />
              
              <View style={styles.agentInfo}>
                <View style={styles.agentAvatar}>
                  <LinearGradient
                    colors={['#dbeafe', '#bfdbfe']}
                    style={styles.avatarGradient}>
                    <MaterialIcons name="person" size={48} color="#1e40af" />
                  </LinearGradient>
                </View>
                <View style={styles.agentDetails}>
                  <Text style={styles.agentName}>{property.agent.name}</Text>
                  <Text style={styles.agentRole}>مستشار عقاري</Text>
                  <View style={styles.agentContact}>
                    <View style={styles.contactItem}>
                      <MaterialIcons name="phone" size={16} color="#6b7280" />
                      <Text style={styles.contactText}>{property.agent.phone}</Text>
                    </View>
                    <View style={styles.contactItem}>
                      <MaterialIcons name="email" size={16} color="#6b7280" />
                      <Text style={styles.contactText}>{property.agent.email}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Surface>

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            <TouchableOpacity
              onPress={handleWhatsAppContact}
              style={styles.primaryAction}>
              <LinearGradient
                colors={['#25d366', '#128c7e']}
                style={styles.primaryActionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <MaterialIcons name="chat" size={24} color="#ffffff" />
                <Text style={styles.primaryActionText}>تواصل عبر واتساب</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <View style={styles.secondaryActions}>
              <TouchableOpacity
                onPress={handlePhoneCall}
                style={styles.secondaryAction}>
                <LinearGradient
                  colors={['#3b82f6', '#1e40af']}
                  style={styles.secondaryActionGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <MaterialIcons name="phone" size={20} color="#ffffff" />
                  <Text style={styles.secondaryActionText}>اتصال</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleEmailContact}
                style={styles.secondaryAction}>
                <LinearGradient
                  colors={['#f59e0b', '#d97706']}
                  style={styles.secondaryActionGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <MaterialIcons name="email" size={20} color="#ffffff" />
                  <Text style={styles.secondaryActionText}>بريد</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleDirections}
                style={styles.secondaryAction}>
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  style={styles.secondaryActionGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <MaterialIcons name="directions" size={20} color="#ffffff" />
                  <Text style={styles.secondaryActionText}>خريطة</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
  },
  errorGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorContent: {
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  errorSubtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  errorButton: {
    width: '100%',
  },
  errorButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 4,
  },
  errorButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  imageContainer: {
    height: height * 0.5,
    position: 'relative',
  },
  imageWrapper: {
    width: width,
    height: height * 0.5,
    position: 'relative',
  },
  imageBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1e293b',
  },
  actualImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#374151',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  imageContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  imageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 50,
  },
  backButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  backButtonGradient: {
    padding: 12,
    borderRadius: 20,
  },
  headerBadges: {
    flexDirection: 'row',
    gap: 10,
  },
  statusBadge: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  statusGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    color: '#166534',
    fontSize: 12,
    fontWeight: 'bold',
  },
  typeBadge: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  typeGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  typeText: {
    color: '#1e40af',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageFooter: {
    alignItems: 'flex-end',
  },
  priceContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  priceGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  propertyPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    zIndex: 3,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  indicatorGradient: {
    width: '100%',
    height: '100%',
  },
  activeIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  contentContainer: {
    padding: 20,
    gap: 20,
  },
  headerSurface: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  headerContent: {
    padding: 24,
  },
  propertyTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
    lineHeight: 36,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    color: '#6b7280',
    marginLeft: 8,
  },
  propertyStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    padding: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb',
  },
  descriptionSurface: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  descriptionContent: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 12,
  },
  divider: {
    marginBottom: 16,
    backgroundColor: '#e5e7eb',
  },
  descriptionText: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 26,
  },
  amenitiesSurface: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  amenitiesContent: {
    padding: 24,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  amenityGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  amenityText: {
    fontSize: 14,
    color: '#166534',
    fontWeight: '600',
  },
  agentSurface: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  agentContent: {
    padding: 24,
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentAvatar: {
    marginRight: 20,
  },
  avatarGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentDetails: {
    flex: 1,
  },
  agentName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  agentRole: {
    fontSize: 16,
    color: '#1e40af',
    marginBottom: 12,
  },
  agentContact: {
    gap: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#6b7280',
  },
  actionSection: {
    marginBottom: 40,
    gap: 16,
  },
  primaryAction: {
    width: '100%',
  },
  primaryActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 30,
    elevation: 4,
  },
  primaryActionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryAction: {
    flex: 1,
  },
  secondaryActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 25,
    elevation: 2,
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 6,
  },
}); 