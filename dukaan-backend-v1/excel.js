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
    'Smartphone X', 

    'Latest model with advanced features, including a 120Hz AMOLED display and 5G connectivity.', 
    799.99, 
    'Electronics', 
    'TechBrand', 
    50, 
    'Black, Blue, White', 
    'smartphone', 
  ],
  [
    'Wireless Earbuds Pro', 
    'High-quality sound, active noise cancellation, and up to 30 hours of battery life.', 
    199.99, 
    'Electronics', 
    'TechBrand', 
    100, 
    'Black, White', 
    'audio', 
  ],
  [
    '4K Smart TV 55-inch', 
    'Ultra HD resolution with HDR support, smart assistant compatibility, and a sleek design.', 
    1299.99, 
    'Electronics', 
    'TechBrand', 
    20, 
    'Black', 
    'tv', 
  ],
  [
    'Cotton Hoodie', 
    'Comfortable, stylish hoodie made from 100% cotton. Available in various colors.', 
    39.99, 
    'Apparel', 
    'FashionCo', 
    200, 
    'Red, Black, Gray', 
    'hoodie', 
  ],
  [
    'Stainless Steel Thermos', 
    'Keeps beverages hot for 12 hours and cold for 24 hours. Ideal for travel.', 
    29.99, 
    'Home & Kitchen', 
    'HomeEssentials', 
    150, 
    'Silver, Black', 
    'thermos, travel, stainless steel', 
  ],
  [
    'Gaming Mouse Pro', 
    'Ergonomic design with customizable RGB lighting and high-precision sensor.', 
    59.99, 
    'Electronics', 
    'TechBrand', 
    80, 
    'Black', 
    'gaming', 
  ],
  [
    'Leather Wallet', 
    'Premium leather wallet with multiple compartments and RFID protection.', 
    49.99, 
    'Accessories', 
    'StyleGear', 
    120, 
    'Brown, Black', 
    'wallet', 
   
  ],
  [
    'Bluetooth Speaker Max', 
    'Portable speaker with powerful sound, IPX7 waterproof rating, and 20-hour battery life.', 
    99.99, 
    'Electronics', 
    'TechBrand', 
    90, 
    'Black, Blue', 
    'speaker', 
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
