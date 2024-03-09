import Image from "next/image";
import Cube from "../components/Cube";

export default function Home() {
  return (
    <>
      <div>
        <h1>Welcome to Tony Experience</h1>
        <p>Here is an fucking cube</p>
        <Cube />
      </div>
    </>
  );
}
