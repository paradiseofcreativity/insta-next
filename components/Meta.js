import Head from 'next/head';

function Meta({ title }) {
  return (
    <Head>
      <title>{title}</title>

      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta
        name='description'
        content='Instagram 2.0 with Next.js for the Education Purpose'
      />
      <meta name='keywords' content='paradise creativity' />
      <meta name='author' content='Parimal Nakrani' />
      <meta
        name='msapplication-TileImage'
        content='https://paradiseofcreativity.files.wordpress.com/2017/12/paradise-of-creativity-thumb.png?w=250'
      />

      {/* Open Graph Tags */}
      <meta property='og:type' content='website' />
      <meta property='og:title' content='Instagram 2.0' />
      <meta
        property='og:description'
        content='Instagram 2.0 with Next.js for the Education Purpose'
      />
      <meta
        property='og:url'
        content='https://paradiseofcreativity.wordpress.com/'
      />
      <meta property='og:site_name' content='Paradise of Creativity' />
      <meta property='og:image' content='https://raw.githubusercontent.com/paradiseofcreativity/spotify-next/main/public/paradise_of_creativity_og.jpg' />
      <meta property='og:image:width' content='200' />
      <meta property='og:image:height' content='200' />
      <meta property='og:locale' content='en_US' />

      {/* Twitter Tags */}
      <meta name='twitter:title' content='Instagram 2.0' />
      <meta
        name='twitter:description'
        content='Instagram 2.0 with Next.js for the Education Purpose'
      />
      <meta name='twitter:image' content='https://raw.githubusercontent.com/paradiseofcreativity/spotify-next/main/public/paradise_of_creativity_og.jpg' />
      <meta name='twitter:image:alt' content='Paradise of Creativity' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@parimal_nakrani' />

      {/* App Favicon */}
      <link rel="icon" href="https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png" />
    </Head>
  );
}

export default Meta;