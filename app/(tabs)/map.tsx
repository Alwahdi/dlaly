import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { Button, Card, Chip } from 'react-native-paper';
import { propertiesData } from '../../constants/PropertiesData';

const { width, height } = Dimensions.get('window');

// Filter properties that have coordinates
const propertiesWithLocation = propertiesData.filter(property => property.coordinate);

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [region, setRegion] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleMarkerPress = (property: any) => {
    setSelectedProperty(property);
  };

  const handleWhatsAppContact = (property: any) => {
    const message = encodeURIComponent(`Hello! I'm interested in ${property.title} for ${property.price}`);
    const phoneNumber = '+1234567890'; // Replace with your actual number
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    console.log('Open WhatsApp:', url);
    Alert.alert('WhatsApp', 'Opening WhatsApp to contact about this property...');
  };

  const handleDirections = (property: any) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${property.coordinate.latitude},${property.coordinate.longitude}`;
    console.log('Open directions:', url);
    Alert.alert('Directions', 'Opening Google Maps for directions...');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}>
        {propertiesWithLocation.map((property) => (
          <Marker
            key={property.id}
            coordinate={property.coordinate!}
            title={property.title}
            description={property.price}
            onPress={() => handleMarkerPress(property)}>
            <View style={styles.markerContainer}>
              <MaterialIcons name="home" size={24} color="#2563eb" />
            </View>
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{property.title}</Text>
                <Text style={styles.calloutPrice}>{property.price}</Text>
                <Text style={styles.calloutLocation}>{property.location}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Property Details Card */}
      {selectedProperty && (
        <Card style={styles.propertyCard}>
          <Card.Content>
            <View style={styles.propertyHeader}>
              <View style={styles.propertyType}>
                <Chip mode="flat" style={styles.typeChip}>
                  {selectedProperty.type}
                </Chip>
              </View>
              <TouchableOpacity
                onPress={() => setSelectedProperty(null)}
                style={styles.closeButton}>
                <MaterialIcons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.propertyTitle}>{selectedProperty.title}</Text>
            <Text style={styles.propertyPrice}>{selectedProperty.price}</Text>
            
            <View style={styles.propertyDetails}>
              <View style={styles.detailItem}>
                <MaterialIcons name="bed" size={16} color="#6b7280" />
                <Text style={styles.detailText}>{selectedProperty.bedrooms}</Text>
              </View>
              <View style={styles.detailItem}>
                <MaterialIcons name="bathroom" size={16} color="#6b7280" />
                <Text style={styles.detailText}>{selectedProperty.bathrooms}</Text>
              </View>
              <View style={styles.detailItem}>
                <MaterialIcons name="square-foot" size={16} color="#6b7280" />
                <Text style={styles.detailText}>{selectedProperty.sqft}</Text>
              </View>
            </View>
            
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={14} color="#6b7280" />
              <Text style={styles.locationText}>{selectedProperty.location}</Text>
            </View>
            
            <View style={styles.actionButtons}>
              <Button
                mode="contained"
                onPress={() => handleWhatsAppContact(selectedProperty)}
                style={[styles.actionButton, styles.whatsappButton]}
                buttonColor="#25D366"
                              icon="chat"
              compact>
              Contact
              </Button>
              <Button
                mode="outlined"
                onPress={() => handleDirections(selectedProperty)}
                style={styles.actionButton}
                icon="directions"
                compact>
                Directions
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Map Controls */}
      <View style={styles.mapControls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => {
            setRegion({
              latitude: 40.7128,
              longitude: -74.0060,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }}>
          <MaterialIcons name="my-location" size={24} color="#2563eb" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutContainer: {
    width: 200,
    padding: 10,
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  calloutPrice: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  calloutLocation: {
    fontSize: 10,
    color: '#6b7280',
  },
  propertyCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  propertyType: {
    flex: 1,
  },
  typeChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#dbeafe',
  },
  closeButton: {
    padding: 5,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  propertyPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 10,
  },
  propertyDetails: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#6b7280',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 15,
  },
  locationText: {
    fontSize: 12,
    color: '#6b7280',
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 25,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  mapControls: {
    position: 'absolute',
    top: 100,
    right: 20,
  },
  controlButton: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
}); 