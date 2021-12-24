import { signOut, useSession } from 'next-auth/react';

function MiniProfile() {
    const { data: session } = useSession();

    const onSignOut = () => {
        signOut({ callbackUrl: '/auth/login' });
    };

    return (
        <div className="flex items-center justify-between mt-14 ml-10">
            <img className="rounded-full border p-[2px] w-16 h-16" src={session?.user?.image} alt="user avatar" />

            <div className='flex-1 mx-4'>
                <h2 className="font-bold">{session?.user?.username}</h2>
                <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
            </div>

            <button onClick={onSignOut} className='text-blue-400 text-sm font-semibold'>Sign out</button>
        </div>
    )
}

export default MiniProfile
