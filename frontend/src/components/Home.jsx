import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/clerk-react';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const routeCards = [
    { title: '🆕 New Canvas', description: 'Start a fresh collaboration space', route: '/new-canvas' },
    { title: '🤝 Join Canvas', description: 'Enter an existing room with a code', route: '/joinCanvas' },
    { title: '📁 Projects', description: 'Access all your saved projects', route: '/projects' },
  ];

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-white via-[#e3f2fd] to-[#dceefb] flex flex-col items-center justify-start px-6 pt-8 pb-20 font-sans relative overflow-hidden">
      
      {/* Header */}
      <header className="w-full max-w-7xl flex justify-between items-center px-4 sm:px-8 py-4">
        <div className="text-2xl flex font-bold text-[#2f5376] gap-2 items-center h-fit "> <img src="/Draw.svg" className='w-10 h-10 rounded-2xl ' alt="" /><span className=' text-center'>DRAW</span></div>
   <div className="relative flex items-center gap-4">
      {/* If user is signed in */}
      <SignedIn>
        <div className="flex items-center space-x-3 bg-white border border-gray-200 shadow rounded-full px-3 py-1">
          
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-800">{user?.fullName || "User"}</p>
            <p className="text-xs text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>

      {/* If user is signed out */}
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-[#2f5376] text-white rounded-md text-sm font-medium shadow hover:bg-[#1e3c5c] transition">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </div>
      </header>

      {/* Hero */}
      <main className="text-center mt-12 mb-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2f5376] drop-shadow-sm"
        >
          Build. Collaborate. Share.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-4 text-base sm:text-lg md:text-xl text-gray-700"
        >
          Your whiteboard workspace, reimagined.
        </motion.p>

        <SignedOut>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <SignInButton mode="modal">
              <button className="px-6 py-3 bg-[#2f5376] text-white rounded-xl text-lg font-semibold shadow hover:bg-[#1e3c5c] transition">
                Sign in to Get Started
              </button>
            </SignInButton>
          </motion.div>
        </SignedOut>
      </main>

      {/* Cards */}
      <SignedIn>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-4"
        >
          {routeCards.map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(card.route)}
              className="cursor-pointer bg-white shadow-lg hover:shadow-xl transition rounded-2xl p-6 border border-gray-100 hover:border-[#bdd5ea]"
            >
              <h3 className="text-xl font-semibold text-[#2f5376] mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.description}</p>
            </motion.div>
          ))}
        </motion.section>
      </SignedIn>

      {/* Footer */}
      <footer className="absolute bottom-4 text-sm text-gray-500">
        {user && <>Logged in as {user.fullName}</>}
      </footer>
    </div>
  );
};

export default Home;
