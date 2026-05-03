import bcrypt from "bcryptjs";  
import { prisma } from "@/app/lib/prisma"

async function main() {
  // =========================
  // 1. USERS
  // =========================

  const password = await bcrypt.hash("123456", 10);

  const ada = await prisma.user.create({
    data: {
      name: "Ada Artisan",
      email: "ada@craftora.com",
      password: password,
      role: "ARTISAN",
    },
  });

  const chinedu = await prisma.user.create({
    data: {
      name: "Chinedu Okafor",
      email: "chinedu@craftora.com",
      password: password,
      role: "ARTISAN",
    },
  });

  const amina = await prisma.user.create({
    data: {
      name: "Amina Yusuf",
      email: "amina@craftora.com",
      password: password,
      role: "ARTISAN",
    },
  });

  const buyer = await prisma.user.create({
    data: {
      name: "John Buyer",
      email: "john@craftora.com",
      password: password,
      role: "BUYER",
    },
  });

  // =========================
  // 2. PRODUCTS
  // =========================
  await prisma.product.createMany({
    data: [
      {
        title: "Handwoven Ankara Tote Bag",
        description:
          "A premium handcrafted tote bag made from authentic African Ankara fabric. Durable stitching, vibrant patterns, and designed for everyday fashion and utility.",
        price: 25000,
        imageUrl:
          "https://i.pinimg.com/736x/15/0a/99/150a99e9fd7429a90d2f099021024ca2.jpg",
        userId: ada.id,
      },
      {
        title: "Beaded Waist Beads Collection",
        description:
          "Elegant traditional waist beads handcrafted with glass and crystal beads. A perfect blend of cultural heritage and modern fashion expression.",
        price: 8000,
        imageUrl:
          "https://i.pinimg.com/736x/3d/80/d2/3d80d2f7d584253ca08e73a3261b86ca.jpg",
        userId: ada.id,
      },
      {
        title: "Handmade Leather Sandals",
        description:
          "Durable artisan leather sandals crafted from genuine leather. Designed for comfort, long wear, and everyday elegance.",
        price: 18000,
        imageUrl:
          "https://i.pinimg.com/736x/67/c8/a5/67c8a5dc63081cfcc4c09b481cd023bc.jpg",
        userId: chinedu.id,
      },
      {
        title: "Carved Wooden Decorative Bowl",
        description:
          "Sustainably sourced hardwood bowl, hand-carved with precision. Perfect for home décor or functional kitchen use.",
        price: 12000,
        imageUrl:
          "https://i.pinimg.com/1200x/a3/90/c3/a390c33decfec4fad9d8a49548daf43e.jpg",
        userId: chinedu.id,
      },
      {
        title: "Crochet Fashion Shoulder Bag",
        description:
          "Lightweight handmade crochet bag crafted with soft yarn. Stylish, durable, and perfect for casual everyday use.",
        price: 9000,
        imageUrl:
          "https://i.pinimg.com/1200x/15/56/32/1556325225ed153e47e35fa6948ce74c.jpg",
        userId: ada.id,
      },
      {
        title: "Handcrafted Clay Vase",
        description:
          "Minimalist ceramic vase shaped and glazed by hand. Ideal for interior décor and floral arrangements.",
        price: 22000,
        imageUrl:
          "https://i.pinimg.com/736x/b7/34/93/b73493c63d3d92257ceab472993f35db.jpg",
        userId: amina.id,
      },
      {
        title: "African Print Men's Shirt",
        description:
          "Bold African print shirt made from breathable cotton. Combines cultural identity with modern fashion styling.",
        price: 15000,
        imageUrl:
          "https://i.pinimg.com/736x/61/34/89/613489c8f48eb2bccd80f8ab0d6dc205.jpg",
        userId: ada.id,
      },
      {
        title: "Woven Storage Basket Set",
        description:
          "Eco-friendly handcrafted baskets made from natural fibers. Perfect for storage, organization, or home decoration.",
        price: 9000,
        imageUrl:
          "https://i.pinimg.com/736x/cb/74/ca/cb74cadf3623127b97cbc5c441f7725f.jpg",
        userId: chinedu.id,
      },
      {
        title: "Colorful Beaded Necklace Set",
        description:
          "Vibrant handmade bead necklace set designed for cultural fashion and elegant styling.",
        price: 7000,
        imageUrl:
          "https://i.pinimg.com/1200x/8d/33/ee/8d33ee25915c0e71747786ed087f3c06.jpg",
        userId: amina.id,
      },
      {
        title: "Hand-Painted Wall Art Piece",
        description:
          "African-inspired acrylic wall art created by hand. Perfect for modern interiors and cultural expression.",
        price: 30000,
        imageUrl:
          "https://i.pinimg.com/736x/c4/04/ca/c404ca1e2dc27f469b2012abd1dcd2ed.jpg",
        userId: chinedu.id,
      },
    ],
  });

  console.log("🚀 Craftora seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });