const API_URL = "https://waradalan.com/wp-json/wp/v2";
import { WordPressPost, Category } from "@/lib/types/types";

export async function getCategories(): Promise<Category[]> {
  try {
    const customOrder = [39, 7, 3, 46, 28, 5, 2, 36, 8];
    const res = await fetch(
      `${API_URL}/categories?include=${customOrder.join(",")}&_embed`
    );

    if (!res.ok) throw new Error("Failed to fetch categories");

    const categories: Category[] = await res.json();

    if (categories.length === 0) {
      console.log("No categories found");
      return [];
    }

    const sorted = customOrder
      .map((id) => categories.find((cat: Category) => cat.id === id))
      .filter((cat): cat is Category => Boolean(cat));

    return sorted;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// export async function getBreakingNews(id: string): Promise<String> {
//   try {
//     const res = await fetch(
//       `${API_URL}/posts/categories=${id}&status=publish&_embed`
//     );
//     if (!res.ok) throw new Error("Failed to fetch breaking news");

//     const data = await res.json();

//     if (data.length === 0) {
//       console.log("No breaking news found");
//       return "";
//     }
//     console.log("Breaking News Data:", data);

//     return "";
//   } catch (error) {
//     console.error("Error fetching breaking news:", error);
//     return "";
//   }
// }

export async function getPosts(params: Record<string, any> = {}) {
  try {
    const query = new URLSearchParams({ ...params, _embed: "true" }).toString();
    const res = await fetch(`${API_URL}/posts?${query}`);

    if (!res.ok) throw new Error("Failed to fetch posts");

    const data = await res.json();

    if (data.length === 0) {
      console.log("No posts found");
      return { posts: [], total: 0 };
    }

    const total = parseInt(res.headers.get("X-WP-Total") || "0");
    return { posts: data, total };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], total: 0 };
  }
}

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
