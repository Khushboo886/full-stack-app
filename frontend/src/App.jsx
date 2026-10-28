import { useEffect, useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  const load = () =>
    fetch("/api/items")
      .then((r) => r.json())
      .then(setItems);
  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setText("");
    load();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Full Stack CI/CD App</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={add}>Add</button>
      <ul>
        {items.map((i) => (
          <li key={i._id}>{i.text}</li>
        ))}
      </ul>
    </div>
  );
}
