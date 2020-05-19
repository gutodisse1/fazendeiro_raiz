import React from "react";
import { StyleSheet, View, Button } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { Card, Input, ListItem, Text, Divider } from "react-native-elements";
import SearchableDropdown from "react-native-searchable-dropdown";
import * as SQLite from "expo-sqlite";

import { EstoqueProvider } from "../EstoqueContext";

/*
 *  LOCAL DATABASE
 */
const db = SQLite.openDatabase("db.db");

export default function ListarProdutos({ navigation, route }) {
  const [items, setItems] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState("");
  const [produtos, setProdutos] = React.useState([]);

  const params = route.params;

  /*
   * CREATE TABLE
   */
  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql("select * from produtos;", [], (_, { rows: { _array } }) =>
        setItems(_array)
      );
    });
  }, []);

  return (
    <EstoqueProvider value={items}>
      <View>
        <View style={{ zIndex: 1 }}>
          <Card title="Lista de Produtos já cadastrados">
            <View>
              <SearchableDropdown
                onItemSelect={item => {
                  setSelectedItems(item);
                }}
                containerStyle={{ padding: 5, zIndex: 2 }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: "#ddd",
                  borderColor: "#bbb",
                  borderWidth: 1,
                  borderRadius: 5,
                  zIndex: 2
                }}
                itemTextStyle={{ color: "#222" }}
                itemsContainerStyle={{ maxHeight: "100%" }}
                items={items.map(i => {
                  return { ...i, name: i.produto };
                })}
                resetValue={false}
                textInputProps={{
                  placeholder: "Escolha o produto",
                  underlineColorAndroid: "transparent",
                  style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 5
                  }
                }}
              />
            </View>
            <Button
              color="#527D2E"
              disabled={selectedItems == ""}
              style={{ zIndex: 1 }}
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0
              }}
              onPress={() => {

                setProdutos([...produtos, selectedItems]);
              }}
              title="Adicionar"
            />
          </Card>
        </View>
        <Card style={{ zIndex: 0 }} title="Produtos adicionados">
          <View>
            {produtos.map((i, z) => (
              <Text key={i.id + ":" + z}>{z+1 + " : " + i.name + " "}</Text>
            ))}
          </View>
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
            title="Salvar"
          />
        </Card>
      </View>
    </EstoqueProvider>
  );
}
