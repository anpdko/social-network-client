import { useState, useEffect } from 'react';

export default function usePageBottom() {
   const [isBottom, setIsBottom] = useState(false);

   const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const scrollBottom = e.target.documentElement.scrollTop+window.innerHeight;
      const isPageBottom = scrollHeight-scrollBottom < 100;
      setIsBottom(isPageBottom);
   }

   useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   return isBottom;
}