import { Button } from "/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import Header from "/app/(routes)/dashboard/_components/Header";
import WorkspaceList from '/app/(routes)/dashboard/_components/WorkspaceList'

export default function Home() {
  return (
    <div>
      <Header/>
      <WorkspaceList/>
    </div>
  );
}
