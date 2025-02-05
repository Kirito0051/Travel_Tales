// hotel.js
export default defineEventHandler((event) => {
  const hotels = [
    {
      id: 1,
      name: "The Ritz Paris",
      city: "Paris",
      price: "750",
      rating: 5,
      img: "https://www.theritzparis.com/media/4058/ritzparis-exterior.jpg",
    },
    {
      id: 2,
      name: "Hotel Savoy",
      city: "London",
      price: "450",
      rating: 4.5,
      img: "https://www.savoycarlton.com/wp-content/uploads/2018/10/savoy_london.jpg",
    },
    {
      id: 3,
      name: "The Plaza Hotel",
      city: "New York",
      price: "600",
      rating: 5,
      img: "https://upload.wikimedia.org/wikipedia/commons/d/da/Plaza_Hotel_New_York_2013.jpg",
    },
    {
      id: 4,
      name: "Mandarin Oriental",
      city: "Hong Kong",
      price: "500",
      rating: 4.7,
      img: "https://media.mandarinoriental.com/cms/2e7f9b34-033b-4010-b93c-c8e8c8c9b585.jpg",
    },
    {
      id: 5,
      name: "Four Seasons",
      city: "Tokyo",
      price: "650",
      rating: 5,
      img: "https://www.fourseasons.com/content/dam/fourseasons/images/web/multi-property-hero.jpg",
    },
    {
      id: 6,
      name: "The St. Regis",
      city: "Dubai",
      price: "700",
      rating: 4.8,
      img: "https://www.stregis.com/content/dam/stregis/hero-header/stregis-dubai-herohd.jpg",
    },
    {
      id: 7,
      name: "Hotel de Crillon",
      city: "Paris",
      price: "700",
      rating: 4.9,
      img: "https://www.rosewoodhotels.com/-/media/rosewood/locations/europe/france/paris/hotel-de-crillon/hero/dc_lobby_hero.jpg",
    },
    {
      id: 8,
      name: "The Biltmore",
      city: "Los Angeles",
      price: "350",
      rating: 4.3,
      img: "https://www.biltmorehotel.com/wp-content/uploads/2020/05/Exterior_2020-1024x684.jpg",
    },
    {
      id: 9,
      name: "Shangri-La Hotel",
      city: "Singapore",
      price: "550",
      rating: 4.7,
      img: "https://www.shangri-la.com/media/1135/sgp/slider/hero/slider-hotel.jpg",
    },
    {
      id: 10,
      name: "The Beverly Hills Hotel",
      city: "Los Angeles",
      price: "850",
      rating: 5,
      img: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Beverly_Hills_Hotel_2013.jpg",
    },
  ];

  // Log to verify the request query and handler
  console.log("API hit with query:", getQuery(event));

  const query = getQuery(event);
  let filteredHotels = hotels;

  // Filter by location
  if (query.location) {
    filteredHotels = filteredHotels.filter((hotel) =>
      hotel.city.toLowerCase().includes(query.location.toLowerCase())
    );
  }

  // Filter by star rating
  if (query.stars) {
    const stars = parseFloat(query.stars);
    filteredHotels = filteredHotels.filter((hotel) => hotel.rating >= stars);
  }

  console.log("Filtered hotels:", filteredHotels); // Log filtered hotels

  return filteredHotels;
});
