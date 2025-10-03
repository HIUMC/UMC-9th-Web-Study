import React from "react";

type Props = {
  currentPath: string;
  onNavigate: (path: string) => void;
};

const menus = [
  { name: "홈", path: "/" },
  { name: "커리큘럼", path: "/curriculum" },
  { name: "내부시설", path: "/facility" },
  { name: "오시는길", path: "/map" },
  { name: "과제&수업공지", path: "/notice" },
];

export default function Navbar({ currentPath, onNavigate }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault(); // 전체 리로드 방지
    onNavigate(path);   // History API + 상태 반영
  };

  return (
    <nav className="navbar">
      {menus.map((m) => (
        <a
          key={m.path}
          href={m.path}
          onClick={(e) => handleClick(e, m.path)}
          className={`nav-link ${currentPath === m.path ? "active" : ""}`}
        >
          {m.name}
        </a>
      ))}
    </nav>
  );
}
