import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { List, ListItem, Text } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Entypo";

/*
 *  MODULES
 */
import CadastrarFornecedor from "./pages/CadastrarFornecedor";
import CadastrarProduto from "./pages/CadastrarProduto";
import ListarProdutos from "./pages/ListarProdutos";

function EstoqueScreen({ navigation }) {
  const menu = [
    {
      name: "Lançar retirada",
      icon: "level-up",
      subtitle: "Módulo para lançamento dos recursos/estoque",
      link: "Módulo de estoque"
    },
    {
      name: "Lançar entrada",
      icon: "level-down",
      subtitle: "Módulo para lançamento dos recursos/estoque",
      link: "Módulo de estoque"
    },
    {
      name: "Cadastrar Fornecedor",
      icon: "add-user",
      subtitle: "Módulo para cadastrar fornecedor",
      link: "Cadastrar Fornecedor"
    },
    {
      name: "Cadastrar Produto",
      icon: "add-to-list",
      subtitle: "Módulo para cadastrar Produto",
      link: "Cadastrar Produto"
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
      <View>
        {menu.map((l, i) => (
          <ListItem
            key={i}
            leftIcon={
              <Icon
                name={l.icon}
                type="entypo"
                color="black"
                size={24}
                style={{ marginRight: 10 }}
              />
            }
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

const Stack = createStackNavigator();

export default function Estoque() {
  return (
    <Stack.Navigator independent={true}>
      <Stack.Screen name="Estoque" component={EstoqueScreen} />
      <Stack.Screen
        name="Cadastrar Fornecedor"
        component={CadastrarFornecedor}
      />
      <Stack.Screen name="Listar Produtos" component={ListarProdutos} />
      <Stack.Screen name="Cadastrar Produto" component={CadastrarProduto} />
    </Stack.Navigator>
  );
}
