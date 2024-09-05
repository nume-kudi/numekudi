import { useState } from "react";
import BioBoard from "./components/bioBoard";
import SlugCanvas from "./components/slug";
import Role from "./components/role";
import Contact from "./components/contact";

type Mode = "bio" | "works" | "contact" | null;

function App() {
  const [mode, setMode] = useState<Mode>(null);
  return (
    <div className="bg-primary min-h-dvh min-w-dvw flex flex-col text-white font-ZenMaruGothicAntique ">
      <div className="h-dvh w-dvw absolute top-0 left-0  z-0">
        <SlugCanvas />
      </div>
      <div className="w-full h-full z-10 flex flex-col">
        <a href="/">
          <p className="text-2xl md:text-6xl  font-bold text-center py-2">
            ヌメクヂのポートフォリオ
          </p>
        </a>
        <div className="w-full flex space-x-1">
          <button
            onClick={() => setMode("bio")}
            className="flex-1 text-2xl bg-black bg-opacity-5"
          >
            人物像
          </button>
          <button
            onClick={() => setMode("works")}
            className="flex-1 text-2xl bg-black bg-opacity-5"
          >
            社会的役割
          </button>
          <button
            onClick={() => setMode("contact")}
            className="flex-1 text-2xl bg-black bg-opacity-5"
          >
            SNSなど
          </button>
        </div>
        <div className="my-12 self-center w-11/12 md:w-9/12 shadow-lg">
          {mode === "bio" && <BioBoard />}
          {mode === "works" && <Role />}
          {mode === "contact" && <Contact />}
        </div>
      </div>
    </div>
  );
}

export default App;
