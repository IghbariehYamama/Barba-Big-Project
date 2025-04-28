import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, icons, images } from "../constants";
import SocialButtonV2 from "../components/SocialButtonV2";

const Welcome = ({ navigation }) => {
  return (
      <SafeAreaView style={styles.area}>
        <View style={styles.container}>
          {/* Change the default logo */}
          <Image source={images.logo} resizeMode="contain" style={styles.logo} />
          <Text style={styles.title}>Welcome!</Text>
          <Text style={[styles.subtitle, { color: "black" }]}>
            Discover and book salons from around the country.
          </Text>

          <View style={{ marginVertical: 32 }}>
            <SocialButtonV2
                title="Continue with Apple"
                icon={icons.appleLogo}
                onPress={() => navigation.navigate("Signup")}
                iconStyles={{ tintColor: COLORS.black }}
            />
            <SocialButtonV2
                title="Continue with Google"
                icon={icons.google}
                onPress={() => navigation.navigate("Signup")}
            />
            <SocialButtonV2
                title="Continue with Email"
                icon={icons.email2}
                onPress={() => navigation.navigate("Signup")}
            />
          </View>

          {/* Signup & Signin Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.signupButton}
                onPress={() => navigation.navigate("SignUpPhoneNumber")}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.signinButton}
                onPress={() => navigation.navigate("LoginPhoneNumber")}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.bottomTitle}>
            By continuing, you accept the Terms of Use and
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
            <Text style={styles.bottomSubtitle}>Privacy Policy.</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 72,
    height: 72,
    marginBottom: 22,
    tintColor: COLORS.primary,
  },
  title: {
    fontSize: 28,
    fontFamily: "bold",
    color: COLORS.black,
    marginVertical: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "regular",
    color: "black",
    textAlign: "center",
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
  signupButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  signinButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.white,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  bottomTitle: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.black,
  },
  bottomSubtitle: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.black,
    textDecorationLine: "underline",
    marginTop: 2,
  },
});

export default Welcome;
