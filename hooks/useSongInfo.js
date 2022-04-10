import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify"

function useSongInfo() {
  const spotifyApi = useSpotify();
  const [currentIdTrack, setCurrentIdTrack] =useRecoilState(currentTrackIdState);
  console.log('currentidtrack', currentIdTrack);
  const [songInfo, setSongInfo] =useState(null);

  useEffect(()=> {
    const fetchSongInfo = async() => {
      console.log('entro aqui')
      if(currentIdTrack){
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
          {
            headers : {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,

            }
          }
        ).then(res => res.json());
        
        setSongInfo(trackInfo);
      }
    }
    fetchSongInfo();
  },[currentIdTrack, spotifyApi]);

  console.log('songinfo',songInfo)
  return songInfo;
}

export default useSongInfo