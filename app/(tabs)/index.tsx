import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Chip, Searchbar, Surface } from 'react-native-paper';
import { propertiesData, propertyTypes } from '../../constants/PropertiesData';

const { width, height } = Dimensions.get('window');

// Use first 3 properties as featured
const featuredProperties = propertiesData.slice(0, 3);

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handlePropertyPress = (propertyId: number) => {
    router.push(`/property/${propertyId}`);
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent('مرحباً! أنا مهتم بالعقارات المعروضة.');
    const phoneNumber = '+966501234567';
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    console.log('Open WhatsApp:', url);
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
            <MaterialIcons name="home" size={120} color="rgba(255,255,255,0.1)" />
          </View>
        </LinearGradient>

        {/* Search Section - Prominent & Accessible */}
        <View style={styles.searchContainer}>
          <Surface style={styles.searchSurface} elevation={4}>
            <View style={styles.searchContent}>
              <Searchbar
                placeholder="ابحث عن عقار في الرياض، جدة، الدمام..."
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchBar}
                iconColor="#f59e0b"
                inputStyle={styles.searchInput}
              />
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.filterScroll}>
                {propertyTypes.map((type, index) => (
                  <TouchableOpacity key={type} style={styles.filterChip}>
                    <Chip 
                      mode="flat" 
                      style={styles.chip}
                      textStyle={styles.chipText}>
                      {type}
                    </Chip>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Surface>
        </View>

        {/* Featured Properties - Visual Storytelling */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>عقارات مميزة</Text>
              <Text style={styles.sectionSubtitle}>اختر من بين أفضل العقارات المختارة</Text>
            </View>
            <TouchableOpacity 
              onPress={() => router.push('/(tabs)/properties')}
              style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>عرض الكل</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#f59e0b" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredProperties.map((property) => (
              <TouchableOpacity
                key={property.id}
                onPress={() => handlePropertyPress(property.id)}
                style={styles.propertyCard}>
                <Surface style={styles.propertySurface} elevation={4}>
                  <View style={styles.propertyImageContainer}>
                    <Image source={{ uri: property.image }} style={styles.propertyImage} />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.7)']}
                      style={styles.imageOverlay}>
                      <View style={styles.propertyBadge}>
                        <Chip mode="flat" style={styles.statusChip}>
                          {property.status}
                        </Chip>
                      </View>
                    </LinearGradient>
                  </View>
                  
                  <View style={styles.propertyContent}>
                    <View style={styles.propertyHeader}>
                      <Chip mode="flat" style={styles.typeChip}>
                        {property.type}
                      </Chip>
                      <Text style={styles.propertyPrice}>{property.price}</Text>
                    </View>
                    
                    <Text style={styles.propertyTitle} numberOfLines={1}>
                      {property.title}
                    </Text>
                    
                    <View style={styles.propertyLocation}>
                      <MaterialIcons name="location-on" size={16} color="#6b7280" />
                      <Text style={styles.locationText} numberOfLines={1}>
                        {property.location}
                      </Text>
                    </View>
                    
                    <View style={styles.propertyDetails}>
                      <View style={styles.detailItem}>
                        <MaterialIcons name="bed" size={18} color="#f59e0b" />
                        <Text style={styles.detailText}>{property.bedrooms}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <MaterialIcons name="bathroom" size={18} color="#f59e0b" />
                        <Text style={styles.detailText}>{property.bathrooms}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <MaterialIcons name="square-foot" size={18} color="#f59e0b" />
                        <Text style={styles.detailText}>{property.sqft} م²</Text>
                      </View>
                    </View>
                    
                    <TouchableOpacity
                      onPress={() => handleWhatsAppContact()}
                      style={styles.propertyCTA}>
                      <LinearGradient
                        colors={['#10b981', '#059669']}
                        style={styles.propertyButton}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}>
                        <MaterialIcons name="chat" size={16} color="#ffffff" />
                        <Text style={styles.propertyButtonText}>تواصل الآن</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </Surface>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Contact - Compelling CTA */}
        <View style={styles.contactSection}>
          <Surface style={styles.contactSurface} elevation={4}>
            <LinearGradient
              colors={['#fef3c7', '#fde68a']}
              style={styles.contactGradient}>
              <View style={styles.contactContent}>
                <View style={styles.contactIcon}>
                  <MaterialIcons name="support-agent" size={40} color="#92400e" />
                </View>
                <View style={styles.contactText}>
                  <Text style={styles.contactTitle}>تحتاج مساعدة؟</Text>
                  <Text style={styles.contactSubtitle}>
                    تواصل مع خبرائنا للحصول على استشارة مجانية
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={handleWhatsAppContact}
                  style={styles.contactCTA}>
                  <LinearGradient
                    colors={['#25d366', '#128c7e']}
                    style={styles.whatsappButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <MaterialIcons name="chat" size={20} color="#ffffff" />
                    <Text style={styles.whatsappButtonText}>تواصل فوري</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </Surface>
        </View>

        {/* Trust Indicators */}
        <View style={styles.trustSection}>
          <Text style={styles.trustTitle}>لماذا تختار ريعة؟</Text>
          <View style={styles.trustGrid}>
            <View style={styles.trustItem}>
              <View style={styles.trustIcon}>
                <MaterialIcons name="verified" size={32} color="#10b981" />
              </View>
              <Text style={styles.trustLabel}>عقارات موثقة</Text>
            </View>
            <View style={styles.trustItem}>
              <View style={styles.trustIcon}>
                <MaterialIcons name="security" size={32} color="#3b82f6" />
              </View>
              <Text style={styles.trustLabel}>ضمان الجودة</Text>
            </View>
            <View style={styles.trustItem}>
              <View style={styles.trustIcon}>
                <MaterialIcons name="support-agent" size={32} color="#f59e0b" />
              </View>
              <Text style={styles.trustLabel}>دعم 24/7</Text>
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
  heroSection: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
    minHeight: height * 0.6,
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
    marginBottom: 40,
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
    width: '100%',
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  heroButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 12,
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
  searchContainer: {
    marginTop: -30,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  searchSurface: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  searchContent: {
    padding: 20,
  },
  searchBar: {
    backgroundColor: '#f1f5f9',
    borderRadius: 15,
    elevation: 0,
    marginBottom: 16,
  },
  searchInput: {
    fontSize: 16,
    color: '#1f2937',
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    marginRight: 12,
  },
  chip: {
    backgroundColor: '#fef3c7',
    borderColor: '#f59e0b',
  },
  chipText: {
    color: '#92400e',
    fontWeight: '600',
  },
  section: {
    padding: 20,
    paddingTop: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 22,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  seeAllText: {
    color: '#92400e',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  propertyCard: {
    width: width * 0.85,
    marginRight: 16,
  },
  propertySurface: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  propertyImageContainer: {
    position: 'relative',
    height: 200,
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: 'flex-end',
    padding: 16,
  },
  propertyBadge: {
    alignSelf: 'flex-start',
  },
  statusChip: {
    backgroundColor: '#dcfce7',
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
  typeChip: {
    backgroundColor: '#dbeafe',
  },
  propertyPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    lineHeight: 24,
  },
  propertyLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 6,
    flex: 1,
  },
  propertyDetails: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
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
    overflow: 'hidden',
  },
  contactGradient: {
    padding: 24,
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
    lineHeight: 20,
  },
  contactCTA: {
    marginLeft: 16,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 2,
  },
  whatsappButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  trustSection: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  trustTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 24,
  },
  trustGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  trustItem: {
    alignItems: 'center',
    flex: 1,
  },
  trustIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  trustLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    textAlign: 'center',
  },
});
