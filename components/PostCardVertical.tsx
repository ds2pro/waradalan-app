import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { WordPressPost } from "@/lib/types/types";
import { decodeHtmlEntities } from "@/lib/utils/decodeHtml";
import { useRouter } from "expo-router";
import { useAppTheme } from "@/lib/context/ThemeContext";
import Colors from "@/constants/Colors";

export default function PostCardVertical({
  post,
  replace = false,
}: {
  post: WordPressPost;
  replace?: boolean;
}) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
  const image =
    featuredMedia?.media_details?.sizes?.medium?.source_url ||
    featuredMedia?.source_url ||
    Image.resolveAssetSource(require("@/assets/images/logo.png")).uri;

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
      style={[styles.card, { backgroundColor: colors.card }]}
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
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : null}

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {decodeHtmlEntities(post.title.rendered)}
        </Text>
        <Text
          style={[styles.excerpt, { color: colors.text }]}
          numberOfLines={2}
        >
          {decodeHtmlEntities(excerpt)}
        </Text>

        <View style={styles.footer}>
          <Text style={[styles.date, { color: "#666" }]}>{formattedDate}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "left",
    writingDirection: "rtl",
    marginBottom: 6,
  },
  excerpt: {
    fontSize: 14,
    textAlign: "left",
    writingDirection: "rtl",
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
  },
  date: {
    fontSize: 13,
    textAlign: "right",
  },
});
