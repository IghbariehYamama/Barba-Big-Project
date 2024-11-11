import { COLORS, icons, images } from "../constants";

export const friends = [
    {
        id: "1",
        name: "Tynisa Obey",
        phoneNumber: "+1-300-400-0135",
        avatar: images.user1,
    },
    {
        id: "2",
        name: "Florencio Dorance",
        phoneNumber: "+1-309-900-0135",
        avatar: images.user2,
    },
    {
        id: "3",
        name: "Chantal Shelburne",
        phoneNumber: "+1-400-100-1009",
        avatar: images.user3,
    },
    {
        id: "4",
        name: "Maryland Winkles",
        phoneNumber: "+1-970-200-4550",
        avatar: images.user4,
    },
    {
        id: "5",
        name: "Rodolfo Goode",
        phoneNumber: "+1-100-200-9800",
        avatar: images.user5,
    },
    {
        id: "6",
        name: "Benny Spanbauer",
        phoneNumber: "+1-780-200-9800",
        avatar: images.user6,
    },
    {
        id: "7",
        name: "Tyra Dillon",
        phoneNumber: "+1-943-230-9899",
        avatar: images.user7,
    },
    {
        id: "8",
        name: "Jamel Eusobio",
        phoneNumber: "+1-900-234-9899",
        avatar: images.user8,
    },
    {
        id: "9",
        name: "Pedro Haurad",
        phoneNumber: "+1-240-234-9899",
        avatar: images.user9
    },
    {
        id: "10",
        name: "Clinton Mcclure",
        phoneNumber: "+1-500-234-4555",
        avatar: images.user10
    },
];

export const specialists = [
    {
        id: "1",
        name: "Tynisa Obey",
        phoneNumber: "+1-300-400-0135",
        avatar: images.user1,
        position: "Senior barber"
    },
    {
        id: "2",
        name: "Florencio Dorance",
        phoneNumber: "+1-309-900-0135",
        avatar: images.user2,
        position: "Hair Stylist"
    },
    {
        id: "3",
        name: "Chantal Shelburne",
        phoneNumber: "+1-400-100-1009",
        avatar: images.user3,
        position: "Make up Artist"
    },
    {
        id: "4",
        name: "Maryland Winkles",
        phoneNumber: "+1-970-200-4550",
        avatar: images.user4,
        position: "Senior Barber"
    },
    {
        id: "5",
        name: "Rodolfo Goode",
        phoneNumber: "+1-100-200-9800",
        avatar: images.user5,
        position: "Hair Stylist"
    },
    {
        id: "6",
        name: "Benny Spanbauer",
        phoneNumber: "+1-780-200-9800",
        avatar: images.user6,
        position: "Make up Artist"
    },
    {
        id: "7",
        name: "Tyra Dillon",
        phoneNumber: "+1-943-230-9899",
        avatar: images.user7,
        position: "Senior Barber"
    },
    {
        id: "8",
        name: "Jamel Eusobio",
        phoneNumber: "+1-900-234-9899",
        avatar: images.user8,
        position: "Juior Hair Stylist"
    },
    {
        id: "9",
        name: "Pedro Haurad",
        phoneNumber: "+1-240-234-9899",
        avatar: images.user9,
        position: "Junior Barber"
    },
    {
        id: "10",
        name: "Clinton Mcclure",
        phoneNumber: "+1-500-234-4555",
        avatar: images.user10,
        position: "Make up Artist"
    },
];

export const faqKeywords = [
    {
        id: "1",
        name: "General"
    },
    {
        id: "2",
        name: "Account"
    },
    {
        id: "3",
        name: "Security"
    },
    {
        id: "4",
        name: "Service"
    },
    {
        id: "5",
        name: "Payment"
    }
];

export const faqs = [
    {
        question: 'How do I book an appointment with a barber or stylist on the app?',
        answer: 'To book an appointment, navigate to the "Appointment Booking" section, choose your preferred barber or stylist, select a suitable date and time, and confirm your booking.',
        type: "General"
    },
    {
        question: 'Can I schedule virtual consultations with hairstylists through this app?',
        answer: 'Yes, you can schedule virtual consultations with hairstylists through this app. Simply select the "Virtual Consultation" option when booking an appointment.',
        type: "General"
    },
    {
        question: 'What should I do if I need to cancel or reschedule my appointment?',
        answer: 'To cancel or reschedule an appointment, go to the "My Appointments" section, locate your appointment, and follow the provided options for making changes to your schedule.',
        type: "Account"
    },
    {
        question: 'How can I find a specialist for my specific haircare needs?',
        answer: 'Utilize the app’s search feature to discover specialists based on your haircare requirements. Filter results by service or expertise to find the most suitable barber or stylist for your needs.',
        type: "Service"
    },
    {
        question: 'Is there a way to get haircare tips or advice online?',
        answer: 'Yes, you can request haircare tips and advice through virtual consultations with hairstylists. They can provide recommendations and share tips digitally.',
        type: "Service"
    },
    {
        question: 'What types of hair professionals are available on this app?',
        answer: 'Our app connects you with a diverse range of hair professionals, including barbers, stylists, colorists, and more.',
        type: "General"
    },
    {
        question: 'How do I pay for my appointments?',
        answer: 'You can securely pay for your appointments within the app using various payment methods, such as credit/debit cards or digital wallets.',
        type: "Account"
    },
    {
        question: 'Are my appointment records and information kept confidential?',
        answer: 'Yes, we prioritize the security and confidentiality of your appointment records and information. Our app complies with strict privacy and data protection standards.',
        type: "Security"
    },
    {
        question: 'Can I request additional haircare support through this app?',
        answer: 'Yes, you can request additional haircare support, such as product recommendations or styling tips. Check the app for the availability and terms of these additional services.',
        type: "General"
    },
    {
        question: 'How can I provide feedback or rate my barber or stylist after an appointment?',
        answer: 'After completing an appointment, you can provide feedback and rate your barber or stylist through the app’s rating and review system to contribute to the improvement of our haircare services.',
        type: "Service"
    },
    {
        question: 'Is technical support available through this app?',
        answer: 'While we provide haircare services, our app is not for technical support. For technical assistance, please contact our support team through the designated channels provided in the app.',
        type: "General"
    },
];

