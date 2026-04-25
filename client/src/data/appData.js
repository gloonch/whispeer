export const EVENT_TAGS = {
  what: ["anniversary", "date", "picnic", "movie_night", "home_cooking", "trip", "party", "coffee_date"],
  where: ["home", "cafe", "park", "restaurant", "cinema", "beach", "mountain", "street"],
  how: ["cozy", "sunset", "rainy", "romantic", "quiet", "night", "outdoor"],
  with: ["just_us", "friends", "family"],
};

export const TODO_PRESETS = [
  "Tea & Talk",
  "Read Side by Side",
  "Slow Stretch Duo",
  "3 Compliments Each",
  "One Song Together",
  "Plan Tomorrow - One Line",
  "Hand-in-Hand Talk",
];

export const USER_PROFILE = {
  name: "Alex Morgan",
  username: "alex.morgan",
  profileImage: "",
};

export const initialPartners = [
  { id: "p1", name: "Neda Rahimi", username: "neda.rahimi", since: "2025-11-08", status: "active" },
  { id: "p2", name: "Maya Stone", username: "maya.stone", since: "2026-01-14", endedAt: "2026-03-02", status: "ended" },
];

export const knownPartnerUsernames = {
  "neda.rahimi": "Neda Rahimi",
  "maya.stone": "Maya Stone",
  "luna.carter": "Luna Carter",
};

export const PHOTO_COVERS = [
  "bg-[radial-gradient(circle_at_25%_20%,rgba(248,113,113,0.80),transparent_34%),radial-gradient(circle_at_80%_15%,rgba(168,85,247,0.78),transparent_34%),linear-gradient(135deg,#fdf2f8,#dbeafe)]",
  "bg-[radial-gradient(circle_at_25%_20%,rgba(34,197,94,0.72),transparent_34%),radial-gradient(circle_at_80%_15%,rgba(59,130,246,0.72),transparent_34%),linear-gradient(135deg,#ecfeff,#f0fdf4)]",
  "bg-[radial-gradient(circle_at_20%_25%,rgba(251,191,36,0.80),transparent_34%),radial-gradient(circle_at_75%_15%,rgba(236,72,153,0.70),transparent_34%),linear-gradient(135deg,#fff7ed,#fdf2f8)]",
  "bg-[radial-gradient(circle_at_30%_20%,rgba(96,165,250,0.78),transparent_36%),radial-gradient(circle_at_80%_20%,rgba(45,212,191,0.70),transparent_34%),linear-gradient(135deg,#eff6ff,#ecfeff)]",
];

export const initialEvents = [
  {
    id: "e1",
    partnerId: "p1",
    title: "Tiny picnic after work",
    note: "We stayed in the park until the sky turned pink.",
    date: "2026-04-22",
    photos: [
      { id: "p_e1_1", coverClass: PHOTO_COVERS[0] },
      { id: "p_e1_2", coverClass: PHOTO_COVERS[2] },
    ],
    coverPhotoId: "p_e1_2",
    visibility: "private",
    publishedAt: null,
    tags: { what: ["picnic", "date"], where: ["park"], how: ["sunset", "cozy"], with: ["just_us"] },
  },
  {
    id: "e2",
    partnerId: "p1",
    title: "First home pasta night",
    note: "A small dinner that felt better than going out.",
    date: "2026-04-18",
    photos: [{ id: "p_e2_1", coverClass: PHOTO_COVERS[1] }],
    coverPhotoId: "p_e2_1",
    visibility: "public",
    publishedAt: "2026-04-20",
    inspiredCount: 6,
    tags: { what: ["home_cooking"], where: ["home"], how: ["quiet"], with: ["just_us"] },
  },
  {
    id: "e3",
    partnerId: "p2",
    title: "Coffee date before rain",
    note: "We talked about the next month and made one promise.",
    date: "2026-04-10",
    photos: [
      { id: "p_e3_1", coverClass: PHOTO_COVERS[3] },
      { id: "p_e3_2", coverClass: PHOTO_COVERS[0] },
    ],
    coverPhotoId: "p_e3_2",
    visibility: "private",
    publishedAt: null,
    tags: { what: ["coffee_date"], where: ["cafe"], how: ["rainy"], with: ["just_us"] },
  },
];

export const initialPublicMemories = [
  {
    id: "pub_1",
    sourceMemoryId: "external_1",
    title: "Rainy cafe check-in",
    coverClass: PHOTO_COVERS[3],
    tags: { what: ["coffee_date"], where: ["cafe"], how: ["rainy"], with: ["just_us"] },
    publishedAt: "2026-04-24",
    inspiredCount: 18,
    status: "published",
  },
  {
    id: "pub_2",
    sourceMemoryId: "external_2",
    title: "Sunset picnic pause",
    coverClass: PHOTO_COVERS[0],
    tags: { what: ["picnic"], where: ["park"], how: ["sunset"], with: ["just_us"] },
    publishedAt: "2026-04-23",
    inspiredCount: 31,
    status: "published",
  },
  {
    id: "pub_3",
    sourceMemoryId: "external_3",
    title: "Beach walk reset",
    coverClass: PHOTO_COVERS[1],
    tags: { what: ["trip"], where: ["beach"], how: ["outdoor"], with: ["just_us"] },
    publishedAt: "2026-04-21",
    inspiredCount: 12,
    status: "published",
  },
  {
    id: "pub_4",
    sourceMemoryId: "external_4",
    title: "Movie night at home",
    coverClass: PHOTO_COVERS[2],
    tags: { what: ["movie_night"], where: ["home"], how: ["cozy"], with: ["just_us"] },
    publishedAt: "2026-04-19",
    inspiredCount: 24,
    status: "published",
  },
];

export const initialTodos = [
  { id: "t1", partnerId: "p1", title: "Tea & Talk", minutes: 10, status: "open", isHighlighted: false },
  { id: "t2", partnerId: "p1", title: "Read Side by Side", minutes: 20, status: "open", isHighlighted: false },
  { id: "t3", partnerId: "p1", title: "3 Compliments Each", minutes: 10, status: "done", isHighlighted: true, doneAt: "2026-04-23", highlightedAt: "2026-04-23" },
];

export const initialHighlights = [
  {
    id: "h1",
    partnerId: "p1",
    sourceType: "whisper",
    sourceId: "t3",
    title: "3 Compliments Each",
    minutes: 10,
    coverClass: PHOTO_COVERS[2],
    createdAt: "2026-04-23",
  },
];
