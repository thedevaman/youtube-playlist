import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePlaylist = create(persist(
    (set)=>({
        playlists:[],
        setPlaylist:(playlistName)=>set((state)=>({
            playlists:[...state.playlists,playlistName]
        }))
    }),
    {name:"playlist"}
))