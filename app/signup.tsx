import React, { useEffect, useState } from "react";
import { StyleSheet, Keyboard } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";
import { ThemedTextInput as TextInput } from "@/components/ThemedTextInput";
import { ThemedButton as Button } from "@/components/ThemedButton";
import CountryFlag from "react-native-country-flag";
import { useLanguage } from "@/context/LanguageContext";

export default function SignUpPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationalityOpen, setNationalityOpen] = useState(false);
  const [nationality, setNationality] = useState("Jordan");
  const { language, toggleLanguage } = useLanguage();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleSignUp = () => {
    // Handle sign up logic
    console.log("User Name:", userName);
    console.log("password:", password);
    console.log("Phone Number:", phoneNumber);
    console.log("Selected Nationality:", nationality);
    if (userName && phoneNumber && nationality) {
      alert("we will send you a message to varify ");
    } else {
      alert(
        language === "en" ? "please fill the fields" : "الرجاء مليء الحقول"
      );
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    // Clean up listeners on component unmount
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {language === "en" ? "Create New Account" : "إنشاء حساب جديد"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder={language === "en" ? "Enter Name" : "أدخل الاسم"}
        value={userName}
        onChangeText={setUserName}
      />

      <TextInput
        style={styles.input}
        placeholder={
          language === "en" ? "Enter Phone Number" : "أدخل رقم الهاتف"
        }
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TextInput
        style={styles.input}
        placeholder={language === "en" ? "Enter Password" : "أدخل كلمة السر"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      {!isKeyboardVisible && (
        <>
          <Text>{language === "en" ? "Nationality" : "الجنسية"}</Text>
          <DropDownPicker
            open={nationalityOpen}
            value={nationality}
            items={countries}
            setOpen={setNationalityOpen}
            setValue={setNationality}
            placeholder={
              language === "en" ? "Select your nationality" : "اختر جنسيتك"
            }
            containerStyle={{ height: 40 }}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </>
      )}

      <Button
        title={language === "en" ? "Next" : "التالي"}
        onPress={handleSignUp}
        style={{ marginVertical: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  dropdown: {
    borderColor: "#ccc",
  },
  dropdownContainer: {},
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: 10, // Adjust space between icon and text
  },
});

const countries = [
  {
    label: "Afghanistan",
    value: "AF",
    icon: () => <CountryFlag isoCode="af" size={25} />,
  },
  {
    label: "Albania",
    value: "AL",
    icon: () => <CountryFlag isoCode="al" size={25} />,
  },
  {
    label: "Algeria",
    value: "DZ",
    icon: () => <CountryFlag isoCode="dz" size={25} />,
  },
  {
    label: "Andorra",
    value: "AD",
    icon: () => <CountryFlag isoCode="ad" size={25} />,
  },
  {
    label: "Angola",
    value: "AO",
    icon: () => <CountryFlag isoCode="ao" size={25} />,
  },
  {
    label: "Antigua and Barbuda",
    value: "AG",
    icon: () => <CountryFlag isoCode="ag" size={25} />,
  },
  {
    label: "Argentina",
    value: "AR",
    icon: () => <CountryFlag isoCode="ar" size={25} />,
  },
  {
    label: "Armenia",
    value: "AM",
    icon: () => <CountryFlag isoCode="am" size={25} />,
  },
  {
    label: "Australia",
    value: "AU",
    icon: () => <CountryFlag isoCode="au" size={25} />,
  },
  {
    label: "Austria",
    value: "AT",
    icon: () => <CountryFlag isoCode="at" size={25} />,
  },
  {
    label: "Azerbaijan",
    value: "AZ",
    icon: () => <CountryFlag isoCode="az" size={25} />,
  },
  {
    label: "Bahamas",
    value: "BS",
    icon: () => <CountryFlag isoCode="bs" size={25} />,
  },
  {
    label: "Bahrain",
    value: "BH",
    icon: () => <CountryFlag isoCode="bh" size={25} />,
  },
  {
    label: "Bangladesh",
    value: "BD",
    icon: () => <CountryFlag isoCode="bd" size={25} />,
  },
  {
    label: "Barbados",
    value: "BB",
    icon: () => <CountryFlag isoCode="bb" size={25} />,
  },
  {
    label: "Belarus",
    value: "BY",
    icon: () => <CountryFlag isoCode="by" size={25} />,
  },
  {
    label: "Belgium",
    value: "BE",
    icon: () => <CountryFlag isoCode="be" size={25} />,
  },
  {
    label: "Belize",
    value: "BZ",
    icon: () => <CountryFlag isoCode="bz" size={25} />,
  },
  {
    label: "Benin",
    value: "BJ",
    icon: () => <CountryFlag isoCode="bj" size={25} />,
  },
  {
    label: "Bhutan",
    value: "BT",
    icon: () => <CountryFlag isoCode="bt" size={25} />,
  },
  {
    label: "Bolivia",
    value: "BO",
    icon: () => <CountryFlag isoCode="bo" size={25} />,
  },
  {
    label: "Bosnia and Herzegovina",
    value: "BA",
    icon: () => <CountryFlag isoCode="ba" size={25} />,
  },
  {
    label: "Botswana",
    value: "BW",
    icon: () => <CountryFlag isoCode="bw" size={25} />,
  },
  {
    label: "Brazil",
    value: "BR",
    icon: () => <CountryFlag isoCode="br" size={25} />,
  },
  {
    label: "Brunei",
    value: "BN",
    icon: () => <CountryFlag isoCode="bn" size={25} />,
  },
  {
    label: "Bulgaria",
    value: "BG",
    icon: () => <CountryFlag isoCode="bg" size={25} />,
  },
  {
    label: "Burkina Faso",
    value: "BF",
    icon: () => <CountryFlag isoCode="bf" size={25} />,
  },
  {
    label: "Burundi",
    value: "BI",
    icon: () => <CountryFlag isoCode="bi" size={25} />,
  },
  {
    label: "Cabo Verde",
    value: "CV",
    icon: () => <CountryFlag isoCode="cv" size={25} />,
  },
  {
    label: "Cambodia",
    value: "KH",
    icon: () => <CountryFlag isoCode="kh" size={25} />,
  },
  {
    label: "Cameroon",
    value: "CM",
    icon: () => <CountryFlag isoCode="cm" size={25} />,
  },
  {
    label: "Canada",
    value: "CA",
    icon: () => <CountryFlag isoCode="ca" size={25} />,
  },
  {
    label: "Central African Republic",
    value: "CF",
    icon: () => <CountryFlag isoCode="cf" size={25} />,
  },
  {
    label: "Chad",
    value: "TD",
    icon: () => <CountryFlag isoCode="td" size={25} />,
  },
  {
    label: "Chile",
    value: "CL",
    icon: () => <CountryFlag isoCode="cl" size={25} />,
  },
  {
    label: "China",
    value: "CN",
    icon: () => <CountryFlag isoCode="cn" size={25} />,
  },
  {
    label: "Colombia",
    value: "CO",
    icon: () => <CountryFlag isoCode="co" size={25} />,
  },
  {
    label: "Comoros",
    value: "KM",
    icon: () => <CountryFlag isoCode="km" size={25} />,
  },
  {
    label: "Congo (Congo-Brazzaville)",
    value: "CG",
    icon: () => <CountryFlag isoCode="cg" size={25} />,
  },
  {
    label: "Congo, Democratic Republic of the",
    value: "CD",
    icon: () => <CountryFlag isoCode="cd" size={25} />,
  },
  {
    label: "Costa Rica",
    value: "CR",
    icon: () => <CountryFlag isoCode="cr" size={25} />,
  },
  {
    label: "Croatia",
    value: "HR",
    icon: () => <CountryFlag isoCode="hr" size={25} />,
  },
  {
    label: "Cuba",
    value: "CU",
    icon: () => <CountryFlag isoCode="cu" size={25} />,
  },
  {
    label: "Cyprus",
    value: "CY",
    icon: () => <CountryFlag isoCode="cy" size={25} />,
  },
  {
    label: "Czech Republic",
    value: "CZ",
    icon: () => <CountryFlag isoCode="cz" size={25} />,
  },
  {
    label: "Denmark",
    value: "DK",
    icon: () => <CountryFlag isoCode="dk" size={25} />,
  },
  {
    label: "Djibouti",
    value: "DJ",
    icon: () => <CountryFlag isoCode="dj" size={25} />,
  },
  {
    label: "Dominica",
    value: "DM",
    icon: () => <CountryFlag isoCode="dm" size={25} />,
  },
  {
    label: "Dominican Republic",
    value: "DO",
    icon: () => <CountryFlag isoCode="do" size={25} />,
  },
  {
    label: "Ecuador",
    value: "EC",
    icon: () => <CountryFlag isoCode="ec" size={25} />,
  },
  {
    label: "Egypt",
    value: "EG",
    icon: () => <CountryFlag isoCode="eg" size={25} />,
  },
  {
    label: "El Salvador",
    value: "SV",
    icon: () => <CountryFlag isoCode="sv" size={25} />,
  },
  {
    label: "Equatorial Guinea",
    value: "GQ",
    icon: () => <CountryFlag isoCode="gq" size={25} />,
  },
  {
    label: "Eritrea",
    value: "ER",
    icon: () => <CountryFlag isoCode="er" size={25} />,
  },
  {
    label: "Estonia",
    value: "EE",
    icon: () => <CountryFlag isoCode="ee" size={25} />,
  },
  {
    label: "Eswatini",
    value: "SZ",
    icon: () => <CountryFlag isoCode="sz" size={25} />,
  },
  {
    label: "Ethiopia",
    value: "ET",
    icon: () => <CountryFlag isoCode="et" size={25} />,
  },
  {
    label: "Fiji",
    value: "FJ",
    icon: () => <CountryFlag isoCode="fj" size={25} />,
  },
  {
    label: "Finland",
    value: "FI",
    icon: () => <CountryFlag isoCode="fi" size={25} />,
  },
  {
    label: "France",
    value: "FR",
    icon: () => <CountryFlag isoCode="fr" size={25} />,
  },
  {
    label: "Gabon",
    value: "GA",
    icon: () => <CountryFlag isoCode="ga" size={25} />,
  },
  {
    label: "Gambia",
    value: "GM",
    icon: () => <CountryFlag isoCode="gm" size={25} />,
  },
  {
    label: "Georgia",
    value: "GE",
    icon: () => <CountryFlag isoCode="ge" size={25} />,
  },
  {
    label: "Germany",
    value: "DE",
    icon: () => <CountryFlag isoCode="de" size={25} />,
  },
  {
    label: "Ghana",
    value: "GH",
    icon: () => <CountryFlag isoCode="gh" size={25} />,
  },
  {
    label: "Greece",
    value: "GR",
    icon: () => <CountryFlag isoCode="gr" size={25} />,
  },
  {
    label: "Grenada",
    value: "GD",
    icon: () => <CountryFlag isoCode="gd" size={25} />,
  },
  {
    label: "Guatemala",
    value: "GT",
    icon: () => <CountryFlag isoCode="gt" size={25} />,
  },
  {
    label: "Guinea",
    value: "GN",
    icon: () => <CountryFlag isoCode="gn" size={25} />,
  },
  {
    label: "Guinea-Bissau",
    value: "GW",
    icon: () => <CountryFlag isoCode="gw" size={25} />,
  },
  {
    label: "Guyana",
    value: "GY",
    icon: () => <CountryFlag isoCode="gy" size={25} />,
  },
  {
    label: "Haiti",
    value: "HT",
    icon: () => <CountryFlag isoCode="ht" size={25} />,
  },
  {
    label: "Honduras",
    value: "HN",
    icon: () => <CountryFlag isoCode="hn" size={25} />,
  },
  {
    label: "Hungary",
    value: "HU",
    icon: () => <CountryFlag isoCode="hu" size={25} />,
  },
  {
    label: "Iceland",
    value: "IS",
    icon: () => <CountryFlag isoCode="is" size={25} />,
  },
  {
    label: "India",
    value: "IN",
    icon: () => <CountryFlag isoCode="in" size={25} />,
  },
  {
    label: "Indonesia",
    value: "ID",
    icon: () => <CountryFlag isoCode="id" size={25} />,
  },
  {
    label: "Iran",
    value: "IR",
    icon: () => <CountryFlag isoCode="ir" size={25} />,
  },
  {
    label: "Iraq",
    value: "IQ",
    icon: () => <CountryFlag isoCode="iq" size={25} />,
  },
  {
    label: "Ireland",
    value: "IE",
    icon: () => <CountryFlag isoCode="ie" size={25} />,
  },
  {
    label: "Italy",
    value: "IT",
    icon: () => <CountryFlag isoCode="it" size={25} />,
  },
  {
    label: "Jamaica",
    value: "JM",
    icon: () => <CountryFlag isoCode="jm" size={25} />,
  },
  {
    label: "Japan",
    value: "JP",
    icon: () => <CountryFlag isoCode="jp" size={25} />,
  },
  {
    label: "Jordan",
    value: "JO",
    icon: () => <CountryFlag isoCode="jo" size={25} />,
  },
  {
    label: "Kazakhstan",
    value: "KZ",
    icon: () => <CountryFlag isoCode="kz" size={25} />,
  },
  {
    label: "Kenya",
    value: "KE",
    icon: () => <CountryFlag isoCode="ke" size={25} />,
  },
  {
    label: "Kiribati",
    value: "KI",
    icon: () => <CountryFlag isoCode="ki" size={25} />,
  },
  {
    label: "Kuwait",
    value: "KW",
    icon: () => <CountryFlag isoCode="kw" size={25} />,
  },
  {
    label: "Kyrgyzstan",
    value: "KG",
    icon: () => <CountryFlag isoCode="kg" size={25} />,
  },
  {
    label: "Laos",
    value: "LA",
    icon: () => <CountryFlag isoCode="la" size={25} />,
  },
  {
    label: "Latvia",
    value: "LV",
    icon: () => <CountryFlag isoCode="lv" size={25} />,
  },
  {
    label: "Lebanon",
    value: "LB",
    icon: () => <CountryFlag isoCode="lb" size={25} />,
  },
  {
    label: "Lesotho",
    value: "LS",
    icon: () => <CountryFlag isoCode="ls" size={25} />,
  },
  {
    label: "Liberia",
    value: "LR",
    icon: () => <CountryFlag isoCode="lr" size={25} />,
  },
  {
    label: "Libya",
    value: "LY",
    icon: () => <CountryFlag isoCode="ly" size={25} />,
  },
  {
    label: "Liechtenstein",
    value: "LI",
    icon: () => <CountryFlag isoCode="li" size={25} />,
  },
  {
    label: "Lithuania",
    value: "LT",
    icon: () => <CountryFlag isoCode="lt" size={25} />,
  },
  {
    label: "Luxembourg",
    value: "LU",
    icon: () => <CountryFlag isoCode="lu" size={25} />,
  },
  {
    label: "Madagascar",
    value: "MG",
    icon: () => <CountryFlag isoCode="mg" size={25} />,
  },
  {
    label: "Malawi",
    value: "MW",
    icon: () => <CountryFlag isoCode="mw" size={25} />,
  },
  {
    label: "Malaysia",
    value: "MY",
    icon: () => <CountryFlag isoCode="my" size={25} />,
  },
  {
    label: "Maldives",
    value: "MV",
    icon: () => <CountryFlag isoCode="mv" size={25} />,
  },
  {
    label: "Mali",
    value: "ML",
    icon: () => <CountryFlag isoCode="ml" size={25} />,
  },
  {
    label: "Malta",
    value: "MT",
    icon: () => <CountryFlag isoCode="mt" size={25} />,
  },
  {
    label: "Marshall Islands",
    value: "MH",
    icon: () => <CountryFlag isoCode="mh" size={25} />,
  },
  {
    label: "Mauritania",
    value: "MR",
    icon: () => <CountryFlag isoCode="mr" size={25} />,
  },
  {
    label: "Mauritius",
    value: "MU",
    icon: () => <CountryFlag isoCode="mu" size={25} />,
  },
  {
    label: "Mexico",
    value: "MX",
    icon: () => <CountryFlag isoCode="mx" size={25} />,
  },
  {
    label: "Micronesia",
    value: "FM",
    icon: () => <CountryFlag isoCode="fm" size={25} />,
  },
  {
    label: "Moldova",
    value: "MD",
    icon: () => <CountryFlag isoCode="md" size={25} />,
  },
  {
    label: "Monaco",
    value: "MC",
    icon: () => <CountryFlag isoCode="mc" size={25} />,
  },
  {
    label: "Mongolia",
    value: "MN",
    icon: () => <CountryFlag isoCode="mn" size={25} />,
  },
  {
    label: "Montenegro",
    value: "ME",
    icon: () => <CountryFlag isoCode="me" size={25} />,
  },
  {
    label: "Morocco",
    value: "MA",
    icon: () => <CountryFlag isoCode="ma" size={25} />,
  },
  {
    label: "Mozambique",
    value: "MZ",
    icon: () => <CountryFlag isoCode="mz" size={25} />,
  },
  {
    label: "Myanmar (formerly Burma)",
    value: "MM",
    icon: () => <CountryFlag isoCode="mm" size={25} />,
  },
  {
    label: "Namibia",
    value: "NA",
    icon: () => <CountryFlag isoCode="na" size={25} />,
  },
  {
    label: "Nauru",
    value: "NR",
    icon: () => <CountryFlag isoCode="nr" size={25} />,
  },
  {
    label: "Nepal",
    value: "NP",
    icon: () => <CountryFlag isoCode="np" size={25} />,
  },
  {
    label: "Netherlands",
    value: "NL",
    icon: () => <CountryFlag isoCode="nl" size={25} />,
  },
  {
    label: "New Zealand",
    value: "NZ",
    icon: () => <CountryFlag isoCode="nz" size={25} />,
  },
  {
    label: "Nicaragua",
    value: "NI",
    icon: () => <CountryFlag isoCode="ni" size={25} />,
  },
  {
    label: "Niger",
    value: "NE",
    icon: () => <CountryFlag isoCode="ne" size={25} />,
  },
  {
    label: "Nigeria",
    value: "NG",
    icon: () => <CountryFlag isoCode="ng" size={25} />,
  },
  {
    label: "North Korea",
    value: "KP",
    icon: () => <CountryFlag isoCode="kp" size={25} />,
  },
  {
    label: "North Macedonia",
    value: "MK",
    icon: () => <CountryFlag isoCode="mk" size={25} />,
  },
  {
    label: "Norway",
    value: "NO",
    icon: () => <CountryFlag isoCode="no" size={25} />,
  },
  {
    label: "Oman",
    value: "OM",
    icon: () => <CountryFlag isoCode="om" size={25} />,
  },
  {
    label: "Pakistan",
    value: "PK",
    icon: () => <CountryFlag isoCode="pk" size={25} />,
  },
  {
    label: "Palau",
    value: "PW",
    icon: () => <CountryFlag isoCode="pw" size={25} />,
  },
  {
    label: "Palestine State",
    value: "PS",
    icon: () => <CountryFlag isoCode="ps" size={25} />,
  },
  {
    label: "Panama",
    value: "PA",
    icon: () => <CountryFlag isoCode="pa" size={25} />,
  },
  {
    label: "Papua New Guinea",
    value: "PG",
    icon: () => <CountryFlag isoCode="pg" size={25} />,
  },
  {
    label: "Paraguay",
    value: "PY",
    icon: () => <CountryFlag isoCode="py" size={25} />,
  },
  {
    label: "Peru",
    value: "PE",
    icon: () => <CountryFlag isoCode="pe" size={25} />,
  },
  {
    label: "Philippines",
    value: "PH",
    icon: () => <CountryFlag isoCode="ph" size={25} />,
  },
  {
    label: "Poland",
    value: "PL",
    icon: () => <CountryFlag isoCode="pl" size={25} />,
  },
  {
    label: "Portugal",
    value: "PT",
    icon: () => <CountryFlag isoCode="pt" size={25} />,
  },
  {
    label: "Qatar",
    value: "QA",
    icon: () => <CountryFlag isoCode="qa" size={25} />,
  },
  {
    label: "Romania",
    value: "RO",
    icon: () => <CountryFlag isoCode="ro" size={25} />,
  },
  {
    label: "Russia",
    value: "RU",
    icon: () => <CountryFlag isoCode="ru" size={25} />,
  },
  {
    label: "Rwanda",
    value: "RW",
    icon: () => <CountryFlag isoCode="rw" size={25} />,
  },
  {
    label: "Saint Kitts and Nevis",
    value: "KN",
    icon: () => <CountryFlag isoCode="kn" size={25} />,
  },
  {
    label: "Saint Lucia",
    value: "LC",
    icon: () => <CountryFlag isoCode="lc" size={25} />,
  },
  {
    label: "Saint Vincent and the Grenadines",
    value: "VC",
    icon: () => <CountryFlag isoCode="vc" size={25} />,
  },
  {
    label: "Samoa",
    value: "WS",
    icon: () => <CountryFlag isoCode="ws" size={25} />,
  },
  {
    label: "San Marino",
    value: "SM",
    icon: () => <CountryFlag isoCode="sm" size={25} />,
  },
  {
    label: "Sao Tome and Principe",
    value: "ST",
    icon: () => <CountryFlag isoCode="st" size={25} />,
  },
  {
    label: "Saudi Arabia",
    value: "SA",
    icon: () => <CountryFlag isoCode="sa" size={25} />,
  },
  {
    label: "Senegal",
    value: "SN",
    icon: () => <CountryFlag isoCode="sn" size={25} />,
  },
  {
    label: "Serbia",
    value: "RS",
    icon: () => <CountryFlag isoCode="rs" size={25} />,
  },
  {
    label: "Seychelles",
    value: "SC",
    icon: () => <CountryFlag isoCode="sc" size={25} />,
  },
  {
    label: "Sierra Leone",
    value: "SL",
    icon: () => <CountryFlag isoCode="sl" size={25} />,
  },
  {
    label: "Singapore",
    value: "SG",
    icon: () => <CountryFlag isoCode="sg" size={25} />,
  },
  {
    label: "Slovakia",
    value: "SK",
    icon: () => <CountryFlag isoCode="sk" size={25} />,
  },
  {
    label: "Slovenia",
    value: "SI",
    icon: () => <CountryFlag isoCode="si" size={25} />,
  },
  {
    label: "Solomon Islands",
    value: "SB",
    icon: () => <CountryFlag isoCode="sb" size={25} />,
  },
  {
    label: "Somalia",
    value: "SO",
    icon: () => <CountryFlag isoCode="so" size={25} />,
  },
  {
    label: "South Africa",
    value: "ZA",
    icon: () => <CountryFlag isoCode="za" size={25} />,
  },
  {
    label: "South Korea",
    value: "KR",
    icon: () => <CountryFlag isoCode="kr" size={25} />,
  },
  {
    label: "South Sudan",
    value: "SS",
    icon: () => <CountryFlag isoCode="ss" size={25} />,
  },
  {
    label: "Spain",
    value: "ES",
    icon: () => <CountryFlag isoCode="es" size={25} />,
  },
  {
    label: "Sri Lanka",
    value: "LK",
    icon: () => <CountryFlag isoCode="lk" size={25} />,
  },
  {
    label: "Sudan",
    value: "SD",
    icon: () => <CountryFlag isoCode="sd" size={25} />,
  },
  {
    label: "Suriname",
    value: "SR",
    icon: () => <CountryFlag isoCode="sr" size={25} />,
  },
  {
    label: "Sweden",
    value: "SE",
    icon: () => <CountryFlag isoCode="se" size={25} />,
  },
  {
    label: "Switzerland",
    value: "CH",
    icon: () => <CountryFlag isoCode="ch" size={25} />,
  },
  {
    label: "Syria",
    value: "SY",
    icon: () => <CountryFlag isoCode="sy" size={25} />,
  },
  {
    label: "Tajikistan",
    value: "TJ",
    icon: () => <CountryFlag isoCode="tj" size={25} />,
  },
  {
    label: "Tanzania",
    value: "TZ",
    icon: () => <CountryFlag isoCode="tz" size={25} />,
  },
  {
    label: "Thailand",
    value: "TH",
    icon: () => <CountryFlag isoCode="th" size={25} />,
  },
  {
    label: "Timor-Leste",
    value: "TL",
    icon: () => <CountryFlag isoCode="tl" size={25} />,
  },
  {
    label: "Togo",
    value: "TG",
    icon: () => <CountryFlag isoCode="tg" size={25} />,
  },
  {
    label: "Tonga",
    value: "TO",
    icon: () => <CountryFlag isoCode="to" size={25} />,
  },
  {
    label: "Trinidad and Tobago",
    value: "TT",
    icon: () => <CountryFlag isoCode="tt" size={25} />,
  },
  {
    label: "Tunisia",
    value: "TN",
    icon: () => <CountryFlag isoCode="tn" size={25} />,
  },
  {
    label: "Turkey",
    value: "TR",
    icon: () => <CountryFlag isoCode="tr" size={25} />,
  },
  {
    label: "Turkmenistan",
    value: "TM",
    icon: () => <CountryFlag isoCode="tm" size={25} />,
  },
  {
    label: "Tuvalu",
    value: "TV",
    icon: () => <CountryFlag isoCode="tv" size={25} />,
  },
  {
    label: "Uganda",
    value: "UG",
    icon: () => <CountryFlag isoCode="ug" size={25} />,
  },
  {
    label: "Ukraine",
    value: "UA",
    icon: () => <CountryFlag isoCode="ua" size={25} />,
  },
  {
    label: "United Arab Emirates",
    value: "AE",
    icon: () => <CountryFlag isoCode="ae" size={25} />,
  },
  {
    label: "United Kingdom",
    value: "GB",
    icon: () => <CountryFlag isoCode="gb" size={25} />,
  },
  {
    label: "United States of America",
    value: "US",
    icon: () => <CountryFlag isoCode="us" size={25} />,
  },
  {
    label: "Uruguay",
    value: "UY",
    icon: () => <CountryFlag isoCode="uy" size={25} />,
  },
  {
    label: "Uzbekistan",
    value: "UZ",
    icon: () => <CountryFlag isoCode="uz" size={25} />,
  },
  {
    label: "Vanuatu",
    value: "VU",
    icon: () => <CountryFlag isoCode="vu" size={25} />,
  },
  {
    label: "Vatican City",
    value: "VA",
    icon: () => <CountryFlag isoCode="va" size={25} />,
  },
  {
    label: "Venezuela",
    value: "VE",
    icon: () => <CountryFlag isoCode="ve" size={25} />,
  },
  {
    label: "Vietnam",
    value: "VN",
    icon: () => <CountryFlag isoCode="vn" size={25} />,
  },
  {
    label: "Yemen",
    value: "YE",
    icon: () => <CountryFlag isoCode="ye" size={25} />,
  },
  {
    label: "Zambia",
    value: "ZM",
    icon: () => <CountryFlag isoCode="zm" size={25} />,
  },
  {
    label: "Zimbabwe",
    value: "ZW",
    icon: () => <CountryFlag isoCode="zw" size={25} />,
  },
];
