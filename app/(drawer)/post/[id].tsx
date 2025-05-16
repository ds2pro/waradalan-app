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

export default function PostScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [related, setRelated] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!id) return;
      const fetchedPost = await getPost(id as string);
      const relatedPosts = await getRelatedPosts(id as string);
      setPost(fetchedPost);
      setRelated(relatedPosts);
      navigation.setOptions({
        title: decodeHtmlEntities(
          fetchedPost.title.rendered.replace(/<[^>]+>/g, "")
        ),
      });
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          <Text style={styles.date}>
            {new Date(post.date).toLocaleString("ar-EG")}
          </Text>
          <Text style={styles.content}>
            {decodeHtmlEntities(post.content.rendered.replace(/<[^>]+>/g, ""))}
          </Text>
          <Text style={styles.relatedTitle}>مواضيع ذات صلة</Text>
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
    backgroundColor: "#fff",
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
    color: "#888",
    marginBottom: 10,
  },
  content: {
    textAlign: "right",
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 20,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4BA761",
    textAlign: "right",
    marginTop: 20,
    marginBottom: 10,
  },
});
