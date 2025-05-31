import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { WordPressPost } from "@/lib/types/types";
import { decodeHtmlEntities } from "@/lib/utils/decodeHtml";
import PostCard from "./PostCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@/lib/context/ThemeContext";
import Colors from "@/constants/Colors";

export default function PostDetails({
  post,
  related,
}: {
  post: WordPressPost;
  related?: WordPressPost[];
}) {
  const author = post._embedded?.author?.[0]?.name;

  const image =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    require("@/assets/images/logo.png");

  const formattedDate = new Date(post.date).toLocaleString("ar-LB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.background },
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>
          {decodeHtmlEntities(post.title.rendered)}
        </Text>

        <Image
          source={typeof image === "string" ? { uri: image } : image}
          style={styles.image}
        />

        <View style={styles.metaWrapper}>
          <Text style={[styles.date, { color: "#888" }]}>{formattedDate}</Text>
          {author && (
            <Text style={[styles.author, { color: "#888" }]}>
              الكاتب: {author}
            </Text>
          )}
        </View>

        <Text style={[styles.content, { color: colors.text }]}>
          {decodeHtmlEntities(post.content?.rendered?.replace(/<[^>]+>/g, ""))}
        </Text>

        {related && related.length > 0 && (
          <View style={styles.relatedSection}>
            <Text style={[styles.relatedTitle, { color: colors.tint }]}>
              مواضيع ذات صلة
            </Text>
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
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "right",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  metaWrapper: {
    alignItems: "flex-start",
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    textAlign: "right",
    marginTop: 6,
  },
  author: {
    fontSize: 12,
    textAlign: "right",
    marginTop: 4,
  },
  content: {
    fontSize: 15,
    textAlign: "right",
    lineHeight: 24,
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
  },
});