export const messsagesData = [
    {
        id: "1",
        fullName: "Jhon Smith",
        isOnline: false,
        userImg: images.user1,
        lastSeen: "2023-11-16T04:52:06.501Z",
        lastMessage: 'I love you. see you soon baby',
        messageInQueue: 2,
        lastMessageTime: "12:25 PM",
        isOnline: true,
    },
    {
        id: "2",
        fullName: "Anuska Sharma",
        isOnline: false,
        userImg: images.user2,
        lastSeen: "2023-11-18T04:52:06.501Z",
        lastMessage: 'I Know. you are so busy man.',
        messageInQueue: 0,
        lastMessageTime: "12:15 PM",
        isOnline: false
    },
    {
        id: "3",
        fullName: "Virat Kohili",
        isOnline: false,
        userImg: images.user3,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Ok, see u soon',
        messageInQueue: 0,
        lastMessageTime: "09:12 PM",
        isOnline: true
    },
    {
        id: "4",
        fullName: "Shikhor Dhaon",
        isOnline: false,
        userImg: images.user4,
        lastSeen: "2023-11-18T04:52:06.501Z",
        lastMessage: 'Great! Do you Love it.',
        messageInQueue: 0,
        lastMessageTime: "04:12 PM",
        isOnline: true
    },
    {
        id: "5",
        fullName: "Shakib Hasan",
        isOnline: false,
        userImg: images.user5,
        lastSeen: "2023-11-21T04:52:06.501Z",
        lastMessage: 'Thank you !',
        messageInQueue: 2,
        lastMessageTime: "10:30 AM",
        isOnline: true
    },
    {
        id: "6",
        fullName: "Jacksoon",
        isOnline: false,
        userImg: images.user6,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Do you want to go out dinner',
        messageInQueue: 3,
        lastMessageTime: "10:05 PM",
        isOnline: false
    },
    {
        id: "7",
        fullName: "Tom Jerry",
        isOnline: false,
        userImg: images.user7,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Do you want to go out dinner',
        messageInQueue: 2,
        lastMessageTime: "11:05 PM",
        isOnline: true
    },
    {
        id: "8",
        fullName: "Lucky Luck",
        isOnline: false,
        userImg: images.user8,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Can you share the design with me?',
        messageInQueue: 2,
        lastMessageTime: "09:11 PM",
        isOnline: true
    },
    {
        id: "9",
        fullName: "Nate Jack",
        isOnline: false,
        userImg: images.user9,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Tell me what you want?',
        messageInQueue: 0,
        lastMessageTime: "06:43 PM",
        isOnline: true
    }
];

export const callData = [
    {
        id: "1",
        fullName: "Roselle Erhman",
        userImg: images.user10,
        status: "Incoming",
        date: "Dec 19, 2024"
    },
    {
        id: "2",
        fullName: "Willard Purnell",
        userImg: images.user9,
        status: "Outgoing",
        date: "Dec 17, 2024"
    },
    {
        id: "3",
        fullName: "Charlotte Hanlin",
        userImg: images.user8,
        status: "Missed",
        date: "Dec 16, 2024"
    },
    {
        id: "4",
        fullName: "Merlin Kevin",
        userImg: images.user7,
        status: "Missed",
        date: "Dec 16, 2024"
    },
    {
        id: "5",
        fullName: "Lavern Laboy",
        userImg: images.user6,
        status: "Outgoing",
        date: "Dec 16, 2024"
    },
    {
        id: "6",
        fullName: "Phyllis Godley",
        userImg: images.user5,
        status: "Incoming",
        date: "Dec 15, 2024"
    },
    {
        id: "7",
        fullName: "Tyra Dillon",
        userImg: images.user4,
        status: "Outgoing",
        date: "Dec 15, 2024"
    },
    {
        id: "8",
        fullName: "Marci Center",
        userImg: images.user3,
        status: "Missed",
        date: "Dec 15, 2024"
    },
    {
        id: "9",
        fullName: "Clinton Mccure",
        userImg: images.user2,
        status: "Outgoing",
        date: "Dec 15, 2024"
    },
];

export const banners = [
    {
      id: 1,
      discount: '40%',
      discountName: "Today's Special",
      bottomTitle: 'Get a discount for every service order!',
      bottomSubtitle: 'Only valid for today!',
    },
    {
      id: 2,
      discount: '50%',
      discountName: "Weekend Sale",
      bottomTitle: 'Special discount for weekend orders!',
      bottomSubtitle: 'This weekend only!',
    },
    {
      id: 3,
      discount: '30%',
      discountName: "Limited Time Offer",
      bottomTitle: 'Hurry up! Limited time offer!',
      bottomSubtitle: 'Valid until supplies last!',
    },
    // Add more banner objects here
];

