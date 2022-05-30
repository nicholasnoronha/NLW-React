import { Link } from "react-router-dom";
import { useContext } from "react";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
// import googleIconImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";
import { AuthContext } from "../contexts/AuthContext";

import "../styles/auth.scss";

export function NewRoom() {
  const { user } = useContext(AuthContext);

  async function handleCreateRoom() {}

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie uma sala de Q&ampA ao-vivo.</strong>
        <p>Tire suas dúvidas da sua audiência em tempo-real.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input type="text" placeholder="Nome da sala" />
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
