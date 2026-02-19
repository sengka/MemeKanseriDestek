import {
  Bell,
  BookOpen,
  Calendar,
  Eye,
  Headphones,
  Heart,
  Home as HomeIcon,
  Info,
  Lock,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Search,
  ShieldCheck,
  Stethoscope,
  TestTube,
  User,
  Users
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const { width } = Dimensions.get("window");

// --- Screens ---

const LoginScreen = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginCard}>
        <View style={styles.center}>
          <View style={styles.iconCircle}>
            <Heart color="#4eb7ac" size={32} fill="#4eb7ac" />
          </View>
          <Text style={styles.title}>Meme Kanseri Destek</Text>
          <Text style={styles.subtitle}>Yolculuğunuzda yanınızdayız.</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Giriş Yap</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-posta</Text>
            <View style={styles.inputWrapper}>
              <Mail color="#94a3b8" size={20} style={styles.inputIcon} />
              <TextInput
                placeholder="ornek@mail.com"
                style={styles.input}
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Şifre</Text>
              <TouchableOpacity>
                <Text style={styles.linkText}>Şifremi Unuttum</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <Lock color="#94a3b8" size={20} style={styles.inputIcon} />
              <TextInput
                placeholder="••••••••"
                style={styles.input}
                secureTextEntry
              />
              <Eye color="#94a3b8" size={20} style={styles.eyeIcon} />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>VEYA</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.center}>
            <Text style={styles.footerText}>
              Hesabınız yok mu? <Text style={styles.boldLink}>Kayıt Ol</Text>
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.quote}>"Birlikte daha güçlüyüz."</Text>
    </View>
  );
};

const HomeScreen = ({ navigate }) => {
  const menuItems = [
    { id: "covid", label: "Covid-19 Bilgilendirme", icon: ShieldCheck },
    { id: "info", label: "Kanser Bilgilendirme", icon: BookOpen },
    { id: "SYMPTOMS", label: "Belirti Yönetimi", icon: Stethoscope },
    { id: "EXPERT", label: "Uzmana Sor", icon: MessageSquare },
    { id: "experience", label: "Hasta Deneyimi", icon: Users },
    { id: "CALENDAR", label: "Belirti Takvimi", icon: Calendar },
    { id: "UPLOAD", label: "Kan Tahlili", icon: TestTube },
    { id: "about", label: "Hakkında", icon: Info },
    { id: "contact", label: "İletişim", icon: Headphones },
    { id: "LOGOUT", label: "Çıkış Yap", icon: LogOut, isLogout: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Menu color="#475569" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meme Kanseri Destek</Text>
        <TouchableOpacity>
          <Search color="#475569" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Merhaba, Hoş Geldiniz</Text>
          <Text style={styles.heroSubtitle}>
            Size nasıl yardımcı olabiliriz?
          </Text>
        </View>

        <View style={styles.grid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.gridItem}
              onPress={() => (item.isLogout ? null : navigate(item.id))}
            >
              <View
                style={[
                  styles.gridIconCircle,
                  item.isLogout && { backgroundColor: "#f1f5f9" },
                ]}
              >
                <item.icon
                  color={item.isLogout ? "#64748b" : "#4eb7ac"}
                  size={24}
                />
              </View>
              <Text style={styles.gridLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <HomeIcon color="#4eb7ac" size={24} />
          <Text style={[styles.navText, { color: "#4eb7ac" }]}>Ana Sayfa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <User color="#94a3b8" size={24} />
          <Text style={styles.navText}>Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Bell color="#94a3b8" size={24} />
          <Text style={styles.navText}>Bildirimler</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// --- Main App Entry ---

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("LOGIN");

  const navigate = (screen) => setCurrentScreen(screen);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      {currentScreen === "LOGIN" && (
        <LoginScreen onLogin={() => navigate("HOME")} />
      )}
      {currentScreen === "HOME" && <HomeScreen navigate={navigate} />}
      {/* Diğer ekranlar benzer mantıkla buraya eklenebilir */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f7f7" },
  center: { alignItems: "center" },
  loginContainer: {
    flex: 1,
    backgroundColor: "#f6f7f7",
    justifyContent: "center",
    padding: 20,
  },
  loginCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  iconCircle: {
    width: 64,
    height: 64,
    backgroundColor: "#4eb7ac1a",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 8,
  },
  subtitle: { fontSize: 14, color: "#64748b", fontWeight: "500" },
  form: { marginTop: 32 },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 24,
  },
  inputGroup: { marginBottom: 20 },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: { fontSize: 14, fontWeight: "600", color: "#334155", marginLeft: 4 },
  linkText: { fontSize: 12, color: "#4eb7ac", fontWeight: "600" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 50, color: "#0f172a" },
  eyeIcon: { marginLeft: 10 },
  primaryButton: {
    backgroundColor: "#4eb7ac",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#4eb7ac",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  divider: { flex: 1, height: 1, backgroundColor: "#f1f5f9" },
  dividerText: {
    marginHorizontal: 16,
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "bold",
  },
  footerText: { color: "#64748b", fontSize: 14 },
  boldLink: { color: "#4eb7ac", fontWeight: "bold" },
  quote: {
    textAlign: "center",
    marginTop: 32,
    color: "#94a3b8",
    fontStyle: "italic",
    fontSize: 12,
  },

  header: {
    height: 64,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#0f172a" },
  scrollContent: { padding: 16 },
  heroCard: {
    backgroundColor: "#4eb7ac",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  heroTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  heroSubtitle: { color: "rgba(255,255,255,0.8)", fontSize: 14 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: (width - 48) / 2,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  gridIconCircle: {
    width: 48,
    height: 48,
    backgroundColor: "#4eb7ac1a",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  gridLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1e293b",
    textAlign: "center",
  },
  bottomNav: {
    height: 80,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 20,
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 10, fontWeight: "bold", color: "#94a3b8", marginTop: 4 },
});
