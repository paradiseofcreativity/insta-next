import { getSession } from 'next-auth/react';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Meta from '../components/Meta';
import UploadModal from '../components/UploadModal';

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Meta title="Instagram 2.0" />
      
      <Header />
      
      {/* content */}
      <Feed />

      {/* upload modal */}
      <UploadModal />
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    }
  };
}
