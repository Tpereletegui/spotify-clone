import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import Player from "../components/Player";
import { getSession } from "next-auth/react";




export default function Home  ()  {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex ">
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0 text-white">
        <Player /></div>
    </div>
  )
}

export async function getServerSideProps(ctx){
  const session = await getSession(ctx);

  return {
    props :{
      session
    }
  }
}
