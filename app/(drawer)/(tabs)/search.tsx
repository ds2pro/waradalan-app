import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { getPosts } from "@/lib/api/wordpress";
import { WordPressPost } from "@/lib/types/types";
import PostCard from "@/components/PostCard";
import { useRouter } from "expo-router";
import { useAppTheme } from "@/lib/context/ThemeContext";
import Colors from "@/constants/Colors";

const tabs = ["الأحدث", "الأكثر صلة"];

export default function SearchScreen() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("الأحدث");
  const [results, setResults] = useState<WordPressPost[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const router = useRouter();

  const handleSearch = async () => {
    if (!query.trim()) return;
    const orderby = activeTab === "الأحدث" ? "date" : "relevance";

    try {
      const { posts, total } = await getPosts({
        search: query,
        orderby,
        order: "desc",
        per_page: 10,
        _embed: true,
        page: 1,
      });
      setResults(posts);
      setTotal(total);
      setPage(1);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const loadMorePosts = async () => {
    if (results.length >= total || isLoadingMore) return;
    setIsLoadingMore(true);

    try {
      const nextPage = page + 1;
      const orderby = activeTab === "الأحدث" ? "date" : "relevance";

      const { posts: morePosts } = await getPosts({
        search: query,
        orderby,
        order: "desc",
        per_page: 10,
        page: nextPage,
      });

      setResults((prev) => [...prev, ...morePosts]);
      setPage(nextPage);
    } catch (err) {
      console.error("Load more error:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      {/* Search Bar */}
      <View
        style={[styles.searchContainer, { backgroundColor: colors.background }]}
      >
        <Pressable style={styles.iconRight} onPress={handleSearch}>
          <Ionicons name="search" size={20} color={colors.tint} />
        </Pressable>

        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="أدخل كلمة البحث..."
          placeholderTextColor="#888"
          textAlign="right"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />

        {query.length > 0 && (
          <Pressable
            style={styles.iconLeft}
            onPress={() => {
              setQuery("");
              setResults([]);
              setPage(1);
              setTotal(0);
              router.replace("/search");
            }}
          >
            <Ionicons name="close" size={20} color={colors.tint} />
          </Pressable>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => {
              setActiveTab(tab);
              if (query) handleSearch();
            }}
            style={[
              styles.tabButton,
              { backgroundColor: tab === activeTab ? colors.tint : "#e1ecf1" },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                { color: tab === activeTab ? "#fff" : colors.tint },
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {query.length > 0 && (
        <Text style={{ marginVertical: 10, color: "#666", textAlign: "right" }}>
          {total.toLocaleString()} مقالة
        </Text>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingTop: 20 }}
        renderItem={({ item }) => <PostCard post={item} replace />}
        ListEmptyComponent={
          query.length > 0 ? (
            <Text style={styles.noResult}>لا توجد نتائج</Text>
          ) : null
        }
        ListFooterComponent={
          isLoadingMore ? (
            <View style={{ paddingVertical: 20 }}>
              <Text style={{ textAlign: "center", color: "#888" }}>
                جاري التحميل...
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  iconRight: {
    padding: 6,
    marginLeft: 6,
  },
  iconLeft: {
    padding: 6,
    marginRight: 6,
  },
  tabs: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    gap: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
  },
  tabText: {
    textAlign: "center",
    fontWeight: "700",
  },
  noResult: {
    marginTop: 30,
    textAlign: "center",
    color: "#888",
  },
});
