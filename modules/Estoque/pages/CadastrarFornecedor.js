import React from "react";
import { StyleSheet, View, Button } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { Card, Input, ListItem } from "react-native-elements";
import * as SQLite from "expo-sqlite";

/*
 *  LOCAL DATABASE
 */
const db = SQLite.openDatabase("db.db");

export default function CadastrarFornecedor({ navigation }) {
  const [produtos, setProdutos] = React.useState([]);

  return (
    <View>
      <Card title={"Dados do fornecedor"}>
        <Input
          placeholder="Nome:"
          leftIcon={
            <Icon
              name="user"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          }
        />
        <Input
          placeholder="Contato:"
          leftIcon={
            <Icon
              name="phone"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          }
        />
        <Input
          placeholder="Email:"
          leftIcon={
            <Icon
              name="email"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          }
        />
      </Card>
      <Card title="Vendedores">
        <Input
          placeholder="Nome:"
          leftIcon={
            <Icon
              name="user"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          }
        />
        <Input
          placeholder="Contato:"
          leftIcon={
            <Icon
              name="phone"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          }
        />
      </Card>
      <Card title="Produtos">
        <Button
          icon={
            <Icon
              name="circle-with-plus"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          }
          onPress={() =>
            navigation.navigate("Listar Produtos", {
              produtos: produtos,
              setProdutos: ""
            })
          }
          title="Escolher Produtos"
        />
      </Card>
      <Card>
        <Button
          icon={<Icon name="code" color="#ffffff" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title="Salvar Fornecedor"
        />
      </Card>
    </View>
  );
}
