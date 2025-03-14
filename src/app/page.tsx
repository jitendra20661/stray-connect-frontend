
import Image from "next/image";
import Navbar from "@/app/components/Navbar"
import Mainn from "@/app/components/mainn"
import Features from "@/app/components/PetServices"
import Donate from "@/app/components/Donate"


export default function Home(){
  return (
    <div>
      <div className="items-center justify-center h-48 mb-4 bg-gray-50 dark:bg-gray-700">
      <Navbar/>
        <Mainn/>
        <Features/>
        <Donate/>
         <p className="text-2xl text-gray-400 dark:text-gray-500">
            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
               <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
            </svg>
         </p>
      </div>


      
    </div>
  );
}
