import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useAppTheme } from "@/lib/context/ThemeContext";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacyPolicy() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const router = useRouter();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            سياسة الخصوصية
          </Text>
        </View>

        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {privacyContent.map((paragraph, index) => (
          <Text
            key={index}
            style={[styles.description, { color: colors.text }]}
          >
            {paragraph}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const privacyContent = [
  "عنوان موقعنا هو: https://waradalan.com",
  "عندما يترك الزوار تعليقات على الموقع ، نقوم بجمع البيانات الموضحة في نموذج التعليقات ، وكذلك عنوان بروتوكول الإنترنت الخاص بالزائر وسلسلة وكيل مستخدم المتصفح للمساعدة في اكتشاف البريد العشوائي.",
  "قد يتم توفير سلسلة مجهولة المصدر تم إنشاؤها من عنوان البريد الإلكتروني الخاص بك (وتسمى أيضا تجزئة) لخدمة غرفتر لمعرفة ما إذا كنت تستخدم ذلك. سياسة خصوصية خدمة غرفتر متاحة هنا: https://automattic.com/privacy/. بعد الموافقة على تعليقك ، تكون صورة ملفك الشخصي مرئية للجمهور في سياق تعليقك.",
  "إذا قمت بتحميل الصور إلى الموقع ، يجب تجنب تحميل الصور مع بيانات الموقع المضمنة (كسيف غس) المدرجة. يمكن لزوار الموقع تنزيل واستخراج أي بيانات موقع من الصور الموجودة على الموقع.",
  "إذا تركت تعليقا على موقعنا ، فيمكنك الاشتراك في حفظ اسمك وعنوان بريدك الإلكتروني وموقعك الإلكتروني في ملفات تعريف الارتباط. هذه هي لراحتك بحيث لم يكن لديك لملء التفاصيل الخاصة بك مرة أخرى عند ترك تعليق آخر. ستستمر ملفات تعريف الارتباط هذه لمدة عام واحد.",
  "إذا قمت بزيارة صفحة تسجيل الدخول الخاصة بنا ، فسنقوم بتعيين ملف تعريف ارتباط مؤقت لتحديد ما إذا كان متصفحك يقبل ملفات تعريف الارتباط. لا يحتوي ملف تعريف الارتباط هذا على بيانات شخصية ويتم التخلص منه عند إغلاق المتصفح.",
  "عند تسجيل الدخول ، سنقوم أيضا بإعداد العديد من ملفات تعريف الارتباط لحفظ معلومات تسجيل الدخول وخيارات عرض الشاشة. تستمر ملفات تعريف ارتباط تسجيل الدخول لمدة يومين ، وتستمر ملفات تعريف ارتباط خيارات الشاشة لمدة عام. إذا قمت بتحديد “تذكرني” ، فسيستمر تسجيل الدخول الخاص بك لمدة أسبوعين. إذا قمت بتسجيل الخروج من حسابك ، فستتم إزالة ملفات تعريف ارتباط تسجيل الدخول.",
  "إذا قمت بتحرير مقال أو نشره ، فسيتم حفظ ملف تعريف ارتباط إضافي في متصفحك. لا يتضمن ملف تعريف الارتباط هذا أي بيانات شخصية ويشير ببساطة إلى معرف المنشور للمقال الذي قمت بتحريره للتو. تنتهي صلاحيتها بعد 1 يوم.",
  "قد تتضمن المقالات الموجودة على هذا الموقع محتوى مضمنا (مثل مقاطع الفيديو والصور والمقالات وما إلى ذلك.). يتصرف المحتوى المضمن من مواقع الويب الأخرى بنفس الطريقة تماما كما لو كان الزائر قد زار موقع الويب الآخر.",
  "قد تقوم مواقع الويب هذه بجمع بيانات عنك ، واستخدام ملفات تعريف الارتباط ، وتضمين تتبع إضافي لجهة خارجية ، ومراقبة تفاعلك مع هذا المحتوى المضمن ، بما في ذلك تتبع تفاعلك مع المحتوى المضمن إذا كان لديك حساب وقمت بتسجيل الدخول إلى هذا الموقع.",
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  logo: {
    width: 160,
    height: 140,
    alignSelf: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "right",
    marginBottom: 16,
    lineHeight: 26,
  },
});