export const notifications = [
    {
        id: "1",
        icon: icons.chat,
        title: "Kathryn sent you a message",
        description: "Tap to see the message",
        date: "2024-01-16T04:52:06.501Z"
    },
    {
        id: "2",
        icon: icons.box,
        title: "Congratulations! You have booked a salon.",
        description: "Review the salon summary.",
        date: "2024-01-23T04:52:06.501Z"
    },
    {
        id: "3",
        icon: icons.chat,
        title: "Try the latest barbers for Lialiana!",
        description: "Let’s try the feature we provide",
        date: "2024-01-23T08:52:06.501Z"
    },
    {
        id: "4",
        icon: icons.discount,
        title: "Get 20% Discount for your next order!",
        description: "For all salons without requirements",
        date: "2024-01-28T08:52:06.501Z"
    },
    {
        id: "5",
        icon: icons.chat,
        title: "New Category Salons available!",
        description: "Now you get salons near you with our platform",
        date: "2024-01-29T08:52:06.501Z"
    },
    {
        id: "6",
        icon: icons.box,
        title: "Credit card successfully connected!",
        description: "Credit card has been successfully linked!",
        date: "2024-01-23T04:52:06.501Z"
    },
    {
        id: "7",
        icon: icons.chat,
        title: "Julia sent you a message",
        description: "Tap to see the message",
        date: "2024-01-16T04:52:06.501Z"
    },
    {
        id: "8",
        icon: icons.chat,
        title: "The Courier Joanna sent you a message",
        description: "Tap to see the message",
        date: "2024-01-16T04:52:06.501Z"
    },
    {
        id: "9",
        icon: icons.chat,
        title: "Lilia sent you a message",
        description: "Tap to see the message",
        date: "2024-01-16T04:52:06.501Z"
    },
    {
        id: "10",
        icon: icons.box,
        title: "Account Setup Successfully",
        description: "Your account has been created!",
        date: "2024-01-28T04:52:06.501Z"
    },
    {
        id: "11",
        icon: icons.discount,
        title: "Get 50% Discount for First Salon Order!",
        description: "For all transaction without requirements",
        date: "2024-01-28T08:52:06.501Z"
    },
    {
        id: "12",
        icon: icons.chat,
        title: "Mily sent you a message",
        description: "Tap to see the message",
        date: "2024-01-31T04:52:06.501Z"
    },
];

export const categories = [
    {
      id: "1",
      name: "Haircuts",
      icon: icons.cut,
      iconColor: COLORS.primary,
      backgroundColor: COLORS.tansparentPrimary,
      navigation: "Haircuts",
    },
    {
      id: "2",
      name: "Make up",
      icon: icons.brush,
      iconColor: COLORS.primary,
      backgroundColor: COLORS.tansparentPrimary,
      navigation: "Makeup",
    },
    {
      id: "3",
      name: "Manicure",
      icon: icons.manicure,
      iconColor: COLORS.primary,
      backgroundColor: COLORS.tansparentPrimary,
      navigation: "Manicure",
    },
    {
      id: "4",
      name: "Massage",
      icon: icons.massage,
      iconColor: COLORS.primary,
      backgroundColor: COLORS.tansparentPrimary,
      navigation: "Massage",
    }
  ];

  export const category = [
    {
        id: "1",
        name: "All"
    },
    {
        id: "2",
        name: "Haircuts"
    },
    {
        id: "3",
        name: "Make up",
    },
    {
        id: "4",
        name: "Manicure",
    },
    {
        id: "5",
        name: "Massage",
    }
];



  export const salonsNearbyYourLocations = [
    {
        id: "1",
        name: "Belle Curls",
        category: "Haircuts",
        location: "0093 Novic Parkway",
        distance: "1.2 km",
        rating: "4.5",
        image: images.haircut1,
        categoryId: "2"
    }, 
    {
        id: "2",
        name: "Pretty Parlor",
        category: "Manicure",
        location: "New York, Runway, 123",
        distance: "3.8 km",
        rating: "4.9",
        image: images.manicure2,
        categoryId: "4"
    }, 
    {
        id: "3",
        name: "Mia Bella",
        category: "Massage",
        location: "London, Street City, 123",
        distance: "2.3 km",
        rating: "4.8",
        image: images.massage1,
        categoryId: "5"
    },
    {
        id: "4",
        name: "Glamour Makup",
        category: "Make up",
        location: "Paris, Avenue de la Beauté, 45",
        distance: "5.5 km",
        rating: "4.7",
        image: images.makeup2,
        categoryId: "3"
    }, 
    {
        id: "5",
        name: "Nail Nirvana",
        category: "Manicure",
        location: "Los Angeles, Sunset Boulevard, 789",
        distance: "4.1 km",
        rating: "4.6",
        image: images.manicure3,
        categoryId: "4"
    }, 
    {
        id: "6",
        name: "Zen Retreat",
        category: "Massage",
        location: "Tokyo, Sakura Street, 456",
        distance: "3.5 km",
        rating: "4.9",
        image: images.massage4,
        categoryId: "5"
    },
    {
        id: "7",
        name: "Gentleman's Grooming",
        category: "Haircut",
        location: "Sydney, Bondi Beach, 789",
        distance: "2.8 km",
        rating: "4.6",
        image: images.haircut4,
        categoryId: "2"
    }, 
    {
        id: "8",
        name: "Manicure Palace",
        category: "Manicure",
        location: "Dubai, Sheikh Zayed Road, 321",
        distance: "6.2 km",
        rating: "4.8",
        image: images.manicure8,
        categoryId: "4"
    }, 
    {
        id: "9",
        name: "Relaxation Station",
        category: "Massage",
        location: "Rio de Janeiro, Copacabana, 456",
        distance: "3.9 km",
        rating: "4.7",
        image: images.massage3,
        categoryId: "5"
    }
];

