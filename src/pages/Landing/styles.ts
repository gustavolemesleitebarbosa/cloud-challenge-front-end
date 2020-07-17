import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 + div {
    margin-top: 40px;
  }
  h1 {
    color: #090C0E;
    margin-top: 10px;
    margin-bottom: 40px;
    align-self: center;
  }

  h2 {
    color: #090C0E
  }
  div + h2 {
    margin-top: 30px;
  }
  h2 + h2 {
    margin-top: 15px;
  }

  h3{
   color: #090C0E;
   margin-bottom: 20px;
  }

  form {
    margin-bottom: 20px;
   h4 {
        margin-top: 10px;
        height: 20px;
        width: 280px;
      }
    }
    > div {
      margin-top: 10px;
    }
    input {
      border-radius: 4px;
      border-width: 1px;
      padding: 6px;
      margin-top: 20px;
      width: 380px;
    }
      display: flex;
      flex-direction: column;
      justify-content: center
  }
`;


export const GridsContainer = styled.div`
padding:20px;
align-self: center;
justify-content: center;
display: flex;
flex-wrap: wrap;`
