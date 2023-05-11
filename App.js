import React from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';

class UsuarioGithub extends React.Component {
  constructor(props) {
    super(props);
    console.log("O componente está sendo montado!")
    this.state = {
      dados: {},
      usuario: 'octocat'
    }
    this.fetchDados = this.fetchDados.bind(this);
    this.formaDadosDoUsuario = this.formaDadosDoUsuario.bind(this
    );
  }
  fetchDados() {
    fetch(`https://api.github.com/users/${this.state.usuario}`)
      .then(response => response.json())
      .then(json => this.setState({ dados: json }))
      .catch(err => this.setState({ dados: { err } }))
  }

  formaDadosDoUsuario() {
    if (this.state.dados.name !== undefined) {
      const { name, public_repos, followers } = this.state.dados;
      return (
        <>
          <Text style={estilos.font30}>Dados do Usuário</Text>
          <Text>Nome: {name}</Text>
          <Text>Repositórios: {public_repos}</Text>
          <Text>Seguidores: {followers}</Text>
        </>
      )
    } else {
      return (
        <Text style={estilos.font30}>
          Este usuário não existe!
        </Text>
      )
    }
  }

  componentDidMount() {
    console.log("O component foi montado")
    this.fetchDados();
  }

  componentDidUpdate() {
    console.log("O componente foi atualizado")
  }

  componentWillUnmount() {
    console.log("O componente está sendo destruído!")
  }

  render() {
    console.log("O componente está sendo renderizado!")
    return (
      <View style={estilos.container}>
        {this.formaDadosDoUsuario()}
        <View>
          <TextInput
            style={estilos.input}
            onChangeText={usuario => {
              this.setState({ usuario })
            }}
            value={this.state.usuario}>
          </TextInput>
        </View>
        <View>
          <Button
            onPress={this.fetchDados}
            title="Buscar Dados"
            accessibilityLabel="Busque os dados do usuário no GitHub"
          />
        </View>
      </View>
    )
  }
}
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: 300,
    fontSize: 30,
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    padding: 5
  },
  font30: {
    fontSize: 30
  }
});
export default UsuarioGithub;