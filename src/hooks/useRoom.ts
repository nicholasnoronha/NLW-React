import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth"
import { database, ref, onValue } from "../services/firebase";

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
    likes: Record<string, {
      authorId: string;
    } >
  }
>;

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  likeId: string | undefined;
};

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
      const fn = async () => {
        const roomRef = ref(database, `rooms/${roomId}`);
  
        const unsubscribeRoomListener = onValue(roomRef, (snapshot) => {
          const data = snapshot.val();
          // updateQuestions(postElement, data);
          console.log(data);
          const firebaseQuestions: FirebaseQuestions = data.questions ?? {};
          const parsedQuestions = Object.entries(firebaseQuestions).map(
            ([key, value]) => {
              return {
                id: key,
                content: value.content,
                author: value.author,
                isHighlighted: value.isHighlighted,
                isAnswered: value.isAnswered,
                likeCount: Object.values(value.likes ?? {}).length,
                likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
              };
            }
          );
          console.log(parsedQuestions);
          setTitle(data.roomName);
          setQuestions(parsedQuestions);
        });

        return () => {
          unsubscribeRoomListener();
        }
      };
      fn();
    }, [roomId, user?.id]);

    return { questions, title }
}