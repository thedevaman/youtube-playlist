import { Play, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import Modal from "antd/es/modal/Modal";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";

const App = ()=>{
const [openPlaylistModal,setOpenPlaylistModal] = useState(false)
const [form] = useForm()

  const createPlaylist = (value)=>{
    console.log(value)
  }
  const handlePlaylistModalClose = ()=>{
   setOpenPlaylistModal(false)
   form.resetFields()
  }
  return(
    <div>
      <aside className="overflow-y-auto bg-[linear-gradient(330deg,_#30cfd0,_#330867)] fixed h-full w-[300px] py-8 px-4">
       <div className="flex flex-col gap-2">
        {
          Array(20).fill(0).map((item,index)=>(
            <button className="font-medium bg-white p-3 rounded-lg hover:bg-rose-500 hover:text-white duration-300 active:scale-80">
              Dashboard
            </button>
          ))
        }
       
      </div>
      </aside>
      <section className="ml-[300px]">
        <nav className="flex justify-between items-center bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 py-4 px-16 sticky top-0 left-0 z-20">
          <h1 className="text-xl text-white font-bold text-center">Playlist</h1>
          <button onClick={()=>setOpenPlaylistModal(true)} className="bg-white flex items-center hover:scale-105 duration-300 active:scale-80 rounded-lg px-8 py-3 font-semibold">
            <Plus className="w-4 h-4"/>
            New Playlist
          </button>
         </nav>
        
        <div className="grid grid-cols-4 gap-8 mt-12 px-16">
        {
          Array(20).fill(0).map((item, index)=>(

          <div className="border border-gray-300 rounded-lg hover:scale-120 duration-300 hover:cursor-pointer" key={index}>
            <img src="https://img.youtube.com/vi/fmTDDNKG1ps/maxresdefault.jpg" className="rounded-t-lg" alt="" />
            <div className="p-3">
              <h1 className="text-base font-medium">New Song</h1>
              <label className="text-gray-500">16 Dec 2025 08:59 AM</label>
              <div className="mt-2 flex gap-2">
                <button className="active:scale-80 duration-300 py-1 px-2 rounded flex bg-green-500 items-center text-white text-xs">
                <Play className="w-3 h-3 mr-1"/>
                Play
              </button>
              <button className="active:scale-80 duration-300 py-1 px-2 rounded flex bg-rose-500 items-center text-white text-xs">
                <Trash2 className="w-3 h-3 mr-1"/>
                Delete
              </button>
              </div>
            </div>
           
          </div>

          ))
        }
        </div>
      </section>
      <Modal open={openPlaylistModal} footer={null} title="Create New Playlist" onCancel={handlePlaylistModalClose}>
       <Form form={form} onFinish={createPlaylist}>
        <Form.Item name="playlist" rules={[{required:true}]}>
            <Input placeholder="Enter playlist name" size='large'/>
        </Form.Item>
        <Form.Item>
           <Button htmlType="submit" size="large" type="primary">Create</Button>
        </Form.Item>
       </Form>
      </Modal>
    </div>
  )

}

export default App