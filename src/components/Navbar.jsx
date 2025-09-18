// src/components/Navbar.jsx
export default function Navbar({ onSelectRoom }) {
  return (
    <nav
      style={{
        background: "#222",
        color: "white",
        padding: "1rem",
        display: "flex",
        gap: "1rem",
      }}
    >
      <button onClick={() => onSelectRoom("room1")}>Room 1</button>
      <button onClick={() => onSelectRoom("room2")}>Room 2</button>
      <button onClick={() => onSelectRoom("room3")}>Room 3</button>
    </nav>
  );
}
