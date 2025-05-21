import { getCategories, getPosts, getRelatedPosts } from "./wordpress";

export async function fetchHomeFeed() {
  return getPosts({ per_page: 10, order: "desc" });
}

export async function fetchPostsByCategory(categoryId: number, page = 1) {
  return getPosts({
    categories: categoryId,
    status: "publish",
    orderBy: "date",
    Order: "desc",
    page,
  });
}

export async function fetchCategories() {
  return getCategories();
}

export async function fetchRelatedPosts(postId: string) {
  return getRelatedPosts(postId);
}
