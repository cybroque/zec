export interface WebsiteFaq {
  _id?: string;
  id?: number;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

export const defaultFaqs: WebsiteFaq[] = [
  {
    id: 1,
    question: "How difficult is horse riding?",
    answer:
      "Horse riding requires balance, core stability, and clear communication with the horse, but it is accessible to learners of all ages and fitness levels. Beginners start with gentle walk lessons on calm school horses where you learn balance, posture, and rein control under guided supervision. With structured instruction, most riders feel confident and balanced within just a few sessions.",
    category: "general",
    order: 1,
  },
  {
    id: 2,
    question: "Are horseback riding classes considered exercise?",
    answer:
      "Yes, absolutely. Riding is an intensive, full-body cardiovascular and isometric workout. It actively engages your core, inner thighs, lower back, and pelvic floor muscles to stay centered in rhythm with the horse's movement. A 45-minute lesson can burn between 300 to 500 calories while improving posture, flexibility, and motor coordination.",
    category: "lessons",
    order: 2,
  },
  {
    id: 3,
    question: "How to safely ride a horse?",
    answer:
      "Safety begins with proper equipment, respect for animal psychology, and certified coaching. At Zippy, all riders wear certified equestrian helmets, supportive boots with heels, and appropriate gear. Beginners learn how to approach horses calmly, read ear and body cues, maintain balanced posture without pulling the reins, and practice inside safe, cushioned arenas with instructor supervision.",
    category: "safety",
    order: 3,
  },
  {
    id: 4,
    question: "How many lessons (duration of training) will it take to become a good rider?",
    answer:
      "Becoming a capable, independent rider generally takes around 20 to 30 structured lessons. In your first 5 to 10 lessons (our Foundation Program), you master mounting, balanced walking, steering, and posting trot. By 15 to 25 lessons, riders comfortably canter and navigate arena figures. Advanced disciplines like showjumping and dressage are continuous paths of mastery.",
    category: "lessons",
    order: 4,
  },
  {
    id: 5,
    question: "Is there a weight limit for horse riding?",
    answer:
      "Yes, equine welfare and back health are our utmost priorities. In accordance with international veterinary standards, a horse should carry no more than 15% to 20% of its body weight. At Zippy, our maximum rider weight limit is generally 85 kg (approx. 187 lbs), depending on the horse assigned. During your discovery ride, trainers match each rider with an appropriately sized and conditioned horse.",
    category: "safety",
    order: 5,
  },
  {
    id: 6,
    question: "Is social distancing and facility hygiene maintained in the academy?",
    answer:
      "Yes. Our facility features expansive, open-air sand arenas and outdoor paddocks with continuous fresh airflow. Lessons are conducted in private one-on-one sessions or small semi-private groups of 2 to 4 riders, naturally maintaining wide physical separation between horses. All riding helmets, tack, and reins are sanitized between sessions.",
    category: "facilities",
    order: 6,
  },
  {
    id: 7,
    question: "When can I participate in the competition?",
    answer:
      "Riders can typically begin competing in club-level schooling shows and gymkhana events after 6 to 12 months of consistent training (around 40–50 hours in the saddle). Once you demonstrate a secure, balanced seat across walk, trot, and canter, our trainers guide you into the Performance Program to prepare for regional EFI (Equestrian Federation of India) dressage and showjumping events.",
    category: "competitions",
    order: 7,
  },
  {
    id: 8,
    question: "What are the required skills to train a racehorse?",
    answer:
      "Training racehorses and high-performance sport horses requires profound understanding of equine biomechanics, behavioral conditioning, and years of hands-on horsemanship. Key skills include ground handling, lunging, interval fitness conditioning, pacing management, and gait evaluation. Professional trainers must also tailor nutritional regimens and spot subtle changes in temperament or soundness.",
    category: "competitions",
    order: 8,
  },
];
