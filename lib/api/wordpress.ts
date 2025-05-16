const API_URL = "https://waradalan.com/wp-json/wp/v2";
import { WordPressPost } from "@/lib/types/types";

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories?_embed`);
  return res.json();
}

export async function getPosts(params: Record<string, any> = {}) {
  const query = new URLSearchParams({ ...params, _embed: "true" }).toString();
  const res = await fetch(`${API_URL}/posts?${query}`);
  const data = await res.json();
  const total = parseInt(res.headers.get("X-WP-Total") || "0");
  return { posts: data, total };
}

// export async function getPost(id: number) {
//   const res = await fetch(`${API_URL}/posts/${id}?_embed`);
//   return res.json();
// }

export async function getPost(id: string): Promise<WordPressPost> {
  const res = await fetch(`${API_URL}/posts/${id}?_embed`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export async function getRelatedPosts(
  postId: string
): Promise<WordPressPost[]> {
  // Option 1: Fetch by category of this post
  const postRes = await fetch(`${API_URL}/posts/${postId}?_embed`);
  if (!postRes.ok) return [];
  const post = await postRes.json();
  const categoryId = post.categories?.[0];

  if (!categoryId) return [];

  const res = await fetch(
    `${API_URL}/posts?categories=${categoryId}&exclude=${postId}&_embed&per_page=5`
  );
  if (!res.ok) return [];
  return res.json();
}
