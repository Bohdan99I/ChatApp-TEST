import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MessageWidgetProps {
  message: string;
}

const MessageWidget: React.FC<MessageWidgetProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E1FFC7',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  text: {
    color: '#333',
  },
});

export default MessageWidget;
