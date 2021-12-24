import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Post from './Post';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

function Posts() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  // onSnapshot returns subscribe. To clean it, we need to return subscribe back..
  useEffect(
      () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  // Another to clean the subscription..
  // useEffect(() => {
  //     return onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
  //         setPosts(snapshot.docs);
  //     });
  // }, [db]);

  return (
    <div>
      {posts?.map((post) => (
        <Post key={post.id} id={post.id} post={post.data()} session={session} />
      ))}
    </div>
  );
}

export default Posts;
