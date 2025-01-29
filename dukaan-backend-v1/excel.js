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
  'images' // Added the images field
];

// Create new sample data with image details
const sampleData = [
  [
    'Noise_Cancelling_Headset', 
    'Professional-grade headset with active noise cancellation and crystal-clear audio.', 
    299.99, 
    'Audio', 
    'SoundPro', 
    80, 
    'Gray, Black', 
    'headset, noise-cancelling', 
    JSON.stringify([
      { public_id: 'headset_1', url: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQAktvXSAeZgROoxcNaez2-YbJOC-4k6ukqbHkX29pMidBQXmqALxQYJOiIvsamMvIAW8hhAec1FqoTAYuZNaal9aX8ghd6e3y8bCBmLTrG' }
    ])
  ],
  [
    'UltraHD_Projector_4K', 
    'Portable 4K UHD projector with HDR support and 3000 lumens brightness.', 
    999.99, 
    'Home Entertainment', 
    'VisionLight', 
    20, 
    'White', 
    'projector, 4k', 
    JSON.stringify([
      { public_id: 'projector_4k_1', url: 'https://crossbeats.com/cdn/shop/files/3_1f5a753e-485e-4201-9b2a-2207745e5a67.png?v=1735959361&width=1400' }
    ])
  ],
];

// Combine headers and sample data
const sheetData = [headers, ...sampleData];

// Create a worksheet
const ws = XLSX.utils.aoa_to_sheet(sheetData);

// Add the worksheet to the workbook
XLSX.utils.book_append_sheet(workbook, ws, 'Products');

// Write the workbook to a file
XLSX.writeFile(workbook, 'bulk_upload_template_with_images.xlsx');

console.log('Excel template with updated images generated: bulk_upload_template_with_images.xlsx');