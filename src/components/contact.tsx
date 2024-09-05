import { SiGithub, SiQiita } from "react-icons/si";

const Contact = () => {
  return (
    <div className="rounded-sm bg-white bg-opacity-50 w-full p-8">
      <div className="flex flex-col items-center">
        <a href="https://qiita.com/numekudi">
          <SiQiita color="#55c500" size={64} />
        </a>
        <a href="https://github.com/nume-kudi">
          <SiGithub size={32} />
        </a>
      </div>
    </div>
  );
};

export default Contact;
