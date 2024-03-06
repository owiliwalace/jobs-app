// File: src/app/api/getTopRooms.js

import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
    let response; // Define a variable to capture 'res'

    try {
        const client = await clientPromise;
        const db = client.db("sample_airbnb");

        const rooms = await db
            .collection("listingsAndReviews")
            .find({})
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();

        response = res; // Capture 'res' in the variable

        if (response && response.json) {
            response.json(rooms);
        } else {
            console.error('Error: Response object (res) is not properly defined.');
        }
    } catch (e) {
        console.error(e);

        if (response && response.status) {
            response.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.error('Error: Response object (res) is not properly defined.');
        }
    }
};
