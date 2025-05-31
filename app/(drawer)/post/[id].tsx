import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { WordPressPost } from "@/lib/types/types";
import { getPost, getRelatedPosts } from "@/lib/api/wordpress";
import { decodeHtmlEntities } from "@/lib/utils/decodeHtml";
import PostCard from "@/components/PostCard";
import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@/lib/context/ThemeContext";
import Colors from "@/constants/Colors";

export default function PostScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [related, setRelated] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);

  const { theme } = useAppTheme();
  const colors = Colors[theme];

  useEffect(() => {
    (async () => {
      if (!id) return;
      const fetchedPost = await getPost(id as string);
      const relatedPosts = await getRelatedPosts(id as string);
      setPost(fetchedPost);
      setRelated(relatedPosts);
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator color={colors.tint} />
      </View>
    );
  }

  const formattedDate = new Date(post!.date).toLocaleString("ar-LB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const author = post?._embedded?.author?.[0]?.name;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <LinearGradient
        colors={["#01A0C0", "#4BA761"]}
        style={styles.gradientHeader}
      >
        <Text style={styles.headerTitle}>
          {decodeHtmlEntities(post?.title.rendered ?? "")}
        </Text>
      </LinearGradient>

      {post && (
        <>
          {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <Image
              source={{ uri: post._embedded["wp:featuredmedia"][0].source_url }}
              style={styles.image}
            />
          )}
          <Text style={[styles.date, { color: colors.text }]}>
            {formattedDate}
          </Text>
          {author && (
            <Text style={[styles.author, { color: colors.text }]}>
              الكاتب: {author}
            </Text>
          )}
          <Text style={[styles.content, { color: colors.text }]}>
            {decodeHtmlEntities(post.content.rendered.replace(/<[^>]+>/g, ""))}
          </Text>
          <Text style={[styles.relatedTitle, { color: colors.tint }]}>
            مواضيع ذات صلة
          </Text>
          {related.map((item) => (
            <PostCard key={item.id} post={item} />
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  gradientHeader: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  date: {
    textAlign: "right",
    marginBottom: 4,
    fontSize: 12,
  },
  author: {
    textAlign: "right",
    marginBottom: 10,
    fontSize: 12,
  },
  content: {
    textAlign: "right",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 20,
    marginBottom: 10,
  },
});
