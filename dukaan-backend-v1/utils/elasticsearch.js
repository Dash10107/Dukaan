const { Client } = require("@elastic/elasticsearch");
const productModel = require("../models/productModel");

const client = new Client({
  node: "https://my-elasticsearch-project-ed67cc.es.us-east-1.aws.elastic.cloud:443",
  auth: {
    apiKey: process.env.ELASTICSEARCH_API_KEY,
  },
});


const fetchProductsAndIndex = async () => {
  const products = await productModel.find(); 
  const bulkOperations = products.flatMap((product) => [
    { index: { _index: "e-commerce" } },
    {
      vector: [
        Number.parseFloat(product.price || 0),
        Number.parseFloat(product.quantity || 0),
        Number.parseFloat(product.sold || 0),
      ],
      title: product.title,
      description: product.description,
      category: product.category,
      brand: product.brand,
      tags: product.tags,
      price: product.price,
      quantity: product.quantity,
      sold: product.sold,
    },
  ]);

  await client.bulk({ refresh: true, body: bulkOperations });
};



module.exports = { client, fetchProductsAndIndex };