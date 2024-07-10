import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { connectWebSocket, sendMessage } from '../core/services/websocketService';

type RootStackParamList = {
  Chat: { chatId: string };
};

const ChatPage: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const { chatId } = route.params;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello from user 1' },
    { id: '2', text: 'Hello from user 2' },
  ]);

  useEffect(() => {
    connectWebSocket(`wss://example.com/chat/${chatId}`);
  }, [chatId]);

  const handleSendMessage = () => {
    sendMessage(message);
    setMessages([...messages, { id: (messages.length + 1).toString(), text: message }]);
    setMessage('');
  };

  return (
    <View>
      <Text>Chat Page</Text>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text>{item.text}</Text>}
        keyExtractor={(item) => item.id}
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
      />
      <Button title="Send Message" onPress={handleSendMessage} />
    </View>
  );
};

export default ChatPage;
