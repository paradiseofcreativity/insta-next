import getConfig from 'next/config';

const {
  publicRuntimeConfig: { avatarGenerator },
} = getConfig();

function Story({ story }) {
  const { username, name } = story;
  
  return (
    <div>
      <img
        className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
        src={`${avatarGenerator}?img=${name}`}
        alt={username}
      />
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  );
}

export default Story;
