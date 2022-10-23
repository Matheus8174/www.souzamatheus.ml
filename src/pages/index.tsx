import type { NextPage } from 'next';

// Home page
const Home: NextPage = () => (
  <div className="flex h-screen w-screen flex-col items-center justify-center gap-10 bg-black text-white">
    <h1 className="text-3xl font-bold text-white">NEXT BOILERPLATE</h1>

    <div className="flex flex-col items-center justify-center gap-2">
      <h2 className="text-2xl text-white">
        Typescript, Tailwind and Storybook
      </h2>

      <p>
        if you like it, dont forget to{' '}
        <a
          className="text-blue-500"
          href="https://github.com/Matheus8174/boilerplate-sb-next-tailwind-typescript"
        >
          give a star
        </a>
      </p>
    </div>
  </div>
);

export default Home;
