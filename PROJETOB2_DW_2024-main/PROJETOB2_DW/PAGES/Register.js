import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { supabase } from '../supabase';

export default function Register({ navigation }) {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState(''); // Estado para mensagens de erro ou sucesso
  const [messageType, setMessageType] = useState(''); // Estado para definir o tipo de mensagem ('success' ou 'error')

  // Função de autenticação
  const handleRegister = async () => {
    // Limpa a mensagem anterior
    setMessage('');
    setMessageType('');

    // Verifica se todos os campos estão preenchidos
    if (!nomeCompleto || !email || !senha) {
      setMessage('Por favor, preencha todos os campos.');
      setMessageType('error');
      return;
    }

    try {
      // Inserir o aluno na tabela 'Aluno' do Supabase
      const { data, error } = await supabase
        .from('Aluno')
        .insert([
          {
            email: email,
            senha: senha,
            nome_completo: nomeCompleto,
          },
        ]);

      if (error) {
        console.log('Erro Supabase:', error.message);
        if (error.message.includes('Row-level security policy')) {
          setMessage('Falha no registro devido a políticas de segurança da tabela.');
        } else {
          setMessage('Houve um problema ao criar sua conta. Tente novamente.');
        }
        setMessageType('error');
      } else {
        setMessage('Conta criada com sucesso!');
        setMessageType('success');
        setTimeout(() => {
          navigation.navigate('Login'); // Navega para a tela de login
        }, 2000); // Tempo para exibir a mensagem antes de redirecionar
      }
    } catch (err) {
      console.log('Erro inesperado:', err);
      setMessage('Erro inesperado. Por favor, tente novamente mais tarde.');
      setMessageType('error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.p1}>CRIANDO UMA CONTA!</Text>

      {message ? (
        <Text style={[styles.message, messageType === 'success' ? styles.success : styles.error]}>
          {message}
        </Text>
      ) : null}

      <TextInput
        label="Nome Completo"
        value={nomeCompleto}
        onChangeText={text => setNomeCompleto(text)}
        style={styles.textInput}
        theme={{ colors: { primary: '#ffaf1b' } }}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.textInput}
        theme={{ colors: { primary: '#ffaf1b' } }}
      />

      <TextInput
        label="Senha"
        value={senha}
        onChangeText={text => setSenha(text)}
        secureTextEntry={true}
        style={styles.textInput}
        theme={{ colors: { primary: '#ffaf1b' } }}
      />

      <View style={styles.container3}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.cancelar}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006673', // Cor de fundo consistente
  },

  container3: {
    flexDirection: 'row', // Organiza os elementos em linha
    justifyContent: 'space-between', // Distribui os elementos com espaçamento igual
    width: '70%', // Largura definida para manter a responsividade
    marginTop: 20, // Adicionando espaçamento superior
  },

  p1: {
    fontSize: 30, // Tamanho da fonte aumentado para destaque
    fontWeight: 'bold', // Deixa o texto em negrito
    color: '#9cae28', // Cor vibrante para chamar atenção
    marginBottom: 25, // Espaçamento inferior para separar do próximo elemento
    textAlign: 'center', // Alinhamento centralizado
  },

  textInput: {
    backgroundColor: 'white', // Cor de fundo clara para os campos de input
    marginBottom: 15, // Espaçamento inferior para separar o próximo campo
    width: '70%', // Largura definida para manter consistência
    height: 55, // Altura do campo de texto
    borderRadius: 10, // Bordas mais arredondadas para suavizar o visual
    paddingLeft: 10, // Adicionando padding à esquerda para melhor preenchimento do campo
  },

  cancelar: {
    color: '#ffaf1b', // Cor de destaque para o link
    fontSize: 16, // Tamanho de fonte ajustado para boa legibilidade
    textDecorationLine: 'underline', // Sublinha o texto para indicar ação
    textAlign: 'center', // Alinhamento centralizado
  },

  button: {
    backgroundColor: '#ffaf1b', // Cor vibrante para chamar atenção ao botão
    paddingVertical: 12, // Mais padding para tornar o botão maior e mais fácil de interagir
    paddingHorizontal: 20, // Padding lateral para ajustar o tamanho do botão
    borderRadius: 10, // Bordas arredondadas para um visual mais moderno
    alignItems: 'center', // Centraliza o texto dentro do botão
  },

  buttonText: {
    color: '#006673', // Cor de texto contrastante para o botão
    fontWeight: 'bold', // Negrito para chamar atenção
    fontSize: 18, // Aumento no tamanho da fonte para tornar o texto mais legível
  },

  message: {
    marginBottom: 15, // Espaçamento inferior para separar a mensagem de outros elementos
    fontSize: 16, // Tamanho de fonte agradável para mensagens informativas
    textAlign: 'center', // Centraliza o texto
    color: '#fff', // Cor branca para maior contraste e legibilidade
  },

  error: {
    color: '#FF0000', // Cor vermelha para mensagens de erro
  },

  success: {
    color: '#00FF35', // Cor verde para mensagens de sucesso
  },
});
