import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

const dummyDestinations = [
  // Gianyar (16 destinations)
  {
    name: "Tegalalang Rice Terrace",
    address: "Jl. Raya Tegalalang, Gianyar, Bali",
    lat: -8.4116,
    lon: 115.2783,
    price: 15000,
  },
  {
    name: "Ubud Monkey Forest",
    address: "Jl. Monkey Forest, Ubud, Gianyar, Bali",
    lat: -8.5188,
    lon: 115.2612,
    price: 80000,
  },
  {
    name: "Goa Gajah (Elephant Cave)",
    address: "Jl. Raya Goa Gajah, Bedulu, Gianyar, Bali",
    lat: -8.5135,
    lon: 115.2892,
    price: 50000,
  },
  {
    name: "Tirta Empul Temple",
    address: "Jl. Tirta Empul, Tampaksiring, Gianyar, Bali",
    lat: -8.3912,
    lon: 115.3134,
    price: 50000,
  },
  {
    name: "Campuhan Ridge Walk",
    address: "Jl. Campuhan, Ubud, Gianyar, Bali",
    lat: -8.5029,
    lon: 115.257,
    price: 0,
  },
  {
    name: "Bali Zoo",
    address: "Singapadu, Gianyar, Bali",
    lat: -8.6083,
    lon: 115.287,
    price: 150000,
  },
  {
    name: "Bali Safari and Marine Park",
    address: "Jl. Bypass Prof. Dr. Ida Bagus Mantra, Gianyar, Bali",
    lat: -8.6186,
    lon: 115.345,
    price: 250000,
  },
  {
    name: "Ubud Art Market",
    address: "Jl. Raya Ubud, Gianyar, Bali",
    lat: -8.5065,
    lon: 115.2625,
    price: 0,
  },
  {
    name: "Puri Saren Agung (Ubud Palace)",
    address: "Jl. Raya Ubud No.8, Gianyar, Bali",
    lat: -8.5069,
    lon: 115.2626,
    price: 0,
  },
  {
    name: "Hidden Canyon Beji Guwang",
    address: "Jl. Sahadewa, Guwang, Gianyar, Bali",
    lat: -8.6133,
    lon: 115.334,
    price: 15000,
  },
  {
    name: "Saraswati Temple",
    address: "Jl. Kajeng, Ubud, Gianyar, Bali",
    lat: -8.5085,
    lon: 115.2638,
    price: 0,
  },
  {
    name: "Sukawati Art Market",
    address: "Jl. Raya Sukawati, Gianyar, Bali",
    lat: -8.591,
    lon: 115.275,
    price: 0,
  },
  {
    name: "Tegenungan Waterfall",
    address: "Jl. Ir. Sutami, Kemenuh, Gianyar, Bali",
    lat: -8.5772,
    lon: 115.2858,
    price: 15000,
  },
  {
    name: "Celuk Village",
    address: "Jl. Raya Celuk, Sukawati, Gianyar, Bali",
    lat: -8.6111,
    lon: 115.267,
    price: 0,
  },
  {
    name: "Satria Coffee Plantation",
    address: "Gianyar, Bali",
    lat: -8.4554,
    lon: 115.2933,
    price: 10000,
  },
  {
    name: "Bali Pulina Agro Tourism",
    address: "Jl. Raya Pujung Kaja, Tegalalang, Gianyar, Bali",
    lat: -8.384,
    lon: 115.278,
    price: 15000,
  },

  // Badung (8 destinations)
  {
    name: "Kuta Beach",
    address: "Kuta, Badung, Bali",
    lat: -8.7184,
    lon: 115.1684,
    price: 0,
  },
  {
    name: "Seminyak Beach",
    address: "Seminyak, Badung, Bali",
    lat: -8.681,
    lon: 115.155,
    price: 0,
  },
  {
    name: "Pura Luhur Uluwatu",
    address: "Pecatu, Badung, Bali",
    lat: -8.8153,
    lon: 115.0848,
    price: 30000,
  },
  {
    name: "Garuda Wisnu Kencana Cultural Park",
    address: "Jl. Raya Uluwatu, Ungasan, Badung, Bali",
    lat: -8.8078,
    lon: 115.1666,
    price: 125000,
  },
  {
    name: "Canggu Beach",
    address: "Canggu, Badung, Bali",
    lat: -8.65,
    lon: 115.132,
    price: 0,
  },
  {
    name: "Jimbaran Bay",
    address: "Jimbaran, Badung, Bali",
    lat: -8.784,
    lon: 115.169,
    price: 0,
  },
  {
    name: "Nusa Dua Beach",
    address: "Nusa Dua, Badung, Bali",
    lat: -8.795,
    lon: 115.22,
    price: 0,
  },
  {
    name: "Pandawa Beach",
    address: "Kutuh, Badung, Bali",
    lat: -8.823,
    lon: 115.201,
    price: 15000,
  },
  {
    name: "Dreamland Beach",
    address: "Pecatu, Badung, Bali",
    lat: -8.813,
    lon: 115.105,
    price: 0,
  },
  {
    name: "Waterbom Bali",
    address: "Jl. Kartika Plaza, Kuta, Badung, Bali",
    lat: -8.725,
    lon: 115.176,
    price: 535000,
  },

  // Tabanan (6 destinations)
  {
    name: "Ulun Danu Beratan Temple",
    address: "Danau Beratan, Candikuning, Tabanan, Bali",
    lat: -8.275,
    lon: 115.166,
    price: 50000,
  },
  {
    name: "Jatiluwih Rice Terraces",
    address: "Jatiluwih, Penebel, Tabanan, Bali",
    lat: -8.413,
    lon: 115.126,
    price: 40000,
  },
  {
    name: "Pura Tanah Lot",
    address: "Beraban, Kediri, Tabanan, Bali",
    lat: -8.6214,
    lon: 115.088,
    price: 60000,
  },
  {
    name: "Lake Beratan",
    address: "Candikuning, Tabanan, Bali",
    lat: -8.275,
    lon: 115.166,
    price: 0,
  },
  {
    name: "Bali Butterfly Park",
    address: "Jl. Batukaru, Tabanan, Bali",
    lat: -8.412,
    lon: 115.127,
    price: 100000,
  },
  {
    name: "Pura Taman Ayun",
    address: "Mengwi, Badung, Bali", // Located in Badung but culturally close to Tabanan
    lat: -8.544,
    lon: 115.195,
    price: 30000,
  },

  // Karangasem (6 destinations)
  {
    name: "Tirta Gangga Water Palace",
    address: "Jl. Abang-Amlapura, Karangasem, Bali",
    lat: -8.402,
    lon: 115.589,
    price: 30000,
  },
  {
    name: "Pura Besakih",
    address: "Desa Besakih, Rendang, Karangasem, Bali",
    lat: -8.375,
    lon: 115.45,
    price: 60000,
  },
  {
    name: "Taman Ujung Water Palace",
    address: "Jl. Raya Seraya, Karangasem, Bali",
    lat: -8.468,
    lon: 115.617,
    price: 30000,
  },
  {
    name: "Mount Agung",
    address: "Karangasem, Bali",
    lat: -8.343,
    lon: 115.501,
    price: 10000,
  },
  {
    name: "Virgin Beach",
    address: "Jl. Raya Seraya, Karangasem, Bali",
    lat: -8.513,
    lon: 115.603,
    price: 10000,
  },
  {
    name: "Sidemen Valley",
    address: "Sidemen, Karangasem, Bali",
    lat: -8.5,
    lon: 115.42,
    price: 0,
  },

  // Buleleng (5 destinations)
  {
    name: "Sekumpul Waterfall",
    address: "Sawan, Buleleng, Bali",
    lat: -8.196,
    lon: 115.187,
    price: 20000,
  },
  {
    name: "Gitgit Waterfall",
    address: "Gitgit, Sukasada, Buleleng, Bali",
    lat: -8.232,
    lon: 115.158,
    price: 20000,
  },
  {
    name: "Lovina Beach",
    address: "Kalibukbuk, Buleleng, Bali",
    lat: -8.16,
    lon: 115.02,
    price: 0,
  },
  {
    name: "Singaraja City",
    address: "Singaraja, Buleleng, Bali",
    lat: -8.11,
    lon: 115.08,
    price: 0,
  },
  {
    name: "Air Panas Banjar Hot Spring",
    address: "Desa Banjar, Buleleng, Bali",
    lat: -8.21,
    lon: 114.94,
    price: 20000,
  },

  // Bangli (3 destinations)
  {
    name: "Mount Batur",
    address: "Kintamani, Bangli, Bali",
    lat: -8.243,
    lon: 115.375,
    price: 100000,
  },
  {
    name: "Lake Batur",
    address: "Kintamani, Bangli, Bali",
    lat: -8.25,
    lon: 115.39,
    price: 0,
  },
  {
    name: "Penglipuran Village",
    address: "Bangli, Bali",
    lat: -8.411,
    lon: 115.352,
    price: 30000,
  },

  // Klungkung (5 destinations)
  {
    name: "Kelingking Beach",
    address: "Bunga Mekar, Nusa Penida, Klungkung, Bali",
    lat: -8.751,
    lon: 115.474,
    price: 10000,
  },
  {
    name: "Angel's Billabong",
    address: "Sakti, Nusa Penida, Klungkung, Bali",
    lat: -8.757,
    lon: 115.465,
    price: 10000,
  },
  {
    name: "Broken Beach",
    address: "Sakti, Nusa Penida, Klungkung, Bali",
    lat: -8.755,
    lon: 115.464,
    price: 10000,
  },
  {
    name: "Crystal Bay",
    address: "Sakti, Nusa Penida, Klungkung, Bali",
    lat: -8.775,
    lon: 115.46,
    price: 10000,
  },
  {
    name: "Nusa Lembongan",
    address: "Nusa Lembongan, Klungkung, Bali",
    lat: -8.67,
    lon: 115.44,
    price: 0,
  },
];

