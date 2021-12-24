import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
import { signIn, useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [upload, setUpload] = useRecoilState(modalState);

  const onHome = () => {
    router.push('/');
  };

  const onUpload = () => {
    setUpload(true);
  };

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* left section - logo */}
        <div className="relative w-24 hidden lg:inline-grid cursor-pointer">
          <Image
            onClick={onHome}
            src="https://paradiseofcreativity.files.wordpress.com/2021/12/instagram-logo.png"
            layout="fill"
            alt="instagram logo"
            objectFit="contain"
            priority
          />
        </div>

        <div className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer">
          <Image
            onClick={onHome}
            src="https://paradiseofcreativity.files.wordpress.com/2021/12/instagram-logo-mobile.png"
            layout="fill"
            alt="instagram logo"
            objectFit="contain"
          />
        </div>

        {/* middle section - search */}
        <div className="max-w-xs">
          <div className="relative p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* right section - nav menus */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={onHome} className="nav-action" />
          <MenuIcon className="h-6 md:hidden cursor-pointer" />

          {session ? (
            <>
              <div className="relative nav-action">
                <PaperAirplaneIcon className="nav-action rotate-45" />
                <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white animate-pulse">
                  1
                </div>
              </div>

              <PlusCircleIcon onClick={onUpload} className="nav-action" />
              <UserGroupIcon className="nav-action" />
              <HeartIcon className="nav-action" />

              <img
                className="h-10 w-10 rounded-full cursor-pointer"
                src={session.user?.image}
                alt="user avatar"
              />
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
