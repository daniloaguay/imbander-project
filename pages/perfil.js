import Header from "../components/header";
import Imageuploader from "../components/imageuploader";

export default function Perfil() {
  return (
    <div>
      <title>Imbander-Likes</title>
      <link rel="icon" href="/favicon.ico" />
      <Header></Header>
      <h1>Aquí se visualizará todos los likes que se ha recibido</h1>
      <Imageuploader/>
    </div>
  );
}
