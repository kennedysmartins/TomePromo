import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  border-radius: 6px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#2d3748' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  width: 100%;
  padding: 16px;
  margin-block: 16px;
`;
