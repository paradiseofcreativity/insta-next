function Loader() {
  return (
    <div className="mt-20 pb-32">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
}

function Skeleton() {
  return (
    <div className="border bg-white shadow rounded-sm max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl w-full mx-auto my-7">
      <div className="animate-pulse">
        <div className="flex items-center space-x-4 p-3 md:p-4">
          <div className="rounded-full bg-gray-700 h-10 w-10"></div>
          <div className="flex flex-1 justify-between w-full py-1">
            <div className="w-24 h-2 bg-gray-700 rounded"></div>
            <div className="w-4 h-2 bg-gray-700 rounded"></div>
          </div>
        </div>

        <div className="h-20 md:h-40 bg-gray-700"></div>

        <div className="space-y-3 p-3 md:p-4">
          <div className="grid grid-cols-12 gap-2">
            <div className="h-2 bg-gray-700 rounded col-span-1"></div>
            <div className="h-2 bg-gray-700 rounded col-span-1"></div>
            <div className="h-2 bg-gray-700 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
