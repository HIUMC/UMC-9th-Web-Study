import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">홈 페이지로 이동</Link>
      <Link to="/movies">영화 목록 페이지로 이동</Link>
    </nav>
  );
};

export default Navbar;