export const allSalons = [
    {
        id: "2",
        name: "Pretty Parlor",
        category: "Manicure",
        location: "New York, Runway, 123",
        distance: "3.8 km",
        rating: "4.9",
        image: images.manicure2,
        categoryId: "4"
    },
    {
        id: "6",
        name: "Zen Retreat",
        category: "Massage",
        location: "Tokyo, Sakura Street, 456",
        distance: "3.5 km",
        rating: "4.9",
        image: images.massage2,
        categoryId: "5"
    },
    {
        id: "1",
        name: "Belle Curls",
        category: "Haircut",
        location: "0093 Novic Parkway",
        distance: "1.2 km",
        rating: "4.5",
        image: images.haircut1,
        categoryId: "2"
    },
    {
        id: "8",
        name: "Pedicure Palace",
        category: "Make up",
        location: "Dubai, Sheikh Zayed Road, 321",
        distance: "6.2 km",
        rating: "4.8",
        image: images.makeup3,
        categoryId: "3"
    },
    {
        id: "7",
        name: "Gentleman's Grooming",
        category: "Haircut",
        location: "Sydney, Bondi Beach, 789",
        distance: "2.8 km",
        rating: "4.6",
        image: images.haircut4,
        categoryId: "2"
    },
    {
        id: "9",
        name: "Relaxation Station",
        category: "Massage",
        location: "Rio de Janeiro, Copacabana, 456",
        distance: "3.9 km",
        rating: "4.7",
        image: images.massage5,
        categoryId: "5"
    },
    {
        id: "3",
        name: "Mia Bella",
        category: "Massage",
        location: "London, Street City, 123",
        distance: "2.3 km",
        rating: "4.8",
        image: images.massage1,
        categoryId: "5"
    },
    {
        id: "4",
        name: "Glamour Spa",
        category: "Make up",
        location: "Paris, Avenue de la Beauté, 45",
        distance: "5.5 km",
        rating: "4.7",
        image: images.makeup7,
        categoryId: "3"
    },
    {
        id: "5",
        name: "Nail Nirvana",
        category: "Manicure",
        location: "Los Angeles, Sunset Boulevard, 789",
        distance: "4.1 km",
        rating: "4.6",
        image: images.manicure3,
        categoryId: "4"
    }
];

export const mostPopularSalons = [
    {
        id: "2",
        name: "Pretty Parlor",
        category: "Manicure",
        location: "New York, Runway, 123",
        distance: "3.8 km",
        rating: "4.9",
        image: images.manicure2,
        categoryId: "4"
    },
    {
        id: "6",
        name: "Zen Retreat",
        category: "Massage",
        location: "Tokyo, Sakura Street, 456",
        distance: "3.5 km",
        rating: "4.9",
        image: images.massage2,
        categoryId: "5"
    },
    {
        id: "1",
        name: "Belle Curls",
        category: "Haircut",
        location: "0093 Novic Parkway",
        distance: "1.2 km",
        rating: "4.5",
        image: images.haircut1,
        categoryId: "2"
    },
    {
        id: "8",
        name: "Pedicure Palace",
        category: "Make up",
        location: "Dubai, Sheikh Zayed Road, 321",
        distance: "6.2 km",
        rating: "4.8",
        image: images.makeup3,
        categoryId: "3"
    },
    {
        id: "7",
        name: "Gentleman's Grooming",
        category: "Haircut",
        location: "Sydney, Bondi Beach, 789",
        distance: "2.8 km",
        rating: "4.6",
        image: images.haircut4,
        categoryId: "2"
    },
    {
        id: "9",
        name: "Relaxation Station",
        category: "Massage",
        location: "Rio de Janeiro, Copacabana, 456",
        distance: "3.9 km",
        rating: "4.7",
        image: images.massage5,
        categoryId: "5"
    },
    {
        id: "3",
        name: "Mia Bella",
        category: "Massage",
        location: "London, Street City, 123",
        distance: "2.3 km",
        rating: "4.8",
        image: images.massage1,
        categoryId: "5"
    },
    {
        id: "4",
        name: "Glamour Spa",
        category: "Make up",
        location: "Paris, Avenue de la Beauté, 45",
        distance: "5.5 km",
        rating: "4.7",
        image: images.makeup7,
        categoryId: "3"
    },
    {
        id: "5",
        name: "Nail Nirvana",
        category: "Manicure",
        location: "Los Angeles, Sunset Boulevard, 789",
        distance: "4.1 km",
        rating: "4.6",
        image: images.manicure3,
        categoryId: "4"
    }
];

export const myBookmarkSalons = [
    {
        id: "2",
        name: "Pretty Parlor",
        category: "Manicure",
        location: "New York, Runway, 123",
        distance: "3.8 km",
        rating: "4.9",
        image: images.manicure2,
        categoryId: "4"
    },
    {
        id: "6",
        name: "Zen Retreat",
        category: "Massage",
        location: "Tokyo, Sakura Street, 456",
        distance: "3.5 km",
        rating: "4.9",
        image: images.massage2,
        categoryId: "5"
    },
    {
        id: "1",
        name: "Belle Curls",
        category: "Haircut",
        location: "0093 Novic Parkway",
        distance: "1.2 km",
        rating: "4.5",
        image: images.haircut1,
        categoryId: "2"
    },
    {
        id: "8",
        name: "Pedicure Palace",
        category: "Make up",
        location: "Dubai, Sheikh Zayed Road, 321",
        distance: "6.2 km",
        rating: "4.8",
        image: images.makeup3,
        categoryId: "3"
    },
    {
        id: "7",
        name: "Gentleman's Grooming",
        category: "Haircut",
        location: "Sydney, Bondi Beach, 789",
        distance: "2.8 km",
        rating: "4.6",
        image: images.haircut4,
        categoryId: "2"
    },
    {
        id: "9",
        name: "Relaxation Station",
        category: "Massage",
        location: "Rio de Janeiro, Copacabana, 456",
        distance: "3.9 km",
        rating: "4.7",
        image: images.massage5,
        categoryId: "5"
    },
    {
        id: "3",
        name: "Mia Bella",
        category: "Massage",
        location: "London, Street City, 123",
        distance: "2.3 km",
        rating: "4.8",
        image: images.massage1,
        categoryId: "5"
    },
    {
        id: "4",
        name: "Glamour Spa",
        category: "Make up",
        location: "Paris, Avenue de la Beauté, 45",
        distance: "5.5 km",
        rating: "4.7",
        image: images.makeup7,
        categoryId: "3"
    },
    {
        id: "5",
        name: "Nail Nirvana",
        category: "Manicure",
        location: "Los Angeles, Sunset Boulevard, 789",
        distance: "4.1 km",
        rating: "4.6",
        image: images.manicure3,
        categoryId: "4"
    }
];


