import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

export interface UserProps {
  id: number;
  userName: string;
  name: string;
  avatar: string;
  followers: number;
  following: number;
  description: string;
}

export interface LoopQuestionSingleProps {
  id: number;
  userId: number;
  testId: number;
  question: number;
  opinion: string;
  avatar: string;
  name: string;
  like: number;
  dislike: number;
  date: string;
}
