import React from "react";
import { StyleSheet, View } from "react-native";
import * as SQLite from "expo-sqlite";

/*
 *  ELEMENTS
 */
import { List, ListItem, Text, Header } from "react-native-elements";
/*
 *  NAVIGATION
 */
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

/*
 *  MODULES
 */
import Estoque from "./modules/Estoque/Estoque";

/*
 *  LOCAL DATABASE
 */
const db = SQLite.openDatabase("db.db");

/*
 * HOME SCREEN
 */
function HomeScreen({ navigation }) {
  const menu = [
    {
      name: "Recursos",
      icon: "database",
      subtitle: "Módulo para lançamento dos recursos/estoque",
      link: "Módulo de estoque"
    },
    {
      name: "Mão de obra",
      icon: "hand",
      subtitle: "Módulo para lançamento da mão de obra",
      link: "SourceModule"
    }
  ];
  return (
    <View
      style={{
        flex: 1,
        alignItems: "stretch",
        justifyContent: "flex-start"
      }}
    >
      <Header
        backgroundColor="#2e7d32"
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{
          text: "Caderno do Fazendeiro",
          style: { color: "#fff" }
        }}
        rightComponent={{ icon: "home", color: "#fff" }}
      />
      <View>
        {menu.map((l, i) => (
          <ListItem
            key={i}
            leftIcon={{ name: l.icon, type: "entypo" }}
            title={l.name}
            subtitle={l.subtitle}
            bottomDivider
            onPress={() => navigation.navigate(l.link)}
          />
        ))}
      </View>
    </View>
  );
}

const Drawer = createDrawerNavigator();
export default function App() {
  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, done int, value text);"
      );
    });
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Módulo de estoque" component={Estoque} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
