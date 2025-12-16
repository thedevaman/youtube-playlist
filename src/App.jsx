import { Plus } from "lucide-react";
import React from "react";

const App = ()=>{

  return(
    <div>
      <aside className="overflow-y-auto bg-[linear-gradient(330deg,_#30cfd0,_#330867)] fixed h-full w-[300px] p-8">
       <div className="flex flex-col gap-2">
        {
          Array(20).fill(0).map((item,index)=>(
            <button className="bg-white p-3 rounded-lg">
              Dashboard
            </button>
          ))
        }
        <button className="active:scale-80 duration-300 bg-[linear-gradient(339deg,_#667eea,_#764ba2)] fixed top-0 left-0 w-[300px] p-3 text-white font-medium flex items-center justify-center">
          <Plus className="w-4 h-4 mr-1"/>
          New Playlist</button>
      </div>
      </aside>
      <section className="ml-[300px] px-16 py-12">
        <h1 className="text-4xl font-fold text-center">Section</h1>
        <div className="grid grid-cols-4 gap-8 mt-12">
        {
          Array(20).fill(0).map((item, index)=>(

          <div className="border border-gray-300 rounded-lg hover:scale-120 duration-300 hover:cursor-pointer" key={index}>
            <img src="https://img.youtube.com/vi/fmTDDNKG1ps/maxresdefault.jpg" className="rounded-t-lg" alt="" />
            <div className="p-3">
              <h1 className="text-base font-medium">New Song</h1>
              <label className="text-gray-500">16 Dec 2025 08:59 AM</label>
            </div>
           
          </div>

          ))
        }
        </div>
      </section>
    </div>
  )

}

export default App