export const haircuts = [
    {
        id: "1",
        name: "Belle Curls",
        category: "Haircuts",
        location: "0093 Novic Parkway",
        distance: "1.2 km",
        rating: "4.5",
        image: images.haircut1,
        categoryId: "2"
    }, 
    {
        id: "7",
        name: "Gentleman's Grooming",
        category: "Haircut",
        location: "Sydney, Bondi Beach, 789",
        distance: "2.8 km",
        rating: "4.6",
        image: images.haircut2,
        categoryId: "2"
    },
    {
        id: "3",
        name: "Clip 'N Snip",
        category: "Haircuts",
        location: "Los Angeles, Hollywood Boulevard, 456",
        distance: "3.5 km",
        rating: "4.7",
        image: images.haircut3,
        categoryId: "2"
    },
    {
        id: "4",
        name: "Shear Elegance",
        category: "Haircuts",
        location: "Paris, Champs-Élysées, 789",
        distance: "4.2 km",
        rating: "4.8",
        image: images.haircut4,
        categoryId: "2"
    },
    {
        id: "5",
        name: "Style Haven",
        category: "Haircuts",
        location: "Tokyo, Harajuku, 123",
        distance: "2.1 km",
        rating: "4.9",
        image: images.haircut5,
        categoryId: "2"
    },
    {
        id: "6",
        name: "Chop City",
        category: "Haircuts",
        location: "London, Oxford Street, 456",
        distance: "1.8 km",
        rating: "4.5",
        image: images.haircut6,
        categoryId: "2"
    },
    {
        id: "8",
        name: "Razor's Edge",
        category: "Haircuts",
        location: "New York, Fifth Avenue, 789",
        distance: "3.7 km",
        rating: "4.6",
        image: images.haircut7,
        categoryId: "2"
    },
    {
        id: "9",
        name: "Cutting Edge Salon",
        category: "Haircuts",
        location: "Dubai, Sheikh Zayed Road, 321",
        distance: "6.5 km",
        rating: "4.7",
        image: images.haircut8,
        categoryId: "2"
    },
    {
        id: "10",
        name: "Barber's Den",
        category: "Haircuts",
        location: "Berlin, Alexanderplatz, 456",
        distance: "2.9 km",
        rating: "4.8",
        image: images.haircut9,
        categoryId: "2"
    }
];

export const makeup = [
    {
        id: "1",
        name: "Pedicure Palace",
        category: "Makeup",
        location: "Dubai, Sheikh Zayed Road, 321",
        distance: "6.2 km",
        rating: "4.8",
        image: images.makeup1,
        categoryId: "3"
    },
    {
        id: "2",
        name: "Glamour Spa",
        category: "Makeup",
        location: "Paris, Avenue de la Beauté, 45",
        distance: "5.5 km",
        rating: "4.7",
        image: images.makeup2,
        categoryId: "3"
    },
    {
        id: "3",
        name: "Beauty Haven",
        category: "Makeup",
        location: "New York, Broadway, 123",
        distance: "3.8 km",
        rating: "4.9",
        image: images.makeup3,
        categoryId: "3"
    },
    {
        id: "4",
        name: "Glam Glow",
        category: "Makeup",
        location: "Los Angeles, Rodeo Drive, 789",
        distance: "4.1 km",
        rating: "4.6",
        image: images.makeup4,
        categoryId: "3"
    },
    {
        id: "5",
        name: "Chic Boutique",
        category: "Makeup",
        location: "London, Covent Garden, 123",
        distance: "2.3 km",
        rating: "4.8",
        image: images.makeup5,
        categoryId: "3"
    },
    {
        id: "6",
        name: "Vogue Vanity",
        category: "Makeup",
        location: "Tokyo, Ginza District, 456",
        distance: "3.5 km",
        rating: "4.7",
        image: images.makeup6,
        categoryId: "3"
    },
    {
        id: "7",
        name: "Elegant Elegance",
        category: "Makeup",
        location: "Sydney, Opera House, 789",
        distance: "2.8 km",
        rating: "4.6",
        image: images.makeup7,
        categoryId: "3"
    },
    {
        id: "8",
        name: "Charm Charm",
        category: "Makeup",
        location: "Rio de Janeiro, Ipanema Beach, 456",
        distance: "3.9 km",
        rating: "4.7",
        image: images.makeup8,
        categoryId: "3"
    },
    {
        id: "9",
        name: "Glow Up",
        category: "Makeup",
        location: "Berlin, Friedrichstraße, 321",
        distance: "5.6 km",
        rating: "4.5",
        image: images.makeup9,
        categoryId: "3"
    }
];

