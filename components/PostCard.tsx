import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { WordPressPost } from "@/lib/types/types";
import { decodeHtmlEntities } from "@/lib/utils/decodeHtml";
import { useRouter } from "expo-router";
import { useAppTheme } from "@/lib/context/ThemeContext";
import Colors from "@/constants/Colors";

export default function PostCard({
  post,
  replace = false,
}: {
  post: WordPressPost;
  replace?: boolean;
}) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  const image =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    require("@/assets/images/logo.png");

  const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name;
  const author = post._embedded?.author?.[0]?.name;
  const excerpt = post.excerpt?.rendered?.replace(/<[^>]+>/g, "");
  const formattedDate = new Date(post.date).toLocaleString("ar-LB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <Pressable
      style={[styles.card, { backgroundColor: colors.background }]}
      onPress={() =>
        replace
          ? router.replace({
              pathname: "/post/[id]",
              params: { id: post.id.toString() },
            })
          : router.push({
              pathname: "/post/[id]",
              params: { id: post.id.toString() },
            })
      }
    >
      {/* Image */}
      {typeof image === "string" ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Image source={image} style={styles.image} />
      )}

      <View style={styles.content}>
        <Text style={[styles.category, { color: colors.tint }]}>
          {category}
        </Text>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {decodeHtmlEntities(post.title.rendered)}
        </Text>
        <Text
          style={[styles.excerpt, { color: colors.text }]}
          numberOfLines={2}
        >
          {decodeHtmlEntities(excerpt)}
        </Text>
        <Text style={[styles.date, { color: "#888" }]}>{formattedDate}</Text>
        {author && (
          <Text style={[styles.author, { color: "#888" }]}>
            الكاتب: {author}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row-reverse",
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginLeft: 10,
  },
  content: {
    flex: 1,
  },
  category: {
    fontSize: 12,
    textAlign: "right",
    marginBottom: 4,
    fontWeight: "500",
  },
  title: {
    fontSize: 14,
    textAlign: "right",
    fontWeight: "600",
  },
  excerpt: {
    fontSize: 13,
    textAlign: "right",
    marginTop: 4,
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
});
