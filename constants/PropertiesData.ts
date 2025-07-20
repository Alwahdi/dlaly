export interface Property {
    id: number;
    title: string;
    titleEn: string;
    price: string;
    location: string;
    locationEn: string;
    bedrooms: number;
    bathrooms: number;
    sqft: string;
    image: string;
    type: string;
    typeEn: string;
    status: string;
    statusEn: string;
    description: string;
    descriptionEn: string;
    amenities: string[];
    amenitiesEn: string[];
    coordinate?: {
        latitude: number;
        longitude: number;
    };
    images: string[];
    agent: {
        name: string;
        nameEn: string;
        phone: string;
        email: string;
        image: string;
    };
}

export const propertiesData: Property[] = [
    {
        id: 1,
        title: 'فيلا فاخرة في الرياض',
        titleEn: 'Luxury Villa in Riyadh',
        price: '2,500,000 ريال',
        location: 'حي النرجس، الرياض',
        locationEn: 'Al Narjis District, Riyadh',
        bedrooms: 5,
        bathrooms: 4,
        sqft: '450',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
        type: 'فيلا',
        typeEn: 'Villa',
        status: 'للبيع',
        statusEn: 'For Sale',
        description: 'فيلا فاخرة حديثة البناء في أحد أفضل أحياء الرياض. تتميز بتصميم عصري وأناقة عالية مع حديقة خاصة وموقف سيارات. الفيلا مجهزة بأحدث التقنيات والأثاث الفاخر.',
        descriptionEn: 'Modern luxury villa in one of Riyadh\'s finest districts. Features contemporary design and high elegance with private garden and parking. The villa is equipped with latest technology and luxury furniture.',
        amenities: ['مسبح خاص', 'حديقة', 'موقف سيارات', 'نظام أمان', 'مطبخ مجهز', 'مصعد'],
        amenitiesEn: ['Private Pool', 'Garden', 'Garage', 'Security System', 'Fitted Kitchen', 'Elevator'],
        coordinate: {
            latitude: 24.7136,
            longitude: 46.6753,
        },
        images: [
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400',
        ],
        agent: {
            name: 'أحمد محمد',
            nameEn: 'Ahmed Mohammed',
            phone: '+966501234567',
            email: 'ahmed@reasa.com',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        },
    },
    {
        id: 2,
        title: 'شقة فاخرة في جدة',
        titleEn: 'Luxury Apartment in Jeddah',
        price: '1,800,000 ريال',
        location: 'حي الكورنيش، جدة',
        locationEn: 'Corniche District, Jeddah',
        bedrooms: 3,
        bathrooms: 2,
        sqft: '180',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
        type: 'شقة',
        typeEn: 'Apartment',
        status: 'للبيع',
        statusEn: 'For Sale',
        description: 'شقة فاخرة مع إطلالة رائعة على البحر الأحمر. تقع في قلب الكورنيش مع إمكانية الوصول السهل لجميع الخدمات والمراكز التجارية.',
        descriptionEn: 'Luxury apartment with stunning Red Sea views. Located in the heart of the Corniche with easy access to all services and shopping centers.',
        amenities: ['إطلالة بحرية', 'مسبح', 'صالة رياضية', 'موقف سيارات', 'نظام أمان', 'مطبخ مجهز'],
        amenitiesEn: ['Sea View', 'Swimming Pool', 'Gym', 'Parking', 'Security System', 'Fitted Kitchen'],
        coordinate: {
            latitude: 21.5433,
            longitude: 39.1679,
        },
        images: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
        ],
        agent: {
            name: 'فاطمة علي',
            nameEn: 'Fatima Ali',
            phone: '+966502345678',
            email: 'fatima@reasa.com',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
        },
    },
    {
        id: 3,
        title: 'قصر عائلي في الدمام',
        titleEn: 'Family Palace in Dammam',
        price: '4,200,000 ريال',
        location: 'حي الشاطئ، الدمام',
        locationEn: 'Al Shati District, Dammam',
        bedrooms: 7,
        bathrooms: 6,
        sqft: '800',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400',
        type: 'قصر',
        typeEn: 'Palace',
        status: 'للبيع',
        statusEn: 'For Sale',
        description: 'قصر عائلي فاخر مع حدائق واسعة وموقف سيارات متعدد. يتميز بتصميم كلاسيكي مع لمسات عصرية. مثالي للعائلات الكبيرة.',
        descriptionEn: 'Luxury family palace with extensive gardens and multi-car parking. Features classic design with modern touches. Perfect for large families.',
        amenities: ['حدائق واسعة', 'مسبح أولمبي', 'ملعب تنس', 'مطبخ رئيسي', 'مطبخ خارجي', 'مصعد'],
        amenitiesEn: ['Extensive Gardens', 'Olympic Pool', 'Tennis Court', 'Main Kitchen', 'Outdoor Kitchen', 'Elevator'],
        coordinate: {
            latitude: 26.4207,
            longitude: 50.0888,
        },
        images: [
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
        ],
        agent: {
            name: 'خالد عبدالله',
            nameEn: 'Khalid Abdullah',
            phone: '+966503456789',
            email: 'khalid@reasa.com',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
        },
    },
    {
        id: 4,
        title: 'استوديو عصري في الخبر',
        titleEn: 'Modern Studio in Khobar',
        price: '850,000 ريال',
        location: 'حي الشاطئ، الخبر',
        locationEn: 'Al Shati District, Khobar',
        bedrooms: 1,
        bathrooms: 1,
        sqft: '80',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
        type: 'استوديو',
        typeEn: 'Studio',
        status: 'للبيع',
        statusEn: 'For Sale',
        description: 'استوديو عصري ومريح في قلب الخبر. مثالي للشباب والمهنيين. قريب من جميع الخدمات والمراكز التجارية.',
        descriptionEn: 'Modern and comfortable studio in the heart of Khobar. Perfect for young professionals. Close to all services and shopping centers.',
        amenities: ['مطبخ مجهز', 'نظام أمان', 'موقف سيارات', 'إنترنت مجاني', 'تكييف مركزي', 'غسالة'],
        amenitiesEn: ['Fitted Kitchen', 'Security System', 'Parking', 'Free WiFi', 'Central AC', 'Washing Machine'],
        coordinate: {
            latitude: 26.2170,
            longitude: 50.1971,
        },
        images: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
        ],
        agent: {
            name: 'نورا أحمد',
            nameEn: 'Nora Ahmed',
            phone: '+966504567890',
            email: 'nora@reasa.com',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
        },
    },
    {
        id: 5,
        title: 'بنتهاوس فاخر في الظهران',
        titleEn: 'Luxury Penthouse in Dhahran',
        price: '3,500,000 ريال',
        location: 'حي الجامعة، الظهران',
        locationEn: 'University District, Dhahran',
        bedrooms: 4,
        bathrooms: 3,
        sqft: '350',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
        type: 'بنتهاوس',
        typeEn: 'Penthouse',
        status: 'للبيع',
        statusEn: 'For Sale',
        description: 'بنتهاوس فاخر مع إطلالة بانورامية على المدينة. يتميز بتصميم عصري وأثاث فاخر. مثالي للأسر المتميزة.',
        descriptionEn: 'Luxury penthouse with panoramic city views. Features modern design and luxury furniture. Perfect for distinguished families.',
        amenities: ['إطلالة بانورامية', 'تراس خاص', 'مطبخ فاخر', 'مصعد خاص', 'نظام أمان', 'موقف سيارات'],
        amenitiesEn: ['Panoramic View', 'Private Terrace', 'Luxury Kitchen', 'Private Elevator', 'Security System', 'Parking'],
        coordinate: {
            latitude: 26.2361,
            longitude: 50.0393,
        },
        images: [
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
        ],
        agent: {
            name: 'سارة محمد',
            nameEn: 'Sarah Mohammed',
            phone: '+966505678901',
            email: 'sara@reasa.com',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
        },
    },
    {
        id: 6,
        title: 'فيلا عائلية في المدينة',
        titleEn: 'Family Villa in Madinah',
        price: '2,800,000 ريال',
        location: 'حي العوالي، المدينة المنورة',
        locationEn: 'Al Awali District, Madinah',
        bedrooms: 4,
        bathrooms: 3,
        sqft: '300',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
        type: 'فيلا',
        typeEn: 'Villa',
        status: 'للبيع',
        statusEn: 'For Sale',
        description: 'فيلا عائلية جميلة في المدينة المنورة. قريبة من المسجد النبوي الشريف. تتميز بالهدوء والراحة مع حديقة خاصة.',
        descriptionEn: 'Beautiful family villa in Madinah. Close to the Prophet\'s Mosque. Features tranquility and comfort with private garden.',
        amenities: ['حديقة خاصة', 'موقف سيارات', 'مطبخ مجهز', 'نظام أمان', 'تكييف مركزي', 'غرفة خادمة'],
        amenitiesEn: ['Private Garden', 'Parking', 'Fitted Kitchen', 'Security System', 'Central AC', 'Maid Room'],
        coordinate: {
            latitude: 24.5247,
            longitude: 39.5692,
        },
        images: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
        ],
        agent: {
            name: 'عبدالرحمن علي',
            nameEn: 'Abdulrahman Ali',
            phone: '+966506789012',
            email: 'abdulrahman@reasa.com',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
        },
    },
];

