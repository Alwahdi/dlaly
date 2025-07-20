import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider, Surface, TextInput } from 'react-native-paper';
import { agentInfo, officeInfo, services } from '../../constants/PropertiesData';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const handleWhatsAppContact = (customMessage?: string) => {
    const defaultMessage = 'مرحباً! أنا مهتم بالخدمات العقارية المقدمة.';
    const finalMessage = customMessage || defaultMessage;
    const encodedMessage = encodeURIComponent(finalMessage);
    const phoneNumber = agentInfo.phone;
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('خطأ', 'واتساب غير مثبت على هذا الجهاز');
      }
    });
  };

  const handlePhoneCall = () => {
    const phoneNumber = agentInfo.phone;
    const url = `tel:${phoneNumber}`;
    
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('خطأ', 'تطبيق الهاتف غير متاح');
      }
    });
  };

  const handleEmailContact = () => {
    const emailAddress = agentInfo.email;
    const subject = encodeURIComponent('استفسار عقاري');
    const body = encodeURIComponent('مرحباً، أود الاستفسار عن الخدمات العقارية المقدمة.');
    const url = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('خطأ', 'تطبيق البريد الإلكتروني غير متاح');
      }
    });
  };

  const handleSubmitForm = () => {
    if (!name || !email || !message) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    console.log('Form submitted:', { name, email, phone, message, selectedService });
    Alert.alert(
      'تم الإرسال بنجاح',
      'شكراً لك على رسالتك! سنتواصل معك قريباً.',
      [
        {
          text: 'حسناً',
          onPress: () => {
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
            setSelectedService('');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Hero Header */}
        <LinearGradient
          colors={['#0f172a', '#1e293b', '#334155']}
          style={styles.heroSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <MaterialIcons name="support-agent" size={20} color="#fbbf24" />
              <Text style={styles.heroBadgeText}>دعم 24/7</Text>
            </View>
            
            <Text style={styles.heroTitle}>تواصل معنا</Text>
            <Text style={styles.heroSubtitle}>
              نحن هنا لمساعدتك في العثور على العقار المثالي
            </Text>
            
            <View style={styles.heroStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>15+</Text>
                <Text style={styles.statLabel}>سنة خبرة</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>500+</Text>
                <Text style={styles.statLabel}>عميل سعيد</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>4.9★</Text>
                <Text style={styles.statLabel}>تقييم العملاء</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.heroDecoration}>
            <View style={styles.decorationCircle1} />
            <View style={styles.decorationCircle2} />
            <MaterialIcons name="contact-phone" size={100} color="rgba(255,255,255,0.1)" />
          </View>
        </LinearGradient>

        {/* Quick Contact Cards */}
        <View style={styles.quickContactSection}>
          <Surface style={styles.contactCard} elevation={4}>
            <View style={styles.cardWrapper}>
              <LinearGradient
                colors={['#dcfce7', '#bbf7d0']}
                style={styles.cardGradient}>
                <View style={styles.cardContent}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name="chat" size={40} color="#166534" />
                  </View>
                  <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>واتساب</Text>
                    <Text style={styles.cardSubtitle}>دردشة فورية مع خبرائنا</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleWhatsAppContact()}
                    style={styles.cardButton}>
                    <LinearGradient
                      colors={['#25d366', '#128c7e']}
                      style={styles.whatsappButton}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}>
                      <MaterialIcons name="chat" size={20} color="#ffffff" />
                      <Text style={styles.buttonText}>ابدأ المحادثة</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </Surface>

          <Surface style={styles.contactCard} elevation={4}>
            <View style={styles.cardWrapper}>
              <LinearGradient
                colors={['#dbeafe', '#bfdbfe']}
                style={styles.cardGradient}>
                <View style={styles.cardContent}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name="phone" size={40} color="#1e40af" />
                  </View>
                  <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>اتصال هاتفي</Text>
                    <Text style={styles.cardSubtitle}>تحدث مباشرة مع مستشارنا</Text>
                  </View>
                  <TouchableOpacity
                    onPress={handlePhoneCall}
                    style={styles.cardButton}>
                    <LinearGradient
                      colors={['#3b82f6', '#1e40af']}
                      style={styles.phoneButton}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}>
                      <MaterialIcons name="phone" size={20} color="#ffffff" />
                      <Text style={styles.buttonText}>اتصل الآن</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </Surface>

          <Surface style={styles.contactCard} elevation={4}>
            <View style={styles.cardWrapper}>
              <LinearGradient
                colors={['#fef3c7', '#fde68a']}
                style={styles.cardGradient}>
                <View style={styles.cardContent}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name="email" size={40} color="#92400e" />
                  </View>
                  <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>بريد إلكتروني</Text>
                    <Text style={styles.cardSubtitle}>أرسل لنا رسالة مفصلة</Text>
                  </View>
                  <TouchableOpacity
                    onPress={handleEmailContact}
                    style={styles.cardButton}>
                    <LinearGradient
                      colors={['#f59e0b', '#d97706']}
                      style={styles.emailButton}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}>
                      <MaterialIcons name="email" size={20} color="#ffffff" />
                      <Text style={styles.buttonText}>أرسل بريد</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </Surface>
        </View>

        {/* Contact Form */}
        <View style={styles.formSection}>
          <Surface style={styles.formSurface} elevation={4}>
            <View style={styles.formContent}>
              <View style={styles.formHeader}>
                <MaterialIcons name="edit" size={32} color="#1e40af" />
                <Text style={styles.formTitle}>أرسل لنا رسالة</Text>
              </View>
              
              <TextInput
                label="الاسم الكامل *"
                value={name}
                onChangeText={setName}
                style={styles.input}
                mode="outlined"
                outlineColor="#e5e7eb"
                activeOutlineColor="#1e40af"
              />
              
              <TextInput
                label="البريد الإلكتروني *"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                mode="outlined"
                outlineColor="#e5e7eb"
                activeOutlineColor="#1e40af"
                keyboardType="email-address"
              />
              
              <TextInput
                label="رقم الهاتف"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
                mode="outlined"
                outlineColor="#e5e7eb"
                activeOutlineColor="#1e40af"
                keyboardType="phone-pad"
              />

              <Text style={styles.serviceLabel}>الخدمة المطلوبة:</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.serviceChips}>
                {services.map((service) => (
                  <TouchableOpacity
                    key={service}
                    onPress={() => setSelectedService(service)}
                    style={styles.serviceChip}>
                    <LinearGradient
                      colors={selectedService === service ? ['#1e40af', '#1e3a8a'] : ['#f1f5f9', '#e2e8f0']}
                      style={styles.serviceChipGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}>
                      <Text style={[
                        styles.serviceChipText,
                        selectedService === service && styles.selectedServiceChipText
                      ]}>
                        {service}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              <TextInput
                label="الرسالة *"
                value={message}
                onChangeText={setMessage}
                style={styles.input}
                mode="outlined"
                outlineColor="#e5e7eb"
                activeOutlineColor="#1e40af"
                multiline
                numberOfLines={4}
              />
              
              <TouchableOpacity
                onPress={handleSubmitForm}
                style={styles.submitButton}>
                <LinearGradient
                  colors={['#1e40af', '#1e3a8a']}
                  style={styles.submitButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <MaterialIcons name="send" size={20} color="#ffffff" />
                  <Text style={styles.submitButtonText}>إرسال الرسالة</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Surface>
        </View>

        {/* Agent Information */}
        <View style={styles.agentSection}>
          <Surface style={styles.agentSurface} elevation={4}>
            <View style={styles.agentContent}>
              <View style={styles.agentHeader}>
                <MaterialIcons name="person" size={32} color="#1e40af" />
                <Text style={styles.agentTitle}>تعرف على مستشارك العقاري</Text>
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
                  <Text style={styles.agentName}>{agentInfo.name}</Text>
                  <Text style={styles.agentRole}>{agentInfo.role}</Text>
                  <Text style={styles.agentExperience}>{agentInfo.experience}</Text>
                  
                  <View style={styles.agentStats}>
                    <View style={styles.agentStatItem}>
                      <Text style={styles.agentStatNumber}>{agentInfo.stats.propertiesSold}</Text>
                      <Text style={styles.agentStatLabel}>عقار مباع</Text>
                    </View>
                    <View style={styles.agentStatDivider} />
                    <View style={styles.agentStatItem}>
                      <Text style={styles.agentStatNumber}>{agentInfo.stats.clientRating}</Text>
                      <Text style={styles.agentStatLabel}>تقييم العملاء</Text>
                    </View>
                  </View>
                </View>
              </View>
              
              <TouchableOpacity
                onPress={() => handleWhatsAppContact('مرحباً! أود مناقشة الفرص العقارية معك.')}
                style={styles.agentContactButton}>
                <LinearGradient
                  colors={['#25d366', '#128c7e']}
                  style={styles.agentContactGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <MaterialIcons name="chat" size={20} color="#ffffff" />
                  <Text style={styles.agentContactText}>تواصل مع المستشار</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Surface>
        </View>

        {/* Office Information */}
        <View style={styles.officeSection}>
          <Surface style={styles.officeSurface} elevation={4}>
            <View style={styles.officeContent}>
              <View style={styles.officeHeader}>
                <MaterialIcons name="business" size={32} color="#1e40af" />
                <Text style={styles.officeTitle}>زيارة مكتبنا</Text>
              </View>
              
              <Divider style={styles.divider} />
              
              <View style={styles.officeInfo}>
                <View style={styles.officeItem}>
                  <View style={styles.officeIcon}>
                    <MaterialIcons name="location-on" size={24} color="#1e40af" />
                  </View>
                  <View style={styles.officeText}>
                    <Text style={styles.officeLabel}>العنوان:</Text>
                    <Text style={styles.officeValue}>
                      {officeInfo.address}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.officeItem}>
                  <View style={styles.officeIcon}>
                    <MaterialIcons name="schedule" size={24} color="#1e40af" />
                  </View>
                  <View style={styles.officeText}>
                    <Text style={styles.officeLabel}>ساعات العمل:</Text>
                    <Text style={styles.officeValue}>
                      {officeInfo.hours.weekdays}{'\n'}
                      {officeInfo.hours.saturday}{'\n'}
                      {officeInfo.hours.sunday}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
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
    overflow: 'hidden',
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
  quickContactSection: {
    padding: 20,
    gap: 16,
  },
  contactCard: {
    borderRadius: 20,
  },
  cardWrapper: {
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 24,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  cardButton: {
    marginLeft: 16,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 2,
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 2,
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  formSection: {
    padding: 20,
  },
  formSurface: {
    borderRadius: 20,
  },
  formContent: {
    padding: 24,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 12,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  serviceLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  serviceChips: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  serviceChip: {
    marginRight: 12,
  },
  serviceChipGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
  },
  serviceChipText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedServiceChipText: {
    color: '#ffffff',
  },
  submitButton: {
    marginTop: 8,
  },
  submitButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  agentSection: {
    padding: 20,
  },
  agentSurface: {
    borderRadius: 20,
  },
  agentContent: {
    padding: 24,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  agentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 12,
  },
  divider: {
    marginBottom: 20,
    backgroundColor: '#e5e7eb',
  },
  agentInfo: {
    flexDirection: 'row',
    marginBottom: 24,
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
    marginBottom: 4,
  },
  agentExperience: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  agentStats: {
    flexDirection: 'row',
    gap: 20,
  },
  agentStatItem: {
    alignItems: 'center',
  },
  agentStatNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  agentStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  agentStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e5e7eb',
  },
  agentContactButton: {
    width: '100%',
  },
  agentContactGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 2,
  },
  agentContactText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  officeSection: {
    padding: 20,
    paddingBottom: 40,
  },
  officeSurface: {
    borderRadius: 20,
  },
  officeContent: {
    padding: 24,
  },
  officeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  officeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 12,
  },
  officeInfo: {
    gap: 20,
  },
  officeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  officeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  officeText: {
    flex: 1,
  },
  officeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  officeValue: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
}); 