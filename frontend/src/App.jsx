import { Children, cloneElement, isValidElement, useEffect, useState } from "react";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import {io} from "socket.io-client"

function App({children}) {
 
 
const location = useLocation();

  
  const [save, setSave] = useState(false);
  const enhancedChildren = Children.map(children, (child) =>
    isValidElement(child)
      ? cloneElement(child, { key: location.pathname, save, setSave })  // move save/setSave here
      : child
  );
  
  return (
    
  <div className="w-screen h-screen bg-[rgb(26, 26, 26)] ">
      <AnimatePresence  >
      {enhancedChildren}
      </AnimatePresence>
  </div>
    
  );
}

export default App;
