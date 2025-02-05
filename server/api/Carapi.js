export default defineEventHandler((event) => {
  const cars = [
    {
      city_mpg: 59,
      class: "Electric Pickup Truck",
      combination_mpg: 53,
      drive: "All-Wheel Drive",
      fuel_type: "Electric",
      make: "GMC",
      model: "Hummer EV Pickup",
      transmission: "Automatic",
      year: 2024,
      rental_price_per_day: "$150 - $200",
      availability: "Available",
      img: "https://www.gmc.com/content/dam/gmc/na/us/english/index/vehicles/future-vehicles/hummer/hub-page/my23-hummersuv-acc-full-1920x1080.jpg?imwidth=960",
    },
    {
      city_mpg: 14,
      class: "Luxury SUV",
      combination_mpg: 15,
      drive: "Four-Wheel Drive",
      fuel_type: "Gasoline",
      make: "GMC",
      model: "Hummer H2 SUV",
      transmission: "Automatic",
      year: 2009,
      rental_price_per_day: "$100 - $150",
      availability: "Limited",
      img: "https://c4.wallpaperflare.com/wallpaper/246/567/742/2009-hummer-h2-wallpaper-preview.jpg",
    },
    {
      city_mpg: 50,
      class: "Electric Pickup Truck",
      combination_mpg: 45,
      drive: "All-Wheel Drive",
      fuel_type: "Electric",
      make: "GMC",
      model: "Hummer EV Pickup",
      transmission: "Automatic",
      year: 2023,
      rental_price_per_day: "$130 - $180",
      availability: "Available",
      img: "https://di-uploads-pod25.dealerinspire.com/hendrickchevybuickgmcsouthpoint/uploads/2020/10/2020-gmc-hummer-ev-banner-image.png",
    },

    {
      city_mpg: 50,
      class: "sedan",
      combination_mpg: 45,
      drive: "fwd",
      fuel_type: "gasoline",
      highway_mpg: 40,
      make: "toyota",
      model: "camry",
      transmission: "automatic",
      year: 2023,
      img: "https://example.com/images/toyota-camry.jpg", // Online image URL
    },
  ];

  // Log to verify the request query and handler
  console.log("API hit with query:", getQuery(event));

  const query = getQuery(event);

  if (query.model) {
    // Filter cars based on model
    const filteredCars = cars.filter((car) =>
      car.model.toLowerCase().includes(query.model.toLowerCase())
    );

    console.log("Filtered cars:", filteredCars); // Log filtered cars

    return filteredCars;
  }

  return cars;
});
