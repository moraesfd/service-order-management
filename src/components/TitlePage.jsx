function TitlePage({ text }) {
  return (
    <div className="border-b border-gray-400">
      <h1 className="text-left font-bold text-2xl mt-7 mb-2 text-gray-700">
        {text}
      </h1>
    </div>
  );
}

export default TitlePage;
