
import { useEffect, useState } from "react";
export default function Topbar() {
  const [username, setUsername] = useState("");
  useEffect (() => {
    const username = sessionStorage.getItem("username");
    if (username) {
      setUsername(username);
    }
  })

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
      <div className="text-sm text-gray-500">Welcome, {username}</div>
    </header>
  );
}
