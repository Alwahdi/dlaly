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
import { Surface } from 'react-native-paper';
import { propertiesData } from '../../constants/PropertiesData';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const router = useRouter();
  const [selectedProperty, setSelectedProperty] = useState(propertiesData[0]);

  const handlePropertyPress = (property: any) => {
    router.push(`/property/${property.id}`);
  };

  const handleWhatsAppContact = (property: any) => {
    const message = encodeURIComponent(`مرحباً! أنا مهتم بـ ${property.title} مقابل ${property.price}`);
    const phoneNumber = property.agent.phone;
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    
    const Linking = require('react-native').Linking;
    Linking.canOpenURL(url).then((supported: boolean) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('WhatsApp not installed');
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      {/* Header Section */}
      <LinearGradient
        colors={['#0f172a', '#1e293b', '#334155']}
        style={styles.headerSection}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>خريطة العقارات</Text>
          <Text style={styles.headerSubtitle}>
            اكتشف العقارات على الخريطة واختر موقعك المفضل
          </Text>
        </View>
      </LinearGradient>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <Surface style={styles.mapSurface} elevation={4}>
          <View style={styles.mapContent}>
            <View style={styles.mapPlaceholder}>
              <MaterialIcons name="map" size={80} color="#6b7280" />
              <Text style={styles.mapTitle}>خريطة تفاعلية</Text>
              <Text style={styles.mapSubtitle}>
                ستتم إضافة الخريطة التفاعلية هنا مع علامات العقارات
              </Text>
            </View>
            
            {/* Map Controls */}
            <View style={styles.mapControls}>
              <TouchableOpacity style={styles.mapControl}>
                <LinearGradient
                  colors={['#3b82f6', '#1e40af']}
                  style={styles.controlGradient}>
                  <MaterialIcons name="my-location" size={20} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.mapControl}>
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  style={styles.controlGradient}>
                  <MaterialIcons name="layers" size={20} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.mapControl}>
                <LinearGradient
                  colors={['#f59e0b', '#d97706']}
                  style={styles.controlGradient}>
                  <MaterialIcons name="filter-list" size={20} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Surface>
      </View>

      {/* Properties List */}
      <View style={styles.propertiesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>العقارات القريبة</Text>
          <Text style={styles.sectionSubtitle}>
            {propertiesData.length} عقار متاح في المنطقة
          </Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.propertiesScroll}>
          {propertiesData.map((property) => (
            <TouchableOpacity
              key={property.id}
              onPress={() => handlePropertyPress(property)}
              style={styles.propertyCard}>
              <Surface style={styles.propertySurface} elevation={4}>
                <View style={styles.propertyImageContainer}>
                  <Image 
                    source={{ uri: property.image }} 
                    style={styles.propertyImage}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
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
                      <MaterialIcons name="bed" size={16} color="#f59e0b" />
                      <Text style={styles.detailText}>{property.bedrooms}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <MaterialIcons name="bathroom" size={16} color="#f59e0b" />
                      <Text style={styles.detailText}>{property.bathrooms}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <MaterialIcons name="square-foot" size={16} color="#f59e0b" />
                      <Text style={styles.detailText}>{property.sqft} م²</Text>
                    </View>
                  </View>
                  
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      onPress={() => handlePropertyPress(property)}
                      style={styles.viewButton}>
                      <LinearGradient
                        colors={['#3b82f6', '#1e40af']}
                        style={styles.viewButtonGradient}>
                        <MaterialIcons name="visibility" size={16} color="#ffffff" />
                        <Text style={styles.viewButtonText}>عرض</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      onPress={() => handleWhatsAppContact(property)}
                      style={styles.contactButton}>
                      <LinearGradient
                        colors={['#10b981', '#059669']}
                        style={styles.contactButtonGradient}>
                        <MaterialIcons name="chat" size={16} color="#ffffff" />
                        <Text style={styles.contactButtonText}>تواصل</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </Surface>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Surface style={styles.quickActionsSurface} elevation={4}>
          <View style={styles.quickActionsContent}>
            <Text style={styles.quickActionsTitle}>إجراءات سريعة</Text>
            
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity style={styles.quickAction}>
                <LinearGradient
                  colors={['#fef3c7', '#fde68a']}
                  style={styles.quickActionGradient}>
                  <MaterialIcons name="search" size={24} color="#92400e" />
                  <Text style={styles.quickActionText}>بحث متقدم</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickAction}>
                <LinearGradient
                  colors={['#dbeafe', '#bfdbfe']}
                  style={styles.quickActionGradient}>
                  <MaterialIcons name="favorite" size={24} color="#1e40af" />
                  <Text style={styles.quickActionText}>المفضلة</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickAction}>
                <LinearGradient
                  colors={['#dcfce7', '#bbf7d0']}
                  style={styles.quickActionGradient}>
                  <MaterialIcons name="notifications" size={24} color="#166534" />
                  <Text style={styles.quickActionText}>تنبيهات</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickAction}>
                <LinearGradient
                  colors={['#fce7f3', '#fbcfe8']}
                  style={styles.quickActionGradient}>
                  <MaterialIcons name="support-agent" size={24} color="#be185d" />
                  <Text style={styles.quickActionText}>الدعم</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
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
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 22,
  },
  mapContainer: {
    padding: 20,
    marginTop: -10,
  },
  mapSurface: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  mapContent: {
    padding: 20,
    position: 'relative',
  },
  mapPlaceholder: {
    height: 300,
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  mapSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  mapControls: {
    position: 'absolute',
    top: 20,
    right: 20,
    gap: 12,
  },
  mapControl: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  controlGradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propertiesSection: {
    padding: 20,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  propertiesScroll: {
    marginBottom: 20,
  },
  propertyCard: {
    width: 280,
    marginRight: 16,
  },
  propertySurface: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  propertyImageContainer: {
    position: 'relative',
    height: 180,
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
    padding: 16,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
  propertyPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 6,
    lineHeight: 20,
  },
  propertyLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
    flex: 1,
  },
  propertyDetails: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  viewButton: {
    flex: 1,
    borderRadius: 20,
  },
  viewButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 4,
  },
  contactButton: {
    flex: 1,
    borderRadius: 20,
  },
  contactButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 20,
  },
  contactButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 4,
  },
  quickActionsSection: {
    padding: 20,
    paddingTop: 0,
  },
  quickActionsSurface: {
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  quickActionsContent: {
    padding: 20,
  },
  quickActionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAction: {
    width: '48%',
    borderRadius: 16,
  },
  quickActionGradient: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
}); 