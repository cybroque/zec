export interface ProgramExperienceCard {
  title: string;
  description: string;
}

export interface ProgramSeoItem {
  slug: string;
  aliases: string[];
  category: string;
  title: string;
  bannerImage: string;
  bannerImageAlt: string;
  paragraphs: string[];
  curriculumList: string[];
  experiences: ProgramExperienceCard[];
  ctaText: string;
  ctaHref: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const programsSeoList: ProgramSeoItem[] = [
  {
    slug: "discovery-ride",
    aliases: ["discovery", "trial", "trial-ride", "discoveryride"],
    category: "TRIAL EXPERIENCE",
    title: "Discovery Ride",
    bannerImage: "/assets/images/Programs/Webp/r1.webp",
    bannerImageAlt: "Discovery Ride introductory horse riding experience at Zippy Equestrian Center Bangalore",
    paragraphs: [
      "At Zippy Equestrian, our Adventure Ride experience offers guests an exhilarating journey through pristine wilderness—a chance to bond with our spirited horses while traversing diverse and breathtaking terrain. Crafted for riders across all skill levels, our guided adventure rides combine excitement, tranquility, and genuine exploration, creating the perfect introduction to the thrill of horseback adventures.",
      "Whether you're new to seeking an energetic ride through untamed landscapes, our 60-minute complimentary trial ride delivers a taste of the excitement that unfolds when you embark on a Zippy adventure. Guided by our certified instructors, you'll navigate varied trails featuring rolling hills, woodland paths, and meandering streams, all accompanied by the exhilarating rhythm of hoofbeats on diverse terrain.",
      "Our Adventure Ride program is perfect for thrill-seekers, nature enthusiasts, or anyone looking to experience the countryside from a new perspective. There's no obligation—just pure adventure, spectacular vistas, and memorable moments in motion.",
    ],
    curriculumList: [
      "A brief introduction to the horse and basic safety",
      "Guided mounting with full instructor support",
      "A 30-minute supervised ride walking pace, fully guided",
      "A post-ride chat about which program to join next, if you'd like to continue",
    ],
    experiences: [
      {
        title: "DYNAMIC TRAIL EXPLORATION",
        description: "Navigate varied terrain from open meadows to forest paths and gentle streams",
      },
      {
        title: "EQUINE INTERACTION & BONDING",
        description: "Learn to approach, stroke, and understand horse body cues with expert supervision",
      },
      {
        title: "SADDLE BALANCE BASICS",
        description: "Establish comfortable posture and initial confidence in the stirrups",
      },
      {
        title: "DEDICATED INSTRUCTOR SUPPORT",
        description: "Personalized guidance throughout your entire first experience in the saddle",
      },
      {
        title: "STABLE HORSEMANSHIP INTRODUCTION",
        description: "Discover how horses are cared for, groomed, and tacked at our premier riding center",
      },
    ],
    ctaText: "Enroll now",
    ctaHref: "/contact?interest=Riding%20Programs&message=Discovery%20Ride",
    metaTitle: "Discovery Ride: First Time Horse Riding Trial in Bangalore | Zippy Equestrian",
    metaDescription:
      "Try horse riding in Bangalore with Zippy's Discovery Ride. A 45-minute guided session with certified trainers, safety gear, and complete horse interaction.",
    keywords: [
      "horse riding trial bangalore",
      "first time horse riding",
      "discovery ride",
      "beginner horse riding session bangalore",
      "zippy equestrian trial",
    ],
  },
  {
    slug: "foundation-program",
    aliases: ["foundation", "foundationprogram", "beginner-level"],
    category: "BEGINNER LEVEL",
    title: "Foundation Program",
    bannerImage: "/assets/images/Programs/Webp/r2.webp",
    bannerImageAlt: "Foundation horse riding classes for beginners at Zippy Equestrian Center",
    paragraphs: [
      "The Foundation Program is our signature pathway designed to build unshakeable fundamentals in equestrian technique and horse psychology. Whether you have never sat on a horse or want to restart your riding journey correctly, this course provides clear, progressive milestones.",
      "Spread over 50 structured sessions, you transition from walk to rising trot and controlled canter while mastering correct posture, balance, and independent rein contact. Beyond the saddle, you learn to groom, tack up, and communicate with horses effectively.",
      "Under the gentle guidance of certified trainers in our Olympic-grade arena, students develop the muscle memory and instincts required to ride safely, confidently, and independently.",
    ],
    curriculumList: [
      "Walk, trot, and canter development with balance and posture control",
      "Correct riding posture, stirrup length, and independent rein handling",
      "Understanding equine behavior, vocal cues, and responsive communication",
      "Introduction to grooming, saddling, and unmounted stable management",
    ],
    experiences: [
      {
        title: "GAIT PROGRESSION & CONTROL",
        description: "Master rising trot diagonals, sitting trot, and introductory canter with confidence",
      },
      {
        title: "INDEPENDENT SEAT & POSTURE",
        description: "Build core equilibrium and supple hips to move fluidly with your horse's strides",
      },
      {
        title: "EQUINE PSYCHOLOGY & CUES",
        description: "Understand subtle herd body language and use light, responsive aids without force",
      },
      {
        title: "HANDS-ON TACK & GROOMING",
        description: "Learn essential stable routines, hoof picking, and bridle and saddle fitting",
      },
      {
        title: "ARENA NAVIGATION & SPATIAL AWARENESS",
        description: "Steer accurately through arena figures, circles, and changes of rein with ease",
      },
    ],
    ctaText: "Enroll now",
    ctaHref: "/contact?interest=Riding%20Programs&message=Foundation%20Program",
    metaTitle: "Foundation Horse Riding Program Bangalore | Beginner Riding Classes | Zippy",
    metaDescription:
      "Learn horse riding in Bangalore with our 50-session Foundation Program. Covers walk, trot, canter, posture, grooming, and horse psychology with certified coaches.",
    keywords: [
      "beginner horse riding classes bangalore",
      "foundation riding program",
      "learn horse riding south bangalore",
      "horse riding lessons for adults and kids",
      "equestrian classes bangalore",
    ],
  },
  {
    slug: "development-program",
    aliases: ["development", "developmentprogram", "intermediate"],
    category: "INTERMEDIATE",
    title: "Development Program",
    bannerImage: "/assets/images/Programs/Webp/r3.webp",
    bannerImageAlt: "Development horse riding program for intermediate riders at Zippy Equestrian Center",
    paragraphs: [
      "Tailored for riders who have completed the Foundation level and are eager to elevate their performance. The Development Program transforms confident riders into technical, adaptable athletes capable of handling spirited horses with poise.",
      "Over 50 performance-focused sessions, riders refine contact elasticity, balance through complex gaits, and learn gymnastic pole work and cavaletti grids. You are introduced to jumping mechanics, the two-point seat, and discipline-specific training.",
      "This program bridges recreational riding and competitive equestrian sports, honing your ability to adjust stride frequency, ride varied equine temperaments, and anticipate horse movements seamlessly.",
    ],
    curriculumList: [
      "Improved contact, balance, and riding technique across all gaits",
      "Introduction to jumping positions, two-point seat, and pole grids",
      "Structured, performance-focused progression and stride regulation",
      "Introduction to advanced grooming and competition stable practices",
    ],
    experiences: [
      {
        title: "STRIDE REGULATION & RHYTHM",
        description: "Lengthen and collect strides while maintaining smooth cadence and upright balance",
      },
      {
        title: "POLE WORK & CAVALETTI GRIDS",
        description: "Develop horse impulsion, agility, and straightness over measured ground poles",
      },
      {
        title: "TWO-POINT JUMPING POSITION",
        description: "Master the forward jumping seat, crest release, and secure lower leg security",
      },
      {
        title: "MULTI-HORSE ADAPTABILITY",
        description: "Ride horses of varying strides and temperaments to sharpen your equestrian versatility",
      },
      {
        title: "DISCIPLINE SPECIALIZATION PREPARATION",
        description: "Prepare physical strength and technical foundation for showjumping or dressage tracks",
      },
    ],
    ctaText: "Enroll now",
    ctaHref: "/contact?interest=Riding%20Programs&message=Development%20Program",
    metaTitle: "Development Horse Riding Program | Intermediate Lessons Bangalore | Zippy",
    metaDescription:
      "Advance your equestrian skills with Zippy's Intermediate Development Program in Bangalore. Pole work, canter control, two-point jumping seat, and performance agility.",
    keywords: [
      "intermediate horse riding lessons bangalore",
      "development riding course",
      "horse jumping training",
      "canter mastery bangalore",
      "equestrian coaching intermediate",
    ],
  },
  {
    slug: "performance-program",
    aliases: ["performance", "performanceprogram", "competitive"],
    category: "ADVANCED / COMPETITIVE",
    title: "Performance Program",
    bannerImage: "/assets/images/Programs/Webp/r4.webp",
    bannerImageAlt: "Performance and competitive equestrian training program at Zippy Equestrian Center",
    paragraphs: [
      "Our premier high-performance curriculum for equestrians dedicated to regional, state, and national competition circuits. The Performance Program demands rigorous commitment, mental focus, and disciplined horsemanship.",
      "Riders train on competition-grade mounts under the mentorship of seasoned coaches who have competed at international arenas. The program combines video analysis, interval fitness conditioning, and precision ring craft.",
      "Whether targeting national showjumping qualifiers or advanced dressage championships, our structured periodization plans ensure you and your equine partner peak at the highest competitive levels.",
    ],
    curriculumList: [
      "Advanced techniques and discipline specialization in showjumping and dressage",
      "Competition preparation, course walk analysis, and arena strategy",
      "Professional coaching and structured, periodized training plans",
      "Clear pathway to state, national, and international competitions",
    ],
    experiences: [
      {
        title: "COURSE ANALYSIS & STRATEGY",
        description: "Analyze strides, approach angles, rollbacks, and optimum jump lines on competition tracks",
      },
      {
        title: "ADVANCED LATERAL MOVEMENTS",
        description: "Execute precision shoulder-in, half-pass, and collected maneuvers with subtle aids",
      },
      {
        title: "ATHLETIC CONDITIONING & RECOVERY",
        description: "Periodized equine and rider workouts to enhance stamina, core stability, and power",
      },
      {
        title: "COMPETITION PSYCHOLOGY",
        description: "Cultivate ring composure, pressure management, and laser focus under judge scrutiny",
      },
      {
        title: "SHOW CIRCUIT REPRESENTATION",
        description: "Represent Zippy Equestrian Center at sanctioned state and national horse shows",
      },
    ],
    ctaText: "Enroll now",
    ctaHref: "/contact?interest=Riding%20Programs&message=Performance%20Program",
    metaTitle: "Performance Equestrian Training Bangalore | Competitive Horse Riding | Zippy",
    metaDescription:
      "Elite competitive riding coaching in Bangalore. Train for state and national showjumping and dressage championships with champion horses and veteran coaches.",
    keywords: [
      "competitive horse riding bangalore",
      "equestrian sports training",
      "showjumping coaching",
      "national equestrian championship prep",
      "performance riding bangalore",
    ],
  },
  {
    slug: "dressage-program",
    aliases: ["dressage", "dressageprogram"],
    category: "SPECIALIZATION",
    title: "Dressage Program",
    bannerImage: "/assets/images/Programs/Webp/r5.webp",
    bannerImageAlt: "Dressage equestrian specialization program at Zippy Equestrian Center Bangalore",
    paragraphs: [
      "Dressage is the highest expression of horse training—an art form and Olympic sport celebrated for harmony, symmetry, and invisible communication between rider and horse. This specialization is designed for riders aiming for technical elegance.",
      "Training in our regulation-sized dressage arena, you progress along the classical training pyramid: rhythm, suppleness, contact, impulsion, straightness, and collection. Every exercise emphasizes equine biomechanics and lightness of the aids.",
      "Our master dressage instructors help you cultivate a supple, deep seat that follows every equine movement effortlessly, guiding your mount through complex lateral figures and tests with poise.",
    ],
    curriculumList: [
      "Correct dressage seat and refined, deep position in the saddle",
      "Precise micro-aids with seat, leg, and rein without force",
      "Transitions, lateral movements, and rhythm maintenance at all gaits",
      "Building the connection, collection, and elevation that dressage demands",
    ],
    experiences: [
      {
        title: "DEEP CLASSICAL SEAT",
        description: "Develop a weight-centered, relaxed position that absorbs and channels equine movement",
      },
      {
        title: "LATERAL WORK & FLEXION",
        description: "School leg-yield, shoulder-in, travers, and half-pass with exact geometrical accuracy",
      },
      {
        title: "CADENCE & COLLECTION",
        description: "Engage the hindquarters to achieve elevated, springy trot and uphill canter strides",
      },
      {
        title: "FEI TEST ACCURACY",
        description: "Ride standard dressage test patterns, refining arena geometry, halt immobility, and diagonals",
      },
      {
        title: "INVISIBLE HARMONY",
        description: "Communicate seamlessly through microscopic weight shifts and rein breathing",
      },
    ],
    ctaText: "Enroll now",
    ctaHref: "/contact?interest=Riding%20Programs&message=Dressage%20Program",
    metaTitle: "Classical Dressage Training Bangalore | Specialized Equestrian Dressage | Zippy",
    metaDescription:
      "Master classical dressage riding in Bangalore. Individualized coaching on seat position, collection, lateral movements, and FEI test patterns at Zippy Equestrian.",
    keywords: [
      "dressage training bangalore",
      "classical dressage lessons",
      "equestrian dressage coach",
      "dressage test practice bangalore",
      "horse riding dressage specialization",
    ],
  },
  {
    slug: "showjumping-program",
    aliases: ["showjumping", "showjumpingprogram", "jumping"],
    category: "SPECIALIZATION",
    title: "Showjumping Program",
    bannerImage: "/assets/images/Programs/Webp/r6.webp",
    bannerImageAlt: "Showjumping lessons and fence jumping training at Zippy Equestrian Center Bangalore",
    paragraphs: [
      "For riders who crave the electrifying fusion of speed, precision, and flight. Our Showjumping Program guides riders who are confident cantering independently into mastering obstacles, fence combinations, and course navigation.",
      "Beginning with ground poles and cavaletti gymnastic lines, riders progressively advance to verticals, oxers, and full competitive courses. You learn to gauge distances, plan approaches, and maintain balance over the jump's bascule.",
      "Safety and horse biomechanics remain paramount. Our experienced coaches teach you to communicate clearly with your horse in the approach, take-off, and landing phases, ensuring confident, clear rounds.",
    ],
    curriculumList: [
      "The jumping position, two-point seat, and elastic crest release",
      "Approach line, take-off calculation, bascule, and landing recovery",
      "Gridwork and gymnastic exercises to build agility and confidence",
      "Riding a course of fences with rhythm, control, and optimal time",
    ],
    experiences: [
      {
        title: "GYMNASTIC JUMPING GRIDS",
        description: "Build horse scope and automatic rider release over calibrated bounce and stride grids",
      },
      {
        title: "DISTANCE & STRIDE JUDGMENT",
        description: "Spot take-off spots with precision, adjusting canter strides effortlessly before fences",
      },
      {
        title: "COURSE TIME & TRACK PLANNING",
        description: "Master tight rollbacks, efficient lines, and speed control for clean competition rounds",
      },
      {
        title: "BALANCE OVER THE BASCULE",
        description: "Maintain a steady lower leg and soft hands through the trajectory of every jump",
      },
      {
        title: "SIMULATED COMPETITION COURSES",
        description: "Ride full 8 to 12 fence championship courses under realistic ring conditions",
      },
    ],
    ctaText: "Enroll now",
    ctaHref: "/contact?interest=Riding%20Programs&message=Showjumping%20Program",
    metaTitle: "Showjumping Classes in Bangalore | Equestrian Show Jumping Academy | Zippy",
    metaDescription:
      "Train in professional showjumping in Bangalore. Jump courses, develop stride estimation, gridwork, and two-point jumping technique under certified coaches.",
    keywords: [
      "showjumping classes bangalore",
      "horse jumping coaching",
      "show jumping lessons karnataka",
      "equestrian jumping arena bangalore",
      "clear round jumping training",
    ],
  },
  {
    slug: "practice-program",
    aliases: ["practice", "practiceprogram", "add-on-practice"],
    category: "FOR PRACTICE ADD ON",
    title: "Practice Program",
    bannerImage: "/assets/images/Programs/Webp/r7.webp",
    bannerImageAlt: "Practice horse riding sessions and saddle hours at Zippy Equestrian Center Bangalore",
    paragraphs: [
      "Horsemanship is an art where repetition and quiet saddle hours build deep intuition and physical confidence. The Practice Program is an exclusive add-on designed for enrolled Zippy students who want unstructured arena time to reinforce their lessons.",
      "Whether you wish to practice your rising trot diagonals, perfect your sitting posture, or simply enjoy quiet, meditative riding with a familiar horse, these sessions give you complete freedom in our world-class arena.",
      "Each practice ride is overseen by on-duty arena marshals for complete safety. It is the most effective way to accelerate your progress through your main program milestones at your own leisure.",
    ],
    curriculumList: [
      "Unstructured saddle time dedicated to practicing current curriculum skills",
      "Arena marshal safety supervision and horse tack check before every ride",
      "Freedom to refine rhythm, posture, and gaits at your personal pace",
      "Affordable add-on pricing pegged to your current enrolled program level",
    ],
    experiences: [
      {
        title: "ACCELERATED SADDLE TIME",
        description: "Accumulate valuable hours in the saddle to develop intuitive balance and muscle memory",
      },
      {
        title: "FOCUSED INDEPENDENT DRILLS",
        description: "Work through instructor feedback on specific gaits and figures without lesson pressure",
      },
      {
        title: "ON-DUTY SAFETY SUPERVISION",
        description: "Ride independently with confidence knowing certified arena marshals are present",
      },
      {
        title: "FLEXIBLE SCHEDULING",
        description: "Book practice slots during mornings or evenings to suit your weekly routine",
      },
      {
        title: "DEEPER HORSE CONNECTION",
        description: "Strengthen trust and communication with your horse during relaxed, unhurried rides",
      },
    ],
    ctaText: "Enroll now",
    ctaHref: "/contact?interest=Riding%20Programs&message=Practice%20Program",
    metaTitle: "Horse Riding Practice Sessions Bangalore | Arena Saddle Time | Zippy Equestrian",
    metaDescription:
      "Extra arena practice time for enrolled Zippy students. Perfect your gaits, balance, and saddle confidence at your own pace with safety supervision in South Bangalore.",
    keywords: [
      "horse riding practice bangalore",
      "saddle time riding stables",
      "equestrian arena practice",
      "independent horse riding bangalore",
      "zippy practice program",
    ],
  },
];

export function getProgramBySlug(slug: string): ProgramSeoItem | undefined {
  const normalized = slug.toLowerCase().trim();
  return programsSeoList.find(
    (item) => item.slug === normalized || item.aliases.includes(normalized)
  );
}
