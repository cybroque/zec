/**
 * Sanity Seed Script
 * Imports all existing local fallback data into your Sanity dataset.
 *
 * Usage:
 *   node scripts/seed-sanity.mjs
 *
 * Requires:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 *   SANITY_WRITE_TOKEN in .env.local  (Editor-level token from sanity.io/manage → API → Tokens)
 */

import { createClient } from "@sanity/client";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

config({ path: path.join(root, ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset  = process.env.NEXT_PUBLIC_SANITY_DATASET  || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-07";
const token    = process.env.SANITY_WRITE_TOKEN;

if (!projectId || projectId === "your-project-id") {
  console.error("❌  Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local first.");
  process.exit(1);
}
if (!token) {
  console.error(
    "❌  SANITY_WRITE_TOKEN is missing from .env.local.\n" +
    "    1. Go to https://www.sanity.io/manage → API → Tokens → Add API Token\n" +
    "    2. Name it 'Seed', set permissions to 'Editor'\n" +
    "    3. Add   SANITY_WRITE_TOKEN=\"<token>\"   to .env.local\n" +
    "    4. Run this script again."
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token });

/* ── helpers ── */
let _keyCounter = 0;
const key = (prefix = "k") => `${prefix}-${++_keyCounter}-${Math.random().toString(36).slice(2, 7)}`;

/** Adds _key to every object in an array (non-recursive) */
const withKeys = (arr) => arr.map(item => ({ _key: key(), ...item }));

async function upsert(doc) {
  await client.createOrReplace(doc);
  console.log(`  ✓  ${doc._type}: ${doc._id}`);
}

/* ════════════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════════════ */

const siteSettings = {
  _id: "siteSettings", _type: "siteSettings",
  siteName: "Zippy Equestrian Center",
  tagline: "Real Riding. Real Feeling.",
  phoneNumber: "+91 98453 64281",
  email: "ride@zippyec.com",
  address: "Survey No. 46/1 & 46/2, Chikkanayakanahalli, Off Sarjapur Road, Near Carmelaram Railway Station, Bengaluru, Karnataka 560035",
  googleMapsUrl: "https://maps.google.com/?q=Zippy+Equestrian+Center",
  instagramUrl: "https://www.instagram.com/zippyequestrian",
  footerHeading: "The rider in you is just a ride away.",
  footerSubheading: "Your first ride is 30 minutes away. Call us and let's get you started.",
  footerCtaText: "Book your trial ride",
};

const programs = [
  {
    _id: "program-discovery-ride", _type: "program",
    title: "Discovery Ride",
    slug: { _type: "slug", current: "discovery-ride" },
    category: "TRIAL EXPERIENCE", order: 1,
    shortDescription: "Try horse riding in Bangalore with Zippy's Discovery Ride. A 45-minute guided session with certified trainers, safety gear, and complete horse interaction.",
    paragraphs: [
      "At Zippy Equestrian, our Adventure Ride experience offers guests an exhilarating journey—a chance to bond with our spirited horses while traversing diverse and breathtaking terrain.",
      "Whether you're new to riding, our 60-minute complimentary trial ride delivers a taste of the excitement that unfolds when you embark on a Zippy adventure.",
      "Our Adventure Ride program is perfect for thrill-seekers, nature enthusiasts, or anyone looking to experience the countryside from a new perspective.",
    ],
    curriculumList: [
      "A brief introduction to the horse and basic safety",
      "Guided mounting with full instructor support",
      "A 30-minute supervised ride at walking pace, fully guided",
      "A post-ride chat about which program to join next",
    ],
    experiences: withKeys([
      { title: "DYNAMIC TRAIL EXPLORATION", description: "Navigate varied terrain from open meadows to forest paths and gentle streams" },
      { title: "EQUINE INTERACTION & BONDING", description: "Learn to approach, stroke, and understand horse body cues with expert supervision" },
      { title: "SADDLE BALANCE BASICS", description: "Establish comfortable posture and initial confidence in the stirrups" },
      { title: "DEDICATED INSTRUCTOR SUPPORT", description: "Personalized guidance throughout your entire first experience in the saddle" },
      { title: "STABLE HORSEMANSHIP INTRODUCTION", description: "Discover how horses are cared for, groomed, and tacked at our premier riding center" },
    ]),
    ctaText: "Enroll now",
    metaTitle: "Discovery Ride: First Time Horse Riding Trial in Bangalore | Zippy Equestrian",
    metaDescription: "Try horse riding in Bangalore with Zippy's Discovery Ride. A 45-minute guided session with certified trainers, safety gear, and complete horse interaction.",
  },
  {
    _id: "program-foundation", _type: "program",
    title: "Foundation Program",
    slug: { _type: "slug", current: "foundation-program" },
    category: "BEGINNER LEVEL", order: 2,
    shortDescription: "Learn horse riding in Bangalore with our 50-session Foundation Program covering walk, trot, canter, posture, grooming, and horse psychology.",
    paragraphs: [
      "The Foundation Program is our signature pathway designed to build unshakeable fundamentals in equestrian technique and horse psychology.",
      "Spread over 50 structured sessions, you transition from walk to rising trot and controlled canter while mastering correct posture, balance, and independent rein contact.",
      "Under the gentle guidance of certified trainers in our Olympic-grade arena, students develop the muscle memory and instincts required to ride safely, confidently, and independently.",
    ],
    curriculumList: [
      "Walk, trot, and canter development with balance and posture control",
      "Correct riding posture, stirrup length, and independent rein handling",
      "Understanding equine behavior, vocal cues, and responsive communication",
      "Introduction to grooming, saddling, and unmounted stable management",
    ],
    experiences: withKeys([
      { title: "GAIT PROGRESSION & CONTROL", description: "Master rising trot diagonals, sitting trot, and introductory canter with confidence" },
      { title: "INDEPENDENT SEAT & POSTURE", description: "Build core equilibrium and supple hips to move fluidly with your horse's strides" },
      { title: "EQUINE PSYCHOLOGY & CUES", description: "Understand subtle herd body language and use light, responsive aids without force" },
      { title: "HANDS-ON TACK & GROOMING", description: "Learn essential stable routines, hoof picking, and bridle and saddle fitting" },
      { title: "ARENA NAVIGATION & SPATIAL AWARENESS", description: "Steer accurately through arena figures, circles, and changes of rein with ease" },
    ]),
    ctaText: "Enroll now",
    metaTitle: "Foundation Horse Riding Program Bangalore | Beginner Riding Classes | Zippy",
    metaDescription: "Learn horse riding in Bangalore with our 50-session Foundation Program. Covers walk, trot, canter, posture, grooming, and horse psychology with certified coaches.",
  },
  {
    _id: "program-development", _type: "program",
    title: "Development Program",
    slug: { _type: "slug", current: "development-program" },
    category: "INTERMEDIATE", order: 3,
    shortDescription: "Advance your equestrian skills with Zippy's Intermediate Development Program in Bangalore.",
    paragraphs: [
      "Tailored for riders who have completed the Foundation level and are eager to elevate their performance.",
      "Over 50 performance-focused sessions, riders refine contact elasticity, balance through complex gaits, and learn gymnastic pole work and cavaletti grids.",
      "This program bridges recreational riding and competitive equestrian sports.",
    ],
    curriculumList: [
      "Improved contact, balance, and riding technique across all gaits",
      "Introduction to jumping positions, two-point seat, and pole grids",
      "Structured, performance-focused progression and stride regulation",
      "Introduction to advanced grooming and competition stable practices",
    ],
    experiences: withKeys([
      { title: "STRIDE REGULATION & RHYTHM", description: "Lengthen and collect strides while maintaining smooth cadence and upright balance" },
      { title: "POLE WORK & CAVALETTI GRIDS", description: "Develop horse impulsion, agility, and straightness over measured ground poles" },
      { title: "TWO-POINT JUMPING POSITION", description: "Master the forward jumping seat, crest release, and secure lower leg security" },
      { title: "MULTI-HORSE ADAPTABILITY", description: "Ride horses of varying strides and temperaments to sharpen your equestrian versatility" },
      { title: "DISCIPLINE SPECIALIZATION PREPARATION", description: "Prepare physical strength and technical foundation for showjumping or dressage tracks" },
    ]),
    ctaText: "Enroll now",
    metaTitle: "Development Horse Riding Program | Intermediate Lessons Bangalore | Zippy",
    metaDescription: "Advance your equestrian skills with Zippy's Intermediate Development Program in Bangalore. Pole work, canter control, two-point jumping seat, and performance agility.",
  },
  {
    _id: "program-performance", _type: "program",
    title: "Performance Program",
    slug: { _type: "slug", current: "performance-program" },
    category: "ADVANCED / COMPETITIVE", order: 4,
    shortDescription: "Elite competitive riding coaching in Bangalore. Train for state and national showjumping and dressage championships.",
    paragraphs: [
      "Our premier high-performance curriculum for equestrians dedicated to regional, state, and national competition circuits.",
      "Riders train on competition-grade mounts under the mentorship of seasoned coaches who have competed at international arenas.",
      "Whether targeting national showjumping qualifiers or advanced dressage championships, our structured periodization plans ensure you and your equine partner peak at the highest competitive levels.",
    ],
    curriculumList: [
      "Advanced techniques and discipline specialization in showjumping and dressage",
      "Competition preparation, course walk analysis, and arena strategy",
      "Professional coaching and structured, periodized training plans",
      "Clear pathway to state, national, and international competitions",
    ],
    experiences: withKeys([
      { title: "COURSE ANALYSIS & STRATEGY", description: "Analyze strides, approach angles, rollbacks, and optimum jump lines on competition tracks" },
      { title: "ADVANCED LATERAL MOVEMENTS", description: "Execute precision shoulder-in, half-pass, and collected maneuvers with subtle aids" },
      { title: "ATHLETIC CONDITIONING & RECOVERY", description: "Periodized equine and rider workouts to enhance stamina, core stability, and power" },
      { title: "COMPETITION PSYCHOLOGY", description: "Cultivate ring composure, pressure management, and laser focus under judge scrutiny" },
      { title: "SHOW CIRCUIT REPRESENTATION", description: "Represent Zippy Equestrian Center at sanctioned state and national horse shows" },
    ]),
    ctaText: "Enroll now",
    metaTitle: "Performance Equestrian Training Bangalore | Competitive Horse Riding | Zippy",
    metaDescription: "Elite competitive riding coaching in Bangalore. Train for state and national showjumping and dressage championships with champion horses and veteran coaches.",
  },
  {
    _id: "program-dressage", _type: "program",
    title: "Dressage Program",
    slug: { _type: "slug", current: "dressage-program" },
    category: "SPECIALIZATION", order: 5,
    shortDescription: "Master classical dressage riding in Bangalore. Coaching on seat position, collection, lateral movements, and FEI test patterns.",
    paragraphs: [
      "Dressage is the highest expression of horse training — an art form and Olympic sport celebrated for harmony, symmetry, and invisible communication between rider and horse.",
      "Training in our regulation-sized dressage arena, you progress along the classical training pyramid: rhythm, suppleness, contact, impulsion, straightness, and collection.",
      "Our master dressage instructors help you cultivate a supple, deep seat that follows every equine movement effortlessly.",
    ],
    curriculumList: [
      "Correct dressage seat and refined, deep position in the saddle",
      "Precise micro-aids with seat, leg, and rein without force",
      "Transitions, lateral movements, and rhythm maintenance at all gaits",
      "Building the connection, collection, and elevation that dressage demands",
    ],
    experiences: withKeys([
      { title: "DEEP CLASSICAL SEAT", description: "Develop a weight-centered, relaxed position that absorbs and channels equine movement" },
      { title: "LATERAL WORK & FLEXION", description: "School leg-yield, shoulder-in, travers, and half-pass with exact geometrical accuracy" },
      { title: "CADENCE & COLLECTION", description: "Engage the hindquarters to achieve elevated, springy trot and uphill canter strides" },
      { title: "FEI TEST ACCURACY", description: "Ride standard dressage test patterns, refining arena geometry, halt immobility, and diagonals" },
      { title: "INVISIBLE HARMONY", description: "Communicate seamlessly through microscopic weight shifts and rein breathing" },
    ]),
    ctaText: "Enroll now",
    metaTitle: "Classical Dressage Training Bangalore | Specialized Equestrian Dressage | Zippy",
    metaDescription: "Master classical dressage riding in Bangalore. Individualized coaching on seat position, collection, lateral movements, and FEI test patterns at Zippy Equestrian.",
  },
  {
    _id: "program-showjumping", _type: "program",
    title: "Showjumping Program",
    slug: { _type: "slug", current: "showjumping-program" },
    category: "SPECIALIZATION", order: 6,
    shortDescription: "Train in professional showjumping in Bangalore. Jump courses, stride estimation, gridwork, and two-point technique.",
    paragraphs: [
      "For riders who crave the electrifying fusion of speed, precision, and flight. Our Showjumping Program guides riders into mastering obstacles, fence combinations, and course navigation.",
      "Beginning with ground poles and cavaletti gymnastic lines, riders progressively advance to verticals, oxers, and full competitive courses.",
      "Safety and horse biomechanics remain paramount — our coaches teach you to communicate clearly in the approach, take-off, and landing phases.",
    ],
    curriculumList: [
      "The jumping position, two-point seat, and elastic crest release",
      "Approach line, take-off calculation, bascule, and landing recovery",
      "Gridwork and gymnastic exercises to build agility and confidence",
      "Riding a course of fences with rhythm, control, and optimal time",
    ],
    experiences: withKeys([
      { title: "GYMNASTIC JUMPING GRIDS", description: "Build horse scope and automatic rider release over calibrated bounce and stride grids" },
      { title: "DISTANCE & STRIDE JUDGMENT", description: "Spot take-off spots with precision, adjusting canter strides effortlessly before fences" },
      { title: "COURSE TIME & TRACK PLANNING", description: "Master tight rollbacks, efficient lines, and speed control for clean competition rounds" },
      { title: "BALANCE OVER THE BASCULE", description: "Maintain a steady lower leg and soft hands through the trajectory of every jump" },
      { title: "SIMULATED COMPETITION COURSES", description: "Ride full 8 to 12 fence championship courses under realistic ring conditions" },
    ]),
    ctaText: "Enroll now",
    metaTitle: "Showjumping Classes in Bangalore | Equestrian Show Jumping Academy | Zippy",
    metaDescription: "Train in professional showjumping in Bangalore. Jump courses, develop stride estimation, gridwork, and two-point jumping technique under certified coaches.",
  },
  {
    _id: "program-practice", _type: "program",
    title: "Practice Program",
    slug: { _type: "slug", current: "practice-program" },
    category: "FOR PRACTICE ADD ON", order: 7,
    shortDescription: "Extra arena practice time for enrolled Zippy students. Perfect your gaits, balance, and saddle confidence at your own pace.",
    paragraphs: [
      "Horsemanship is an art where repetition and quiet saddle hours build deep intuition and physical confidence. The Practice Program is an exclusive add-on for enrolled Zippy students.",
      "Whether you wish to practice your rising trot diagonals, perfect your sitting posture, or simply enjoy quiet, meditative riding, these sessions give you complete freedom in our arena.",
      "Each practice ride is overseen by on-duty arena marshals for complete safety.",
    ],
    curriculumList: [
      "Unstructured saddle time dedicated to practicing current curriculum skills",
      "Arena marshal safety supervision and horse tack check before every ride",
      "Freedom to refine rhythm, posture, and gaits at your personal pace",
      "Affordable add-on pricing pegged to your current enrolled program level",
    ],
    experiences: withKeys([
      { title: "ACCELERATED SADDLE TIME", description: "Accumulate valuable hours in the saddle to develop intuitive balance and muscle memory" },
      { title: "FOCUSED INDEPENDENT DRILLS", description: "Work through instructor feedback on specific gaits and figures without lesson pressure" },
      { title: "ON-DUTY SAFETY SUPERVISION", description: "Ride independently with confidence knowing certified arena marshals are present" },
      { title: "FLEXIBLE SCHEDULING", description: "Book practice slots during mornings or evenings to suit your weekly routine" },
      { title: "DEEPER HORSE CONNECTION", description: "Strengthen trust and communication with your horse during relaxed, unhurried rides" },
    ]),
    ctaText: "Enroll now",
    metaTitle: "Horse Riding Practice Sessions Bangalore | Arena Saddle Time | Zippy Equestrian",
    metaDescription: "Extra arena practice time for enrolled Zippy students. Perfect your gaits, balance, and saddle confidence at your own pace with safety supervision in South Bangalore.",
  },
];

const beyondServices = [
  {
    _id: "beyond-summer-camps", _type: "beyondService",
    title: "SUMMER CAMPS", slug: { _type: "slug", current: "summer-camps" }, order: 1,
    heroDescription: "Give your child a summer they'll actually remember. Our summer camp programs introduce kids to horse riding, stable care, and equestrian life in a safe, supervised, and genuinely fun environment.",
    contentParagraphs: [
      "We introduce horse riding to the kids starting from the age of 5 years and the riding batches are slotted accordingly. The riders get to interact with the horses, feed the horses, bath the horses and most importantly, learn Horse Riding basics under certified equestrian coaches.",
      "We also cater to schools and other sports facilities during the summer. If need be, we can organize a special camp in your facility with our horses and staff.",
    ],
    highlightText: "Includes Medals, Certificates & a Special Zippy Souvenir!",
    ctaText: "Book for next season", contactInterest: "Children's camps",
    metaTitle: "Kids Horse Riding Summer Camps in Bangalore | Zippy Equestrian Center",
    metaDescription: "Engaging summer camp horse riding programs for kids aged 5+ in South Bangalore. Hands-on horsemanship, stable care, medals, certificates, and unforgettable equestrian fun.",
  },
  {
    _id: "beyond-horse-training", _type: "beyondService",
    title: "HORSE TRAINING", slug: { _type: "slug", current: "horse-training" }, order: 2,
    heroDescription: "Professional training services for horses conducted by our experienced instructors. Whether you're looking to train a young horse or work on specific skills, our team brings the same structured, patient approach we use with our riders.",
    contentParagraphs: [
      "Our equine training program focuses on building trust, discipline, and refined athleticism in horses of all breeds and temperaments. From foundational ground manners, lungeing, and desensitization to specialized schooling under saddle.",
      "We offer tailored training regimens designed for young horses requiring backing as well as seasoned mounts needing tune-ups or competition preparation.",
    ],
    highlightText: "Custom Training Regimens, Certified Equine Trainers & Olympic-Spec Arena!",
    ctaText: "Book your slot", contactInterest: "Riding Programs",
    metaTitle: "Professional Horse Training Services in Bangalore | Zippy Equestrian Center",
    metaDescription: "Expert horse schooling and training in South Bangalore. Groundwork, flatwork, jumping conditioning, and behavioural desensitization tailored to your equine partner.",
  },
  {
    _id: "beyond-buy-a-horse", _type: "beyondService",
    title: "BUY A HORSE", slug: { _type: "slug", current: "buy-a-horse" }, order: 3,
    heroDescription: "Looking to own a horse? We have horses available for sale which are well-trained, healthy, and suited to riders at different levels.",
    contentParagraphs: [
      "Our horses for sale come with complete medical history, vaccination records, and detailed temperament assessments. We match buyers with horses that suit their riding level, goals, and lifestyle.",
      "Post-purchase, we offer comprehensive after-sale support including boarding, training continuation, and veterinary tie-ups to ensure a smooth transition into horse ownership.",
    ],
    highlightText: "Every Horse Comes with Full Health Records & Post-Sale Support!",
    ctaText: "Find available horses", contactInterest: "Buy a horse",
    metaTitle: "Horses for Sale in Bangalore | Buy a Horse | Zippy Equestrian Center",
    metaDescription: "Buy trained, healthy horses from Zippy Equestrian in South Bangalore. Full medical records, temperament assessments, and expert guidance for first-time owners.",
  },
  {
    _id: "beyond-parties-and-venues", _type: "beyondService",
    title: "VENUE FOR PARTIES", slug: { _type: "slug", current: "parties-and-venues" }, order: 4,
    heroDescription: "Our grounds are available for private events, birthday parties, and group get-togethers. There's no venue in South Bangalore quite like it.",
    contentParagraphs: [
      "Zippy Equestrian Center offers a uniquely serene and scenic backdrop for events of all sizes. Whether it's a child's birthday party with pony rides or a corporate team outing in nature.",
      "We coordinate catering, horse-interaction activities, guided rides, and photography sessions. Our team handles the full setup so you can enjoy every moment with your guests.",
    ],
    highlightText: "Pony Rides, Grooming Activities & Photography Included for Parties!",
    ctaText: "Book your slot", contactInterest: "Book a venue",
    metaTitle: "Horse Riding Party Venue in Bangalore | Equestrian Events | Zippy",
    metaDescription: "Book Zippy Equestrian Center for birthday parties, corporate events, and private gatherings in South Bangalore. Unique equestrian experiences, pony rides, and open grounds.",
  },
  {
    _id: "beyond-equestrian-consultation", _type: "beyondService",
    title: "EQUESTRIAN CONSULTATION", slug: { _type: "slug", current: "equestrian-consultation" }, order: 5,
    heroDescription: "Planning to start your own equestrian facility? We offer professional consultation services drawing on years of hands-on experience running a successful riding center in Bangalore.",
    contentParagraphs: [
      "Our consultation services cover every aspect of equestrian center development: site selection, stable design, herd management, staff training, program curriculum, pricing strategy, and marketing.",
      "Whether you're starting from scratch or improving an existing facility, our team brings decades of practical knowledge to help you build a sustainable, reputable equestrian business.",
    ],
    highlightText: "Expert Guidance from Experienced Equestrian Center Operators!",
    ctaText: "Book a meeting", contactInterest: "Consultation",
    metaTitle: "Equestrian Center Consultation Bangalore | Stable Setup Guidance | Zippy",
    metaDescription: "Professional equestrian facility consultation in Bangalore. Expert guidance on stable design, horse management, curriculum development, and equestrian business strategy.",
  },
  {
    _id: "beyond-horse-rent-lease", _type: "beyondService",
    title: "HORSE RENT / LEASE", slug: { _type: "slug", current: "horse-rent-lease" }, order: 6,
    heroDescription: "Not ready to own, but want regular access to a specific horse? Our rent and lease arrangements give riders a consistent partnership with a horse.",
    contentParagraphs: [
      "A horse lease at Zippy gives you priority access to a specific horse for training and recreational rides. You build a genuine bond and consistent partnership that accelerates your equestrian development.",
      "Our leasing packages are flexible and affordable, with full boarding, farrier, and veterinary care handled by our professional team. You ride; we take care of everything else.",
    ],
    highlightText: "Build a Genuine Bond — All Care Handled by Our Expert Team!",
    ctaText: "Find available horses", contactInterest: "Horse Rent / Lease",
    metaTitle: "Horse Lease & Rental in Bangalore | Ride Without Ownership | Zippy Equestrian",
    metaDescription: "Lease or rent a horse in South Bangalore without the commitment of ownership. Priority access, consistent training partnerships, and all care handled by Zippy's team.",
  },
  {
    _id: "beyond-photoshoots", _type: "beyondService",
    title: "PHOTOSHOOTS", slug: { _type: "slug", current: "photoshoots" }, order: 7,
    heroDescription: "Our stables at Zippy make for a stunning photoshoot location: natural light, beautiful horses, and an environment that photographs unlike anything in the city.",
    contentParagraphs: [
      "The combination of warm natural light, rustic stable interiors, open grounds, and magnificent horses creates a backdrop that fashion, lifestyle, and equestrian photographers love.",
      "We coordinate access to specific horses for the shoot and provide a dedicated groom for horse handling and guidance on safe horse interaction.",
    ],
    highlightText: "Natural Light, Stunning Horses & an Iconic Stable Setting!",
    ctaText: "Book a meeting", contactInterest: "Photoshoot",
    metaTitle: "Equestrian Photoshoot Location Bangalore | Horse & Stable Photography | Zippy",
    metaDescription: "Book Zippy Equestrian Center for stunning photoshoots in South Bangalore. Natural light, beautiful horses, rustic stables, and professional horse handlers for your shoot.",
  },
  {
    _id: "beyond-franchise", _type: "beyondService",
    title: "FRANCHISE", slug: { _type: "slug", current: "franchise" }, order: 8,
    heroDescription: "Interested in bringing the Zippy Equestrian Center model to your city? We're open to conversations about franchise opportunities.",
    contentParagraphs: [
      "The Zippy franchise model provides you with a proven operational framework, complete brand identity, instructor training programs, curriculum documentation, and ongoing mentorship from our founding team.",
      "We are selective about franchise partnerships — we look for partners who are passionate about horses, committed to quality, and dedicated to growing equestrian culture in their region.",
    ],
    highlightText: "Proven Model, Full Support & a Passionate Equestrian Community!",
    ctaText: "Talk to our manager", contactInterest: "Franchise",
    metaTitle: "Zippy Equestrian Center Franchise India | Equestrian Business Opportunity",
    metaDescription: "Explore Zippy Equestrian Center franchise opportunities across India. Proven operational model, brand support, and expert mentorship for passionate equestrian entrepreneurs.",
  },
  {
    _id: "beyond-horse-boarding", _type: "beyondService",
    title: "HORSE BOARDING", slug: { _type: "slug", current: "horse-boarding" }, order: 9,
    heroDescription: "We provide boarding facilities for privately-owned horses: safe stabling, daily care, feeding, and regular exercise under professional supervision.",
    contentParagraphs: [
      "Our boarding facility offers spacious, well-maintained stables with daily feeding, grooming, and exercise programs tailored to each horse's needs. Horses receive routine veterinary monitoring and farrier visits.",
      "Owners receive regular updates, photographs, and health reports. Your horse is treated as one of our own — with the same professional care and attention we give to every animal in our herd.",
    ],
    highlightText: "Professional Daily Care, Vet Monitoring & Regular Exercise Included!",
    ctaText: "Find your horse a home", contactInterest: "Horse boarding",
    metaTitle: "Horse Boarding Stables in Bangalore | Equine Care & Boarding | Zippy",
    metaDescription: "Professional horse boarding in South Bangalore. Safe stabling, daily care, feeding, exercise, and veterinary monitoring for privately-owned horses at Zippy Equestrian.",
  },
];

const blogPosts = [
  {
    _id: "blog-myths", _type: "blogPost",
    title: "Common Horse Riding Myths Beginners Should Stop Believing",
    slug: { _type: "slug", current: "common-horse-riding-myths-beginners-should-stop-believing" },
    excerpt: "There's something almost meditative about being around horses. Discover the truth about learning to ride in Bangalore.",
    category: "BEGINNER'S GUIDE", readTime: "6 min read",
    publishedDate: "2026-10-01", author: "Zippy Equestrian Team",
    quoteOverlay: { _type: "object", text: "Nobody gets it right the first time" },
    contentSections: withKeys([
      {
        paragraphs: [
          "There's something almost meditative about being around horses. The moment you step into a stable, the smell of the dry hay, and all that's left is the rhythm of hooves, the creak of leather, and the quiet trust that builds between horse and rider.",
          "Whether you're a curious beginner who has never sat on a horse before, or someone chasing a competitive dream in Showjumping or Dressage, one thing is for sure: finding the right stable is your first real hurdle.",
        ],
      },
      {
        heading: "What to Expect from Good Horse Riding Schools",
        paragraphs: [
          "Not every stable is created equal, and it's worth being a little picky about where you train. The best horse riding schools in Bangalore share a few things in common: certified instructors, well-maintained horses, organized safety gear, and a structured curriculum.",
          "A trial session is usually the best way to judge a school. Notice how the horses are handled, whether the instructor corrects your posture patiently, and whether the environment feels safe for you and your family.",
        ],
      },
    ]),
    metaTitle: "Horse Riding Myths Debunked | Beginner's Guide | Zippy Equestrian Bangalore",
    metaDescription: "Debunking the most common horse riding myths for beginners in Bangalore. Find out what it really takes to learn horse riding and what to look for in an equestrian center.",
  },
  {
    _id: "blog-what-to-wear", _type: "blogPost",
    title: "What to Wear to Your First Horse Riding Lesson",
    slug: { _type: "slug", current: "what-to-wear-to-your-first-horse-riding-lesson" },
    excerpt: "First lesson coming up? Don't overthink the gear. Here's a practical, honest guide to what to wear and bring.",
    category: "TIPS & GEAR", readTime: "4 min read",
    publishedDate: "2026-09-15", author: "Zippy Equestrian Team",
    quoteOverlay: { _type: "object", text: "Comfort and safety over style, every time" },
    contentSections: withKeys([
      {
        paragraphs: [
          "The good news: you don't need expensive gear for your first lesson. Most good riding schools provide helmets and will let you start in regular clothes as long as they're practical.",
          "What you do need is a pair of close-toed shoes with a small heel — this prevents your foot sliding through the stirrup. Trainers or sneakers will usually work fine.",
        ],
      },
      {
        heading: "Clothes That Work",
        paragraphs: [
          "Long trousers are the best option for your first ride. Jeans work, though they can chafe on longer rides. Leggings or fitted joggers are ideal. Avoid shorts — your inner legs will rub against the saddle.",
          "On top, wear something comfortable and fitted. Loose clothing can catch on equipment. A fitted t-shirt or polo is perfect.",
        ],
      },
    ]),
    metaTitle: "What to Wear Horse Riding | Beginner's Gear Guide | Zippy Equestrian",
    metaDescription: "Practical guide on what to wear to your first horse riding lesson in Bangalore. From footwear to clothing, what you need and what to avoid on your first day.",
  },
  {
    _id: "blog-health-benefits", _type: "blogPost",
    title: "Physical and Mental Health Benefits of Horse Riding",
    slug: { _type: "slug", current: "physical-and-mental-health-benefits-of-horse-riding" },
    excerpt: "Horse riding is a full-body workout, a mindfulness practice, and a confidence builder all in one.",
    category: "HEALTH & WELLNESS", readTime: "5 min read",
    publishedDate: "2026-09-01", author: "Zippy Equestrian Team",
    quoteOverlay: { _type: "object", text: "The outside of a horse is good for the inside of a person" },
    contentSections: withKeys([
      {
        paragraphs: [
          "Horse riding engages almost every major muscle group simultaneously. Maintaining your position in the saddle requires constant, subtle adjustments from your core, hips, lower back, thighs, and calves.",
          "Riders often report that an hour in the saddle leaves them more tired than they expect — not from exertion, but from the constant low-level muscular engagement.",
        ],
      },
      {
        heading: "The Mental Health Dimension",
        paragraphs: [
          "Spending time with horses is genuinely calming. Research has shown that equine interaction reduces cortisol levels — the body's primary stress hormone. When you're grooming or riding a horse, your nervous system downregulates.",
          "Riding also demands complete present-moment attention. You cannot check your phone or zone out when you're responsible for communicating with a live animal beneath you.",
        ],
      },
    ]),
    metaTitle: "Health Benefits of Horse Riding | Physical & Mental Wellness | Zippy Equestrian",
    metaDescription: "Discover the physical and mental health benefits of horse riding. From core strength and balance to stress relief and mindfulness.",
  },
];

const instructors = [
  { _id: "instructor-barath", _type: "instructor", name: "Barath Manoharan", role: "HEAD OF TRAINING", bio: "Equestrian national champion guiding our riders with confidence and real sportsman spirit", order: 1 },
  { _id: "instructor-vishwa", _type: "instructor", name: "Vishwa Premalal", role: "TRAINER", bio: "Equestrian and Showjumping rider and champion from Sri Lanka training our riders of all levels", order: 2 },
];

const horses = [
  { _id: "horse-chargano", _type: "horse", name: "Chargano fly PS", breed: "Holsteiner", discipline: "10 Years | Gelding", order: 1 },
  { _id: "horse-maharaja", _type: "horse", name: "Maharaja", breed: "Thoroughbred", discipline: "9 Years | Gelding", order: 2 },
  { _id: "horse-arjuna", _type: "horse", name: "Arjuna", breed: "Thoroughbred", discipline: "9 Years | Gelding", order: 3 },
  { _id: "horse-gwen", _type: "horse", name: "Gwen", breed: "Pony", discipline: "12 Years | Mare", order: 4 },
  { _id: "horse-chf", _type: "horse", name: "CHF Party Time", breed: "Irish Sport Horse", discipline: "8 Years | Gelding", order: 5 },
  { _id: "horse-dawn", _type: "horse", name: "Dawn", breed: "Arabian", discipline: "12 Years | Gelding", order: 6 },
  { _id: "horse-vedette", _type: "horse", name: "Vedette Van Splabeek Z", breed: "Zangersheide", discipline: "10 Years | Gelding", order: 7 },
];

const teamMembers = [
  { _id: "team-narasimha", _type: "teamMember", name: "Narasimha Murthy", role: "Chief Advisor", isFounder: true, order: 1 },
  { _id: "team-dilip",     _type: "teamMember", name: "Dilip Kirani",     role: "Founder & CEO", isFounder: true, order: 2 },
  { _id: "team-nouman",   _type: "teamMember", name: "Mohamed Nouman",   role: "Operational Head", isFounder: false, order: 3 },
  { _id: "team-rounak",   _type: "teamMember", name: "Rounak Murthy",    role: "Director", isFounder: false, order: 4 },
];

/* ════════════════════════════════════════════════════════
   MAIN
════════════════════════════════════════════════════════ */
async function main() {
  console.log("\n🐴  Zippy Equestrian — Sanity Seed Script");
  console.log(`📦  Project: ${projectId}  |  Dataset: ${dataset}\n`);

  console.log("📌  Site Settings");
  await upsert(siteSettings);

  console.log("\n🎯  Riding Programs");
  for (const doc of programs) await upsert(doc);

  console.log("\n🌿  Beyond the Ride Services");
  for (const doc of beyondServices) await upsert(doc);

  console.log("\n📝  Blog Posts");
  for (const doc of blogPosts) await upsert(doc);

  console.log("\n👨‍🏫  Instructors");
  for (const doc of instructors) await upsert(doc);

  console.log("\n🐎  Horses (Herd)");
  for (const doc of horses) await upsert(doc);

  console.log("\n👥  Team Members");
  for (const doc of teamMembers) await upsert(doc);

  console.log("\n✅  All data seeded successfully!");
  console.log("    Open http://localhost:3000/studio to view and edit your content.\n");
}

main().catch((err) => {
  console.error("❌  Seed failed:", err.message || err);
  process.exit(1);
});
