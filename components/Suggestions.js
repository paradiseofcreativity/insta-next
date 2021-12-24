import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import faker from 'faker';

const Suggestion = dynamic(() => import('./Suggestion'));

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const data = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));

    setSuggestions(data);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See all</button>
      </div>

      {suggestions?.map((suggestion) => (
        <Suggestion key={suggestion?.id} suggestion={suggestion} />
      ))}
    </div>
  );
}

export default Suggestions;
