import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Surface } from 'react-native-paper';
import { propertiesData } from '../../constants/PropertiesData';

const { width, height } = Dimensions.get('window');

export default function PropertyDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Find the property by ID
  const property = propertiesData.find(p => p.id === Number(id)) || propertiesData[0];

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(`مرحباً! أنا مهتم بـ ${property.title} مقابل ${property.price}`);
    const phoneNumber = property.agent.phone;
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('WhatsApp not installed');
      }
    });
  };

  const handlePhoneCall = () => {
    const phoneNumber = property.agent.phone;
    const url = `tel:${phoneNumber}`;
    
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Phone app not available');
      }
    });
  };

  const handleEmailContact = () => {
    const emailAddress = property.agent.email;
    const subject = encodeURIComponent(`استفسار عن ${property.title}`);
    const body = encodeURIComponent(`مرحباً، أود الاستفسار عن ${property.title} مقابل ${property.price}`);
    const url = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Email app not available');
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
                <Image 
                  source={{ uri: image }} 
                  style={styles.propertyImage}
                  resizeMode="cover"
                />
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
                    <MaterialIcons name="bed" size={20} color="#f59e0b" />
                  </View>
                  <Text style={styles.statValue}>{property.bedrooms}</Text>
                  <Text style={styles.statLabel}>غرف نوم</Text>
                </View>
                
                <View style={styles.statDivider} />
                
                <View style={styles.statItem}>
                  <View style={styles.statIcon}>
                    <MaterialIcons name="bathroom" size={20} color="#f59e0b" />
                  </View>
                  <Text style={styles.statValue}>{property.bathrooms}</Text>
                  <Text style={styles.statLabel}>حمام</Text>
                </View>
                
                <View style={styles.statDivider} />
                
                <View style={styles.statItem}>
                  <View style={styles.statIcon}>
                    <MaterialIcons name="square-foot" size={20} color="#f59e0b" />
                  </View>
                  <Text style={styles.statValue}>{property.sqft}</Text>
                  <Text style={styles.statLabel}>م²</Text>
                </View>
              </View>
            </View>
          </Surface>

          {/* Description Section */}
          <Surface style={styles.descriptionSurface} elevation={4}>
            <View style={styles.descriptionContent}>
              <Text style={styles.sectionTitle}>وصف العقار</Text>
              <Text style={styles.descriptionText}>{property.description}</Text>
            </View>
          </Surface>

          {/* Amenities Section */}
          <Surface style={styles.amenitiesSurface} elevation={4}>
            <View style={styles.amenitiesContent}>
              <Text style={styles.sectionTitle}>المرافق المتوفرة</Text>
              <View style={styles.amenitiesGrid}>
                {property.amenities.map((amenity, index) => (
                  <View key={index} style={styles.amenityItem}>
                    <View style={styles.amenityIcon}>
                      <MaterialIcons name="check-circle" size={16} color="#10b981" />
                    </View>
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Surface>

          {/* Agent Section */}
          <Surface style={styles.agentSurface} elevation={4}>
            <View style={styles.agentContent}>
              <Text style={styles.sectionTitle}>معلومات الوكيل</Text>
              
              <View style={styles.agentInfo}>
                <View style={styles.agentAvatar}>
                  <MaterialIcons name="person" size={32} color="#1e40af" />
                </View>
                <View style={styles.agentDetails}>
                  <Text style={styles.agentName}>{property.agent.name}</Text>
                  <Text style={styles.agentRole}>مستشار عقاري</Text>
                  <Text style={styles.agentPhone}>{property.agent.phone}</Text>
                  <Text style={styles.agentEmail}>{property.agent.email}</Text>
                </View>
              </View>
              
              <View style={styles.contactButtons}>
                <TouchableOpacity
                  onPress={handleWhatsAppContact}
                  style={styles.contactButton}>
                  <LinearGradient
                    colors={['#25d366', '#128c7e']}
                    style={styles.whatsappGradient}>
                    <MaterialIcons name="chat" size={20} color="#ffffff" />
                    <Text style={styles.contactButtonText}>واتساب</Text>
                  </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={handlePhoneCall}
                  style={styles.contactButton}>
                  <LinearGradient
                    colors={['#3b82f6', '#1e40af']}
                    style={styles.phoneGradient}>
                    <MaterialIcons name="phone" size={20} color="#ffffff" />
                    <Text style={styles.contactButtonText}>اتصال</Text>
                  </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={handleEmailContact}
                  style={styles.contactButton}>
                  <LinearGradient
                    colors={['#f59e0b', '#d97706']}
                    style={styles.emailGradient}>
                    <MaterialIcons name="email" size={20} color="#ffffff" />
                    <Text style={styles.contactButtonText}>إيميل</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </Surface>

          {/* Location Section */}
          {property.coordinate && (
            <Surface style={styles.locationSurface} elevation={4}>
              <View style={styles.locationContent}>
                <Text style={styles.sectionTitle}>الموقع</Text>
                <View style={styles.mapPlaceholder}>
                  <MaterialIcons name="map" size={48} color="#6b7280" />
                  <Text style={styles.mapText}>خريطة الموقع</Text>
                </View>
                <TouchableOpacity
                  onPress={handleDirections}
                  style={styles.directionsButton}>
                  <LinearGradient
                    colors={['#10b981', '#059669']}
                    style={styles.directionsGradient}>
                    <MaterialIcons name="directions" size={20} color="#ffffff" />
                    <Text style={styles.directionsText}>احصل على الاتجاهات</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Surface>
          )}
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
  imageContainer: {
    position: 'relative',
    height: height * 0.5,
  },
  imageWrapper: {
    width: width,
    height: height * 0.5,
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: 20,
  },
  imageContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  backButton: {
    borderRadius: 20,
  },
  backButtonGradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  headerBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBadge: {
    borderRadius: 12,
  },
  statusGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#166534',
    fontSize: 12,
    fontWeight: 'bold',
  },
  typeBadge: {
    borderRadius: 12,
  },
  typeGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
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
    borderRadius: 12,
  },
  priceGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  propertyPrice: {
    color: '#fbbf24',
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeIndicator: {
    width: 24,
  },
  indicatorGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  contentContainer: {
    padding: 20,
    gap: 20,
  },
  headerSurface: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  headerContent: {
    padding: 20,
  },
  propertyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
    lineHeight: 32,
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
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb',
  },
  descriptionSurface: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  descriptionContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  amenitiesSurface: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  amenitiesContent: {
    padding: 20,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: '45%',
  },
  amenityIcon: {
    marginRight: 8,
  },
  amenityText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  agentSurface: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  agentContent: {
    padding: 20,
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
  },
  agentAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  agentDetails: {
    flex: 1,
  },
  agentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  agentRole: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  agentPhone: {
    fontSize: 14,
    color: '#3b82f6',
    marginBottom: 2,
  },
  agentEmail: {
    fontSize: 14,
    color: '#6b7280',
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    flex: 1,
    borderRadius: 25,
  },
  whatsappGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
  },
  phoneGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
  },
  emailGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  locationSurface: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  locationContent: {
    padding: 20,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  mapText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
  },
  directionsButton: {
    borderRadius: 25,
  },
  directionsGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
  },
  directionsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
}); 