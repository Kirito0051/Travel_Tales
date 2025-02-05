import { MongoClient } from "mongodb"; // Ensure MongoClient is imported

const uri =
  "mongodb+srv://kazuto0975:g3pEuHq4K59Xrctr@traveltails.rni8d.mongodb.net/?retryWrites=true&w=majority&appName=TravelTails";

export default defineEventHandler(async (event) => {
  let client;
  try {
    console.log("Connecting to MongoDB...");

    client = new MongoClient(uri);
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("traveltailsDB");
    const flightsCollection = database.collection("flights");

    // Extract query parameters from the request
    const query = getQuery(event); // Nuxt 3 method to extract query params
    console.log("Query Parameters:", query);

    const { departure, arrival, passengers, class: classType } = query; // Get class from the query

    // Build the filter object dynamically
    const filter = {};

    // Filter by origin (departure) and destination (arrival)
    if (departure) {
      filter.origin = { $regex: new RegExp(departure, "i") }; // Case-insensitive match
    }
    if (arrival) {
      filter.destination = { $regex: new RegExp(arrival, "i") };
    }

    if (classType) {
      // Normalize classType (trim spaces, convert to lowercase)
      const normalizedClassType = classType.trim().toLowerCase();

      // Log the normalized class for debugging
      console.log("Normalized Class Type:", normalizedClassType);

      // Use the normalized classType directly in the filter
      filter[`availableSeats.${normalizedClassType}`] = { $gte: 1 }; // Ensure available seats > 0
    }

    // Log the filter object for debugging
    console.log("Filter Object:", filter);

    // Fetch filtered flights data
    const flights = await flightsCollection.find(filter).toArray();

    console.log("Fetched flights:", flights);
    if (flights.length === 0) {
      return { message: "No flights found matching the criteria." };
    }

    // Return the flights data
    return flights;
  } catch (error) {
    console.error("Error while connecting to MongoDB or fetching data:", error);
    return { message: "Error fetching flights data.", error: error.message };
  } finally {
    if (client) {
      await client.close();
    }
  }
});
