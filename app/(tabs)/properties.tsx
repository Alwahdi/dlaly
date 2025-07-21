import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FAB, Searchbar, Surface } from 'react-native-paper';
import { propertiesData, propertyTypes } from '../../constants/PropertiesData';

const { width, height } = Dimensions.get('window');

export default function PropertiesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('الكل');
  const [properties, setProperties] = useState(propertiesData);
  const [imageLoading, setImageLoading] = useState<{[key: number]: boolean}>({});
  const router = useRouter();

  const handlePropertyPress = (property: any) => {
    router.push(`/property/${property.id}`);
  };

  const handleWhatsAppContact = (property: any) => {
    const message = encodeURIComponent(`مرحباً! أنا مهتم بـ ${property.title} مقابل ${property.price}`);
    const phoneNumber = property.agent.phone;
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

  const filterProperties = () => {
    let filtered = propertiesData;
    
    if (selectedType !== 'الكل') {
      filtered = filtered.filter(property => property.type === selectedType);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const handleImageLoad = (index: number) => {
    setImageLoading(prev => ({ ...prev, [index]: false }));
  };

  const handleImageLoadStart = (index: number) => {
    setImageLoading(prev => ({ ...prev, [index]: true }));
  };

  const renderPropertyCard = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      onPress={() => handlePropertyPress(item)}
      style={styles.propertyCard}>
      <Surface style={styles.propertySurface} elevation={4}>
        <View style={styles.propertyImageContainer}>
          {imageLoading[index] && (
            <View style={styles.imageLoadingContainer}>
              <ActivityIndicator size="large" color="#f59e0b" />
            </View>
          )}
          <Image 
            source={{ uri: item.image }} 
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
                  <Text style={styles.statusChipText}>{item.status}</Text>
                </LinearGradient>
              </View>
            </View>
            <View style={styles.propertyPriceOverlay}>
              <LinearGradient
                colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.7)']}
                style={styles.priceGradient}>
                <Text style={styles.priceOverlayText}>{item.price}</Text>
              </LinearGradient>
            </View>
          </LinearGradient>
        </View>
        
        <View style={styles.propertyContent}>
          <View style={styles.propertyHeader}>
            <View style={styles.propertyTypeContainer}>
              <View style={styles.typeChipContainer}>
                <LinearGradient
                  colors={['#dbeafe', '#bfdbfe']}
                  style={styles.typeChipGradient}>
                  <Text style={styles.typeChipText}>{item.type}</Text>
                </LinearGradient>
              </View>
            </View>
            <View style={styles.propertyRating}>
              <LinearGradient
                colors={['#fef3c7', '#fde68a']}
                style={styles.ratingGradient}>
                <MaterialIcons name="star" size={16} color="#92400e" />
                <Text style={styles.ratingText}>4.8</Text>
              </LinearGradient>
            </View>
          </View>
          
          <Text style={styles.propertyTitle}>{item.title}</Text>
          <Text style={styles.propertyLocation}>{item.location}</Text>
          
          <View style={styles.propertyDetails}>
            <View style={styles.propertyDetail}>
              <MaterialIcons name="bed" size={16} color="#6b7280" />
              <Text style={styles.detailText}>{item.bedrooms}</Text>
            </View>
            <View style={styles.propertyDetail}>
              <MaterialIcons name="bathroom" size={16} color="#6b7280" />
              <Text style={styles.detailText}>{item.bathrooms}</Text>
            </View>
            <View style={styles.propertyDetail}>
              <MaterialIcons name="square-foot" size={16} color="#6b7280" />
              <Text style={styles.detailText}>{item.sqft}م²</Text>
            </View>
          </View>
          
          <View style={styles.propertyActions}>
            <TouchableOpacity
              onPress={() => handlePropertyPress(item)}
              style={styles.viewButton}>
              <LinearGradient
                colors={['#1e40af', '#1e3a8a']}
                style={styles.viewButtonGradient}>
                <MaterialIcons name="visibility" size={16} color="#ffffff" />
                <Text style={styles.viewButtonText}>عرض</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => handleWhatsAppContact(item)}
              style={styles.contactButton}>
              <LinearGradient
                colors={['#25d366', '#128c7e']}
                style={styles.contactButtonGradient}>
                <MaterialIcons name="chat" size={16} color="#ffffff" />
                <Text style={styles.contactButtonText}>تواصل</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Surface>
    </TouchableOpacity>
  );

  const filteredProperties = filterProperties();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header Section */}
        <LinearGradient
          colors={['#0f172a', '#1e293b', '#334155']}
          style={styles.headerSection}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>تصفح العقارات</Text>
            <Text style={styles.headerSubtitle}>
              اكتشف مجموعة واسعة من العقارات المميزة
            </Text>
          </View>
        </LinearGradient>

        {/* Search & Filter Section */}
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
                {['الكل', ...propertyTypes].map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setSelectedType(type)}
                    style={styles.filterChip}>
                    <LinearGradient
                      colors={selectedType === type ? ['#f59e0b', '#d97706'] : ['#f1f5f9', '#e2e8f0']}
                      style={styles.chipGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}>
                      <Text style={[
                        styles.chipText,
                        selectedType === type && styles.selectedChipText
                      ]}>
                        {type}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Surface>
        </View>

        {/* Properties List */}
        <View style={styles.propertiesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {filteredProperties.length} عقار متاح
            </Text>
          </View>
          
          {filteredProperties.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialIcons name="search-off" size={80} color="#9ca3af" />
              <Text style={styles.emptyTitle}>لا توجد نتائج</Text>
              <Text style={styles.emptySubtitle}>
                جرب تغيير معايير البحث أو إزالة الفلاتر
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredProperties}
              renderItem={renderPropertyCard}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.propertiesList}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>

      {/* FAB for quick contact */}
      <FAB
        icon="chat"
        style={styles.fab}
        onPress={() => router.push('/(tabs)/contact')}
        color="#ffffff"
      />
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
  headerSection: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 24,
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
  selectedChipText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  propertiesSection: {
    padding: 20,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  propertiesList: {
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
    height: 220,
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
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
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
  propertyPriceOverlay: {
    alignSelf: 'flex-end',
    borderRadius: 12,
  },
  priceGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priceOverlayText: {
    color: '#fbbf24',
    fontSize: 16,
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
  propertyTypeContainer: {
    flex: 1,
  },
  typeChipContainer: {
    borderRadius: 12,
    alignSelf: 'flex-start',
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
  propertyRating: {
    borderRadius: 12,
  },
  ratingGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#92400e',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
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
    marginBottom: 16,
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
  propertyActions: {
    flexDirection: 'row',
    gap: 12,
  },
  viewButton: {
    flex: 1,
    borderRadius: 25,
  },
  viewButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  contactButton: {
    flex: 1,
    borderRadius: 25,
  },
  contactButtonGradient: {
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6b7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 24,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#f59e0b',
  },
}); 