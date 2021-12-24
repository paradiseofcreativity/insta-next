import Moment from "react-moment";

function Comments({ comments }) {
  return (
    <>
      {comments?.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments?.map((comment) => {
            const data = comment.data();
            return (
              <div
                key={comment.id}
                className="flex items-center space-x-2 mb-3"
              >
                <img
                  className="h-7 rounded-full"
                  src={data?.userImage}
                  alt={data?.username}
                />
                <p className="text-sm flex-1">
                  <span className="font-bold">{data?.username}</span>{' '}
                  {data?.comment}
                </p>

                <Moment fromNow className="text-xs pr-5">
                    {data?.timestamp?.toDate()}
                </Moment>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Comments;
