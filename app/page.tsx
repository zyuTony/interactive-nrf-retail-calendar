import GetWeekday from "./components/getweekday";
import UsernameForm from "./components/cookietracking/usernameform";

export default function Home() {
  return (
    <div>
      <h1>weekday finder</h1>
      <UsernameForm />
      <GetWeekday />
    </div>
  );
}
