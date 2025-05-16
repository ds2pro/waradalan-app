import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { WordPressPost } from "@/lib/types/types";
import { decodeHtmlEntities } from "@/lib/utils/decodeHtml";
import PostCard from "./PostCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostDetails({
  post,
  related,
}: {
  post: WordPressPost;
  related?: WordPressPost[];
}) {
  const image =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    require("@/assets/images/logo.png");

  const formattedDate = new Date(post.date).toLocaleString("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {decodeHtmlEntities(post.title.rendered)}
        </Text>
        <Image
          source={typeof image === "string" ? { uri: image } : image}
          style={styles.image}
        />

        <Text style={styles.meta}>{formattedDate}</Text>

        <Text style={styles.content}>
          {decodeHtmlEntities(post.excerpt?.rendered?.replace(/<[^>]+>/g, ""))}
        </Text>

        {related && related.length > 0 && (
          <View style={styles.relatedSection}>
            <Text style={styles.relatedTitle}>مواضيع ذات صلة</Text>
            {related.map((relPost) => (
              <PostCard key={relPost.id} post={relPost} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "right",
    marginBottom: 12,
    color: "#1a1a1a",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  meta: {
    color: "#777",
    fontSize: 12,
    textAlign: "right",
    marginBottom: 16,
  },
  content: {
    fontSize: 15,
    textAlign: "right",
    lineHeight: 24,
    color: "#222",
    marginBottom: 30,
  },
  relatedSection: {
    marginTop: 20,
  },
  relatedTitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "right",
    marginBottom: 12,
    color: "#4BA761",
  },
});
