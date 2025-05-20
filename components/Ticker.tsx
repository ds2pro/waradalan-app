import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

interface Props {
  text: string;
  speed?: number;
}

export default function Ticker({ text, speed = 50 }: Props) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(screenWidth);

  useEffect(() => {
    if (textWidth === 0 || containerWidth === 0) return;

    translateX.setValue(-screenWidth);

    Animated.loop(
      Animated.timing(translateX, {
        toValue: containerWidth + textWidth,
        duration: ((containerWidth + textWidth) / speed) * 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [textWidth, containerWidth]);

  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <Animated.View
        style={{
          transform: [{ translateX }],
          position: "absolute",
          width: textWidth,
          height: 36,
          overflow: "hidden",
          justifyContent: "center",
        }}
      >
        <Text style={styles.text}>{text}</Text>
      </Animated.View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.measurementWrapper}
        onContentSizeChange={(width) => setTextWidth(width)}
      >
        <Text style={styles.text}>{text}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 36,
    overflow: "hidden",
    justifyContent: "center",
    backgroundColor: "#b30000",
  },
  text: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 10,
    writingDirection: "rtl",
    lineHeight: 36,
  },
  measurementWrapper: {
    position: "absolute",
    top: -1000,
    opacity: 0,
    height: 36,
    maxHeight: 36,
  },
});
