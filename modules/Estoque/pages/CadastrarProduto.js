import React from "react";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

import { StyleSheet, View, Button } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import {
  Card,
  Input,
  ListItem,
  CheckBox,
  Overlay,
  Text
} from "react-native-elements";

function CardStatus(status) {
  if (status) {
    return (
      <Card containerStyle={{ backgroundColor: "#4CAF50" }}>
        <Text style={{ fontSize: 18 }}>
          <Icon name="check" size={22} color="black" />
          Item cadastrado com sucesso!
        </Text>
      </Card>
    );
  } else {
    return (
      <Card containerStyle={{ backgroundColor: "#f44336" }}>
        <Text style={{ fontSize: 18 }}>
          <Icon name="block" size={22} color="black" />
          Não foi possível cadastrar o item!
        </Text>
      </Card>
    );
  }
}

/*
 *  LOCAL DATABASE
 */
const db = SQLite.openDatabase("db.db");

export default function CadastrarProduto({ navigation }) {
  const [textProduto, setProduto] = React.useState("");
  const [textDesc, setDesc] = React.useState("");
  const [boolAlert, setAlert] = React.useState(false);
  const [boolStatus, setStatus] = React.useState(false);
  const [intUnid, setUnid] = React.useState(-1);

  /*
   * CREATE TABLE
   */
  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists produtos (id integer primary key AUTOINCREMENT, produto text, desc text, unid int);"
      );
    });
  }, []);

  const salvarProduto = () => {
    if (textProduto && textDesc && intUnid > -1) {
      db.transaction(
        tx => {
          tx.executeSql(
            "insert into produtos (produto, desc, unid) values (?, ?, ?);",
            [textProduto, textDesc, intUnid]
          );
        },
        () => {
          setAlert(true);
          setStatus(false);
        },
        () => {
          setAlert(true);
          setStatus(true);
        }
      );
      setProduto("");
      setDesc("");
      setUnid(-1);
    } else {
      setAlert(true);
      setStatus(false);
    }
  };

  const Unidades = ["Comprimento", "Capacidade", "Massa", "Volume"];
  return (
    <View>
      {boolAlert && CardStatus(boolStatus)}
      <Card title="Dados do produto">
        <Input
          placeholder="Produto:"
          onChangeText={text => setProduto(text)}
          value={textProduto}
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
          placeholder="Descrição:"
          onChangeText={text => setDesc(text)}
          value={textDesc}
          leftIcon={
            <Icon
              name="text"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          }
        />
      </Card>
      <Card title="Medida">
        {Unidades.map((item, z) => {
          return (
            <CheckBox
              key={item + "." + z}
              title={item}
              checked={z == intUnid}
              onPress={() => {
                setUnid(z);
              }}
            />
          );
        })}
      </Card>
      <Card>
        <Button
          onPress={salvarProduto}
          icon={<Icon name="code" color="#ffffff" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title="Salvar Produto"
        />
      </Card>
    </View>
  );
}
