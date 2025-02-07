// hotel.js
export default defineEventHandler((event) => {
  const hotels = [
    {
      id: 1,
      name: "The Ritz Paris",
      city: "Paris",
      price: "750-1000",
      rating: 5,
      img: "https://cdn.decoist.com/wp-content/uploads/2016/12/Grand-new-avatar-of-Ritz-Paris.jpg",
      img2: "https://deluxetargets.com/wp-content/uploads/2020/10/ritz-paris_deluxetargets_1500x1000.jpg",
    },
    {
      id: 2,
      name: "Hotel Savoy",
      city: "London",
      price: "450-600",
      rating: 4.5,
      img: "https://phantom-elmundo.unidadeditorial.es/cab4570ea3036bde0dfb02163e749673/crop/0x0/2046x1363/assets/multimedia/imagenes/2020/11/11/16050910490101.jpg",
      img2: "https://th.bing.com/th/id/R.ebb43757bced4aad8b00dbd7a64c9838?rik=76pz%2fNMX14nZBg&riu=http%3a%2f%2fwww.travellermade.com%2fwp-content%2fuploads%2f2016%2f05%2fRFH-Hotel-Savoy-Classic-room-2.jpg&ehk=cIGRGluVfao6XW8emqTJ3OPF45KaUKYMoUBvlucER9I%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      id: 3,
      name: "The Plaza Hotel",
      city: "New York",
      price: "600-800",
      rating: 5,
      img: "https://itc.imgix.net/websiteimages/luxurytravel/fifthavenueentrance481166standard.jpg?crop=fit&auto=compress&w=1600",
      img2: "https://www.theplazany.com/wp-content/uploads/2016/02/DSC_3037-scaled.jpg",
    },
    {
      id: 4,
      name: "Mandarin Oriental",
      city: "Hong Kong",
      price: "500-700",
      rating: 4.7,
      img: "https://photos.mandarinoriental.com/is/image/MandarinOriental/hong-kong-exterior-view-night-04?height=1000&hei=1000&fmt=jpeg&op_usm=1,1,5,0&resMode=sharp2&fit=crop&qlt=75,0",
      img2: "https://photos.mandarinoriental.com/is/image/MandarinOriental/hong-kong-18-rooms-study-room?height=1000&hei=1000&fmt=jpeg&op_usm=1,1,5,0&resMode=sharp2&fit=crop&qlt=75,0",
    },
    {
      id: 5,
      name: "Four Seasons",
      city: "Tokyo",
      price: "650-900",
      rating: 5,
      img: "https://www.fourseasons.com/alt/img-opt/~70.1530.0,0000-139,5923-3000,0000-1687,5000/publish/content/dam/fourseasons/images/web/MAR/MAR_304_original.jpg",
      img2: "https://i.pinimg.com/originals/ba/8a/cb/ba8acbd0a741c25c1b5bbe48e33c52d6.jpg",
    },
    {
      id: 6,
      name: "The St. Regis",
      city: "Dubai",
      price: "700-1000",
      rating: 4.8,
      img: "https://images.squarespace-cdn.com/content/v1/5a98653d96e76f7f7dc569c7/92bc8cad-8677-4d76-bb8f-ff73ec7920d2/IMG_9555+3.JPG?format=1500w",
      img2: "https://images.squarespace-cdn.com/content/v1/5a98653d96e76f7f7dc569c7/e5b1aa1a-1271-4c6b-a154-86e75b4f0817/IMG_9479.JPG?format=1500w",
    },
    {
      id: 7,
      name: "Hotel de Crillon",
      city: "Paris",
      price: "700-1000",
      rating: 4.9,
      img: "https://res.cloudinary.com/grand-luxury/image/upload/w_874,h_603,q_50,f_auto,c_fill,g_center,dpr_1/Enhanced%20Hotel%20Page/Hotel%20De%20Crillon/Experiences%20the%20Paris%20of%20the%20Parisians/Muse%CC%81e%20Jacquemart-Andre/shutterstock_376192771",
      img2: "https://res.cloudinary.com/grand-luxury/image/upload/w_1025,h_780,q_50,f_auto,c_fill,g_custom,x_1717,y_911,dpr_1/remote_glh/original/71559-root-rooms-premier-room.jpg",
    },
    {
      id: 8,
      name: "The Biltmore",
      city: "Los Angeles",
      price: "350-500",
      rating: 4.3,
      img: "https://i.pinimg.com/originals/fb/67/27/fb6727aacc7c6b12d2413c13c327de16.jpg",
      img2: "https://th.bing.com/th/id/R.78c04e21cf5d2142f08866a8a091ce0a?rik=2xt0cQ%2fkiCccnA&riu=http%3a%2f%2fbiltmore.s3.amazonaws.com%2f1032%2frenovation2016_kingwterracecropped.jpg&ehk=oNZheqYFzVaKA0QnW%2bv6cdT0zTQEyNxusDZPe7vUam8%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      id: 9,
      name: "Shangri-La Hotel",
      city: "Singapore",
      price: "550-750",
      rating: 4.7,
      img: "https://th.bing.com/th/id/R.db249fa9972661308a63db2fa1015c76?rik=UcBHGwWtMfEuLQ&riu=http%3a%2f%2fwww.shangri-la.com%2fuploadedImages%2fShangri-la_Hotels%2fShangri-La_Hotel%2c_Chiang_Mai%2fSLCM-Bg-Exterior.jpg&ehk=Q8wWbK0ZC32Zn8O2nSPFH95ahdtNQh%2blYscji29stA8%3d&risl=&pid=ImgRaw&r=0",
      img2: "https://i.pinimg.com/736x/bc/5b/78/bc5b780990cd800137855a5b7f121156.jpg",
    },
    {
      id: 10,
      name: "The Beverly Hills Hotel",
      city: "Los Angeles",
      price: "850-1200",
      rating: 5,
      img: "https://res.cloudinary.com/grand-luxury/image/upload/w_1200,q_50,f_auto,c_fill,g_center,dpr_1/remote_glh/original/56098-root-exteriors-front-door.jpg",
      img2: "https://res.cloudinary.com/grand-luxury/image/upload/w_1200,q_50,f_auto,c_fill,g_center,dpr_1/remote_glh/original/101820-root-deluxe-guestroom-with-balcony-bed.jpg",
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
