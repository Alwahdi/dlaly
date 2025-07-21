import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Searchbar, Surface } from 'react-native-paper';
import { propertiesData, propertyTypes } from '../../constants/PropertiesData';

const { width, height } = Dimensions.get('window');

// Use first 3 properties as featured
const featuredProperties = propertiesData.slice(0, 3);

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageLoading, setImageLoading] = useState<{[key: number]: boolean}>({});
  const router = useRouter();

  const handlePropertyPress = (propertyId: number) => {
    router.push(`/property/${propertyId}`);
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent('مرحباً! أنا مهتم بالعقارات المعروضة.');
    const phoneNumber = '+966501234567';
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Actually open WhatsApp
    const Linking = require('react-native').Linking;
    Linking.canOpenURL(url).then((supported: boolean) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('WhatsApp not installed');
      }
    });
  };

  const handleImageLoad = (index: number) => {
    setImageLoading(prev => ({ ...prev, [index]: false }));
  };

  const handleImageLoadStart = (index: number) => {
    setImageLoading(prev => ({ ...prev, [index]: true }));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Hero Section - Emotional & Compelling */}
        <LinearGradient
          colors={['#0f172a', '#1e293b', '#334155']}
          style={styles.heroSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <MaterialIcons name="star" size={16} color="#fbbf24" />
              <Text style={styles.heroBadgeText}>الوكالة العقارية الأولى</Text>
            </View>
            
            <Text style={styles.heroTitle}>
              اكتشف منزل أحلامك
            </Text>
            <Text style={styles.heroSubtitle}>
              عقارات فاخرة في أفضل المواقع مع ضمان الجودة والثقة
            </Text>
            
            <View style={styles.heroStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>500+</Text>
                <Text style={styles.statLabel}>عميل سعيد</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>200+</Text>
                <Text style={styles.statLabel}>عقار مباع</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>15+</Text>
                <Text style={styles.statLabel}>سنة خبرة</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => router.push('/(tabs)/properties')}
              style={styles.heroCTA}>
              <LinearGradient
                colors={['#f59e0b', '#d97706']}
                style={styles.heroButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Text style={styles.heroButtonText}>تصفح العقارات المميزة</Text>
                <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          
          <View style={styles.heroDecoration}>
            <View style={styles.decorationCircle1} />
            <View style={styles.decorationCircle2} />
          </View>
        </LinearGradient>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <Surface style={styles.searchSurface} elevation={4}>
            <View style={styles.searchContent}>
              <Searchbar
                placeholder="ابحث عن عقار، موقع، أو نوع..."
                placeholderTextColor="#9ca3af"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchBar}
                iconColor="#6b7280"
                inputStyle={styles.searchInput}
              />
              
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterChips}>
                {propertyTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={styles.filterChip}>
                    <LinearGradient
                      colors={['#f1f5f9', '#e2e8f0']}
                      style={styles.chipGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}>
                      <Text style={styles.chipText}>{type}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Surface>
        </View>

        {/* Featured Properties */}
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>العقارات المميزة</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/properties')}>
              <Text style={styles.viewAllText}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.propertiesGrid}>
            {featuredProperties.map((property, index) => (
              <TouchableOpacity
                key={property.id}
                onPress={() => handlePropertyPress(property.id)}
                style={styles.propertyCard}>
                <Surface style={styles.propertySurface} elevation={4}>
                  <View style={styles.propertyImageContainer}>
                    {imageLoading[index] && (
                      <View style={styles.imageLoadingContainer}>
                        <ActivityIndicator size="large" color="#f59e0b" />
                      </View>
                    )}
                    <Image 
                      source={{ uri: property.image }} 
                      style={styles.propertyImage}
                      resizeMode="cover"
                      onLoadStart={() => handleImageLoadStart(index)}
                      onLoad={() => handleImageLoad(index)}
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.8)']}
                      style={styles.imageOverlay}>
                      <View style={styles.propertyBadge}>
                        <View style={styles.statusChipContainer}>
                          <LinearGradient
                            colors={['#dcfce7', '#bbf7d0']}
                            style={styles.statusChipGradient}>
                            <Text style={styles.statusChipText}>{property.status}</Text>
                          </LinearGradient>
                        </View>
                      </View>
                    </LinearGradient>
                  </View>
                  
                  <View style={styles.propertyContent}>
                    <View style={styles.propertyHeader}>
                      <View style={styles.typeChipContainer}>
                        <LinearGradient
                          colors={['#dbeafe', '#bfdbfe']}
                          style={styles.typeChipGradient}>
                          <Text style={styles.typeChipText}>{property.type}</Text>
                        </LinearGradient>
                      </View>
                    </View>
                    
                    <Text style={styles.propertyTitle}>{property.title}</Text>
                    <Text style={styles.propertyLocation}>{property.location}</Text>
                    
                    <View style={styles.propertyDetails}>
                      <View style={styles.propertyDetail}>
                        <MaterialIcons name="bed" size={16} color="#6b7280" />
                        <Text style={styles.detailText}>{property.bedrooms}</Text>
                      </View>
                      <View style={styles.propertyDetail}>
                        <MaterialIcons name="bathroom" size={16} color="#6b7280" />
                        <Text style={styles.detailText}>{property.bathrooms}</Text>
                      </View>
                      <View style={styles.propertyDetail}>
                        <MaterialIcons name="square-foot" size={16} color="#6b7280" />
                        <Text style={styles.detailText}>{property.sqft}م²</Text>
                      </View>
                    </View>
                    
                    <Text style={styles.propertyPrice}>{property.price}</Text>
                    
                    <TouchableOpacity
                      onPress={() => handlePropertyPress(property.id)}
                      style={styles.propertyCTA}>
                      <LinearGradient
                        colors={['#1e40af', '#1e3a8a']}
                        style={styles.propertyButton}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}>
                        <Text style={styles.propertyButtonText}>عرض التفاصيل</Text>
                        <MaterialIcons name="arrow-forward" size={16} color="#ffffff" />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </Surface>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Surface style={styles.contactSurface} elevation={4}>
            <LinearGradient
              colors={['#fef3c7', '#fde68a']}
              style={styles.contactGradient}>
              <View style={styles.contactContent}>
                <View style={styles.contactIcon}>
                  <MaterialIcons name="support-agent" size={32} color="#92400e" />
                </View>
                <View style={styles.contactText}>
                  <Text style={styles.contactTitle}>تحتاج مساعدة؟</Text>
                  <Text style={styles.contactSubtitle}>فريقنا متاح 24/7 لمساعدتك</Text>
                </View>
                <TouchableOpacity
                  onPress={handleWhatsAppContact}
                  style={styles.contactCTA}>
                  <LinearGradient
                    colors={['#25d366', '#128c7e']}
                    style={styles.whatsappButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <Text style={styles.whatsappButtonText}>تواصل معنا</Text>
                    <MaterialIcons name="chat" size={20} color="#ffffff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </Surface>
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
  heroSection: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    position: 'relative',
  },
  heroContent: {
    alignItems: 'center',
    zIndex: 2,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
  },
  heroBadgeText: {
    color: '#fbbf24',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 44,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#cbd5e1',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  heroCTA: {
    marginTop: 32,
    width: '100%',
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 4,
  },
  heroButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 8,
  },
  heroDecoration: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  decorationCircle1: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    top: -20,
    right: -20,
  },
  decorationCircle2: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    bottom: 20,
    left: 20,
  },
  searchSection: {
    padding: 20,
    marginTop: -20,
  },
  searchSurface: {
    borderRadius: 20,
  },
  searchContent: {
    padding: 20,
  },
  searchBar: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    elevation: 2,
  },
  searchInput: {
    fontSize: 16,
    color: '#1f2937',
    textAlign: 'right',
  },
  filterChips: {
    marginTop: 16,
  },
  filterChip: {
    marginRight: 12,
  },
  chipGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  featuredSection: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  viewAllText: {
    fontSize: 16,
    color: '#f59e0b',
    fontWeight: '600',
  },
  propertiesGrid: {
    gap: 20,
  },
  propertyCard: {
    marginBottom: 20,
  },
  propertySurface: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  propertyImageContainer: {
    position: 'relative',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageLoadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  propertyImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: 16,
  },
  propertyBadge: {
    alignSelf: 'flex-start',
  },
  statusChipContainer: {
    borderRadius: 12,
  },
  statusChipGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusChipText: {
    color: '#166534',
    fontSize: 12,
    fontWeight: 'bold',
  },
  propertyContent: {
    padding: 20,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeChipContainer: {
    borderRadius: 12,
  },
  typeChipGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  typeChipText: {
    color: '#1e40af',
    fontSize: 12,
    fontWeight: 'bold',
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  propertyDetails: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 16,
  },
  propertyDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
  },
  propertyPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginBottom: 16,
  },
  propertyCTA: {
    width: '100%',
  },
  propertyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 2,
  },
  propertyButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  contactSection: {
    padding: 20,
    paddingTop: 40,
  },
  contactSurface: {
    borderRadius: 20,
    elevation: 4,
  },
  contactGradient: {
    padding: 24,
    borderRadius: 20,
  },
  contactContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    marginRight: 16,
  },
  contactText: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#92400e',
    opacity: 0.8,
  },
  contactCTA: {
    borderRadius: 25,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  whatsappButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 8,
  },
});
