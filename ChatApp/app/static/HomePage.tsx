import React, { useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getChats, createChat, deleteChat } from '../core/services/chatService';
import { setChats, addChat, removeChat } from '../core/store/chatSlice';
import { RootState } from '../core/store/store';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Chat: { chatId: string };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chat.chats);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const fetchChats = async () => {
      const chats = await getChats();
      dispatch(setChats(chats));
    };
    fetchChats();
  }, [dispatch]);

  const handleCreateChat = async () => {
    const newChat = { name: 'New Chat' };
    const chat = await createChat(newChat);
    dispatch(addChat(chat));
  };

  const handleDeleteChat = async (id: string) => {
    await deleteChat(id);
    dispatch(removeChat(id));
  };

  return (
    <View>
      <Text>Home Page</Text>
      <Button title="Create Chat" onPress={handleCreateChat} />
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button title="Join Chat" onPress={() => navigation.navigate('Chat', { chatId: item.id })} />
            <Button title="Delete Chat" onPress={() => handleDeleteChat(item.id)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HomePage;
