import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Chip, FAB, Searchbar, Surface } from 'react-native-paper';
import { propertiesData, propertyTypes } from '../../constants/PropertiesData';

const { width, height } = Dimensions.get('window');

export default function PropertiesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('الكل');
  const [properties, setProperties] = useState(propertiesData);
  const router = useRouter();

  const handlePropertyPress = (property: any) => {
    router.push(`/property/${property.id}`);
  };

  const handleWhatsAppContact = (property: any) => {
    const message = encodeURIComponent(`مرحباً! أنا مهتم بـ ${property.title} مقابل ${property.price}`);
    const phoneNumber = property.agent.phone;
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    console.log('Open WhatsApp:', url);
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

  const renderPropertyCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => handlePropertyPress(item)}
      style={styles.propertyCard}>
      <Surface style={styles.propertySurface} elevation={4}>
        <View style={styles.propertyImageContainer}>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.imageOverlay}>
            <View style={styles.propertyBadge}>
              <Chip mode="flat" style={styles.statusChip}>
                {item.status}
              </Chip>
            </View>
            <View style={styles.propertyPriceOverlay}>
              <Text style={styles.priceOverlayText}>{item.price}</Text>
            </View>
          </LinearGradient>
        </View>
        
        <View style={styles.propertyContent}>
          <View style={styles.propertyHeader}>
            <View style={styles.propertyTypeContainer}>
              <Chip mode="flat" style={styles.typeChip}>
                {item.type}
              </Chip>
            </View>
            <View style={styles.propertyRating}>
              <MaterialIcons name="star" size={16} color="#fbbf24" />
              <Text style={styles.ratingText}>4.9</Text>
            </View>
          </View>
          
          <Text style={styles.propertyTitle} numberOfLines={1}>
            {item.title}
          </Text>
          
          <View style={styles.propertyLocation}>
            <MaterialIcons name="location-on" size={16} color="#6b7280" />
            <Text style={styles.locationText} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
          
          <View style={styles.propertyDetails}>
            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <MaterialIcons name="bed" size={18} color="#f59e0b" />
              </View>
              <Text style={styles.detailText}>{item.bedrooms}</Text>
            </View>
            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <MaterialIcons name="bathroom" size={18} color="#f59e0b" />
              </View>
              <Text style={styles.detailText}>{item.bathrooms}</Text>
            </View>
            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <MaterialIcons name="square-foot" size={18} color="#f59e0b" />
              </View>
              <Text style={styles.detailText}>{item.sqft} م²</Text>
            </View>
          </View>
          
          <View style={styles.agentInfo}>
            <View style={styles.agentAvatar}>
              <MaterialIcons name="person" size={20} color="#1e40af" />
            </View>
            <View style={styles.agentDetails}>
              <Text style={styles.agentName}>{item.agent.name}</Text>
              <Text style={styles.agentRole}>مستشار عقاري</Text>
            </View>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={() => handlePropertyPress(item)}
              style={styles.viewButton}>
              <LinearGradient
                colors={['#3b82f6', '#1e40af']}
                style={styles.viewButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <MaterialIcons name="visibility" size={16} color="#ffffff" />
                <Text style={styles.viewButtonText}>عرض التفاصيل</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => handleWhatsAppContact(item)}
              style={styles.contactButton}>
              <LinearGradient
                colors={['#10b981', '#059669']}
                style={styles.contactButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
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
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header Section */}
      <LinearGradient
        colors={['#ffffff', '#f8fafc']}
        style={styles.headerSection}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>العقارات المتاحة</Text>
          <Text style={styles.headerSubtitle}>
            اكتشف مجموعة متنوعة من العقارات المميزة
          </Text>
        </View>
      </LinearGradient>

      {/* Search and Filter Section */}
      <View style={styles.searchSection}>
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
              style={styles.filterContainer}>
              {propertyTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setSelectedType(type)}
                  style={styles.filterChip}>
                  <LinearGradient
                    colors={selectedType === type ? ['#f59e0b', '#d97706'] : ['#fef3c7', '#fde68a']}
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
            
            <View style={styles.resultsInfo}>
              <Text style={styles.resultsText}>
                {filteredProperties.length} عقار متاح
              </Text>
            </View>
          </View>
        </Surface>
      </View>

      {/* Properties List */}
      <FlatList
        data={filteredProperties}
        renderItem={renderPropertyCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        numColumns={1}
      />

      {/* FAB for quick contact */}
      <FAB
        icon="chat"
        style={styles.fab}
        onPress={() => {
          const message = encodeURIComponent('مرحباً! أنا مهتم بالعقارات المعروضة.');
          const phoneNumber = '+966501234567';
          const url = `https://wa.me/${phoneNumber}?text=${message}`;
          console.log('Open WhatsApp:', url);
        }}
        label="تواصل سريع"
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
  headerSection: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    marginBottom: 16,
    elevation: 0,
  },
  searchInput: {
    fontSize: 16,
    color: '#1f2937',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterChip: {
    marginRight: 12,
  },
  chipGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
  },
  chipText: {
    color: '#92400e',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedChipText: {
    color: '#ffffff',
  },
  resultsInfo: {
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  resultsText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  listContainer: {
    padding: 20,
    paddingTop: 0,
  },
  propertyCard: {
    marginBottom: 20,
  },
  propertySurface: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    elevation: 4,
  },
  propertyImageContainer: {
    position: 'relative',
    height: 220,
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
    height: 80,
    justifyContent: 'space-between',
    padding: 16,
  },
  propertyBadge: {
    alignSelf: 'flex-start',
  },
  statusChip: {
    backgroundColor: '#dcfce7',
  },
  propertyPriceOverlay: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.8)',
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
  typeChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#dbeafe',
  },
  propertyRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    lineHeight: 26,
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
    gap: 8,
  },
  detailIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
  },
  agentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  agentDetails: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '600',
    marginBottom: 2,
  },
  agentRole: {
    fontSize: 12,
    color: '#6b7280',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  viewButton: {
    flex: 1,
  },
  viewButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 2,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  contactButton: {
    flex: 1,
  },
  contactButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 2,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#25d366',
  },
}); 