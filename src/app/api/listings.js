

import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3001; 

app.get('/api/listings', async (req, res) => {
  const uri = "mongodb+srv://owiliwalaceun:owiliwalacepw@cluster2.pb0xrlt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const listings = await listListings(client);
    res.json(listings);
  } catch (e) {
    console.error(e);

   
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

async function listListings(client) {
  const database = client.db('sample_airbnb');
  const collection = database.collection('listingsAndReviews');
  const listings = await collection.find({}, { projection: { listing_url: 1, name: 1, summary: 1, _id: 0 } }).toArray();
  return listings;
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
