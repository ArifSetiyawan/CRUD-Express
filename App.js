<<<<<<< HEAD
import React, { Component } from "react";
import { Platform, StyleSheet, View, TextInput } from "react-native";
import {
  Button,
  Header,
  Container,
  Content,
  Left,
  Right,
  Footer,
  Text,
  Body,
  Form,
  Item,
  Input,
  Label
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";

const Base_URL = "http://192.168.0.9:9090";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [],
      naData: []
    };

    this.id_siswa = null;
    this.nama_siswa = null;
    this.kelas = null;
    this.no_telfon = null;
    this.email = null;
  }

  getButton = () => {
    fetch(Base_URL + "/detailsiswa", {
      method: "GET"
    })
      .then(responseData => {
        return responseData.json();
      })
      .then(jsonData => {
        console.log(jsonData);
        this.setState({ apiData: jsonData });
        console.log(this.state.apiData);
      })
      .done();
    this.id_siswa = null;
  };

  saveButton = () => {
    fetch(Base_URL + "/detailsiswa", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nama_siswa: this.nama_siswa,
        kelas: this.kelas,
        no_telfon: this.no_telfon,
        email: this.email
      })
    })
      .then(responseData => {
        return responseData.json();
      })
      .then(jsonData => {
        // console.log(jsonData);
        this.setState({ naData: jsonData });
        console.log(this.state.naData);
      })
      .done();
    this.id_siswa = null;
    this.nama_siswa = null;
    this.kelas = null;
    this.no_telfon = null;
    this.email = null;
  };

  searchButton = () => {
    fetch(Base_URL + "/detailsiswa/" + this.id_siswa, {
      method: "GET"
    })
      .then(responseData => {
        return responseData.json();
      })
      .then(jsonData => {
        console.log(jsonData);
        this.setState({ apiData: jsonData });
        // console.log(this.state.apiData)
      })
      .done();
    this.id_siswa = null;
  };

  deleteButton = () => {
    fetch(Base_URL + "/detailsiswa/" + this.id_siswa, {
      method: "DELETE"
    })
      .then(responseData => {
        console.log(responseData.rows);
      })
      .done();
    this.id_siswa = null;
  };

  updateButton = () => {
    fetch(Base_URL + "/detailsiswa", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nama_siswa: this.nama_siswa,
        kelas: this.kelas,
        no_telfon: this.no_telfon,
        email: this.email,
        id_siswa: this.id_siswa
      })
    })
      .then(responseData => {
        return responseData.json();
      })
      .done();
    this.id_siswa = null;
    this.nama_siswa = null;
    this.kelas = null;
    this.no_telfon = null;
    this.email = null;
  };
  render() {
    const data = this.state.apiData;
    let dataDisplay = data.map(function(jsonData) {
      return (
        <View key={jsonData.id_siswa}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "black" }}>{jsonData.id_siswa}. </Text>
            <Text style={{ color: "black" }}>{jsonData.nama_siswa} | </Text>
            <Text style={{ color: "black" }}>{jsonData.kelas} | </Text>
            <Text style={{ color: "black" }}>{jsonData.no_telfon} </Text>
          </View>
        </View>
      );
    });
    return (
      <Container>
        <Header>
          <Body style={{ left: 30 }}>
            <Text style={{ fontSize: 19, color: "white" }}>
              {" "}
              Input Data Siswa
            </Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={{ backgroundColor: "#CCCCC" }}>
            <Form>
              <Item floatingLabel>
                <Input
                  placeholder="ID Siswa"
                  onChangeText={text => {
                    this.id_siswa = text;
                  }}
                  value={this.id_siswa}
                  underlineColorAndroid="transparent"
                />
              </Item>
              <Item floatingLabel>
                <Input
                  placeholder="Nama Siswa"
                  onChangeText={text => {
                    this.nama_siswa = text;
                  }}
                  value={this.nama_siswa}
                  underlineColorAndroid="transparent"
                />
              </Item>
              <Item floatingLabel>
                <Input
                  placeholder="Kelas"
                  onChangeText={text => {
                    this.kelas = text;
                  }}
                  value={this.kelas}
                  underlineColorAndroid="transparent"
                />
              </Item>
              <Item floatingLabel>
                <Input
                  placeholder="No Telepon"
                  onChangeText={text => {
                    this.no_telfon = text;
                  }}
                  value={this.no_telfon}
                  underlineColorAndroid="transparent"
                />
              </Item>
              <Item floatingLabel>
                <Input
                  placeholder="Email"
                  onChangeText={text => {
                    this.email = text;
                  }}
                  value={this.email}
                  underlineColorAndroid="transparent"
                />
              </Item>
            </Form>
            <View style={{ flex: 1, flexDirection: "row", paddingTop: 10 }}>
              <Button style={styles.button} onPress={this.getButton}>
                <Text style={{ fontSize: 16 }}> View </Text>
              </Button>
              <Button
                style={styles.buttonSearch}
                onPress={this.searchButton}
              >
                <Text style={{ fontSize: 16 }}> Search </Text>
              </Button>
              <Button
                style={styles.buttonSave}
                onPress={this.saveButton}
              >
                <Text style={{ fontSize: 16 }}> Save </Text>
              </Button>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Button
                style={styles.buttonUpdate}
                onPress={this.updateButton}
              >
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                  {" "}
                  Update{" "}
                </Text>
              </Button>
              <Button
                style={styles.buttonDelete}
                onPress={this.deleteButton}
              >
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                  {" "}
                  Delete{" "}
                </Text>
              </Button>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
              {dataDisplay}
            </ScrollView>
          </View>
        </Content>
      </Container>
=======
import React, {Component} from 'react';
import {Platform, StyleSheet, View,TextInput} from 'react-native';
import { Button,Header,Container,Content,Left,Right,Footer,Text, Body ,Form, Item, Input, Label } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';


const Base_URL = "http://192.168.0.2:9090";
export default class App extends Component {
constructor(props){
  super(props)
  this.state = {
    apiData: [],
    naData: []
  }
  
  this.id_siswa = null;
  this.nama_siswa = null;
  this.kelas = null;
  this.no_telfon = null
  this.email = null
}

getButton = () => {
  fetch(Base_URL + '/detailsiswa',{
    method: 'GET'
  }).then((responseData) => {
    return responseData.json();
  }).then((jsonData) => {
    console.log(jsonData);
    this.setState({apiData:jsonData})
    console.log(this.state.apiData)
  }).done();
  this.id_siswa =null;
}

saveButton = () => {
  fetch(Base_URL + '/detailsiswa',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({nama_siswa:this.nama_siswa,kelas:this.kelas,no_telfon:this.no_telfon,email:this.email})
  }).then((responseData) => {
    return responseData.json();
  }).then((jsonData) => {
    // console.log(jsonData);
    this.setState({naData:jsonData})
    console.log(this.state.naData)
  }).done();
  this.id_siswa = null;
  this.nama_siswa = null;
  this.kelas = null;
  this.no_telfon = null
  this.email = null
}

searchButton = () => {
  fetch(Base_URL + '/detailsiswa/'+(this.id_siswa),{
    method: 'GET'
  }).then((responseData) => {
    return responseData.json();
  }).then((jsonData) => {
    console.log(jsonData);
    this.setState({apiData:jsonData})
    // console.log(this.state.apiData)
  }).done();
  this.id_siswa =null;
}

deleteButton = () => {
  fetch(Base_URL + '/detailsiswa/'+(this.id_siswa),{
    method: 'DELETE'
  }).then((responseData) => {
    console.log(responseData.rows)
  }).done();
  this.id_siswa =null;
}

updateButton = () => {
  fetch(Base_URL+'/detailsiswa',{
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({nama_siswa:this.nama_siswa,kelas:this.kelas,no_telfon:this.no_telfon,
    email:this.email,id_siswa:this.id_siswa})
  }).then((responseData) => {
    return responseData.json();
  }).done();
  this.id_siswa = null;
  this.nama_siswa = null;
  this.kelas = null;
  this.no_telfon = null
  this.email = null
}
  render() {
    const data = this.state.apiData;
    let dataDisplay = data.map(function(jsonData){
      return (
        <View key={jsonData.id_siswa}>
            <View style={{flexDirection:"row"}}>
                <Text style={{color:"black"}}>{jsonData.id_siswa}. </Text>
                <Text style={{color:"black"}}>{jsonData.nama_siswa} | </Text>
                <Text style={{color:"black"}}>{jsonData.kelas} | </Text>
                <Text style={{color:"black"}}>{jsonData.no_telfon} </Text>
            </View>
        </View>
      )
    })
    return (
      <Container>
        <Header>
          <Body style={{left:30}}>
            <Text style={{fontSize:19,color:"white"}}> Input Data Siswa</Text>
          </Body>
          <Right/>
        </Header>
         <Content>
        <View style={{backgroundColor:"#CCCCC"}}>
        <Form>
            <Item floatingLabel>
              <Input
            placeholder = 'ID Siswa'
            onChangeText = {(text) => {this.id_siswa = text} }
            value = {this.id_siswa}
            underlineColorAndroid='transparent'/>
            </Item>
            <Item floatingLabel>
              <Input
            placeholder = 'Nama Siswa'
            onChangeText = {(text) => {this.nama_siswa = text} }
            value = {this.nama_siswa}
            underlineColorAndroid='transparent'/>
            </Item>
            <Item floatingLabel>
              <Input
            placeholder = 'Kelas'
            onChangeText = {(text) => {this.kelas = text} }
            value = {this.kelas}
            underlineColorAndroid='transparent'/>
            </Item>
            <Item floatingLabel>
              <Input 
            placeholder = 'No Telepon'
            onChangeText = {(text) => {this.no_telfon = text} }
            value = {this.no_telfon}
            underlineColorAndroid='transparent'/>
            </Item>
            <Item floatingLabel>
              <Input
            placeholder = 'Email'
            onChangeText = {(text) => {this.email = text} }
            value = {this.email}
            underlineColorAndroid='transparent'/>
            </Item>
          </Form>
          <View style={{flex:1,flexDirection:"row",paddingTop:10}}>
          <Button style = {styles.button} onPress={this.getButton}>
            <Text style ={{fontSize:16}}> View </Text>
          </Button>
          <Button style = {{left:8,height:50,width:100,paddingTop: 10,color: '#333333',paddingBottom: 5,
              marginBottom: 10,margin:5,backgroundColor: 'silver',borderRadius: 5,justifyContent:"center"}} 
              onPress={this.searchButton}>
            <Text style ={{fontSize:16}}> Search </Text>
          </Button>
          <Button style = {{left:8,height:50,width:89,paddingTop: 10,color: '#333333',paddingBottom: 5,
             marginBottom: 10,margin:5,backgroundColor: '#1fad00',borderRadius: 5,justifyContent:"center"}}
             onPress={this.saveButton}>
            <Text style ={{fontSize:16}}> Save </Text>
          </Button>
          </View>
          <View style={{flex:1,flexDirection:"row"}}>
          <Button style = {{left:8,height:50,width:145,paddingTop: 10,color: '#333333',paddingBottom: 5,
            marginBottom: 10,margin:5,backgroundColor: '#0061ff',borderRadius: 5,justifyContent:"center"}}
            onPress={this.updateButton}>
            <Text style ={{fontSize:18,textAlign:"center"}}> Update </Text>
          </Button>
          <Button style = {{left:8,height:50,width:145,paddingTop: 10,color: '#333333',paddingBottom: 5,
            marginBottom: 10,margin:5,backgroundColor: 'red',borderRadius: 5,justifyContent:"center"}}
            onPress={this.deleteButton}>
            <Text style ={{fontSize:18,textAlign:"center"}}> Delete </Text>
          </Button>
          </View>
          <ScrollView contentContainerStyle={styles.container}>
              {dataDisplay}
          </ScrollView>
        </View>
        </Content>
        </Container>
>>>>>>> c6ba723f4d6ee0e10a1043f7e1d55963c3137bd3
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    marginTop: 5,
    alignItems: "center",
    backgroundColor: "#FFF"
  },
  button: {
    left: 8,
    height: 50,
    width: 90,
    paddingTop: 10,
    color: "#333333",
    paddingBottom: 5,
    marginBottom: 10,
    margin: 5,
    justifyContent: "center",
    backgroundColor: "orange",
    borderRadius: 5
  },
  buttonUpdate: {
    left: 8,
    height: 50,
    width: 145,
    paddingTop: 10,
    color: "#333333",
    paddingBottom: 5,
    marginBottom: 10,
    margin: 5,
    backgroundColor: "#0061ff",
    borderRadius: 5,
    justifyContent: "center"
  },
  buttonSearch: {
    left: 8,
    height: 50,
    width: 100,
    paddingTop: 10,
    color: "#333333",
    paddingBottom: 5,
    marginBottom: 10,
    margin: 5,
    backgroundColor: "cyan",
    borderRadius: 5,
    justifyContent: "center"
  },
  buttonSave: {
    left: 8,
    height: 50,
    width: 89,
    paddingTop: 10,
    color: "#333333",
    paddingBottom: 5,
    marginBottom: 10,
    margin: 5,
    backgroundColor: "#1fad00",
    borderRadius: 5,
    justifyContent: "center"
  },
  buttonDelete: {
    left: 8,
    height: 50,
    width: 145,
    paddingTop: 10,
    color: "#333333",
    paddingBottom: 5,
    marginBottom: 10,
    margin: 5,
    backgroundColor: "red",
    borderRadius: 5,
    justifyContent: "center"
  }
=======
    marginTop:5,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  button: {
    left:8,
    height:50,
    width:90,
    paddingTop: 10,
    color: '#333333',
    paddingBottom: 5,
    marginBottom: 10,
    margin:5,
    justifyContent:"center",
    backgroundColor: 'orange',
    borderRadius: 5,
  },
>>>>>>> c6ba723f4d6ee0e10a1043f7e1d55963c3137bd3
});
