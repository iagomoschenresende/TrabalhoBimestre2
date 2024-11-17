import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function Forgot({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.p1}>
        REDEFINIÇÃO DE SENHA!
      </Text>

      <Text style={styles.p2}>
        Informe o e-mail para qual deseja redefinir a sua senha
      </Text>

      <TextInput
        label="Email"
        style={styles.input}
        theme={{ colors: { primary: '#ffaf1b' } }} // Muda a cor de foco
      />

      <TouchableOpacity style={styles.button} onPress={() => console.log('Pressed')}>
        <Text style={styles.buttonText}>Enviar link de recuperação</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.cancelar}>
          Cancelar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00334d', // Tom de azul mais profundo para o fundo
  },

  p1: {
    color: '#ffaf1b', // Cor amarela para o título
    fontSize: 26, // Tamanho de fonte um pouco maior para destaque
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    marginBottom: 15, // Adiciona margem inferior para espaçamento
  },

  p2: {
    color: '#b0b0b0', // Cinza mais suave para o texto secundário
    fontSize: 14, // Fonte um pouco maior para facilitar leitura
    padding: 15,
    textAlign: 'center',
    width: '80%', // Ajustando a largura para que o texto não fique muito largo
  },

  input: {
    backgroundColor: '#e0e0e0', // Cor de fundo mais clara para os campos de entrada
    marginBottom: 15, // Maior espaçamento entre os campos
    width: '80%', // Aumenta a largura para os campos ficarem mais proporcionais
    height: 55,
    borderRadius: 10, // Adiciona borda arredondada
    paddingLeft: 10, // Adiciona um padding para o texto não ficar colado na borda
  },

  button: {
    backgroundColor: '#ffaf1b', // Mantém a cor amarela para o botão
    marginTop: 20, // Espaço superior ajustado para melhor espaçamento
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8, // Borda mais arredondada para um efeito mais suave
  },

  buttonText: {
    color: '#00334d', // Cor mais escura para o texto do botão
    fontSize: 14,
    fontWeight: 'bold',
  },

  cancelar: {
    textAlign: 'center',
    color: '#ffaf1b',
    marginTop: 20, // Mais espaçamento para não colidir com os outros elementos
    textDecorationLine: 'underline',
    fontSize: 16, // Fonte um pouco maior para melhorar a visibilidade
  },
});

