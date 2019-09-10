import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaLaptop, FaCodeBranch } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { Container, Content, Avatar, Info } from './styles';

export default function Header({ history }) {
  const [userInfo, setUserInfo] = useState({});

  function handleLogout() {
    localStorage.removeItem('@server_control/auth');
    history.push('/');
  }

  useEffect(() => {
    const auth = localStorage.getItem('@server_control/auth');

    if (auth) {
      const { user } = JSON.parse(auth);
      if (user) {
        setUserInfo({ ...user, avatarLetter: user.name.charAt(0) });
      }
    }
  }, []);

  return (
    <Container>
      <Content>
        <ul>
          <li>
            <FaLaptop color="#FFF" size={24} />
            <Link to="/servers">Servidores</Link>
          </li>
          <li>
            <FaCodeBranch color="#FFF" size={24} />
            <Link to="/versions">Versões</Link>
          </li>
          <li>
            <FaUserFriends color="#FFF" size={24} />
            <Link to="/users">Usuários</Link>
          </li>
        </ul>

        <div>
          <Info>
            <strong>{userInfo.name}</strong>
            <button type="button" onClick={() => handleLogout()}>
              Sair
            </button>
          </Info>
          <Avatar>
            <span>{userInfo.avatarLetter}</span>
          </Avatar>
        </div>
      </Content>
    </Container>
  );
}
Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
