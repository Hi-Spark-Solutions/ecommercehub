export interface BlogAuthor {
  name: string;
  role: string;
  initials: string;
}

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: BlogAuthor;
  date: string; // ISO
  readingMinutes: number;
  featured?: boolean;
  /** Tailwind gradient classes used for the self-contained cover image. */
  cover: string;
  content: BlogBlock[];
}

export const blogCategories = [
  "All",
  "Commerce",
  "Operations",
  "Product",
  "Growth",
] as const;

const teamAuthor: BlogAuthor = {
  name: "The Smartify Commerce Team",
  role: "Product & Commerce",
  initials: "EH",
};

const opsAuthor: BlogAuthor = {
  name: "Sara Malik",
  role: "Head of Operations",
  initials: "SM",
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-omnichannel-commerce-needs-one-operating-system",
    title: "Why omnichannel commerce needs one operating system",
    excerpt:
      "Selling on more channels shouldn't mean managing more tools. Here's the case for a single commerce operating system.",
    category: "Commerce",
    author: teamAuthor,
    date: "2026-07-28",
    readingMinutes: 6,
    featured: true,
    cover: "from-blue-600 to-blue-900",
    content: [
      {
        type: "paragraph",
        text: "For most growing brands, every new sales channel adds another dashboard, another export, and another place where inventory can drift out of sync. The result is a patchwork of tools that were never designed to work together.",
      },
      { type: "heading", text: "The cost of fragmentation" },
      {
        type: "paragraph",
        text: "When products live in one system, orders in another, and inventory in a spreadsheet, small errors compound. Overselling, delayed fulfillment, and inconsistent customer data are symptoms of the same root cause: there is no single source of truth.",
      },
      {
        type: "list",
        items: [
          "Inventory that is accurate on one channel but stale on another",
          "Orders that require manual re-keying between systems",
          "Reporting that never quite reconciles across channels",
        ],
      },
      { type: "heading", text: "One workspace, every channel" },
      {
        type: "paragraph",
        text: "A commerce operating system centralizes the operations layer. Products, orders, inventory and customers live in one workspace, and each connected channel reads from and writes to that shared foundation.",
      },
      {
        type: "quote",
        text: "The goal isn't to replace your channels — it's to coordinate them.",
      },
      {
        type: "paragraph",
        text: "That coordination is what lets a small team operate like a much larger one, and what lets a brand add its next channel without adding another silo.",
      },
    ],
  },
  {
    slug: "five-signs-you-have-outgrown-spreadsheets",
    title: "Five signs you've outgrown spreadsheets for order management",
    excerpt:
      "Spreadsheets are where most brands start. Here's how to know when they're holding you back.",
    category: "Operations",
    author: opsAuthor,
    date: "2026-07-14",
    readingMinutes: 5,
    cover: "from-slate-800 to-slate-950",
    content: [
      {
        type: "paragraph",
        text: "Spreadsheets are flexible, familiar and free — which is exactly why so many commerce operations run on them for far longer than they should.",
      },
      { type: "heading", text: "The warning signs" },
      {
        type: "list",
        items: [
          "You reconcile inventory by hand at the end of every day",
          "Two people editing the same sheet causes conflicts",
          "Fulfillment depends on one person who 'knows the file'",
          "You can't answer simple questions without exporting more data",
          "Mistakes are caught by customers, not by your process",
        ],
      },
      {
        type: "paragraph",
        text: "None of these mean spreadsheets are bad — they mean your operation has grown past what a single file can safely coordinate.",
      },
      { type: "heading", text: "What to move first" },
      {
        type: "paragraph",
        text: "Start with the workflow that causes the most customer-facing errors, usually order processing and inventory sync. Moving those into a shared system removes the highest-risk manual steps first.",
      },
    ],
  },
  {
    slug: "building-a-catalog-that-scales-across-channels",
    title: "Building a product catalog that scales across channels",
    excerpt:
      "A clean catalog is the foundation of multi-channel selling. Here's how to structure it.",
    category: "Product",
    author: teamAuthor,
    date: "2026-06-30",
    readingMinutes: 7,
    cover: "from-blue-500 to-indigo-800",
    content: [
      {
        type: "paragraph",
        text: "Every channel has its own rules for titles, images, attributes and variants. A catalog that scales treats those rules as presentation, not as separate copies of your data.",
      },
      { type: "heading", text: "One product, many listings" },
      {
        type: "paragraph",
        text: "Model each product once, with its variants and media, then let each channel apply its own formatting. This keeps your data consistent while still meeting each channel's requirements.",
      },
      { type: "heading", text: "Attributes that travel" },
      {
        type: "paragraph",
        text: "Invest early in a consistent attribute structure. It's the difference between filtering, reporting and automation working everywhere versus nowhere.",
      },
    ],
  },
  {
    slug: "inventory-accuracy-is-a-growth-strategy",
    title: "Inventory accuracy is a growth strategy, not a chore",
    excerpt:
      "Accurate stock isn't just operational hygiene — it directly affects revenue and retention.",
    category: "Operations",
    author: opsAuthor,
    date: "2026-06-12",
    readingMinutes: 5,
    cover: "from-cyan-600 to-blue-900",
    content: [
      {
        type: "paragraph",
        text: "Overselling erodes trust faster than almost anything else in commerce. A cancelled order is a lost sale and a damaged relationship at the same time.",
      },
      {
        type: "paragraph",
        text: "Real-time inventory sync across channels turns stock from a liability into a lever: you can sell confidently on more channels because you trust the numbers behind them.",
      },
      { type: "heading", text: "Where accuracy comes from" },
      {
        type: "list",
        items: [
          "A single stock ledger shared by every channel",
          "Updates that propagate in real time, not overnight",
          "Clear rules for allocation across channels and warehouses",
        ],
      },
    ],
  },
  {
    slug: "automation-basics-for-commerce-teams",
    title: "Automation basics for lean commerce teams",
    excerpt:
      "You don't need a large team to automate operations. Start with these simple rules.",
    category: "Growth",
    author: teamAuthor,
    date: "2026-05-29",
    readingMinutes: 4,
    cover: "from-blue-700 to-black",
    content: [
      {
        type: "paragraph",
        text: "Automation doesn't have to mean complex engineering. The highest-leverage automations are usually simple rules applied consistently.",
      },
      {
        type: "list",
        items: [
          "Route orders to the right warehouse automatically",
          "Flag low stock before it becomes an out-of-stock",
          "Tag high-value customers for follow-up",
        ],
      },
      {
        type: "paragraph",
        text: "Each rule removes a recurring decision from a person's plate. Stacked together, they let a small team run a large operation.",
      },
    ],
  },
  {
    slug: "a-buyers-guide-to-commerce-platforms",
    title: "A buyer's guide to commerce operations platforms",
    excerpt:
      "How to evaluate the operations layer for your brand — and the questions that matter most.",
    category: "Commerce",
    author: teamAuthor,
    date: "2026-05-15",
    readingMinutes: 8,
    cover: "from-slate-700 to-blue-950",
    content: [
      {
        type: "paragraph",
        text: "Choosing an operations platform is a long-term decision. The right questions focus less on today's feature list and more on how the platform will grow with you.",
      },
      { type: "heading", text: "Questions worth asking" },
      {
        type: "list",
        items: [
          "Does it centralize products, orders, inventory and customers?",
          "Can new channels be added without re-tooling?",
          "Is data isolated cleanly per brand or workspace?",
          "How are integrations added over time?",
        ],
      },
      {
        type: "paragraph",
        text: "A platform that answers these well will still fit your business after your next few channels, not just your current ones.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return blogPosts.slice(0, limit);
  return blogPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (a.category === current.category ? -1 : 1))
    .slice(0, limit);
}
