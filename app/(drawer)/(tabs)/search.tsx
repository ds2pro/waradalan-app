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

const tabs = ["الأحدث", "الأكثر صلة"];

export default function SearchScreen() {
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
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        {/* Search Icon (Right) */}
        <Pressable style={styles.iconRight} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#4BA761" />
        </Pressable>

        {/* Input */}
        <TextInput
          style={styles.input}
          placeholder="أدخل كلمة البحث..."
          placeholderTextColor="#888"
          textAlign="right"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />

        {/* Clear Icon (Left) */}
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
            <Ionicons name="close" size={20} color="#4BA761" />
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
              activeTab === tab && styles.tabButtonActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
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

      {/* Results */}
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
    backgroundColor: "#f2f6f9",
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#eaf1f5",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#222",
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
    backgroundColor: "#e1ecf1",
    borderRadius: 6,
  },
  tabButtonActive: {
    backgroundColor: "#01A0C0",
  },
  tabText: {
    textAlign: "center",
    color: "#4BA761",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  resultCard: {
    flexDirection: "row-reverse",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
    padding: 10,
    alignItems: "center",
  },
  resultImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginLeft: 10,
  },
  resultTextContainer: {
    flex: 1,
  },
  resultExcerpt: {
    color: "#555",
    fontSize: 13,
    textAlign: "right",
    marginTop: 4,
  },
  category: {
    color: "#01A0C0",
    fontSize: 12,
    textAlign: "right",
    marginBottom: 6,
    fontWeight: "500",
  },
  resultTitle: {
    color: "#111",
    fontSize: 14,
    textAlign: "right",
    fontWeight: "600",
  },
  resultMeta: {
    color: "#888",
    fontSize: 12,
    textAlign: "right",
    marginTop: 6,
  },
  noResult: {
    marginTop: 30,
    textAlign: "center",
    color: "#888",
  },
});