const dummyTraditions = [
  {
    name: "Ngaben Ceremony",
    content:
      "A traditional cremation ceremony in Bali, considered a sacred duty to release the soul of the deceased to the afterlife.",
  },
  {
    name: "Galungan and Kuningan",
    content:
      "A major Balinese holiday celebrating the victory of dharma (good) over adharma (evil), where ancestors are believed to visit the earth.",
  },
  {
    name: "Nyepi Day (Day of Silence)",
    content:
      "The Balinese New Year, a day of complete silence, fasting, and meditation for self-reflection across the entire island.",
  },
  {
    name: "Kecak Dance",
    content:
      "A form of Balinese Hindu dance and music drama performed by a circle of a hundred or more performers wearing checked cloths around their waists, famous for its 'chak-chak' chant.",
  },
  {
    name: "Barong Dance",
    content:
      "A traditional Balinese dance that narrates the eternal battle between the good spirit Barong and the evil queen Rangda.",
  },
  {
    name: "Canang Sari",
    content:
      "Daily offerings made by Balinese Hindus to thank the Sang Hyang Widhi Wasa in praise and prayer, seen everywhere in Bali.",
  },
  {
    name: "Omed-omedan",
    content:
      "Known as the 'kissing festival,' a unique ceremony held the day after Nyepi in Sesetan, Denpasar, to strengthen community bonds.",
  },
];

