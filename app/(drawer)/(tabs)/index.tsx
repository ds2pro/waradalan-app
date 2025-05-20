import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useAppTheme } from "@/lib/context/ThemeContext";
import Colors from "@/constants/Colors";
import { fetchCategories } from "@/lib/api";
import { Category } from "@/lib/types/types";
import Ticker from "@/components/Ticker";

const breakingNewsList = [
  "ترامب: أكن للأمير محمد بن سلمان",
  "زلزال يضرب تركيا بقوة 6.2 درجات",
  "الجيش اللبناني يعلن إحباط عملية تهريب كبرى عبر الحدود",
  "ترامب: أكن للأمير محمد بن سلمان",
  "زلزال يضرب تركيا بقوة 6.2 درجات",
  "الجيش اللبناني يعلن إحباط عملية تهريب كبرى عبر الحدود",
];

const breakingNews = breakingNewsList.join(" • ");

export default function HomeScreen() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        if (categoriesData.length > 0) {
          setSelectedCategory(categoriesData[0]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Breaking News Ticker */}
      <View style={[styles.breakingNewsContainer]}>
        <Text style={[styles.breakingLabel]}>خبر عاجل</Text>
        <View style={styles.tickerWrapper}>
          <Ticker text={breakingNews} speed={40} />
        </View>
      </View>

      {/* Categories Tabs */}
      <View>
        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
          renderItem={({ item }) => (
            <Pressable onPress={() => setSelectedCategory(item)}>
              <Text
                style={[
                  styles.categoryText,
                  {
                    color:
                      selectedCategory === item ? colors.tint : colors.text,
                    borderBottomColor:
                      selectedCategory === item ? colors.tint : "transparent",
                  },
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* Content Area */}
      <View style={styles.contentAreaContainer}>
        <Text style={{ color: colors.text }}>
          محتوى فئة: {selectedCategory?.name}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    direction: "rtl",
  },
  breakingNewsContainer: {
    backgroundColor: "#b30000",
    marginTop: 10,
    flexDirection: "row",
    height: 36,
    alignItems: "center",
    // paddingVertical: 8,
    paddingHorizontal: 12,
  },
  breakingLabel: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
  breakingText: {
    color: "#fff",
    fontSize: 14,
  },
  tickerWrapper: {
    flex: 1,
    overflow: "hidden",
  },
  categoriesContainer: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  categoryText: {
    fontSize: 16,
    marginHorizontal: 10,
    borderBottomWidth: 2,
    paddingBottom: 4,
  },
  contentAreaContainer: {
    padding: 16,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
