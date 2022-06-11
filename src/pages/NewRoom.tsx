import { Link, useNavigate } from "react-router-dom";
import { useContext, FormEvent, useState } from "react";
import { Button } from "../components/Button";
import { AuthContext } from "../contexts/AuthContext";
import { database, ref, set, child, get } from "../services/firebase";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import "../styles/auth.scss";

export const generateRandomId = async (length: Number) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  const roomRef = ref(database);
  get(child(roomRef, "rooms/" + result))
    .then((snapshot) => {
      if (snapshot.exists()) {
        generateRandomId(20);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
};

export function NewRoom() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const randomId = await generateRandomId(20);
    const idRef = ref(database, "rooms/" + randomId);
    set(idRef, {
      roomName: newRoom,
      authorId: user?.id,
    });
    console.log(idRef.key);

    navigate(`/admin/room/${idRef.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie uma sala de Q&A ao-vivo.</strong>
        <p>Tire suas dúvidas da sua audiência em tempo-real.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar na sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique Aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
