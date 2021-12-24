import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import MiniProfile from './MiniProfile';
import Posts from './Posts';
import Stories from './Stories';
import Suggestions from './Suggestions';

function Feed() {
  const { data: session } = useSession();

  return (
    <main
      className={classNames(
        'grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto',
        {
          '!grid-cols-1 !max-w-3xl': !session,
        }
      )}
    >
      <section className="col-span-2">
        {/* section - stories  */}
        {session && <Stories />}
        {/* section - posts  */}
        <Posts />
      </section>

      {session && (
        <section className="hidden xl:inline-grid md:col-span-1">
          <div className="fixed top-20">
            {/* section - mini profile  */}
            <MiniProfile />
            {/* section - suggestions  */}
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  );
}

export default Feed;
