import { useEffect, useRef, useState } from 'react';
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import Comments from './Comments';

function Post({ id, post, session }) {
  const { username, profileImage, image, caption } = post;
  const [commenting, setCommenting] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const inputRef = useRef(null);

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const onSendComment = async (e) => {
    e.preventDefault();

    setCommenting(true);

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });

    setComment('');
    setCommenting(false);
  };

  const onLikeDislike = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session?.user?.uid));
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session?.user?.uid), {
        username: session?.user?.username,
      });
    }
  };

  const onComment = () => {
    inputRef.current.focus();
  };

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* header */}
      <div className="flex items-center p-5">
        <img
          className="rounded-full h-10 w-10 object-contain mr-3"
          src={profileImage}
          alt={username}
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* post image */}
      <img src={image} alt="post image" className="object-cover w-full" />

      {/* actions */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
            <div className="flex space-x-4">
              {hasLiked ? (
                <HeartIconSolid
                  onClick={onLikeDislike}
                  className="post-action text-red-500 animate-pulse"
                />
              ) : (
                <HeartIcon onClick={onLikeDislike} className="post-action" />
              )}
              <ChatIcon onClick={onComment} className="post-action" />
              <PaperAirplaneIcon className="post-action" />
            </div>

            <BookmarkIcon className="post-action" />
          </div>
      )}

      {/* caption */}
      <div className="p-5 truncate">
        {likes?.length > 0 && (
          <p className="font-bold">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </div>

      {/* comments */}
      <Comments comments={comments} />

      {/* comment input */}
      {session && (
        <form className="flex items-center p-4">
          <img
            className="rounded-full h-7 object-contain"
            src={session?.user?.image}
            alt={username}
          />
          <input
            value={comment}
            onChange={onChangeComment}
            ref={inputRef}
            type="text"
            className="border-none flex-1 focus:ring-0 outline-none"
            placeholder="Add a comment.."
          />
          <button
            disabled={!comment.trim() || commenting}
            onClick={onSendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
