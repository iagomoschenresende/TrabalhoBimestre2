import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { supabase } from '../supabase'; // Certifique-se de que o arquivo supabase.js esteja configurado corretamente

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');  // Estado para a mensagem
  const [messageType, setMessageType] = useState('');  // Tipo de mensagem (sucesso ou erro)

  // Função para lidar com o login
  const handleLogin = async () => {
    if (!email || !senha) {
      setMessage('Por favor, preencha todos os campos.');
      setMessageType('error'); // Tipo de mensagem: erro
      return;
    }

    try {
      // Verifica se o usuário existe na tabela 'Aluno'
      const { data, error } = await supabase
        .from('Aluno')
        .select('*')  // Seleciona todos os campos
        .eq('email', email)  // Verifica se o email corresponde
        .eq('senha', senha)  // Verifica se a senha corresponde
        .single();  // Espera apenas um resultado, já que o e-mail deve ser único

      if (error) {
        setMessage('E-mail ou senha incorretos.');
        setMessageType('error'); // Tipo de mensagem: erro
      } else if (data) {
        // Login bem-sucedido
        setMessage('Login realizado com sucesso!');
        setMessageType('success'); // Tipo de mensagem: sucesso

        // Redireciona após 2 segundos
        setTimeout(() => {
          navigation.navigate('Main');
        }, 2000);
      }
    } catch (err) {
      setMessage('Houve um problema ao tentar fazer login. Tente novamente.');
      setMessageType('error'); // Tipo de mensagem: erro
      console.log('Erro inesperado:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.p}>ÁREA DE LOGIN</Text>

      {/* Exibe a mensagem de erro ou sucesso */}
      {message ? (
        <Text style={[styles.message, messageType === 'error' ? styles.error : styles.success]}>
          {message}
        </Text>
      ) : null}

      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.textInput}
        theme={{ colors: { primary: '#ffaf1b' } }} // Muda a cor de foco
      />

      <TextInput
        label="Senha"
        value={senha}
        onChangeText={text => setSenha(text)}
        secureTextEntry={true}
        style={styles.textInput}
        theme={{ colors: { primary: '#ffaf1b' } }}
      />


      <View style={styles.container2}>
        <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
          <Text style={styles.esqueceu}>esqueceu a senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.esqueceu}>criar conta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004d5b', // Tom de azul mais profundo para o fundo
  },

  container2: {
    width: '80%', // Aumentei a largura para melhorar o layout
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20, // Maior espaçamento superior
    marginBottom: 25, // Aumentei o espaçamento inferior
  },

  p: {
    marginBottom: 30,
    fontSize: 36, // Tamanho maior para destaque no título
    fontWeight: 'bold',
    color: '#ffaf1b', // Cor amarela mais forte para chamar atenção
    textAlign: 'center', // Centralizando o texto
  },

  button: {
    backgroundColor: '#ffaf1b', // Cor laranja para o botão
    paddingVertical: 12, // Aumentei o padding vertical para deixar o botão mais largo
    paddingHorizontal: 25, // Ajustei o padding horizontal para dar um formato mais balanceado
    borderRadius: 8, // Borda mais arredondada para um visual moderno
    alignItems: 'center',
    marginTop: 20, // Um pouco mais de espaçamento acima
  },

  buttonText: {
    color: '#004d5b', // Cor escura para o texto do botão
    fontWeight: 'bold',
    fontSize: 18,
  },

  textInput: {
    backgroundColor: 'white',
    marginBottom: 15, // Maior espaçamento entre os campos
    width: '80%', // Maior largura para os campos de entrada
    height: 55,
    borderRadius: 10, // Borda arredondada para maior suavidade
    paddingLeft: 10, // Adicionando padding para o texto não ficar colado
  },

  esqueceu: {
    textAlign: 'center',
    color: '#ffaf1b',
    fontSize: 14, // Aumentei um pouco o tamanho da fonte para facilitar a leitura
    marginTop: 10, // Aumentei o espaçamento superior para mais respiro
    textDecorationLine: 'underline',
  },

  message: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    width: '80%', // Ajustando a largura para uma apresentação mais centralizada
  },

  error: {
    color: '#FF0000',
  },

  success: {
    color: '#00FF35',
  },
});

