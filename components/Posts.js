import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import dynamic from "next/dynamic";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const Post = dynamic(() => import('./Post'));
const Loader = dynamic(() => import('./Loader'));

function Posts() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // onSnapshot returns subscribe. To clean it, we need to return subscribe back..
  useEffect(() => {
    return onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(snapshot.docs);
        setLoading(false);
      }
    );
  }, [db]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {posts?.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              post={post.data()}
              session={session}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Posts;
