import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import faker from 'faker';

const Story = dynamic(() => import('./Story'));

function Stories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));

    setStories(suggestions);
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {stories.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </div>
  );
}

export default Stories;
