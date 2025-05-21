import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useAppTheme } from "@/lib/context/ThemeContext";
import Colors from "@/constants/Colors";
import { fetchCategories, fetchPostsByCategory } from "@/lib/api";
import { Category, Post } from "@/lib/types/types";
import Ticker from "@/components/Ticker";
import { decodeHtmlEntities } from "@/lib/utils/decodeHtml";
import PostCardVertical from "@/components/PostCardVertical";

export default function HomeScreen() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [breakingNews, setBreakingNews] = useState<string>("");

  const onRefresh = async () => {
    if (selectedCategory) {
      setRefreshing(true);
      try {
        const response = await fetchPostsByCategory(selectedCategory.id, 1);
        setPosts(response.posts);
        setPage(1);
      } catch (error) {
        console.error("Refresh error:", error);
      } finally {
        setRefreshing(false);
      }
    }
  };

  const loadMore = async () => {
    if (!selectedCategory || loadingMore) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const response = await fetchPostsByCategory(
        selectedCategory.id,
        nextPage
      );
      if (response.posts.length > 0) {
        setPosts((prev) => [...prev, ...response.posts]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Load more error:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        if (categoriesData.length > 0) {
          setSelectedCategory(categoriesData[0]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchTickerPosts = async () => {
      try {
        const posts = await fetchPostsByCategory(26);
        const titles = posts.posts
          .map((post: Post) => post.title.rendered)
          .join("  •  ");
        setBreakingNews(decodeHtmlEntities(titles));
      } catch (error) {
        console.error("Error fetching ticker posts:", error);
      }
    };
    fetchTickerPosts();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!selectedCategory) return;
      try {
        setLoading(true);
        const response = await fetchPostsByCategory(selectedCategory.id, 1);
        setPosts(response.posts);
        setPage(1);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [selectedCategory]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Breaking News Ticker */}
      {breakingNews.length > 0 && (
        <View style={styles.breakingNewsContainer}>
          <Text style={styles.breakingLabel}>خبر عاجل</Text>
          <View style={styles.tickerWrapper}>
            <Ticker text={breakingNews} speed={40} />
          </View>
        </View>
      )}

      {/* Categories Tabs */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable onPress={() => setSelectedCategory(item)}>
              <Text
                style={[
                  styles.categoryText,
                  {
                    color:
                      selectedCategory === item ? colors.tint : colors.text,
                    borderBottomColor:
                      selectedCategory === item ? colors.tint : "transparent",
                  },
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* Posts List */}
      {loading ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.contentAreaContainer}
          renderItem={({ item }) => <PostCardVertical post={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", color: "#888" }}>
              لا توجد مقالات
            </Text>
          }
          ListFooterComponent={
            loadingMore ? (
              <View style={{ paddingVertical: 20 }}>
                <Text style={{ textAlign: "center", color: "#888" }}>
                  جاري التحميل...
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    direction: "rtl",
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  breakingNewsContainer: {
    backgroundColor: "#b30000",
    marginTop: 10,
    flexDirection: "row",
    height: 36,
    alignItems: "center",
    paddingHorizontal: 12,
  },
  breakingLabel: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
  tickerWrapper: {
    flex: 1,
    overflow: "hidden",
  },
  categoriesContainer: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 4,
  },
  categoryText: {
    fontSize: 16,
    marginHorizontal: 10,
    borderBottomWidth: 2,
    paddingBottom: 4,
    textAlign: "right",
  },
  contentAreaContainer: {
    padding: 16,
  },
});
