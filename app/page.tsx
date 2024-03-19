import Image from "next/image";
import Cube from "../components/cube";
import GetYear from "../components/getyear";
import UsernameForm from "../components/usernameform";

export default function Home() {
  return (
    <div>
      <h1>weekday finder</h1>
      <UsernameForm />
      <GetYear />
    </div>
  );
}
