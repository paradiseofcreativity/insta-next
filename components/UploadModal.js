import { Fragment, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useSession } from 'next-auth/react';
import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon } from '@heroicons/react/outline';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

import { db, storage } from '../firebase';
import { modalState } from '../atoms/modalAtom';

function UploadModal() {
  const [upload, setUpload] = useRecoilState(modalState);

  const fileRef = useRef(null);
  const captionRef = useRef(null);

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { data: session } = useSession();

  const onClose = () => {
    setUpload(false);
  };

  const onUploadClick = () => {
    fileRef.current.click();
  };

  const onFile = () => {
    setFile(null);
  };

  const onUpload = (e) => {
    const reader = new FileReader();

    if (e.target?.files?.length === 1) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (cnx) => {
      setFile(cnx.target.result);
    };
  };

  const onUploadPost = async () => {
    if (uploading) return;

    setUploading(true);

    try {
      console.log('setUploading: turned on');

      const post = {
        username: session.user?.username,
        caption: captionRef.current.value || '',
        profileImage: session.user?.image,
        timestamp: serverTimestamp(),
      };
      console.log('post:', post);

      // create a post & add to firestore 'posts' collection
      const docRef = await addDoc(collection(db, 'posts'), post);

      console.log('docRef:', docRef);

      // get the post id for the newly created post, docRef.id

      // upload the image to firbase storage with the post id
      const imageRef = ref(storage, `posts/${docRef.id}/image`);
      console.log('imageRef:', imageRef);

      // get a download URL from firebase storage and update the original post with image
      await uploadString(imageRef, file, 'data_url').then(async snapshot => {
        const downloadURL = await getDownloadURL(imageRef);
        console.log('downloadURL:', downloadURL);
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        });
      });

      console.log('DONE--');
    } catch (error) {
      console.log('UPLOAD POST ERROR:', error);
    }

    // close the upload modal
    setUpload(false);
    // set false to uploading state
    setUploading(false);
    // reset file input
    setFile(null);
    // reset caption input
    // captionRef.current.value = '';
  };

  return (
    <Transition.Root show={upload} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* Use one Transition.Child to apply one transition to the overlay... */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* Trick the browser into centering the dialog contents */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          {/* ...and another Transition.Child to apply a separate transition to the contents. */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                {file ? (
                  <img
                    className="w-full object-contain cursor-pointer"
                    src={file}
                    alt="selected file"
                    onClick={onFile}
                  />
                ) : (
                  <div
                    onClick={onUploadClick}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                  >
                    <CameraIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Upload a photo
                    </Dialog.Title>
                  </div>

                  <div>
                    <input
                      ref={fileRef}
                      type="file"
                      onChange={onUpload}
                      hidden
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      ref={captionRef}
                      type="text"
                      placeholder="Please enter a caption"
                      className="border-none focus:ring-0 w-full text-center"
                    />
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    onClick={onUploadPost}
                    disabled={!file || uploading}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                  >
                    {uploading ? 'Uploading..' : 'Upload Post'}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default UploadModal;
