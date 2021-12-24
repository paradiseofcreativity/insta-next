import { getProviders, signIn } from 'next-auth/react';
import dynamic from "next/dynamic";

const Header = dynamic(() => import('../../components/Header'));

// browser
function Login({ providers }) {
  return (
    <>
      <Header />
      
      {/* OAuth Sign in​ */}
      <div className="flex flex-col items-center justify-center min-h-screen py-2 px-14 text-center">
        <img className="w-80" src="https://paradiseofcreativity.files.wordpress.com/2021/12/instagram-logo.png" alt="instagram logo" />
        <p className='font-xs italic'>Instagram (from Facebook) allows you to create and share your photos, stories, <br />and videos with the friends and followers you care about.</p>

        <div className="mt-10">
          {Object.values(providers)?.map((provider) => (
            <div key={provider?.name}>
              <button
                className="py-3 px-12 bg-blue-500 text-white rounded-lg font-medium"
                onClick={() => signIn(provider?.id, { callbackUrl: '/'})}
              >
                Login in with {provider?.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Login;

// server
export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
