import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePlaylist = create(persist(
    (set)=>({
        playlists:[],
        videos:[],
        setPlaylist:(playlistName)=>set((state)=>({
            playlists:[...state.playlists,playlistName]
        })),
        setVideo:(payload)=>set((state)=>({
              ...state,
              videos:[...state.videos,payload]
        })),
         removeVideo:(id)=>set((state)=>({
              ...state,
              videos:state.videos.filter((item)=>item.id !== id)
        }))
    }),
    {name:"playlist"}
))