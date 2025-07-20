const products = [
  {
    id: 1,
    title: 'Samsung Galaxy A14',
    price: '4,999 EGP',
    image: 'https://tse4.mm.bing.net/th/id/OIP.O_SMou98S4Pbt1kAgrxNdAHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Mobiles'
  },
  {
    id: 2,
    title: 'Tornado Smart TV 43"',
    price: '7,899 EGP',
    image: 'https://www.elarabygroup.com/media/catalog/product/cache/34632140a06eef31e4c72368460b7d49/image/6395f77f/tornado-fhd-smart-led-tv-43-inch-built-in-receiver-43es1500e.jpg',
    category: 'Electronics'
  },
  {
    id: 3,
    title: 'Adidas Men’s Sneakers',
    price: '1,499 EGP',
    image: 'https://www.bing.com/th/id/OIP.lvHMHQGeVbh9orM2ps6nSwHaHa?w=196&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    category: 'Fashion'
  },
  {
    id: 4,
    title: 'HP 15.6" Core i5 Laptop',
    price: '19,499 EGP',
    image: 'https://th.bing.com/th/id/OIP.EbQT4Nd8rBAu1prWk85NPAHaGM?w=226&h=189&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    category: 'Computers'
  },
  {
    id: 5,
    title: 'Realme C55 Smartphone',
    price: '6,999 EGP',
    image: 'https://th.bing.com/th/id/OIP.D9i4mc8rIl_sRQsisG9iYgHaE2?w=260&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    category: 'Mobiles'
  },
  {
    id: 6,
    title: 'Lenovo Tab M10 Tablet 10.1"',
    price: '5,799 EGP',
    image: 'https://tse3.mm.bing.net/th/id/OIP.HSqkst0o1GVzx7ECfm14JAHaFt?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Tablets'
  },
  {
    id: 7,
    title: 'Xiaomi Redmi Buds 4 Lite',
    price: '899 EGP',
    image: 'https://tse2.mm.bing.net/th/id/OIP.PQtMQCcerJXs1IzED5_CsAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Accessories'
  },
  {
    id: 8,
    title: 'Canon PIXMA Ink Printer',
    price: '3,199 EGP',
    image: 'https://th.bing.com/th/id/OIP.qVCIVjc5CG_5MfqNgcVwiAHaHa?w=175&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    category: 'Printers'
  },
  {
    id: 9,
    title: 'Tornado Stand Fan 16"',
    price: '1,299 EGP',
    image: 'https://th.bing.com/th/id/OIP._BoWx4CTRbpklkW4b8elwQHaHa?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    category: 'Home Appliances'
  },
  {
    id: 10,
    title: 'Tefal Steam Iron',
    price: '799 EGP',
    image: 'https://th.bing.com/th/id/OIP.at9Fh80a9X_kDJxB1NZoagHaGB?w=228&h=185&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    category: 'Home Appliances'
  },
  {
    id: 11,
    title: 'Men’s Leather Wallet',
    price: '249 EGP',
    image: 'https://tse2.mm.bing.net/th/id/OIP.bkpu1_C9FhjcmdJJQGbIpwHaH2?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Fashion'
  },
  {
    id: 12,
    title: 'Samsung 25W Fast Charger',
    price: '499 EGP',
    image: 'https://th.bing.com/th/id/R.afba6732850f45ae52f11027b1a9ae6f?rik=AZEW3Hst4RFGgw&pid=ImgRaw&r=0',
    category: 'Accessories'
  },
  {
    id: 13,
    title: 'Sokany Hand Blender',
    price: '549 EGP',
    image: 'https://tse1.mm.bing.net/th/id/OIP.i9mluhbCPRG25x8pTYO6RQAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Kitchen Appliances'
  },
  {
    id: 14,
    title: 'Smart Watch Y68',
    price: '375 EGP',
    image: 'https://tse2.mm.bing.net/th/id/OIP._XOc6-e5zK5VH8V4-T6NOQHaGb?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Wearables'
  },
  {
    id: 15,
    title: 'iPhone 15 Pro Max Case',
    price: '199 EGP',
    image: 'https://tse3.mm.bing.net/th/id/OIP.N992mQ5wE878FSYNntjyzgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Accessories'
  },
  {
    id: 16,
    title: 'Men’s Cotton T-Shirt',
    price: '139 EGP',
    image: 'https://tse2.mm.bing.net/th/id/OIP.3QbfNYTvs2VrtGaVnjJ1RAHaLZ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Fashion'
  },
  {
    id: 17,
    title: 'Women’s Casual Handbag',
    price: '429 EGP',
    image: 'https://ae01.alicdn.com/kf/HTB1GdGlOVXXXXXGXXXXq6xXFXXX2/COOL-WALKER-High-Quality-Designer-Women-Leather-Handbags-Black-Shoulder-Bags-Ladies-Casual-Handbag-Large-Capacity.jpg',
    category: 'Fashion'
  },
  {
    id: 18,
    title: 'Logitech Wireless Mouse M185',
    price: '429 EGP',
    image: 'https://tse2.mm.bing.net/th/id/OIP.I1R4xtPiOO3LNFXNJfQxsgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Computers'
  },
  {
    id: 19,
    title: 'Beats Studio Buds',
    price: '3,799 EGP',
    image: 'https://th.bing.com/th/id/R.aa834bf14cbf6ae411a82c359a47027f?rik=GV%2fvZu%2bfnOXlfQ&pid=ImgRaw&r=0',
    category: 'Audio'
  },
  {
    id: 20,
    title: 'Air Fryer 4.5L - Sokany',
    price: '2,499 EGP',
    image: 'https://tse2.mm.bing.net/th/id/OIP.6_hMYh-Q-r3_3ej6-8NJogHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Kitchen Appliances'
  },
  {
    id: 21,
    title: 'Tornado Water Dispenser',
    price: '3,299 EGP',
    image: 'https://tse3.mm.bing.net/th/id/OIP.lBfDsnsM85qut9J4OTjNSQAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Home Appliances'
  },
  {
    id: 22,
    title: 'Panasonic Hair Clipper',
    price: '850 EGP',
    image: 'https://tse4.mm.bing.net/th/id/OIP.Y4aEC0cmZcnS-Q_zJp32VAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Personal Care'
  },
  {
    id: 23,
    title: 'Bluetooth Portable Speaker',
    price: '499 EGP',
    image: 'https://tse4.mm.bing.net/th/id/OIP.pMBkDXL5DoaCFhYXS-mljAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Audio'
  }
];


