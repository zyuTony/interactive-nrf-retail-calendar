import Image from "next/image";
import Cube from "../components/cube";
import UsernameForm from "../components/UsernameForm";

export default function Home() {
  return (
    <>
      <div>
        <h1>Welcome to Tony Experience</h1>
        <UsernameForm />
        <p>Here is a fucking cube</p>
        <Cube />
      </div>
    </>
  );
}