export const propertyTypes = ['الكل', 'فيلا', 'شقة', 'قصر', 'بنتهاوس', 'استوديو'];
export const propertyTypesEn = ['All', 'Villa', 'Apartment', 'Palace', 'Penthouse', 'Studio'];

export const services = [
    'شراء عقار',
    'بيع عقار',
    'إيجار عقار',
    'تقييم عقار',
    'استشارات استثمارية',
    'خدمات التمويل',
];

export const servicesEn = [
    'Buy Property',
    'Sell Property',
    'Rent Property',
    'Property Valuation',
    'Investment Advice',
    'Mortgage Services',
];

export const agentInfo = {
    name: 'أحمد محمد',
    nameEn: 'Ahmed Mohammed',
    role: 'مستشار عقاري أول',
    roleEn: 'Senior Real Estate Consultant',
    experience: 'خبرة 15+ سنة',
    experienceEn: '15+ Years Experience',
    phone: '+966501234567',
    email: 'ahmed@reasa.com',
    stats: {
        propertiesSold: '200+',
        clientRating: '4.9★',
    },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
};

export const officeInfo = {
    address: 'شارع الملك فهد، حي النرجس، الرياض، المملكة العربية السعودية',
    addressEn: 'King Fahd Street, Al Narjis District, Riyadh, Saudi Arabia',
    hours: {
        weekdays: 'الأحد - الخميس: 9:00 ص - 6:00 م',
        saturday: 'الجمعة: 10:00 ص - 4:00 م',
        sunday: 'السبت: مغلق',
    },
    hoursEn: {
        weekdays: 'Sun-Thu: 9:00 AM - 6:00 PM',
        saturday: 'Fri: 10:00 AM - 4:00 PM',
        sunday: 'Sat: Closed',
    },
    phone: '+966501234567',
    email: 'info@reasa.com',
}; 