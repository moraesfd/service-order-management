function EmptyState({ msg }) {
  return (
    <div className="flex justify-center items-center my-10">
      <p className="text-md text-center text-red-500 font-semibold">{msg}</p>
    </div>
  );
}

export default EmptyState;
