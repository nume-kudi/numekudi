import catImagePath from "../assets/cat.jpg";
const BIO_CONTENTS = [
  { col1: "英名", col2: "numekudi" },
  { col1: "学名", col2: "ヒトと同じ" },
  { col1: "分類", col2: "毒タイプ" },
  { col1: "生息地", col2: "机か布団" },
  { col1: "食性", col2: "グミ" },
];

const BioBoard = () => {
  return (
    <div className="rounded-sm bg-white w-full">
      <div className="bg-emerald-700 text-white font-ZenKakuGothicAntique font-bold text-4xl text-center py-2">
        ヌメクヂ
      </div>
      <div className="flex flex-wrap w-full py-2 px-4">
        <div className="flex-shrink-0 mx-auto my-auto">
          <img src={catImagePath} className="max-w-full h-auto" />
        </div>
        <div className="flex-grow">
          <div className="flex flex-col text-gray-800 px-4 py-8 w-full space-y-4">
            {BIO_CONTENTS.map((e) => {
              return (
                <div className="flex w-full flex-wrap space-x-4">
                  <div
                    className="w-32 text-justify"
                    style={{
                      textAlignLast: "justify",
                    }}
                  >
                    {e.col1}
                  </div>
                  <div className="pl-8">{e.col2}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioBoard;