export const massage = [
    {
        id: "1",
        name: "Zen Retreat",
        category: "Massage",
        location: "Tokyo, Sakura Street, 456",
        distance: "3.5 km",
        rating: "4.9",
        image: images.massage1,
        categoryId: "5"
    },
    {
        id: "2",
        name: "Relaxation Station",
        category: "Massage",
        location: "Rio de Janeiro, Copacabana, 456",
        distance: "3.9 km",
        rating: "4.7",
        image: images.massage2,
        categoryId: "5"
    },
    {
        id: "3",
        name: "Mia Bella",
        category: "Massage",
        location: "London, Street City, 123",
        distance: "2.3 km",
        rating: "4.8",
        image: images.massage3,
        categoryId: "5"
    },
    {
        id: "4",
        name: "Tranquil Touch",
        category: "Massage",
        location: "Paris, Champs-Élysées, 789",
        distance: "4.2 km",
        rating: "4.6",
        image: images.massage4,
        categoryId: "5"
    },
    {
        id: "5",
        name: "Serene Spa",
        category: "Massage",
        location: "New York, Fifth Avenue, 123",
        distance: "3.8 km",
        rating: "4.5",
        image: images.massage5,
        categoryId: "5"
    },
    {
        id: "6",
        name: "Blissful Body",
        category: "Massage",
        location: "Los Angeles, Hollywood Boulevard, 456",
        distance: "4.5 km",
        rating: "4.8",
        image: images.massage6,
        categoryId: "5"
    },
    {
        id: "7",
        name: "Soothing Sanctuary",
        category: "Massage",
        location: "Sydney, Bondi Beach, 789",
        distance: "2.8 km",
        rating: "4.7",
        image: images.massage7,
        categoryId: "5"
    },
    {
        id: "8",
        name: "Heavenly Hands",
        category: "Massage",
        location: "Dubai, Jumeirah Beach, 321",
        distance: "5.6 km",
        rating: "4.9",
        image: images.massage8,
        categoryId: "5"
    },
    {
        id: "9",
        name: "Bliss Massage",
        category: "Massage",
        location: "Berlin, Alexanderplatz, 321",
        distance: "3.2 km",
        rating: "4.6",
        image: images.massage9,
        categoryId: "5"
    }
];


export const manicure = [
    {
        id: "1",
        name: "Pretty Parlor",
        category: "Manicure",
        location: "New York, Runway, 123",
        distance: "3.8 km",
        rating: "4.9",
        image: images.manicure1,
        categoryId: "4"
    },
    {
        id: "5",
        name: "Nail Nirvana",
        category: "Manicure",
        location: "Los Angeles, Sunset Boulevard, 789",
        distance: "4.1 km",
        rating: "4.6",
        image: images.manicure2,
        categoryId: "4"
    },
    {
        id: "3",
        name: "Chic Nails",
        category: "Manicure",
        location: "London, Oxford Street, 456",
        distance: "2.5 km",
        rating: "4.7",
        image: images.manicure3,
        categoryId: "4"
    },
    {
        id: "4",
        name: "Glamorous Nails",
        category: "Manicure",
        location: "Paris, Champs-Élysées, 789",
        distance: "3.9 km",
        rating: "4.8",
        image: images.manicure4,
        categoryId: "4"
    },
    {
        id: "6",
        name: "Sunrise Spa",
        category: "Manicure",
        location: "Tokyo, Ginza District, 123",
        distance: "2.2 km",
        rating: "4.6",
        image: images.manicure5,
        categoryId: "4"
    },
    {
        id: "7",
        name: "Nail Elegance",
        category: "Manicure",
        location: "Sydney, Opera House, 456",
        distance: "3.4 km",
        rating: "4.5",
        image: images.manicure6,
        categoryId: "4"
    },
    {
        id: "8",
        name: "City Nails",
        category: "Manicure",
        location: "Dubai, Sheikh Zayed Road, 789",
        distance: "5.1 km",
        rating: "4.6",
        image: images.manicure7,
        categoryId: "4"
    },
    {
        id: "9",
        name: "Urban Nails",
        category: "Manicure",
        location: "Rio de Janeiro, Ipanema Beach, 321",
        distance: "4.5 km",
        rating: "4.7",
        image: images.manicure8,
        categoryId: "4"
    },
    {
        id: "10",
        name: "Beachside Nails",
        category: "Manicure",
        location: "Berlin, Alexanderplatz, 123",
        distance: "3.7 km",
        rating: "4.8",
        image: images.manicure9,
        categoryId: "4"
    }
];

export const ratings = [
    {
        id: "1",
        title: "All"
    },
    {
        id: "6",
        title: "5"
    },
    {
        id: "5",
        title: "4"
    },
    {
        id: "4",
        title: "3"
    },
    {
        id: "3",
        title: "2"
    },
    {
        id: "2",
        title: "1"
    }
];

export const distances = [
    {
        id: "1",
        title: "All"
    },
    {
        id: "6",
        title: "<1km"
    },
    {
        id: "5",
        title: "1-5 km"
    },
    {
        id: "4",
        title: "5-10 km"
    },
    {
        id: "3",
        title: "10-15 km"
    }, 
    {
        id: "2",
        title: ">15 km"
    }
];

export const services = [
    {
        id: "1",
        name: "Hair Cut",
        type: 44,
        product: "Qiff",
        price: 12.5
    }, 
    {
        id: "2",
        name: "Hair Coloring",
        type: 12,
        product: "Qiff Coloring",
        price: 5.00
    },
    {
        id: "3",
        name: "Hair Wash",
        type: 7,
        product: "Qiff Wash",
        price: 10.00
    },
    {
        id: "4",
        name: "Shaving",
        type: 28,
        product: "Thin Shaving",
        price: 15.00
    },
    {
        id: "5",
        name: "Skin Care",
        type: 22,
        product: "Vera Skin",
        price: 7.00
    },
    {
        id: "6",
        name: "Hair Care",
        type: 10,
        product: "Hair Washing",
        price: 9.00
    },
    {
        id: "7",
        name: "Hair Dryer",
        type: 11,
        product: "Aloe Verra Shampoo",
        price: 10.00
    },
    {
        id: "8",
        name: "Face Make up",
        type: 13,
        product: "Qiff Face Makeup",
        price: 12.00
    }
];

