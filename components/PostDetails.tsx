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

        <Text style={[styles.meta, { color: colors.tabIconDefault }]}>
          {formattedDate}
        </Text>

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
  meta: {
    fontSize: 12,
    textAlign: "right",
    marginBottom: 16,
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
