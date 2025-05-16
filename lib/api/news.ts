import { getCategories, getPosts } from "./wordpress";

export async function fetchHomeFeed() {
  return getPosts({ per_page: 10, order: "desc" });
}

export async function fetchPostsByCategory(categoryId: number) {
  return getPosts({ categories: categoryId });
}

export async function fetchCategories() {
  return getCategories();
}
