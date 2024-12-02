const Affirmations = ({ affirmations }) => {
  return (
    <div className="mt-4 p-4 bg-gray-200 rounded">
      <h2 className="text-lg font-bold">Affirmations</h2>
      {affirmations.map((affirmation, i) => (
        <p key={i}>{affirmation}</p>
      ))}
    </div>
  );
};

export default Affirmations;
