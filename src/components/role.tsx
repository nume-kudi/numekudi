const Role = () => {
  return (
    <div className="rounded-sm bg-white bg-opacity-50 w-full p-8">
      <h2 className="my-8 text-center text-2xl font-semibold text-gray-800">
        フレームワークのハイエンド・エンドユーザーを目指しています。
      </h2>

      <div className="flex flex-col gap-6">
        {/* 大学時代 */}
        <section className="p-4 bg-white bg-opacity-10 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">大学時代</h2>
          <p className="text-gray-700">
            大学では、機械学習を研究し、エッジデバイスで特定の音声を検出する技術に取り組んでいました。学部は情報系ではないです。
          </p>
        </section>

        {/* SIer時代 */}
        <section className="p-4  rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">SIer時代</h2>
          <p className="text-gray-700">
            SIerとして画像処理に携わり、カメラや照明の選定、画像処理プログラムの作成に取り組みました。C言語ライブラリをRustやPythonから扱う方法を自力で学びました。
          </p>
        </section>

        {/* Web開発時代 */}
        <section className="p-4  rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Web開発</h2>
          <p className="text-gray-700">
            退職後、Web開発に携わり、生成AIをテーマにしたToBプロダクトを開発。PoCと本開発ではJavaScript/TypeScript,
            React, NestJS, Pythonを使用しました。
          </p>
        </section>

        <section className="p-4 bg-purple-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">これから</h2>
          <p className="text-gray-700">
            生態的地位を確立させるために、尖ったコンセプトの技術スタックを勉強したいです。
          </p>
        </section>
      </div>
    </div>
  );
};

export default Role;
