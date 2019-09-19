import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaLaptop, FaCodeBranch } from 'react-icons/fa';

import { Container, Content, Avatar, Info } from './styles';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const userInfo = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

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
            <strong>{userInfo ? userInfo.name : ''}</strong>
            <button type="button" onClick={() => handleLogout()}>
              Sair
            </button>
          </Info>
          <Avatar>
            <span>{userInfo ? userInfo.name.charAt(0) : ''}</span>
          </Avatar>
        </div>
      </Content>
    </Container>
  );
}
