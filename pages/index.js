import { getSession } from 'next-auth/react';
import dynamic from "next/dynamic";

const Feed = dynamic(() => import("../components/Feed"));
const Header = dynamic(() => import("../components/Header"));
const Meta = dynamic(() => import("../components/Meta"));
const UploadModal = dynamic(() => import("../components/UploadModal"));

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
