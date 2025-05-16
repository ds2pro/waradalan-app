import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { WordPressPost } from "@/lib/types/types";
import { decodeHtmlEntities } from "@/lib/utils/decodeHtml";
import { useRouter } from "expo-router";

export default function PostCard({
  post,
  replace = false,
}: {
  post: WordPressPost;
  replace?: boolean;
}) {
  const router = useRouter();

  const image =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    require("@/assets/images/logo.png");
  const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name;
  const excerpt = post.excerpt?.rendered?.replace(/<[^>]+>/g, "");
  const formattedDate = new Date(post.date).toLocaleString("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <Pressable
      style={styles.card}
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
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {decodeHtmlEntities(post.title.rendered)}
        </Text>
        <Text style={styles.excerpt} numberOfLines={2}>
          {decodeHtmlEntities(excerpt)}
        </Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row-reverse",
    backgroundColor: "#fff",
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
    color: "#01A0C0",
    fontSize: 12,
    textAlign: "right",
    marginBottom: 4,
    fontWeight: "500",
  },
  title: {
    color: "#111",
    fontSize: 14,
    textAlign: "right",
    fontWeight: "600",
  },
  excerpt: {
    color: "#555",
    fontSize: 13,
    textAlign: "right",
    marginTop: 4,
  },
  date: {
    color: "#888",
    fontSize: 12,
    textAlign: "right",
    marginTop: 6,
  },
});