export const packages = [
    {
        id: "1",
        image: images.barber1,
        name: "Haircut & Hairstyles",
        description: "Special Offers Packages, valid until Dec 10, 2024",
        price: 125
    },
    {
        id: "2",
        image: images.makeup1,
        name: "Our Beauty Make up",
        description: "Special Offers Packages, valid until Dec 10, 2024",
        price: 140
    },
    {
        id: "3",
        image: images.haircut2,
        name: "Haircut &  Hair coloring",
        description: "Special Offers Packages, valid until Dec 10, 2024",
        price: 150
    },
    {
        id: "4",
        image: images.makeup3,
        name: "Bridal Makeup",
        description: "Special Offers Packages, valid until Dec 10, 2024",
        price: 230
    },
    {
        id: "5",
        image: images.haircut4,
        name: "Hair Wash & Coloring",
        description: "Special Offers Packages, valid until Dec 10, 2024",
        price: 300
    }
];

export const ourGallery = [
    images.barber4,
    images.haircut2,
    images.makeup1,
    images.manicure8,
    images.haircut3,
    images.massage4,
    images.manicure7,
    images.salon6,
    images.manicure3,
    images.makeup7,
    images.makeup9,
    images.haircut4,
    images.haircut5,
    images.haircut6,
    images.haircut2,
    images.haircut9,
    images.makeup8,
    images.massage6,
    images.massage8,
    images.barber6,
    images.salon5,
    images.salon2,
    images.salon4,
    images.salon3
];

export const salonReviews = [
    {
        id: "1",
        avatar: images.user1,
        name: "Maria Thompson",
        description: "The service at this salon is exceptional! The staff is very friendly and skilled. Highly recommended! 😍",
        rating: 4.8,
        avgRating: 5,
        date: "2024-01-23T04:52:06.501Z",
        numLikes: 948
    },
    {
        id: "2",
        avatar: images.user2,
        name: "Ethan Harris",
        description: "I had a wonderful experience at this salon. The ambiance is great and I left feeling pampered.",
        rating: 4.7,
        avgRating: 5,
        date: "2024-01-23T04:52:06.501Z",
        numLikes: 120
    },
    {
        id: "3",
        avatar: images.user3,
        name: "Sophia Martinez",
        description: "Amazing service! The stylists here really know their craft. I'll definitely be returning!",
        rating: 4.7,
        avgRating: 5,
        date: "2024-01-29T04:52:06.501Z",
        numLikes: 89
    },
    {
        id: "4",
        avatar: images.user4,
        name: "Michael Johnson",
        description: "I'm very satisfied with my visit to this salon. The staff was professional and attentive.",
        rating: 4,
        avgRating: 4,
        date: "2024-01-29T04:52:06.501Z",
        numLikes: 384
    },
    {
        id: "5",
        avatar: images.user5,
        name: "Emma Wilson",
        description: "Great salon with top-notch service! I left feeling refreshed and rejuvenated. Highly recommend!",
        rating: 4.3,
        avgRating: 4,
        date: "2024-01-29T04:52:06.501Z",
        numLikes: 738
    },
    {
        id: "6",
        avatar: images.user6,
        name: "Oliver Brown",
        description: "The stylists here are amazing! They understood exactly what I wanted and delivered beyond my expectations.",
        rating: 4.8,
        avgRating: 5,
        date: "2024-01-29T04:52:06.501Z",
        numLikes: 12
    },
    {
        id: "7",
        avatar: images.user7,
        name: "Isabella White",
        description: "I had a fantastic experience at this salon. The staff was friendly and the service was excellent!",
        rating: 4.9,
        avgRating: 5,
        date: "2024-01-29T04:52:06.501Z",
        numLikes: 450
    }
];


export const manHaircuts = [
    {
        id: "1",
        name: "Undercut",
        image: images.manHaircut1,
        price: 6.5,
        numBooked: 728,
    },
    {
        id: "2",
        name: "Quiff",
        image: images.manHaircut2,
        price: 12.4,
        numBooked: 120,
    },
    {
        id: "3",
        name: "Thin Shaving",
        image: images.manHaircut3,
        price: 15.0,
        numBooked: 922,
    },
    {
        id: "4",
        name: "Crew cut",
        image: images.manHaircut4,
        price: 64.00,
        numBooked: 145,
    },
    {
        id: "5",
        name: "Regular Cut",
        image: images.manHaircut5,
        price: 18.00,
        numBooked: 930,
    },
    {
        id: "6",
        name: "Temple Cut",
        image: images.manHaircut6,
        price: 13.00,
        numBooked: 78,
    },
    {
        id: "7",
        name: "Premium Cut",
        image: images.manHaircut7,
        price: 43.00,
        numBooked: 12,
    }
];

export const womanHaircuts = [
    {
        id: "1",
        name: "Undercut",
        image: images.womanHaircut1,
        price: 6.5,
        numBooked: 728,
    },
    {
        id: "2",
        name: "Quiff",
        image: images.womanHaircut2,
        price: 12.4,
        numBooked: 120,
    },
    {
        id: "3",
        name: "Thin Shaving",
        image: images.womanHaircut3,
        price: 15.0,
        numBooked: 922,
    },
    {
        id: "4",
        name: "Crew cut",
        image: images.womanHaircut4,
        price: 64.00,
        numBooked: 145,
    },
    {
        id: "5",
        name: "Regular Cut",
        image: images.womanHaircut5,
        price: 18.00,
        numBooked: 930,
    },
    {
        id: "6",
        name: "Temple Cut",
        image: images.womanHaircut6,
        price: 13.00,
        numBooked: 78,
    },
    {
        id: "7",
        name: "Premium Cut",
        image: images.womanHaircut7,
        price: 43.00,
        numBooked: 12,
    }
];