const dummyStories = [
  {
    name: "My Spiritual Journey in the Heart of Ubud",
    content:
      "Discovering the serene rice paddies and the tranquil yoga studios of Ubud was a life-changing experience. This is my story of finding peace and 'taksu' in Bali's cultural capital.",
  },
  {
    name: "A Culinary Tour of Seminyak's Best Warungs",
    content:
      "From babi guling to sate lilit, I ate my way through Seminyak. Here are the must-visit local eateries that will give you a true taste of Balinese cuisine without breaking the bank.",
  },
  {
    name: "Surfing the Legendary Waves of Uluwatu",
    content:
      "The cliffs, the temple, the sunset, and of course, the waves. Surfing in Uluwatu is not just a sport, it's a spiritual experience. A guide for beginners and pros alike.",
  },
  {
    name: "Chasing Waterfalls in Northern Bali",
    content:
      "Forget the crowded south for a day and head north. I'll share my itinerary for visiting the most breathtaking waterfalls, including Sekumpul and Gitgit.",
  },
  {
    name: "Nusa Penida in 3 Days: An Adventurer's Itinerary",
    content:
      "Kelingking Beach, Angel's Billabong, Broken Beach... Nusa Penida is an island of rugged beauty and incredible views. Here is how to conquer it in just three days.",
  },
];

