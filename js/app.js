/**
 * MAGIC MEMORIES TOURS & TRAVELS - MASTER APPLICATION SCRIPT
 * Brand: Magic Memories Tours & Travels (magicmemoriestoursandtravels)
 * Features: Flight Preloader Animation, Scroll Progress Tracker with Airplane,
 *           3D Boarding Pass Tilt, Scroll Reveals, Journey Empires Packages & Modal
 */

function initApp() {
  // ==========================================
  // 1. FLIGHT PRELOADER ANIMATION ENGINE
  // ==========================================
  const preloader = document.getElementById('flightPreloader');
  const barFill = document.getElementById('preloaderBarFill');
  const percentText = document.getElementById('preloaderPercent');
  const statusText = document.getElementById('preloaderStatusText');
  const replayBtn = document.getElementById('replayPreloaderBtn');

  function runPreloader(callback) {
    if (!preloader) return;
    preloader.classList.remove('fade-out');
    let progress = 0;
    const stages = [
      { at: 15, text: "Boarding Flight MM-2026... 🛫" },
      { at: 45, text: "Cruising over Bay of Bengal Waters... 🌊" },
      { at: 75, text: "Descending into Port Blair Emerald Islands... 🏝️" },
      { at: 95, text: "Welcome to Magic Memories Tours & Travels! 🌴" }
    ];

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 6) + 3;
      if (progress > 100) progress = 100;

      if (barFill) barFill.style.width = `${progress}%`;
      if (percentText) percentText.textContent = `${progress}%`;

      stages.forEach(st => {
        if (progress >= st.at && statusText) {
          statusText.textContent = st.text;
        }
      });

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('fade-out');
          if (callback) callback();
        }, 500);
      }
    }, 40);
  }

  // Trigger preloader on fresh load
  runPreloader();

  // Replay preloader button
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      runPreloader();
    });
  }

  // ==========================================
  // 2. TOP SCROLL PROGRESS TRACKER WITH FLYING PLANE
  // ==========================================
  const scrollFlightBar = document.getElementById('scrollFlightBar');
  const scrollTracker = document.querySelector('.scroll-flight-tracker');
  const mainHeader = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && scrollFlightBar) {
      const scrollPercent = (window.scrollY / totalHeight) * 100;
      scrollFlightBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }
    if (scrollTracker) {
      if (window.scrollY > 25) {
        scrollTracker.classList.add('scrolled');
      } else {
        scrollTracker.classList.remove('scrolled');
      }
    }
    if (mainHeader) {
      if (window.scrollY > 30) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  // ==========================================
  // 3. SCROLL REVEAL (INTERSECTION OBSERVER)
  // ==========================================
  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // ==========================================
  // 4. 3D HERO BOARDING PASS TICKET TILT
  // ==========================================
  const ticketCard = document.getElementById('heroTicketCard');
  if (ticketCard) {
    ticketCard.addEventListener('mousemove', (e) => {
      const rect = ticketCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      ticketCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;
    });

    ticketCard.addEventListener('mouseleave', () => {
      ticketCard.style.transform = 'perspective(1000px) rotateY(-8deg) rotateX(6deg) translateY(0)';
    });
  }

  // ==========================================
  // 5. PACKAGE DATABASE (JOURNEY EMPIRES SPEC)
  // ==========================================
  const packagesData = [
    {
      id: "weekend-vacation",
      title: "Weekend Vacation",
      duration: "3 Nights / 4 Days",
      category: "weekend",
      badge: "Popular",
      oldPrice: 15500,
      currentPrice: 13700,
      destination: "Port Blair & Havelock",
      shortDesc: "Discover the best Andaman weekend vacation package with stunning beaches, island adventures, and relaxing stays in Port Blair & Havelock.",
      images: [
        "assets/images/honeymoon.jpg",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
      ],
      specs: {
        duration: "3N / 4D",
        destination: "Port Blair & Havelock",
        transfers: "Private AC Cab & Cruise",
        sightseeing: "5 Iconic Spots"
      },
      itinerary: [
        {
          day: 1,
          title: "Arrival at Port Blair • Historic Cellular Jail & Light-Sound Show",
          desc: "Touch down at Veer Savarkar International Airport, Port Blair. Our executive greets you and transfers you to your hotel. In the afternoon, visit the historic Cellular Jail followed by the stirring Light and Sound Show recounting India's freedom struggle."
        },
        {
          day: 2,
          title: "Private Cruise to Havelock Island • Sunset at Radhanagar Beach (Asia's #7)",
          desc: "Board the high-speed luxury catamaran cruise (Makruzz / Nautika) to Havelock Island. Check into your tropical beach resort. At 3 PM, head to the world-renowned Radhanagar Beach, ranked among Asia's most spectacular beaches for a surreal sunset."
        },
        {
          day: 3,
          title: "Elephant Beach Coral Reef Snorkeling • Return to Port Blair",
          desc: "Speedboat ride to Elephant Beach. Enjoy complimentary guided snorkeling over pristine live coral reefs. Try jet skiing or banana boat rides. In the evening, board your cruise back to Port Blair for local souvenir shopping."
        },
        {
          day: 4,
          title: "Corbyn's Cove Beach • Departure with Magical Memories",
          desc: "Relish your final breakfast overlooking the turquoise sea. Enjoy a quick photo stop at palm-fringed Corbyn's Cove Beach before private drop-off to Port Blair Airport for your flight home."
        }
      ],
      inclusions: [
        "3 Nights AC Deluxe accommodation on twin sharing",
        "Daily delicious buffet breakfast at all hotels",
        "Airport pickup & drop-off in private AC vehicle",
        "Inter-island cruise tickets (Makruzz / Nautika / Green Ocean)",
        "Complimentary guided snorkeling session at Elephant Beach",
        "All entry permits, parking charges & toll taxes"
      ],
      exclusions: [
        "Airfare to/from Port Blair",
        "Personal expenses, laundry, and beverage charges",
        "Optional water sports (Scuba diving, Sea kart)",
        "Applicable GST (5%)"
      ]
    },
    {
      id: "havelock-paradise",
      title: "Havelock Paradise",
      duration: "4 Nights / 5 Days",
      category: "island",
      badge: "Best Seller",
      oldPrice: 18500,
      currentPrice: 16200,
      destination: "Port Blair & Havelock Island",
      shortDesc: "Experience a memorable 4 Nights / 5 Days Andaman tour with scenic beaches, tropical islands, and exciting adventures in Havelock Paradise.",
      images: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        "assets/images/honeymoon.jpg",
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
      ],
      specs: {
        duration: "4N / 5D",
        destination: "Havelock & Port Blair",
        transfers: "AC Cab & Luxury Cruise",
        sightseeing: "7 Attractions"
      },
      itinerary: [
        {
          day: 1,
          title: "Arrival at Port Blair • City Orientation & Corbyn's Cove",
          desc: "Warm welcome at Port Blair airport. Check in to your hotel and unwind. Visit Corbyn's Cove Beach and Cellular Jail with national memorial light & sound show."
        },
        {
          day: 2,
          title: "Cruise to Havelock • Leisure at Kalapathar Beach",
          desc: "Sail to Havelock on a high-speed private ferry. Check in at your resort. Afternoon excursion to Kalapathar Beach with black volcanic rocks against turquoise blue waters."
        },
        {
          day: 3,
          title: "Elephant Beach Water Adventures • Radhanagar Sunset",
          desc: "Thrilling speedboat trip to Elephant Beach for water activities, sea walk, or glass-bottom boat. Post afternoon, relax on Radhanagar's white sands."
        },
        {
          day: 4,
          title: "Return Cruise to Port Blair • Sagarika Handicraft Emporium",
          desc: "Morning at leisure. Catch your return catamaran to Port Blair. Evening exploration of Aberdeen Bazaar and Sagarika Emporium for genuine seashell art and pearls."
        },
        {
          day: 5,
          title: "Sweet Farewell & Airport Transfer",
          desc: "Delicious breakfast and hotel check-out. Private transfer to Port Blair Airport carrying unforgettable Magic Memories."
        }
      ],
      inclusions: [
        "4 Nights accommodation in 3★ / 4★ properties",
        "Daily breakfast spread",
        "Private AC cab for all transfers and sightseeing",
        "Havelock round-trip luxury ferry tickets",
        "All entry tickets and boat transfer fees"
      ],
      exclusions: [
        "Flight fares",
        "Lunch and dinner unless specified",
        "Personal expenses and tips"
      ]
    },
    {
      id: "perfect-andaman-gateway",
      title: "Perfect Andaman Gateway",
      duration: "5 Nights / 6 Days",
      category: "island",
      badge: "Trending",
      oldPrice: 21000,
      currentPrice: 18500,
      destination: "Port Blair, Havelock & Neil Island",
      shortDesc: "Experience the Perfect Andaman Gateway with a 5 Nights / 6 Days island vacation covering Port Blair, Havelock Island, and Neil Island.",
      images: [
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
        "assets/images/adventure.jpg",
        "assets/images/honeymoon.jpg"
      ],
      specs: {
        duration: "5N / 6D",
        destination: "3 Major Islands",
        transfers: "AC Cab & Catamaran",
        sightseeing: "10 Famous Spots"
      },
      itinerary: [
        {
          day: 1,
          title: "Arrival Port Blair • Cellular Jail Sound & Light Show",
          desc: "Welcome to the Emerald Islands. Hotel transfer and afternoon visit to Cellular Jail followed by the evening Sound & Light presentation."
        },
        {
          day: 2,
          title: "Luxury Catamaran to Havelock • Radhanagar Beach",
          desc: "High-speed cruise journey to Havelock Island. Check-in at your beachside resort and explore Radhanagar Beach until twilight."
        },
        {
          day: 3,
          title: "Elephant Beach Water Sports • Snorkeling & Sea Walking",
          desc: "Morning speedboat ride to Elephant Beach for thrilling water sports, underwater coral viewing, and sea walk exploration."
        },
        {
          day: 4,
          title: "Havelock to Neil Island • Natural Coral Bridge & Laxmanpur Beach",
          desc: "Cruise to serene Neil Island (Shaheed Dweep). Marvel at the naturally formed rock coral bridge and watch the mesmerizing sunset at Laxmanpur Beach."
        },
        {
          day: 5,
          title: "Bharatpur Beach Water Activities • Return to Port Blair",
          desc: "Morning visit to Bharatpur beach with shallow coral lagoons. Return ferry to Port Blair for evening shopping."
        },
        {
          day: 6,
          title: "Departure • Fly Home with Everlasting Memories",
          desc: "Breakfast, checkout, and private cab drop-off to Port Blair airport."
        }
      ],
      inclusions: [
        "5 Nights accommodation across Port Blair, Havelock, and Neil",
        "Daily hearty breakfasts",
        "All island-hopping ferry tickets confirmed in AC luxury class",
        "Complimentary snorkeling at Elephant Beach",
        "Dedicated travel coordinator on ground"
      ],
      exclusions: [
        "Airfare",
        "Any water sports beyond package complimentary inclusions",
        "5% GST"
      ]
    },
    {
      id: "honeymoon-package",
      title: "Honeymoon Package | Customizable",
      duration: "5 Nights / 6 Days",
      category: "honeymoon",
      badge: "Romantic Special",
      oldPrice: 23500,
      currentPrice: 21000,
      destination: "Port Blair, Havelock & Neil Island",
      shortDesc: "Celebrate your love with our Andaman Honeymoon Package featuring romantic beaches, candlelight beach dinners, beautiful stays, and unforgettable island experiences.",
      images: [
        "assets/images/honeymoon.jpg",
        "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80",
        "assets/images/adventure.jpg"
      ],
      specs: {
        duration: "5N / 6D",
        destination: "Romantic 3 Islands",
        transfers: "Private Luxury AC Car",
        sightseeing: "Curated Couple Spots"
      },
      itinerary: [
        {
          day: 1,
          title: "Port Blair Arrival • Couple Floral Bed Welcome & Cellular Jail",
          desc: "Arrive in Port Blair to a special welcome. Check in to your suite decorated with fresh flower petals. Enjoy an afternoon stroll along Marina Park and witness the romantic sunset before the Cellular Jail show."
        },
        {
          day: 2,
          title: "Private Cruise to Havelock • Candlelight Dinner on the Beach",
          desc: "Board the luxury cruise to Havelock. Check in to your private beach villa. In the evening, enjoy a romantic beachfront candlelight dinner with a custom chocolate cake under the starlit island sky."
        },
        {
          day: 3,
          title: "Elephant Beach Coral Reef Exploration • Radhanagar Sunset Walk",
          desc: "Hand-in-hand speedboat ride to Elephant Beach. Enjoy crystal blue lagoon swimming and coral viewing. Evening photoshoot at Radhanagar Beach during golden hour."
        },
        {
          day: 4,
          title: "Neil Island Romance • Howrah Natural Rock Bridge & Sunset Point",
          desc: "Sail to the peaceful shores of Neil Island. Walk across the stunning natural coral bridge. Spend a peaceful evening holding hands at Sunset Beach."
        },
        {
          day: 5,
          title: "Sunrise at Sitapur Beach • Cruise back to Port Blair",
          desc: "Catch the magical sunrise at Sitapur Beach. Sail back to Port Blair. Evening leisure dinner and local pearls shopping."
        },
        {
          day: 6,
          title: "Departure • Cherish Your Honeymoon Moments Forever",
          desc: "Breakfast in bed, check out, and comfortable private drop to airport with your Magic Memories couple gift pack."
        }
      ],
      inclusions: [
        "5 Nights in premium couple-friendly beach resorts",
        "1 Candlelight Beach Dinner with complimentary bottle & cake",
        "Flower bed decoration on arrival night",
        "All private luxury cruise tickets (Makruzz/Nautika)",
        "Daily buffet breakfast & 24x7 romantic trip assistance"
      ],
      exclusions: [
        "Flights to/from Port Blair",
        "Personal expenses and premium watersports",
        "GST 5%"
      ]
    },
    {
      id: "family-package",
      title: "Family Package | Customizable",
      duration: "5 Nights / 6 Days",
      category: "family",
      badge: "Family Favorite",
      oldPrice: 22500,
      currentPrice: 19800,
      destination: "Port Blair & Havelock",
      shortDesc: "Create golden moments with your family. Designed with comfortable tempos/cabs, kid-friendly beaches, gentle watersports, and spacious family resorts.",
      images: [
        "assets/images/family.jpg",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        "assets/images/adventure.jpg"
      ],
      specs: {
        duration: "5N / 6D",
        destination: "Port Blair & Havelock",
        transfers: "Spacious AC Innova / Cab",
        sightseeing: "Kid & Senior Friendly"
      },
      itinerary: [
        {
          day: 1,
          title: "Arrival Port Blair • Anthropological Museum & Cellular Jail",
          desc: "Touchdown in Port Blair. Visit the educational Anthropological Museum showcasing native tribal heritage, followed by Cellular Jail."
        },
        {
          day: 2,
          title: "Ross Island (Netaji Subhash Chandra Bose Dweep) & Havelock Cruise",
          desc: "Explore historic Ross Island where friendly deer and peacocks roam freely amongst colonial ruins. Afternoon cruise to Havelock."
        },
        {
          day: 3,
          title: "Elephant Beach Glass Bottom Boat & Banana Rides",
          desc: "Safe water adventures suitable for children and elders, including glass bottom boat viewing and fun family banana rides."
        },
        {
          day: 4,
          title: "Radhanagar Beach Family Picnic & Havelock Leisure",
          desc: "Spend a relaxing day enjoying coconut water, safe swimming, and building sandcastles at Radhanagar Beach."
        },
        {
          day: 5,
          title: "Port Blair Return • Samudrika Naval Marine Museum & Shopping",
          desc: "Cruise back to Port Blair. Visit the fascinating Samudrika Marine Museum with rare skeletons and aquariums."
        },
        {
          day: 6,
          title: "Departure with Happy Family Smiles",
          desc: "Warm breakfast and airport drop in comfortable vehicle."
        }
      ],
      inclusions: [
        "Interconnected / spacious family rooms at 3★/4★ hotels",
        "Daily hearty breakfasts",
        "Private AC cab throughout with experienced courteous driver",
        "Glass-bottom boat ride for family included",
        "All entry fees and ferry transfers"
      ],
      exclusions: [
        "Airfare",
        "Personal laundry & extra meals",
        "5% GST"
      ]
    },
    {
      id: "kids-vacation",
      title: "Kids Vacation | Customizable",
      duration: "5 Nights / 6 Days",
      category: "family",
      badge: "Kids Special",
      oldPrice: 20000,
      currentPrice: 17500,
      destination: "Port Blair, Havelock & North Bay",
      shortDesc: "An educational and thrilling holiday tailored for children: underwater submarine ride, marine biology explorations, and fun watersport activities.",
      images: [
        "assets/images/family.jpg",
        "assets/images/adventure.jpg",
        "assets/images/honeymoon.jpg"
      ],
      specs: {
        duration: "5N / 6D",
        destination: "Marine Parks & Havelock",
        transfers: "AC Cab & Luxury Boats",
        sightseeing: "Adventure & Science"
      },
      itinerary: [
        {
          day: 1,
          title: "Port Blair Arrival • Fisheries Aquarium & Science Centre",
          desc: "Interactive exploration of Andaman marine life at the Fisheries Aquarium and interactive exhibits at the Science Centre."
        },
        {
          day: 2,
          title: "North Bay Coral Island (The Lighthouse on the ₹20 Note)",
          desc: "Trip to North Bay island. Semi-submarine ride allowing children to see vibrant clownfish (Nemo) without getting wet!"
        },
        {
          day: 3,
          title: "Catamaran Cruise to Havelock • Radhanagar Waves",
          desc: "Cruise ride with panoramic sea views. Evening wave play and sandcastle building at world famous Radhanagar."
        },
        {
          day: 4,
          title: "Elephant Beach Gentle Water Sports & Trekking",
          desc: "Exciting boat ride to Elephant Beach with kid-safe snorkeling and mangrove forest trail."
        },
        {
          day: 5,
          title: "Return to Port Blair • Chidiya Tapu Sunset & Bird Watching",
          desc: "Scenic journey to Chidiya Tapu (Bird Island), known for indigenous tropical birds and stunning sunset."
        },
        {
          day: 6,
          title: "Airport Drop with Travel Certificates for Kids",
          desc: "Every young explorer receives a Magic Memories Junior Explorer Certificate on departure!"
        }
      ],
      inclusions: [
        "Child-friendly resorts with swimming pools",
        "Daily breakfast with child meal options",
        "North Bay semi-submarine or glass boat pass included",
        "All ferry and entrance fees"
      ],
      exclusions: [
        "Flight tickets",
        "Discretionary personal expenses"
      ]
    },
    {
      id: "group-package",
      title: "Group Package | Customizable",
      duration: "4 Nights / 5 Days",
      category: "weekend",
      badge: "Group Discount",
      oldPrice: 17200,
      currentPrice: 14900,
      destination: "Port Blair & Havelock",
      shortDesc: "Perfect for college reunions, corporate retreats, and friend gangs. Includes private group transfers, beach bonfires, and bulk activity discounts.",
      images: [
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
        "assets/images/adventure.jpg",
        "assets/images/honeymoon.jpg"
      ],
      specs: {
        duration: "4N / 5D",
        destination: "Port Blair & Havelock",
        transfers: "Private Tempo / Bus",
        sightseeing: "Group Adventures"
      },
      itinerary: [
        {
          day: 1,
          title: "Port Blair Arrival • Group Check-in & Corbyn's Cove Evening",
          desc: "Coordinated airport pickup for the entire crew. Group check-in and evening hangout at Corbyn's Cove beach."
        },
        {
          day: 2,
          title: "High-speed Cruise to Havelock • Beach Volleyball at Radhanagar",
          desc: "Ferry cruise to Havelock. Group beach games, volleyball, and epic group photographs during sunset."
        },
        {
          day: 3,
          title: "Elephant Beach Scuba & Jet Ski Competition",
          desc: "A full day of adrenaline: group scuba diving sessions, speed boating, and underwater videos."
        },
        {
          day: 4,
          title: "Return to Port Blair • Group Dinner & Nightlife",
          desc: "Return cruise to Port Blair. Celebrate your journey with a vibrant seafood group dinner and local music."
        },
        {
          day: 5,
          title: "Airport Departure with Unforgettable Gang Stories",
          desc: "Convenient group transfer to Port Blair airport."
        }
      ],
      inclusions: [
        "Group triple/twin sharing accommodation",
        "Daily group breakfast buffet",
        "Dedicated group tour captain throughout",
        "Special group discounts on scuba diving and sea karting"
      ],
      exclusions: [
        "Flight fares",
        "Alcoholic beverages and personal extras"
      ]
    },
    {
      id: "adventure-escape",
      title: "Adventure Escape | Customizable",
      duration: "5 Nights / 6 Days",
      category: "adventure",
      badge: "High Adrenaline",
      oldPrice: 25000,
      currentPrice: 22500,
      destination: "Port Blair, Havelock & Neil",
      shortDesc: "The ultimate thrill seeker's dream: Certified PADI Scuba diving, underwater sea walking, kayaking through bioluminescent mangroves, and jet skiing.",
      images: [
        "assets/images/adventure.jpg",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
        "assets/images/honeymoon.jpg"
      ],
      specs: {
        duration: "5N / 6D",
        destination: "Deep Coral Islands",
        transfers: "AC Cab & Speedboats",
        sightseeing: "5 Adventure Sports"
      },
      itinerary: [
        {
          day: 1,
          title: "Arrival Port Blair • Cellular Jail & Jet Ski at Corbyn's Cove",
          desc: "Kick off your adrenaline trip with high speed jet skiing at Corbyn's Cove, followed by Cellular Jail."
        },
        {
          day: 2,
          title: "Havelock Cruise • Introductory Boat Scuba Diving with PADI Instructor",
          desc: "Head to Havelock. Undergo professional briefing and dive deep with certified PADI dive masters into vibrant coral gardens. Free underwater 4K video included!"
        },
        {
          day: 3,
          title: "Elephant Beach Sea Walking & Night Kayaking",
          desc: "Walk on the ocean floor wearing sea-walk helmets surrounded by thousands of tropical fish. At night, paddle through glowing bioluminescent waters."
        },
        {
          day: 4,
          title: "Neil Island Exploration • Snorkeling at Laxmanpur Reef",
          desc: "Cruise to Neil Island. Snorkel along the coral reef drop-off and spot sea turtles and stingrays."
        },
        {
          day: 5,
          title: "Port Blair Return • Trek to Mount Harriet or Chidiya Tapu",
          desc: "Adventure trek through tropical rainforest trail offering panoramic views of the Andaman sea."
        },
        {
          day: 6,
          title: "Departure • Mission Accomplished!",
          desc: "Transfer to airport with your underwater photos & memories."
        }
      ],
      inclusions: [
        "5 Nights accommodation in adventure traveler resorts",
        "1 Certified Introductory Scuba Dive with 4K Photos/Videos",
        "1 Underwater Sea Walk Session at Elephant Beach",
        "Daily nutritious breakfast",
        "All luxury catamaran transfers and park entry permits"
      ],
      exclusions: [
        "Flights to Andaman",
        "Additional diving certificates beyond introductory"
      ]
    }
  ];

  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  let currentCategory = 'all';
  let searchQuery = '';
  let sortOption = 'recommended';
  let activePackage = null;
  let activeSlideIndex = 0;
  let slideTimer = null;
  let selectedHotelTier = 'standard';

  const hotelTierPremiums = {
    standard: 0,
    deluxe: 3200,
    luxury: 7500
  };

  const packagesGrid = document.getElementById('packagesGrid');
  const filterPills = document.querySelectorAll('.filter-pill');
  const searchInput = document.getElementById('packageSearch');
  const sortSelect = document.getElementById('sortPackages');
  const detailModal = document.getElementById('detailModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBackBtn = document.getElementById('modalBackBtn');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const toastNotice = document.getElementById('toastNotice');

  // Hero Quick Search Trigger
  const heroSearchTrigger = document.getElementById('heroSearchTrigger');
  const heroStyleSelect = document.getElementById('heroStyleSelect');
  if (heroSearchTrigger) {
    heroSearchTrigger.addEventListener('click', () => {
      const selectedStyle = heroStyleSelect ? heroStyleSelect.value : 'all';
      currentCategory = selectedStyle;
      filterPills.forEach(p => p.classList.toggle('active', p.dataset.category === selectedStyle));
      renderPackages();
      document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Interactive 3D Centered Celestial Island Tilt & Parallax
  const centerIslandStage = document.getElementById('centerIslandStage');
  const heroSection = document.getElementById('hero');
  if (centerIslandStage && heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      centerIslandStage.style.transform = `translate(calc(-50% + ${x * 24}px), calc(-50% + ${y * 18}px)) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
    });
    heroSection.addEventListener('mouseleave', () => {
      centerIslandStage.style.transform = 'translate(-50%, -50%) rotateY(0deg) rotateX(0deg)';
    });
  }

  // Live Hero Design Mode Switcher
  const themeSwitchBtns = document.querySelectorAll('.theme-switch-btn');
  if (themeSwitchBtns.length && heroSection) {
    themeSwitchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        themeSwitchBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const theme = btn.dataset.theme;
        heroSection.classList.remove('theme-celestial', 'theme-panoramic', 'theme-bento');
        heroSection.classList.add(`theme-${theme}`);
      });
    });
  }

  // ==========================================
  // RENDER PACKAGES GRID
  // ==========================================
  function renderPackages() {
    let filtered = packagesData.filter(pkg => {
      const matchCat = currentCategory === 'all' || pkg.category === currentCategory;
      const matchSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pkg.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (sortOption === 'price-low') {
      filtered.sort((a, b) => a.currentPrice - b.currentPrice);
    } else if (sortOption === 'price-high') {
      filtered.sort((a, b) => b.currentPrice - a.currentPrice);
    }

    if (filtered.length === 0) {
      packagesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <div style="font-size: 48px; margin-bottom: 14px;">🏝️</div>
          <h3 style="font-size: 20px; font-weight: 800; margin-bottom: 8px;">No packages match your search</h3>
          <p style="color: var(--slate-500); font-size: 14px; margin-bottom: 20px;">Try adjusting your keywords or category filters</p>
          <button class="btn-3d-shine" id="resetFiltersBtn">Reset All Filters</button>
        </div>
      `;
      document.getElementById('resetFiltersBtn')?.addEventListener('click', () => {
        currentCategory = 'all';
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        filterPills.forEach(p => p.classList.toggle('active', p.dataset.category === 'all'));
        renderPackages();
      });
      return;
    }

    packagesGrid.innerHTML = filtered.map(pkg => `
      <article class="package-card" data-id="${pkg.id}" data-tilt>
        <div class="card-media">
          <span class="card-badge-top">${pkg.badge || 'Verified'}</span>
          <button class="card-wishlist-btn" title="Save to favorites" aria-label="Save package">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
          <img src="${pkg.images[0]}" alt="${pkg.title}" class="card-img" loading="lazy">
        </div>

        <div class="card-body">
          <h3 class="card-title">${pkg.title}</h3>
          <div class="card-duration">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            ${pkg.duration}
          </div>
          <p class="card-desc">${pkg.shortDesc}</p>

          <div class="card-price-row">
            <div class="price-col-left">
              <span class="price-label">PER PERSON</span>
              <span class="price-original">₹${pkg.oldPrice.toLocaleString('en-IN')}/-</span>
            </div>
            <div class="price-current">₹${pkg.currentPrice.toLocaleString('en-IN')}/-</div>
          </div>

          <div class="card-actions-grid">
            <button class="btn-3d-outline view-details-trigger" data-id="${pkg.id}">
              VIEW DETAILS
            </button>
            <button class="btn-3d-shine enquire-now-trigger" data-id="${pkg.id}">
              <span>ENQUIRE NOW</span>
              <span class="btn-icon-arrow">→</span>
            </button>
          </div>
        </div>
      </article>
    `).join('');

    initCardEvents();
    init3DTilt();
  }

  // ==========================================
  // 3D CARD TILT INTERACTION
  // ==========================================
  function init3DTilt() {
    const cards = document.querySelectorAll('[data-tilt]');
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  // ==========================================
  // CARD EVENT HANDLERS
  // ==========================================
  function initCardEvents() {
    document.querySelectorAll('.view-details-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pkgId = btn.dataset.id;
        openPackageDetail(pkgId);
      });
    });

    document.querySelectorAll('.enquire-now-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        createRipple(e, btn);
        const pkgId = btn.dataset.id;
        openPackageDetail(pkgId, true);
      });
    });

    document.querySelectorAll('.package-card').forEach(card => {
      card.addEventListener('click', () => {
        const pkgId = card.dataset.id;
        openPackageDetail(pkgId);
      });
    });

    document.querySelectorAll('.card-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.classList.toggle('active');
        const isActive = btn.classList.contains('active');
        btn.style.color = isActive ? '#ef4444' : 'var(--slate-400)';
        showToast(isActive ? '❤️ Added to saved dream trips!' : 'Removed from saved trips');
      });
    });
  }

  // ==========================================
  // BUTTON RIPPLE EFFECT (YouTube short style)
  // ==========================================
  function createRipple(event, button) {
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    const rect = button.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.style.position = 'absolute';
    circle.style.borderRadius = '50%';
    circle.style.transform = 'scale(0)';
    circle.style.animation = 'ripple 0.6s linear';
    circle.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    circle.style.pointerEvents = 'none';

    const existing = button.querySelector('.ripple-wave');
    if (existing) existing.remove();

    button.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  }

  // ==========================================
  // PACKAGE DETAIL VIEW ("AFTER PACKAGE OPEN")
  // ==========================================
  function openPackageDetail(packageId, scrollToForm = false) {
    const pkg = packagesData.find(p => p.id === packageId);
    if (!pkg) return;

    activePackage = pkg;
    activeSlideIndex = 0;
    selectedHotelTier = 'standard';

    document.getElementById('modalPkgTitle').textContent = pkg.title;
    document.getElementById('modalPkgDuration').textContent = pkg.duration;
    document.getElementById('modalOriginalPrice').textContent = `₹${pkg.oldPrice.toLocaleString('en-IN')}/-`;
    document.getElementById('modalCurrentPrice').textContent = `₹${pkg.currentPrice.toLocaleString('en-IN')}/-`;
    document.getElementById('formPkgName').value = pkg.title;

    document.getElementById('specDuration').textContent = pkg.specs.duration;
    document.getElementById('specDestination').textContent = pkg.specs.destination;
    document.getElementById('specTransfers').textContent = pkg.specs.transfers;
    document.getElementById('specSightseeing').textContent = pkg.specs.sightseeing;

    const sliderContainer = document.getElementById('modalSliderContainer');
    const dotsContainer = document.getElementById('modalSliderDots');

    sliderContainer.innerHTML = pkg.images.map((imgUrl, idx) => `
      <img src="${imgUrl}" alt="${pkg.title} photo ${idx + 1}" class="detail-slide-img ${idx === 0 ? 'active' : ''}" data-index="${idx}">
    `).join('') + `
      <button class="slider-nav-btn slider-btn-prev" id="sliderPrevBtn" aria-label="Previous Slide">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button class="slider-nav-btn slider-btn-next" id="sliderNextBtn" aria-label="Next Slide">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
      </button>
    `;

    dotsContainer.innerHTML = pkg.images.map((_, idx) => `
      <div class="slider-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></div>
    `).join('');

    initSliderControls(pkg.images.length);

    const itineraryList = document.getElementById('modalItineraryList');
    itineraryList.innerHTML = pkg.itinerary.map((item, idx) => `
      <div class="itinerary-item ${idx === 0 ? 'open' : ''}">
        <div class="itinerary-header">
          <div style="display: flex; align-items: center;">
            <span class="itinerary-day-badge">DAY ${item.day}:</span>
            <span class="itinerary-title">${item.title}</span>
          </div>
          <svg class="itinerary-chevron" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
        <div class="itinerary-body">
          ${item.desc}
        </div>
      </div>
    `).join('');

    itineraryList.querySelectorAll('.itinerary-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        item.classList.toggle('open');
      });
    });

    const incList = document.getElementById('modalInclusionsList');
    const excList = document.getElementById('modalExclusionsList');

    incList.innerHTML = pkg.inclusions.map(inc => `
      <li>
        <svg width="18" height="18" fill="none" stroke="#10b981" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
        <span>${inc}</span>
      </li>
    `).join('');

    excList.innerHTML = pkg.exclusions.map(exc => `
      <li>
        <svg width="18" height="18" fill="none" stroke="#ef4444" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
        <span>${exc}</span>
      </li>
    `).join('');

    updateEnquiryTotal();

    detailModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    window.location.hash = `/package/${pkg.id}`;

    if (scrollToForm) {
      setTimeout(() => {
        const formEl = document.getElementById('enquiryStickyForm');
        if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    }
  }

  function closePackageDetail() {
    detailModal.classList.remove('active');
    document.body.style.overflow = '';
    clearInterval(slideTimer);
    history.replaceState(null, null, ' ');
  }

  // Expose to window for inline HTML onclick handlers
  window.openPackageDetail = openPackageDetail;
  window.closePackageDetail = closePackageDetail;

  // ==========================================
  // CAROUSEL SLIDER ENGINE
  // ==========================================
  function initSliderControls(totalSlides) {
    clearInterval(slideTimer);

    const prevBtn = document.getElementById('sliderPrevBtn');
    const nextBtn = document.getElementById('sliderNextBtn');
    const dots = document.querySelectorAll('.slider-dot');
    const slides = document.querySelectorAll('.detail-slide-img');

    function goToSlide(index) {
      activeSlideIndex = (index + totalSlides) % totalSlides;
      slides.forEach((s, idx) => s.classList.toggle('active', idx === activeSlideIndex));
      dots.forEach((d, idx) => d.classList.toggle('active', idx === activeSlideIndex));
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(activeSlideIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(activeSlideIndex + 1));

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => goToSlide(idx));
    });

    slideTimer = setInterval(() => {
      goToSlide(activeSlideIndex + 1);
    }, 4500);
  }

  // ==========================================
  // HOTEL TIER & PRICE CALCULATOR
  // ==========================================
  const tierPills = document.querySelectorAll('.tier-pill');
  tierPills.forEach(pill => {
    pill.addEventListener('click', () => {
      tierPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedHotelTier = pill.dataset.tier;
      updateEnquiryTotal();
    });
  });

  const adultsInput = document.getElementById('enquiryAdults');
  if (adultsInput) {
    adultsInput.addEventListener('change', updateEnquiryTotal);
  }

  function updateEnquiryTotal() {
    if (!activePackage) return;
    const basePrice = activePackage.currentPrice;
    const tierBonus = hotelTierPremiums[selectedHotelTier] || 0;
    const perPersonPrice = basePrice + tierBonus;
    const adults = parseInt(adultsInput ? adultsInput.value : 2, 10) || 2;
    const estimatedTotal = perPersonPrice * adults;

    const calcDisplay = document.getElementById('calcTotalPrice');
    if (calcDisplay) {
      calcDisplay.textContent = `₹${estimatedTotal.toLocaleString('en-IN')}/-`;
    }

    const modalCurrentPrice = document.getElementById('modalCurrentPrice');
    if (modalCurrentPrice) {
      modalCurrentPrice.textContent = `₹${perPersonPrice.toLocaleString('en-IN')}/-`;
    }
  }

  // ==========================================
  // ENQUIRY SUBMISSION & DIRECT WHATSAPP
  // ==========================================
  const bookingForm = document.getElementById('bookingEnquiryForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('enquiryName').value.trim();
      const phone = document.getElementById('enquiryPhone').value.trim();
      const date = document.getElementById('enquiryDate').value;
      const adults = document.getElementById('enquiryAdults').value;
      const children = document.getElementById('enquiryChildren')?.value || '0';
      const notes = document.getElementById('enquiryNotes').value.trim();
      const pkgTitle = activePackage ? activePackage.title : 'Andaman Tour';
      const totalQuote = document.getElementById('calcTotalPrice')?.textContent || '₹0';

      if (!name || !phone) {
        showToast('⚠️ Please enter your Name and Mobile Number');
        return;
      }

      const message = `*Hello Magic Memories Tours & Travels!* 🌴✈️%0A%0A` +
        `I would like to book / enquire for:*%0A` +
        `📦 *Package:* ${encodeURIComponent(pkgTitle)}%0A` +
        `🏨 *Hotel Category:* ${selectedHotelTier.toUpperCase()}%0A` +
        `👤 *Traveler:* ${encodeURIComponent(name)}%0A` +
        `📞 *Contact:* ${encodeURIComponent(phone)}%0A` +
        `📅 *Travel Date:* ${encodeURIComponent(date || 'Flexible')}%0A` +
        `👥 *Guests:* ${adults} Adults, ${children} Kids%0A` +
        `💰 *Estimated Quote:* ${encodeURIComponent(totalQuote)}%0A` +
        (notes ? `💬 *Special Requests:* ${encodeURIComponent(notes)}%0A%0A` : '%0A') +
        `Please send me full itinerary and booking confirmation. Thank you!`;

      const waUrl = `https://wa.me/917063977977?text=${message}`;
      window.open(waUrl, '_blank');

      showToast('🎉 Redirecting to WhatsApp for instant confirmation!');
      setTimeout(() => {
        closePackageDetail();
        bookingForm.reset();
      }, 1500);
    });
  }

  // ==========================================
  // FILTER TABS & SEARCH
  // ==========================================
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.category;
      renderPackages();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderPackages();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortOption = e.target.value;
      renderPackages();
    });
  }

  // ==========================================
  // MODAL CONTROLS & ESCAPE KEY
  // ==========================================
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closePackageDetail);
  if (modalBackBtn) modalBackBtn.addEventListener('click', closePackageDetail);

  if (detailModal) {
    detailModal.addEventListener('click', (e) => {
      if (e.target === detailModal) closePackageDetail();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && detailModal.classList.contains('active')) {
      closePackageDetail();
    }
  });

  // ==========================================
  // HEADER SCROLL AND TOP BUTTON
  // ==========================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40 && mainHeader) {
      mainHeader.classList.add('scrolled');
    } else if (mainHeader) {
      mainHeader.classList.remove('scrolled');
    }

    if (window.scrollY > 400 && scrollTopBtn) {
      scrollTopBtn.classList.add('visible');
    } else if (scrollTopBtn) {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // TOAST NOTIFICATION UTILITY
  // ==========================================
  function showToast(text) {
    if (!toastNotice) return;
    toastNotice.querySelector('.toast-text').textContent = text;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3200);
  }

  // Check initial URL Hash
  if (window.location.hash.startsWith('#/package/')) {
    const pkgIdFromHash = window.location.hash.replace('#/package/', '');
    openPackageDetail(pkgIdFromHash);
  }

  // ==========================================
  // 6. 3D COVERFLOW SLIDER ENGINE (EXACT USER SCREENSHOT SPEC)
  // ==========================================
  let coverflowIndex = 3; // start on Honeymoon package (index 3)
  const coverflowTrack = document.getElementById('coverflowTrack');
  const coverflowDots = document.getElementById('coverflowDots');
  const coverflowPrevBtn = document.getElementById('coverflowPrevBtn');
  const coverflowNextBtn = document.getElementById('coverflowNextBtn');
  const coverflowStage = document.getElementById('coverflowStage');
  let coverflowAutoplayTimer = null;

  function renderCoverflow() {
    if (!coverflowTrack) return;

    coverflowTrack.innerHTML = packagesData.map((pkg, idx) => `
      <div class="coverflow-slide" data-index="${idx}" data-id="${pkg.id}">
        <img src="${pkg.images[0]}" alt="${pkg.title}">
        <div class="coverflow-overlay">
          <span class="coverflow-badge">Packages</span>
          <h3 class="coverflow-title">${pkg.title}</h3>
          <p class="coverflow-desc">${pkg.shortDesc}</p>
          <div class="coverflow-footer-row">
            <div class="coverflow-price">₹${pkg.currentPrice.toLocaleString('en-IN')}</div>
            <button class="coverflow-explore-btn" data-id="${pkg.id}">Explore View</button>
          </div>
        </div>
      </div>
    `).join('');

    // Generate Dots
    if (coverflowDots) {
      coverflowDots.innerHTML = packagesData.map((_, idx) => `
        <div class="coverflow-dot ${idx === coverflowIndex ? 'active' : ''}" data-index="${idx}"></div>
      `).join('');

      coverflowDots.querySelectorAll('.coverflow-dot').forEach(dot => {
        dot.addEventListener('click', () => {
          coverflowIndex = parseInt(dot.dataset.index, 10);
          updateCoverflowPositions();
        });
      });
    }

    // Attach click events on slides
    coverflowTrack.querySelectorAll('.coverflow-slide').forEach(slide => {
      slide.addEventListener('click', (e) => {
        const slideIdx = parseInt(slide.dataset.index, 10);
        if (e.target.classList.contains('coverflow-explore-btn')) {
          e.stopPropagation();
          openPackageDetail(slide.dataset.id);
          return;
        }
        if (slideIdx !== coverflowIndex) {
          coverflowIndex = slideIdx;
          updateCoverflowPositions();
        } else {
          openPackageDetail(slide.dataset.id);
        }
      });
    });

    updateCoverflowPositions();
    initCoverflowGestures();
  }

  function updateCoverflowPositions() {
    const slides = coverflowTrack?.querySelectorAll('.coverflow-slide');
    if (!slides || slides.length === 0) return;

    slides.forEach((slide, idx) => {
      let diff = idx - coverflowIndex;
      slide.classList.toggle('active', diff === 0);

      if (diff === 0) {
        slide.style.transform = `translate(-50%, -50%) translateZ(0px) scale(1) rotateY(0deg)`;
        slide.style.zIndex = '30';
        slide.style.opacity = '1';
        slide.style.filter = 'brightness(1)';
        slide.style.pointerEvents = 'auto';
      } else if (diff > 0) {
        // Cards to the right cascading into depth
        const xOffset = Math.min(230 + (diff - 1) * 90, 520);
        const zOffset = -80 * diff;
        const scale = Math.max(0.85 - (diff - 1) * 0.12, 0.45);
        const rotY = Math.max(-18 - (diff - 1) * 4, -30);
        const opacity = Math.max(0.92 - (diff - 1) * 0.16, 0.35);

        slide.style.transform = `translate(calc(-50% + ${xOffset}px), -50%) translateZ(${zOffset}px) scale(${scale}) rotateY(${rotY}deg)`;
        slide.style.zIndex = `${30 - diff}`;
        slide.style.opacity = `${opacity}`;
        slide.style.filter = 'brightness(0.82)';
        slide.style.pointerEvents = 'auto';
      } else {
        // Cards to the left cascading into depth
        const absDiff = Math.abs(diff);
        const xOffset = Math.min(230 + (absDiff - 1) * 90, 520);
        const zOffset = -80 * absDiff;
        const scale = Math.max(0.85 - (absDiff - 1) * 0.12, 0.45);
        const rotY = Math.min(18 + (absDiff - 1) * 4, 30);
        const opacity = Math.max(0.92 - (absDiff - 1) * 0.16, 0.35);

        slide.style.transform = `translate(calc(-50% - ${xOffset}px), -50%) translateZ(${zOffset}px) scale(${scale}) rotateY(${rotY}deg)`;
        slide.style.zIndex = `${30 - absDiff}`;
        slide.style.opacity = `${opacity}`;
        slide.style.filter = 'brightness(0.82)';
        slide.style.pointerEvents = 'auto';
      }
    });

    // Update Dots
    if (coverflowDots) {
      const dots = coverflowDots.querySelectorAll('.coverflow-dot');
      dots.forEach((d, idx) => d.classList.toggle('active', idx === coverflowIndex));
    }
  }

  function nextCoverflow() {
    coverflowIndex = (coverflowIndex + 1) % packagesData.length;
    updateCoverflowPositions();
  }

  function prevCoverflow() {
    coverflowIndex = (coverflowIndex - 1 + packagesData.length) % packagesData.length;
    updateCoverflowPositions();
  }

  if (coverflowNextBtn) coverflowNextBtn.addEventListener('click', nextCoverflow);
  if (coverflowPrevBtn) coverflowPrevBtn.addEventListener('click', prevCoverflow);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && !detailModal?.classList.contains('active')) nextCoverflow();
    if (e.key === 'ArrowLeft' && !detailModal?.classList.contains('active')) prevCoverflow();
  });

  // Touch and mouse drag swipe
  function initCoverflowGestures() {
    if (!coverflowStage) return;
    let startX = 0;
    let isDown = false;

    coverflowStage.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.clientX;
    });

    window.addEventListener('mouseup', (e) => {
      if (!isDown) return;
      isDown = false;
      const endX = e.clientX;
      const diff = endX - startX;
      if (diff < -50) nextCoverflow();
      else if (diff > 50) prevCoverflow();
    });

    coverflowStage.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    coverflowStage.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (diff < -40) nextCoverflow();
      else if (diff > 40) prevCoverflow();
    }, { passive: true });

    // Autoplay
    startCoverflowAutoplay();
    coverflowStage.addEventListener('mouseenter', stopCoverflowAutoplay);
    coverflowStage.addEventListener('mouseleave', startCoverflowAutoplay);
  }

  function startCoverflowAutoplay() {
    stopCoverflowAutoplay();
    coverflowAutoplayTimer = setInterval(nextCoverflow, 4200);
  }

  function stopCoverflowAutoplay() {
    if (coverflowAutoplayTimer) clearInterval(coverflowAutoplayTimer);
  }

  // Vertical fixed enquiry tab trigger
  const fixedEnquiryTrigger = document.getElementById('fixedEnquiryTrigger');
  if (fixedEnquiryTrigger) {
    fixedEnquiryTrigger.addEventListener('click', () => {
      openPackageDetail(packagesData[coverflowIndex]?.id || 'honeymoon-package', true);
    });
  }

  // ==========================================
  // 7. JOURNEY EMPIRES ARCHED CURVED SLIDER ENGINE (EXACT SCREENSHOT SPEC)
  // ==========================================
  const arcExpeditionsData = [
    {
      id: "barren-island",
      category: "Barren Island",
      title: "Barren Island trip in boat",
      desc: "Barren Island: Trip to India's Only Active Volcano. Barren Island, located about 135 km from Port Blair, is home to India's only active volcano. Witness mesmerizing lava trails, smoking ash plumes, and wild oceanic waters.",
      ratings: "★ ★ ★ ★ ★",
      image: "assets/images/volcano.jpg",
      packageTarget: "adventure-escape",
      iconSvg: `<svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.64 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.47L19 11V7l-4-4H9L5 7v4l-2.33.47c-.26.05-.48.23-.6.47-.12.24-.14.52-.06.78L3.95 19z"/></svg>`
    },
    {
      id: "snorkelling-neil",
      category: "Snorkeling",
      title: "Snorkelling at Bharatpur Beach",
      desc: "Snorkelling at Bharatpur Beach on Neil Island (Shaheed Dweep) is one of the best places in the Andamans to enjoy colorful shallow coral gardens, sea turtles, and vibrant clownfish schools.",
      ratings: "★ ★ ★ ★",
      image: "assets/images/bharatpur.jpg",
      packageTarget: "perfect-andaman-gateway",
      iconSvg: `<svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M6 3c-1.66 0-3 1.34-3 3v4c0 3.86 3.14 7 7 7h4v4h-2v2h4c1.1 0 2-.9 2-2v-8h-8c-2.76 0-5-2.24-5-5V6c0-.55.45-1 1-1h6c.55 0 1 .45 1 1v4h2V6c0-1.66-1.34-3-3-3H6z"/></svg>`
    },
    {
      id: "scuba-elephant",
      category: "Scuba Diving",
      title: "Scuba Diving at Elephant Beach",
      desc: "Dive deep with certified PADI dive masters into vibrant coral gardens teeming with clownfish, manta rays, and exotic reef creatures. Complimentary 4K underwater action videos included.",
      ratings: "★ ★ ★ ★ ★",
      image: "assets/images/adventure.jpg",
      packageTarget: "adventure-escape",
      iconSvg: `<svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a4 4 0 0 0-4 4v1H6a2 2 0 0 0-2 2v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V9a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4zm-2 5V6a2 2 0 1 1 4 0v1h-4z"/></svg>`
    },
    {
      id: "underwater-seawalk",
      category: "Sea Walk",
      title: "Underwater Sea Walk at North Bay Island",
      desc: "Walk freely on the ocean floor wearing an air-supplied breathing dome. No swimming experience needed! Feed schools of tropical fish right from your hands.",
      ratings: "★ ★ ★ ★ ★",
      image: "assets/images/seawalk.jpg",
      packageTarget: "adventure-escape",
      iconSvg: `<svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.55.45-1 1-1h14c.55 0 1 .45 1 1 0 4.41-3.59 8-8 8z"/></svg>`
    },
    {
      id: "radhanagar-sunset",
      category: "Sunset Cruise",
      title: "Sunset Catamaran at Radhanagar Beach",
      desc: "Cruise across azure waters and witness Asia's most spectacular sunset. Enjoy golden sands, gentle waves, and romantic island ambiance.",
      ratings: "★ ★ ★ ★ ★",
      image: "assets/images/honeymoon.jpg",
      packageTarget: "honeymoon-package",
      iconSvg: `<svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.64 2.62.99 4 .99h2v-2h-2zM12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17h8v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"/></svg>`
    },
    {
      id: "munda-pahar",
      category: "Trekking",
      title: "Trek to Munda Pahar Beach & Suicide Point",
      desc: "Embark on an adventurous tropical forest trail starting from Munda Pahar Beach to the breathtaking southern cliff-edge sunset viewpoint over the emerald sea.",
      ratings: "★ ★ ★ ★ ★",
      image: "assets/images/munda_pahar.jpg",
      packageTarget: "weekend-vacation",
      iconSvg: `<svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2L7 10l-6 8h22L14 6z"/></svg>`
    }
  ];

  let arcIndex = 0;
  const arcSlidesTrack = document.getElementById('arcSlidesTrack');
  const arcIconsTrack = document.getElementById('arcIconsTrack');
  const arcCategoryName = document.getElementById('arcCategoryName');
  const arcPrevBtn = document.getElementById('arcPrevBtn');
  const arcNextBtn = document.getElementById('arcNextBtn');
  const arcStage = document.getElementById('arcCarouselStage');
  const arcAutoProgressFill = document.getElementById('arcAutoProgressFill');

  let arcAutoplayTimer = null;
  const ARC_AUTOPLAY_DURATION = 5000;
  let isArcDragging = false;
  let arcStartX = 0;
  let arcCurrentDeltaX = 0;

  function getArcGeometry() {
    const w = window.innerWidth;
    if (w < 640) {
      return { xBase: 360, yBase: 28, rotDeg: 9.5, scale: 0.85 };
    } else if (w < 1024) {
      return { xBase: 520, yBase: 38, rotDeg: 11.5, scale: 0.88 };
    } else if (w < 1440) {
      return { xBase: 640, yBase: 44, rotDeg: 12.8, scale: 0.90 };
    } else {
      return { xBase: 710, yBase: 48, rotDeg: 14, scale: 0.92 };
    }
  }

  function renderArcSlider() {
    if (!arcSlidesTrack) return;

    arcSlidesTrack.innerHTML = arcExpeditionsData.map((item, idx) => `
      <div class="arc-slide-card" data-index="${idx}" data-target="${item.packageTarget}">
        <div class="arc-slide-img-wrap">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
        </div>
        <div class="arc-slide-content">
          <h3 class="arc-slide-title">${item.title}</h3>
          <p class="arc-slide-desc">${item.desc}</p>
          <div class="arc-slide-explore" data-target="${item.packageTarget}">
            <span>Explore</span>
            <span>↗</span>
          </div>
          <div class="arc-slide-ratings">
            <span>Ratings</span>
            <span>${item.ratings}</span>
          </div>
        </div>
      </div>
    `).join('');

    // Generate Bottom Activity Icons (matching exact user reference screenshots)
    if (arcIconsTrack) {
      arcIconsTrack.innerHTML = arcExpeditionsData.map((item, idx) => `
        <button class="arc-icon-item ${idx === arcIndex ? 'active' : ''}" data-index="${idx}" title="${item.category}" aria-label="${item.category}">
          ${item.iconSvg}
        </button>
      `).join('');

      arcIconsTrack.querySelectorAll('.arc-icon-item').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetIdx = parseInt(btn.dataset.index, 10);
          if (targetIdx !== arcIndex) {
            arcIndex = targetIdx;
            updateArcSliderPositions();
            restartArcAutoplay();
          }
        });
      });
    }

    // Attach click events on slides
    arcSlidesTrack.querySelectorAll('.arc-slide-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const slideIdx = parseInt(card.dataset.index, 10);
        if (e.target.closest('.arc-slide-explore')) {
          e.stopPropagation();
          openPackageDetail(card.dataset.target);
          return;
        }

        const total = arcExpeditionsData.length;
        let diff = (slideIdx - arcIndex) % total;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;

        if (diff === 1) {
          nextArcSlide();
        } else if (diff === -1) {
          prevArcSlide();
        } else if (diff === 0) {
          openPackageDetail(card.dataset.target);
        } else {
          arcIndex = slideIdx;
          updateArcSliderPositions();
          restartArcAutoplay();
        }
      });
    });

    updateArcSliderPositions();
    initArcGestures();
    restartArcAutoplay();

    // Listen to resize to keep orbital geometry responsive
    window.addEventListener('resize', () => {
      updateArcSliderPositions();
    }, { passive: true });
  }

  function updateArcSliderPositions() {
    const slides = arcSlidesTrack?.querySelectorAll('.arc-slide-card');
    if (!slides || slides.length === 0) return;

    const total = slides.length;
    const geom = getArcGeometry();

    slides.forEach((slide, idx) => {
      // Precise shortest-path circular diff: guarantees one card on left, one center, one on right
      let diff = (idx - arcIndex) % total;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      if (diff === 0) {
        // Active Center Slide (apex of the arch dome)
        slide.style.transform = `translate(-50%, -50%) rotate(0deg) scale(1)`;
        slide.style.opacity = '1';
        slide.style.zIndex = '25';
        slide.style.pointerEvents = 'auto';
        slide.classList.add('active');
      } else if (diff === 1) {
        // Right Slide (tilted clockwise down the dome slope - exact screenshot angle)
        slide.style.transform = `translate(calc(-50% + ${geom.xBase}px), calc(-50% + ${geom.yBase}px)) rotate(${geom.rotDeg}deg) scale(${geom.scale})`;
        slide.style.opacity = '0.98';
        slide.style.zIndex = '15';
        slide.style.pointerEvents = 'auto';
        slide.classList.remove('active');
      } else if (diff === -1) {
        // Left Slide (tilted counter-clockwise down the dome slope - exact screenshot angle)
        slide.style.transform = `translate(calc(-50% - ${geom.xBase}px), calc(-50% + ${geom.yBase}px)) rotate(-${geom.rotDeg}deg) scale(${geom.scale})`;
        slide.style.opacity = '0.98';
        slide.style.zIndex = '15';
        slide.style.pointerEvents = 'auto';
        slide.classList.remove('active');
      } else {
        // Distant slides (hidden beyond viewport edges)
        const dir = diff > 0 ? 1 : -1;
        slide.style.transform = `translate(calc(-50% + ${dir * (geom.xBase + 450)}px), calc(-50% + ${geom.yBase + 90}px)) rotate(${dir * (geom.rotDeg + 14)}deg) scale(0.68)`;
        slide.style.opacity = '0';
        slide.style.zIndex = '5';
        slide.style.pointerEvents = 'none';
        slide.classList.remove('active');
      }
    });

    // Smooth category name slide-fade transition
    if (arcCategoryName) {
      const nextCategory = arcExpeditionsData[arcIndex]?.category || '';
      if (arcCategoryName.textContent !== nextCategory) {
        arcCategoryName.classList.remove('slide-in');
        arcCategoryName.classList.add('slide-out');
        setTimeout(() => {
          arcCategoryName.textContent = nextCategory;
          arcCategoryName.classList.remove('slide-out');
          arcCategoryName.classList.add('slide-in');
        }, 180);
      }
    }

    // Update bottom activity icons active circle
    if (arcIconsTrack) {
      const iconBtns = arcIconsTrack.querySelectorAll('.arc-icon-item');
      iconBtns.forEach((btn, idx) => {
        btn.classList.toggle('active', idx === arcIndex);
      });
    }

    // Reset progress bar animation
    resetArcProgress();
  }

  function resetArcProgress() {
    if (!arcAutoProgressFill) return;
    arcAutoProgressFill.style.transition = 'none';
    arcAutoProgressFill.style.width = '0%';
    void arcAutoProgressFill.offsetWidth; // Force CSS repaint
    arcAutoProgressFill.style.transition = `width ${ARC_AUTOPLAY_DURATION}ms linear`;
    arcAutoProgressFill.style.width = '100%';
  }

  function nextArcSlide() {
    arcIndex = (arcIndex + 1) % arcExpeditionsData.length;
    updateArcSliderPositions();
    restartArcAutoplay();
  }

  function prevArcSlide() {
    arcIndex = (arcIndex - 1 + arcExpeditionsData.length) % arcExpeditionsData.length;
    updateArcSliderPositions();
    restartArcAutoplay();
  }

  if (arcNextBtn) {
    arcNextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextArcSlide();
    });
  }

  if (arcPrevBtn) {
    arcPrevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevArcSlide();
    });
  }

  // Interactive Drag & Touch Gesture Physics
  function initArcGestures() {
    if (!arcStage) return;

    // Mouse drag handlers
    arcStage.addEventListener('mousedown', (e) => {
      if (e.target.closest('.arc-nav-btn') || e.target.closest('.arc-icon-item')) return;
      isArcDragging = true;
      arcStartX = e.clientX;
      arcCurrentDeltaX = 0;
      arcStage.classList.add('is-dragging');
      arcSlidesTrack?.querySelectorAll('.arc-slide-card').forEach(c => c.classList.add('dragging'));
      stopArcAutoplay();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isArcDragging) return;
      arcCurrentDeltaX = e.clientX - arcStartX;
      applyArcDragOffsets(arcCurrentDeltaX);
    });

    window.addEventListener('mouseup', () => {
      if (!isArcDragging) return;
      isArcDragging = false;
      arcStage.classList.remove('is-dragging');
      arcSlidesTrack?.querySelectorAll('.arc-slide-card').forEach(c => c.classList.remove('dragging'));

      if (arcCurrentDeltaX < -45) {
        nextArcSlide();
      } else if (arcCurrentDeltaX > 45) {
        prevArcSlide();
      } else {
        updateArcSliderPositions();
        restartArcAutoplay();
      }
      arcCurrentDeltaX = 0;
    });

    // Touch gesture handlers
    arcStage.addEventListener('touchstart', (e) => {
      if (e.target.closest('.arc-nav-btn') || e.target.closest('.arc-icon-item')) return;
      isArcDragging = true;
      arcStartX = e.touches[0].clientX;
      arcCurrentDeltaX = 0;
      arcSlidesTrack?.querySelectorAll('.arc-slide-card').forEach(c => c.classList.add('dragging'));
      stopArcAutoplay();
    }, { passive: true });

    arcStage.addEventListener('touchmove', (e) => {
      if (!isArcDragging) return;
      arcCurrentDeltaX = e.touches[0].clientX - arcStartX;
      applyArcDragOffsets(arcCurrentDeltaX);
    }, { passive: true });

    arcStage.addEventListener('touchend', () => {
      if (!isArcDragging) return;
      isArcDragging = false;
      arcSlidesTrack?.querySelectorAll('.arc-slide-card').forEach(c => c.classList.remove('dragging'));

      if (arcCurrentDeltaX < -40) {
        nextArcSlide();
      } else if (arcCurrentDeltaX > 40) {
        prevArcSlide();
      } else {
        updateArcSliderPositions();
        restartArcAutoplay();
      }
      arcCurrentDeltaX = 0;
    });

    // Pause on hover
    arcStage.addEventListener('mouseenter', stopArcAutoplay);
    arcStage.addEventListener('mouseleave', restartArcAutoplay);

    // Keyboard arrow navigation
    window.addEventListener('keydown', (e) => {
      const rect = arcStage.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowRight') {
        nextArcSlide();
      } else if (e.key === 'ArrowLeft') {
        prevArcSlide();
      }
    });
  }

  function applyArcDragOffsets(deltaX) {
    const slides = arcSlidesTrack?.querySelectorAll('.arc-slide-card');
    if (!slides) return;
    const total = slides.length;
    const geom = getArcGeometry();

    slides.forEach((slide, idx) => {
      let diff = (idx - arcIndex) % total;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      const dragX = deltaX * 0.65;
      const dragRot = deltaX * 0.014;

      if (diff === 0) {
        slide.style.transform = `translate(calc(-50% + ${dragX}px), calc(-50% + ${Math.abs(dragX) * 0.04}px)) rotate(${dragRot}deg) scale(1)`;
      } else if (diff === 1) {
        slide.style.transform = `translate(calc(-50% + ${geom.xBase + dragX}px), calc(-50% + ${geom.yBase}px)) rotate(${geom.rotDeg + dragRot}deg) scale(${geom.scale})`;
      } else if (diff === -1) {
        slide.style.transform = `translate(calc(-50% - ${geom.xBase - dragX}px), calc(-50% + ${geom.yBase}px)) rotate(${-geom.rotDeg + dragRot}deg) scale(${geom.scale})`;
      }
    });
  }

  function restartArcAutoplay() {
    stopArcAutoplay();
    resetArcProgress();
    arcAutoplayTimer = setInterval(() => {
      arcIndex = (arcIndex + 1) % arcExpeditionsData.length;
      updateArcSliderPositions();
    }, ARC_AUTOPLAY_DURATION);
  }

  function stopArcAutoplay() {
    if (arcAutoplayTimer) {
      clearInterval(arcAutoplayTimer);
      arcAutoplayTimer = null;
    }
    if (arcAutoProgressFill) {
      arcAutoProgressFill.style.transition = 'none';
    }
  }

  // Initial Render
  renderPackages();
  renderCoverflow();
  renderArcSlider();
}

// Auto-run when DOM is ready or immediately if already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Emergency safety fallback: dismiss preloader after 2s if anything ever stalls
setTimeout(() => {
  const pl = document.getElementById('flightPreloader');
  if (pl && !pl.classList.contains('fade-out')) {
    pl.classList.add('fade-out');
  }
}, 2000);
