const XLSX = require('xlsx');

// Create a new workbook
const workbook = XLSX.utils.book_new();

// Define the headers based on the Product model
const headers = [
  'title', 
  'description', 
  'price', 
  'category', 
  'brand', 
  'quantity', 
  'color', 
  'tags', 
];

// Create sample data
const sampleData = [
  [
    'Laptop_Pro_15 ', 
    'High-performance laptop with a 15-inch display, 1TB SSD, and 16GB RAM.', 
    1499.99, 
    'Computers', 
    'CompTech', 
    30, 
    'Silver, Space Gray', 
    'laptop', 
  ],
  [
    'Wireless_Headphones', 
    'Noise-cancelling over-ear headphones with 40-hour battery life.', 
    249.99, 
    'Audio', 
    'SoundMax', 
    75, 
    'Black, White', 
    'headphones', 
  ],
  [
    'OLED_Smart_TV_65-inch', 
    '65-inch OLED display with 4K resolution and Dolby Vision support.', 
    1899.99, 
    'Home Entertainment', 
    'VisionTech', 
    15, 
    'Black', 
    'tv, oled', 
  ],
  [
    'Sports_Jacket', 
    'Lightweight, breathable jacket for outdoor activities. Available in multiple sizes.', 
    89.99, 
    'Apparel', 
    'ActiveWear', 
    250, 
    'Blue, Green, Black', 
    'jacket, sports', 
  ],
  [
    'Insulated_Water_Bottle', 
    'Keeps beverages cold for 24 hours and hot for 12 hours. Made of stainless steel.', 
    24.99, 
    'Kitchen', 
    'EcoHydrate', 
    200, 
    'Blue, White, Gray', 
    'bottle, stainless steel', 
  ],
  [
    'Mechanical_Keyboard', 
    'RGB backlit keyboard with customizable keys and tactile switches.', 
    99.99, 
    'Accessories', 
    'KeyMaster', 
    60, 
    'Black, White', 
    'keyboard, gaming', 
  ],
  [
    'Slim Leather_Cardholder', 
    'Compact cardholder with RFID protection and premium leather finish.', 
    34.99, 
    'Accessories', 
    'UrbanStyle', 
    150, 
    'Tan, Black', 
    'cardholder', 
  ],
  [
    'Portable_Charger_20000mAh', 
    'Fast-charging power bank with dual USB ports and LED indicator.', 
    49.99, 
    'Electronics', 
    'PowerPlus', 
    100, 
    'Black, White', 
    'charger, power bank', 
  ]
];

// Combine headers and sample data
const sheetData = [headers, ...sampleData];

// Create a worksheet
const ws = XLSX.utils.aoa_to_sheet(sheetData);

// Add the worksheet to the workbook
XLSX.utils.book_append_sheet(workbook, ws, 'Products');

// Write the workbook to a file
XLSX.writeFile(workbook, 'bulk_upload_template.xlsx');

console.log('Excel template generated: bulk_upload_template.xlsx');