const dealContainer = document.getElementById("dealProducts");
const topRatedContainer = document.getElementById("topRatedProducts");
const productGrid = document.getElementById("productGrid");
const tabs = document.querySelectorAll(".tab-btn");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function renderProducts(list, container = productGrid) {
  if (!container) return;
  container.innerHTML = '';
  if (list.length === 0) {
    container.innerHTML = `<p>No products found.</p>`;
    return;
  }

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <div class="product-info">
        <p class="product-title">${product.title}</p>
        <p class="product-price">${product.price}</p>
      </div>
    `;
    container.appendChild(card);
  });
}


tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab-btn.active")?.classList.remove("active");
    tab.classList.add("active");

    const selected = tab.dataset.category;

    switch (selected) {
      case "all":
        renderProducts(products);
        break;
      case "deals":
        renderProducts(products.slice(0, 8));
        break;
      case "toprated":
        renderProducts(products.slice(-8).reverse());
        break;
      default:
        renderProducts(
          products.filter(p => p.category.toLowerCase() === selected)
        );
        break;
    }
  });
});


renderProducts(products);
if (dealContainer) renderProducts(products.slice(0, 8), dealContainer);
if (topRatedContainer) renderProducts(products.slice(-8).reverse(), topRatedContainer);


searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    renderProducts(products);
    return;
  }

  const results = products.filter(p =>
    p.title.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  );

  renderProducts(results);
});
