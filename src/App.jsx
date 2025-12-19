import { File, Play, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import Modal from "antd/es/modal/Modal";
import { Button, Form, Input, message, Popconfirm, Select, Tooltip } from "antd";
import { useForm } from "antd/es/form/Form";
import { usePlaylist } from "./zustand/usePlaylist";
import getVideoId from 'get-youtube-id'
import moment from "moment";

const App = ()=>{
const [openPlaylistModal,setOpenPlaylistModal] = useState(false)
const [form] = useForm()
const [videoform] = useForm()
const {playlists,setPlaylist,setVideo,videos,removeVideo} = usePlaylist()
const [activePlaylist,setActivePlaylist] = useState("Youtube Playlist")
const [openVideoModal,setOpenVideoModal] = useState(false)
const [data,setData] = useState(videos)

  const createPlaylist = (value)=>{
    setPlaylist(value.playlist)
    message.success("Playlist Added")
    handlePlaylistModalClose()
  }
  const handlePlaylistModalClose = ()=>{
   setOpenPlaylistModal(false)
   form.resetFields()
  }

  const browsePlaylist= (playlist)=>{
    setActivePlaylist(playlist)
    if(playlist === 'all')
    {
      setData(videos)
    }else{
      const filterdData = videos.filter((item)=>item.playlist === playlist)
      setData(filterdData)
    }
  }

  const addVideo = (value) =>{
    const videoId = getVideoId(value.url)
    if(!videoId)
    {
      message.error("Invalid Video Url")
      return
    }
    value.date = new Date()
    value.thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    value.id = videoId
    setVideo(value)
    handleVideoModalClose()

  }

  const handleVideoModalClose = ()=>{
 
    setOpenVideoModal(false)
    videoform.resetFields()

  }

  const deleteVideo = (id)=>{
   removeVideo(id)
   message.success('video removed!')
  }

  return(
    <div>
      <aside className="overflow-y-auto bg-[linear-gradient(330deg,_#30cfd0,_#330867)] fixed h-full w-[300px] py-8 px-4">
       <div className="flex flex-col gap-2">
         <button onClick={()=>browsePlaylist('all')} className={`capitalize font-medium ${activePlaylist === "all" ? 'bg-rose-600 text-white':'bg-white'} p-3 rounded-lg hover:bg-rose-500 hover:text-white duration-300 active:scale-80`}>
            All Data
            </button>
        {
         playlists.map((item,index)=>(
            <button onClick={()=>browsePlaylist(item)} key={index} className={`capitalize font-medium ${activePlaylist === item ? 'bg-rose-600 text-white':'bg-white'} p-3 rounded-lg hover:bg-rose-500 hover:text-white duration-300 active:scale-80`}>
              {item}
            </button>
          ))
        }
       
      </div>
      </aside>
      <section className="ml-[300px]">
        <nav className="flex justify-between items-center bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 py-4 px-16 sticky top-0 left-0 z-20">
          <h1 className="text-xl text-white font-bold text-center capitalize">{activePlaylist}</h1>
          <div className="flex gap-6">
          <button onClick={()=>setOpenVideoModal(true)} className="bg-white flex items-center hover:scale-105 duration-300 active:scale-80 rounded-lg px-8 py-3 font-semibold">
            <File className="w-4 h-4"/>
            Add Video
          </button>

           <button onClick={()=>setOpenPlaylistModal(true)} className="bg-white flex items-center hover:scale-105 duration-300 active:scale-80 rounded-lg px-8 py-3 font-semibold">
            <Plus className="w-4 h-4"/>
            New Playlist
          </button>
          </div>
         </nav>
        
        <div className="grid grid-cols-4 gap-8 mt-12 px-16">
        {
         data.map((item, index)=>(

          <div className="border border-gray-300 rounded-lg hover:scale-120 duration-300 hover:cursor-pointer" key={index}>
            <img src={item.thumbnail} className="rounded-t-lg" alt="" />
            <div className="p-3">
              <Tooltip title={item.title}>
                 <h1 className="text-base font-medium">{item.title.slice(0,30)}...</h1>
              </Tooltip>
             
              <label className="text-gray-500">{moment(item.date).format('DD MMM YYYY, hh:mm:A')}</label>
              <div className="mt-2 flex gap-2">
                <a href={item.url} target = "_blank" className="active:scale-80 duration-300 py-1 px-2 rounded flex bg-green-500 items-center text-white text-xs">
                <Play className="w-3 h-3 mr-1"/>
                Play
              </a>
              <Popconfirm title="do you want to delete?" onConfirm={()=>deleteVideo(item.id)}>
                <button className="active:scale-80 duration-300 py-1 px-2 rounded flex bg-rose-500 items-center text-white text-xs">
                <Trash2 className="w-3 h-3 mr-1"/>
                Delete
              </button>
              </Popconfirm>
              
              <label className="captalize text-gray-500 font-medium text-xs">{item.playlist}</label>
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

       <Modal open={openVideoModal} footer={null} title="Add a video" onCancel={handleVideoModalClose}>
       <Form form={videoform} onFinish={addVideo}>
        <Form.Item name="title" rules={[{required:true}]}>
            <Input placeholder="Enter video name" size='large'/>
        </Form.Item>
        <Form.Item name="url" rules={[{required:true,type:'url'}]}>
            <Input placeholder="Enter video url" size='large'/>
        </Form.Item>
        <Form.Item name="playlist" rules={[{required:true}]}>
            <Select size="large" placeholder="Choose Playlist">
              {
                playlists.map((item,index)=>(
                  <Select.Option value={item} key={index}>{item}</Select.Option>
                ))
              }
            </Select>
        </Form.Item>
        <Form.Item>
           <Button htmlType="submit" size="large" type="primary" danger>Add</Button>
        </Form.Item>
       </Form>
      </Modal>
    </div>
  )

}

export default App