export const hoursData = [
    {
        id: "1",
        hour: "09:00 AM"
    },
    {
        id: "2",
        hour: "10:00 AM"
    },
    {
        id: "3",
        hour: "11:00 AM"
    },
    {
        id: "4",
        hour: "12:00 AM"
    },
    {
        id: "5",
        hour: "02:00 PM"
    },
    {
        id: "6",
        hour: "03:00 PM"
    },
    {
        id: "7",
        hour: "04:00 PM"
    },
  ];

export const upcomingBookings = [
    {
        id: 1,
        status: "Scheduled",
        date: "28 Feb, 2025 - 10:00 AM",
        name: "Barbarella Inova",
        image: images.salon5,
        price: 89.99,
        address: "123 Main St, Cityville",
        services: ["Quiff Haircut","Thin Shaving","Aloe Verra Shampoo Hair Wash"],
        hasRemindMe: true
    },
    {
        id: 2,
        status: "Scheduled",
        date: "03 Mar, 2025 - 11:00 PM",
        name: "Bombastic Barbers",
        image: images.salon6,
        price: 72.99,
        address: "0993, Novick Parkway",
        services: ["Undercut Haircut","Regular Shaving","Natural Hair Wash"],
        hasRemindMe: true
    },
    {
        id: 3,
        status: "Scheduled",
        date: "12 Mar, 2025 - 09:00 AM",
        name: "Nutella Barbers",
        image: images.salon7,
        price: 22.75,
        address: "8923, Butterfield Place",
        services: ["Quiff Haircut","Regular Shaving","Natural Hair Wash"],
        hasRemindMe: false
    },
    {
        id: 4,
        status: "Scheduled",
        date: "17 Mar, 2025 - 11:00 AM",
        name: "The Best Barbers",
        image: images.salon8,
        price: 78.75,
        address: "08009, Anhalt Alley",
        services: ["Undercut Haircut","Regular Shaving","Natural Hair Wash"],
        hasRemindMe: true
    },
]

export const completedBookings = [
    {
        id: 1,
        status: "Completed",
        date: "28 Feb, 2025 - 10:00 AM",
        name: "Lighthouse Barbers",
        image: images.salon5,
        price: 89.99,
        address: "123 Main St, Cityville",
        services: ["Quiff Haircut","Thin Shaving","Aloe Verra Shampoo Hair Wash"]
    },
    {
        id: 2,
        status: "Completed",
        date: "03 Mar, 2025 - 11:00 PM",
        name: "Quinaatura Salon",
        image: images.salon6,
        price: 72.99,
        address: "0993, Novick Parkway",
        services: ["Undercut Haircut","Regular Shaving","Natural Hair Wash"]
    },
    {
        id: 3,
        status: "Completed",
        date: "12 Mar, 2025 - 09:00 AM",
        name: "Luxuriate Barbers",
        image: images.salon7,
        price: 22.75,
        address: "8923, Butterfield Place",
        services: ["Quiff Haircut","Regular Shaving","Natural Hair Wash"]
    },
    {
        id: 4,
        status: "Completed",
        date: "17 Mar, 2025 - 11:00 AM",
        name: "The Best Barbers",
        image: images.salon8,
        price: 78.75,
        address: "08009, Anhalt Alley",
        services: ["Undercut Haircut","Regular Shaving","Natural Hair Wash"]
    },
    {
        id: 5,
        status: "Completed",
        date: "17 Mar, 2025 - 11:00 AM",
        name: "Alameda Salon",
        image: images.salon9,
        price: 78.75,
        address: "08009, Anhalt Alley",
        services: ["Undercut Haircut","Regular Shaving","Natural Hair Wash"]
    },
];

export const cancelledBookings = [
    {
        id: 1,
        status: "Cancelled",
        date: "28 Feb, 2025 - 10:00 AM",
        name: "Lighthouse Barbers",
        image: images.salon1,
        price: 89.99,
        address: "123 Main St, Cityville",
        services: ["Quiff Haircut","Thin Shaving","Aloe Verra Shampoo Hair Wash"]
    },
    {
        id: 2,
        status: "Cancelled",
        date: "03 Mar, 2025 - 11:00 PM",
        name: "Quinaatura Salon",
        image: images.salon3,
        price: 72.99,
        address: "0993, Novick Parkway",
        services: ["Undercut Haircut","Regular Shaving","Natural Hair Wash"]
    },
    {
        id: 3,
        status: "Cancelled",
        date: "12 Mar, 2025 - 09:00 AM",
        name: "Luxuriate Barbers",
        image: images.salon4,
        price: 22.75,
        address: "8923, Butterfield Place",
        services: ["Quiff Haircut","Regular Shaving","Natural Hair Wash"]
    },
    {
        id: 4,
        status: "Cancelled",
        date: "17 Mar, 2025 - 11:00 AM",
        name: "The Best Barbers",
        image: images.salon5,
        price: 78.75,
        address: "08009, Anhalt Alley",
        services: ["Undercut Haircut","Regular Shaving","Natural Hair Wash"]
    },
    {
        id: 5,
        status: "Cancelled",
        date: "17 Mar, 2025 - 11:00 AM",
        name: "Alameda Salon",
        image: images.salon9,
        price: 78.75,
        address: "08009, Anhalt Alley",
        services: ["Undercut Haircut","Regular Shaving","Natural Hair Wash"]
    },
]