async function main() {
  console.log("🌱 Start seeding...");
  console.log("🗑️ Deleting existing data...");
  await prisma.activityLog.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.story.deleteMany();
  await prisma.tradition.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.district.deleteMany();
  await prisma.image.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log("👤 Seeding users with accounts...");
  const usersData = [
    {
      name: "admin",
      email: "admin@gmail.com",
      role: "ADMIN",
      password: "admin123",
    },
    {
      name: "user_1",
      email: "user1@gmail.com",
      role: "USER",
      password: "password1",
    },
    {
      name: "user_2",
      email: "user2@gmail.com",
      role: "USER",
      password: "password2",
    },
    {
      name: "user_3",
      email: "user3@gmail.com",
      role: "USER",
      password: "password3",
    },
    {
      name: "user_4",
      email: "user4@gmail.com",
      role: "USER",
      password: "password4",
    },
    {
      name: "user_5",
      email: "user5@gmail.com",
      role: "USER",
      password: "password5",
    },
    {
      name: "user_6",
      email: "user6@gmail.com",
      role: "USER",
      password: "password6",
    },
  ];

  const createdUsers = [];
  for (const u of usersData) {
    const user = await prisma.user.create({
      data: {
        name: u.name,
        email: u.email,
        role: u.role,
      },
    });

    const hashedPassword = await bcrypt.hash(u.password, SALT_ROUNDS);

    await prisma.account.create({
      data: {
        accountId: user.id,
        providerId: "credentials",
        userId: user.id,
        password: hashedPassword,
      },
    });

    createdUsers.push(user);
  }

  const adminUser = createdUsers.find((u) => u.name === "admin");
  const regularUser1 = createdUsers.find((u) => u.name === "user_1");
  const regularUser2 = createdUsers.find((u) => u.name === "user_2");

  if (!adminUser || !regularUser1 || !regularUser2) {
    throw new Error("Default users could not be created or found.");
  }

  console.log("📚 Seeding categories...");
  const createdCategories = await prisma.category.createManyAndReturn({
    data: [
      {
        name: "Beach",
        slug: "beach",
        description:
          "Includes tourist spots focused on beaches and sea activities, such as sunbathing, swimming, or water sports.",
      },
      {
        name: "Mountain",
        slug: "mountain",
        description:
          "Contains destinations located in mountainous areas, offering natural scenery, hiking, or other high-altitude outdoor activities.",
      },
      {
        name: "Historical Site",
        slug: "historical-site",
        description:
          "Refers to historical locations with cultural or archaeological value, such as ancient temples, palaces, or monuments.",
      },
      {
        name: "Nature Reserve",
        slug: "nature-reserve",
        description:
          "Protected area for preserving biodiversity, flora, and fauna. These destinations are suitable for ecotourism and nature observation.",
      },
      {
        name: "Urban Tourism",
        slug: "urban-tourism",
        description:
          "Includes tourism conducted in urban areas, focusing on city life, modern architecture, shopping centers, and entertainment venues.",
      },
      {
        name: "Waterfall",
        slug: "waterfall",
        description: "Places with stunning natural waterfalls.",
      },
    ],
  });

  console.log("🏙️ Seeding districts...");
  const createDistricts = await prisma.district.createManyAndReturn({
    data: [
      {
        name: "Gianyar",
        slug: "gianyar",
        description:
          "Known as the cultural heart of Bali, Gianyar is home to many artists, galleries, and cultural sites.",
      },
      {
        name: "Badung",
        slug: "badung",
        description:
          "This regency is a major tourism hub, covering popular areas like Kuta, Seminyak, and Canggu, famous for their beaches, nightlife, and shopping centers.",
      },
      {
        name: "Karangasem",
        slug: "karangasem",
        description:
          "Located in eastern Bali, Karangasem offers rich natural beauty and cultural heritage, including historical water palaces like Tirta Gangga.",
      },
      {
        name: "Tabanan",
        slug: "tabanan",
        description:
          "Often called Bali's 'rice granary' due to its vast rice paddies, this area offers a more peaceful and natural atmosphere.",
      },
      {
        name: "Jembrana",
        slug: "jembrana",
        description:
          "Situated in western Bali, Jembrana is famous for its unique buffalo racing tradition and authentic culture.",
      },
      {
        name: "Buleleng",
        slug: "buleleng",
        description:
          "This northern coastal regency features black sand beaches, waterfalls, and natural hot springs, offering a quieter atmosphere than southern Bali.",
      },
      {
        name: "Bangli",
        slug: "bangli",
        description:
          "Located in the highlands, Bangli has a cool climate and stunning natural landscapes, including Mount Batur and Lake Batur.",
      },
      {
        name: "Klungkung",
        slug: "klungkung",
        description:
          "The smallest regency in Bali, it serves as the main gateway to Nusa Penida, Nusa Lembongan, and Nusa Ceningan, which are known for their spectacular underwater beauty.",
      },
    ],
  });

  console.log("🏷️ Seeding tags...");
  const createdTags = await prisma.tag.createManyAndReturn({
    data: [
      { name: "Popular", slug: "popular" },
      { name: "Family Friendly", slug: "family-friendly" },
      { name: "Instagrammable", slug: "instagrammable" },
      { name: "Adventure", slug: "adventure" },
      { name: "Hidden Gem", slug: "hidden-gem" },
      { name: "Cultural", slug: "cultural" },
      { name: "Nature", slug: "nature" },
    ],
  });

  console.log("📍 Seeding destinations...");
  for (const dest of dummyDestinations) {
    const slug = dest.name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const district = createDistricts.find((d) => dest.address.includes(d.name));
    if (!district) {
      console.warn(`Could not find district for destination: ${dest.name}`);
      continue;
    }

    let category = null;
    if (dest.name.includes("Beach") || dest.name.includes("Bay")) {
      category = createdCategories.find((c) => c.name === "Beach");
    } else if (
      dest.name.includes("Temple") ||
      dest.name.includes("Palace") ||
      dest.name.includes("Village") ||
      dest.name.includes("Pura")
    ) {
      category = createdCategories.find((c) => c.name === "Historical Site");
    } else if (
      dest.name.includes("Waterfall") ||
      dest.name.includes("Lake") ||
      dest.name.includes("Rice Terrace") ||
      dest.name.includes("Mount")
    ) {
      category = createdCategories.find((c) => c.name === "Nature Reserve");
    } else if (dest.name.includes("Park") || dest.name.includes("Market")) {
      category = createdCategories.find((c) => c.name === "Urban Tourism");
    } else {
      category = createdCategories[0];
    }

    const randomTag1 =
      createdTags[Math.floor(Math.random() * createdTags.length)];
    const randomTag2 =
      createdTags[Math.floor(Math.random() * createdTags.length)];

    await prisma.destination.create({
      data: {
        name: dest.name,
        slug: slug,
        content: `Discover the beauty of ${dest.name}. A perfect spot to explore, relax, and create unforgettable memories.`,
        address: dest.address,
        price: dest.price,
        district: {
          connect: {
            id: district.id,
          },
        },
        category: {
          connect: { id: category.id },
        },
        tags: {
          connect: [
            { id: randomTag1.id },
            ...(randomTag1.id !== randomTag2.id ? [{ id: randomTag2.id }] : []),
          ],
        },
      },
    });
  }

  console.log("🎭 Seeding traditions...");
  for (const tradition of dummyTraditions) {
    const slug = tradition.name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    await prisma.tradition.create({
      data: {
        name: tradition.name,
        slug: slug,
        content: tradition.content,
      },
    });
  }

  console.log("📝 Seeding stories...");
  const userIds = [adminUser.id, regularUser1.id, regularUser2.id];
  for (const story of dummyStories) {
    const slug = story.name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    const randomAuthorId = userIds[Math.floor(Math.random() * userIds.length)];

    await prisma.story.create({
      data: {
        name: story.name,
        slug: slug,
        content: story.content,
        isPublished: true,
        userId: randomAuthorId,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("✅ Seeding finished.");
    await prisma.$disconnect();
  });
