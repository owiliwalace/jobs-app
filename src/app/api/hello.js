const{MongoClient} = require('mongodb');
async function main(){
const uri= "mongodb+srv://owiliwalaceun:owiliwalacepw@cluster2.pb0xrlt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2";

const client = new MongoClient(uri);

try{

    await client.connect();
    await listDatabases(client);
} catch (e){
    console.error(e);
} finally{
    await client.close()
}

}
main().catch(console.error);

async function listDatabases(client){
    const database = client.db('sample_airbnb');
    const collection = database.collection('listingsAndReviews');
    const listings = await collection.find({}, { projection: { listing_url: 1, name: 1, summary: 1, _id: 0 } }).toArray();

    console.log("Listings and Reviews:");
    listings.forEach(listing => {
        console.log(`Listing URL: ${listing.listing_url}`);
        console.log(`Name: ${listing.name}`);
        console.log(`Summary: ${listing.summary}`);
        console.log("------------------------");
    });

    const databasesList= await client.db().admin().listDatabases();
console.log("Databases:");
databasesList.databases.forEach(db=>{
    console.log(`- ${db.name}`);
})

}