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
    if (!params.after) {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      params.after = threeMonthsAgo.toISOString();
    }

    const query = new URLSearchParams({ ...params, _embed: "true" }).toString();
    const res = await fetch(`${API_URL}/posts?${query}`);

    if (!res.ok) {
      const isJson = res.headers
        .get("content-type")
        ?.includes("application/json");
      const message = isJson ? await res.json() : await res.text();

      if (isJson && message?.code === "rest_post_invalid_page_number") {
        return { posts: [], total: 0 };
      }

      console.warn("Warning: Failed to fetch posts", {
        status: res.status,
        message,
      });
      return { posts: [], total: 0 };
    }

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
  try {
    if (!id) throw new Error("Post ID is required");
    if (typeof id !== "string") {
      throw new Error("Post ID must be a string");
    }
    const res = await fetch(
      `${API_URL}/posts/${id}?_embed=author,wp:featuredmedia`
    );
    if (!res.ok) throw new Error("Failed to fetch post");
    return res.json();
  } catch (error) {
    console.error("Error validating post ID:", error);
    return Promise.reject("Invalid post ID");
  }
}

export async function getRelatedPosts(
  postId: string
): Promise<WordPressPost[]> {
  try {
    const postRes = await fetch(`${API_URL}/posts/${postId}?_embed`);
    if (!postRes.ok) return [];

    const post = await postRes.json();
    const categoryId = post.categories?.[0];
    if (!categoryId) return [];

    const { posts } = await getPosts({
      categories: categoryId,
      exclude: postId,
      per_page: 5,
    });

    return posts;
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}
