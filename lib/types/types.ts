export type Post = {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  categories: number[];
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  count: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
};

export interface WordPressPost {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _embedded?: {
    ["wp:featuredmedia"]?: {
      source_url: string;
    }[];
    ["wp:term"]?: {
      name: string;
    }[][];
  };
}
