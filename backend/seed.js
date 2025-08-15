const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config({ path: './config.env' });

// Sample products data
const sampleProducts = [
  // Electronics & Tech
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and long battery life.',
    price: 99.99,
    images: [
      {
        public_id: 'headphones_1',
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
      }
    ],
    category: 'Headphones',
    seller: 'TechStore',
    stock: 50
  },
  {
    name: 'Smartphone - Latest Model',
    description: 'Latest smartphone with advanced camera system and powerful processor.',
    price: 799.99,
    images: [
      {
        public_id: 'smartphone_1',
        url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
      }
    ],
    category: 'Electronics',
    seller: 'MobileWorld',
    stock: 30
  },
  {
    name: 'Laptop - Premium Edition',
    description: 'High-performance laptop perfect for work and gaming.',
    price: 1299.99,
    images: [
      {
        public_id: 'laptop_1',
        url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'
      }
    ],
    category: 'Laptops',
    seller: 'TechStore',
    stock: 20
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking.',
    price: 29.99,
    images: [
      {
        public_id: 'mouse_1',
        url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'TechStore',
    stock: 100
  },
  {
    name: 'Gaming Keyboard',
    description: 'Mechanical gaming keyboard with RGB lighting.',
    price: 149.99,
    images: [
      {
        public_id: 'keyboard_1',
        url: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'GamingGear',
    stock: 75
  },
  {
    name: '4K Monitor',
    description: 'Ultra-wide 4K monitor for professional work and entertainment.',
    price: 599.99,
    images: [
      {
        public_id: 'monitor_1',
        url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500'
      }
    ],
    category: 'Electronics',
    seller: 'TechStore',
    stock: 25
  },
  {
    name: 'Fitness Tracker',
    description: 'Smart fitness tracker with heart rate monitoring and GPS.',
    price: 199.99,
    images: [
      {
        public_id: 'fitness_1',
        url: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500'
      }
    ],
    category: 'Electronics',
    seller: 'HealthTech',
    stock: 60
  },
  {
    name: 'Portable Speaker',
    description: 'Waterproof portable speaker with 360-degree sound.',
    price: 79.99,
    images: [
      {
        public_id: 'speaker_1',
        url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'
      }
    ],
    category: 'Electronics',
    seller: 'AudioPro',
    stock: 40
  },
  {
    name: 'Smart Watch',
    description: 'Advanced smartwatch with health monitoring and notifications.',
    price: 299.99,
    images: [
      {
        public_id: 'smartwatch_1',
        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
      }
    ],
    category: 'Electronics',
    seller: 'TechStore',
    stock: 35
  },
  {
    name: 'Tablet Pro',
    description: 'Professional tablet for creative work and entertainment.',
    price: 649.99,
    images: [
      {
        public_id: 'tablet_1',
        url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500'
      }
    ],
    category: 'Electronics',
    seller: 'TechStore',
    stock: 15
  },
  {
    name: 'Gaming Headset',
    description: '7.1 surround sound gaming headset with microphone.',
    price: 89.99,
    images: [
      {
        public_id: 'gaming_headset_1',
        url: 'https://images.unsplash.com/photo-1598488035139-bdaa7543d6f3?w=500'
      }
    ],
    category: 'Headphones',
    seller: 'GamingGear',
    stock: 45
  },
  {
    name: 'Webcam HD',
    description: '1080p HD webcam for video conferencing and streaming.',
    price: 59.99,
    images: [
      {
        public_id: 'webcam_1',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'TechStore',
    stock: 80
  },
  {
    name: 'USB-C Hub',
    description: 'Multi-port USB-C hub for laptop connectivity.',
    price: 39.99,
    images: [
      {
        public_id: 'usb_hub_1',
        url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'TechStore',
    stock: 120
  },
  {
    name: 'Wireless Charger',
    description: 'Fast wireless charging pad for smartphones.',
    price: 24.99,
    images: [
      {
        public_id: 'wireless_charger_1',
        url: 'https://images.unsplash.com/photo-1609592806598-04c5d2c6d3e8?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'TechStore',
    stock: 90
  },
  {
    name: 'Bluetooth Earbuds',
    description: 'True wireless earbuds with noise cancellation.',
    price: 129.99,
    images: [
      {
        public_id: 'earbuds_1',
        url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500'
      }
    ],
    category: 'Headphones',
    seller: 'AudioPro',
    stock: 65
  },
  {
    name: 'Gaming Mouse',
    description: 'High-precision gaming mouse with customizable buttons.',
    price: 79.99,
    images: [
      {
        public_id: 'gaming_mouse_1',
        url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'GamingGear',
    stock: 55
  },
  {
    name: 'Mechanical Keyboard',
    description: 'Premium mechanical keyboard with Cherry MX switches.',
    price: 179.99,
    images: [
      {
        public_id: 'mechanical_keyboard_1',
        url: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'TechStore',
    stock: 30
  },
  {
    name: 'Monitor Stand',
    description: 'Adjustable monitor stand for ergonomic setup.',
    price: 49.99,
    images: [
      {
        public_id: 'monitor_stand_1',
        url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'TechStore',
    stock: 40
  },
  {
    name: 'Laptop Cooling Pad',
    description: 'Cooling pad with multiple fans for laptop temperature control.',
    price: 34.99,
    images: [
      {
        public_id: 'cooling_pad_1',
        url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'TechStore',
    stock: 70
  },
  {
    name: 'Phone Stand',
    description: 'Adjustable phone stand for hands-free viewing.',
    price: 19.99,
    images: [
      {
        public_id: 'phone_stand_1',
        url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'TechStore',
    stock: 150
  },
  {
    name: 'Cable Organizer',
    description: 'Cable management solution for clean desk setup.',
    price: 14.99,
    images: [
      {
        public_id: 'cable_organizer_1',
        url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'TechStore',
    stock: 200
  },
  {
    name: 'Screen Protector',
    description: 'Tempered glass screen protector for smartphones.',
    price: 9.99,
    images: [
      {
        public_id: 'screen_protector_1',
        url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'TechStore',
    stock: 300
  },
  {
    name: 'Laptop Sleeve',
    description: 'Protective laptop sleeve with padding.',
    price: 24.99,
    images: [
      {
        public_id: 'laptop_sleeve_1',
        url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'TechStore',
    stock: 85
  },
  {
    name: 'Gaming Chair',
    description: 'Ergonomic gaming chair with lumbar support.',
    price: 299.99,
    images: [
      {
        public_id: 'gaming_chair_1',
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'GamingGear',
    stock: 25
  },
  {
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness.',
    price: 39.99,
    images: [
      {
        public_id: 'desk_lamp_1',
        url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'TechStore',
    stock: 60
  },
  {
    name: 'Microphone',
    description: 'USB condenser microphone for streaming and recording.',
    price: 89.99,
    images: [
      {
        public_id: 'microphone_1',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'AudioPro',
    stock: 35
  },
  {
    name: 'Streaming Light',
    description: 'Ring light for streaming and video calls.',
    price: 69.99,
    images: [
      {
        public_id: 'streaming_light_1',
        url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'TechStore',
    stock: 45
  },
  {
    name: 'Gaming Mousepad',
    description: 'Large gaming mousepad with RGB lighting.',
    price: 29.99,
    images: [
      {
        public_id: 'gaming_mousepad_1',
        url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'GamingGear',
    stock: 80
  },
  {
    name: 'Laptop Stand',
    description: 'Adjustable laptop stand for better ergonomics.',
    price: 44.99,
    images: [
      {
        public_id: 'laptop_stand_1',
        url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'TechStore',
    stock: 55
  },
  {
    name: 'Phone Case',
    description: 'Protective phone case with shock absorption.',
    price: 19.99,
    images: [
      {
        public_id: 'phone_case_1',
        url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'TechStore',
    stock: 250
  },
  {
    name: 'Power Bank',
    description: '20000mAh portable power bank for charging devices.',
    price: 49.99,
    images: [
      {
        public_id: 'power_bank_1',
        url: 'https://images.unsplash.com/photo-1609592806598-04c5d2c6d3e8?w=500'
      }
    ],
    category: 'Accessories',
    seller: 'TechStore',
    stock: 100
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with deep bass.',
    price: 89.99,
    images: [
      {
        public_id: 'bluetooth_speaker_1',
        url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'
      }
    ],
    category: 'Electronics',
    seller: 'AudioPro',
    stock: 50
  },
  {
    name: 'Smart Bulb',
    description: 'WiFi-enabled smart bulb with color control.',
    price: 34.99,
    images: [
      {
        public_id: 'smart_bulb_1',
        url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500'
      }
    ],
    category: 'Electronics',
    seller: 'TechStore',
    stock: 75
  },
  {
    name: 'Security Camera',
    description: '1080p security camera with night vision.',
    price: 79.99,
    images: [
      {
        public_id: 'security_camera_1',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
      }
    ],
    category: 'Electronics',
    seller: 'TechStore',
    stock: 40
  },
  {
    name: 'Robot Vacuum',
    description: 'Smart robot vacuum with mapping technology.',
    price: 299.99,
    images: [
      {
        public_id: 'robot_vacuum_1',
        url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500'
      }
    ],
    category: 'Electronics',
    seller: 'TechStore',
    stock: 20
  },
  {
    name: 'Air Purifier',
    description: 'HEPA air purifier for clean indoor air.',
    price: 199.99,
    images: [
      {
        public_id: 'air_purifier_1',
        url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500'
      }
    ],
    category: 'Electronics',
    seller: 'TechStore',
    stock: 30
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe.',
    price: 89.99,
    images: [
      {
        public_id: 'coffee_maker_1',
        url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500'
      }
    ],
    category: 'Electronics',
    seller: 'TechStore',
    stock: 45
  },
  {
    name: 'Blender',
    description: 'High-speed blender for smoothies and food processing.',
    price: 69.99,
    images: [
      {
        public_id: 'blender_1',
        url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500'
      }
    ],
    category: 'Electronics',
    seller: 'TechStore',
    stock: 60
  },
  {
    name: 'Toaster',
    description: '4-slice toaster with bagel setting.',
    price: 39.99,
    images: [
      {
        public_id: 'toaster_1',
        url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500'
      }
    ],
    category: 'Electronics',
    seller: 'TechStore',
    stock: 80
  },
  {
    name: 'Microwave',
    description: 'Countertop microwave with sensor cooking.',
    price: 129.99,
    images: [
      {
        public_id: 'microwave_1',
        url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500'
      }
    ],
    category: 'Electronics',
    seller: 'TechStore',
    stock: 35
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Admin user created');

    // Create sample products
    const productsWithUser = sampleProducts.map(product => ({
      ...product,
      user: adminUser._id
    }));

    await Product.insertMany(productsWithUser);
    console.log('Sample products created');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

// Run seed function
seedDatabase();

