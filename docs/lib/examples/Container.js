import React from 'react';
import { Container, Header, Main, Footer, Aside } from '@crude/ui';

export default class extends React.PureComponent {
  render() {
    return (
      <div>
        <style>{`
          .cr-header, .cr-footer {
            background-color: #B3C0D1;
            color: #333;
            text-align: center;
            line-height: 60px;
          }
          
          .cr-aside {
            background-color: #D3DCE6;
            color: #333;
            text-align: center;
            line-height: 200px;
          }
          
          .cr-main {
            background-color: #E9EEF3;
            color: #333;
            text-align: center;
            line-height: 160px;
          }
          
          body > .cr-container {
            margin-bottom: 40px;
          }
          
          .cr-container:nth-child(5) .cr-aside,
          .cr-container:nth-child(6) .cr-aside {
            line-height: 260px;
          }
          
          .cr-container:nth-child(7) .cr-aside {
            line-height: 320px;
          }
        `}</style>
        <Container>
          <Header>Header</Header>
          <Main>Main</Main>
        </Container>

        <Container>
          <Header>Header</Header>
          <Main>Main</Main>
          <Footer>Footer</Footer>
        </Container>

        <Container>
          <Aside width="200px">Aside</Aside>
          <Main>Main</Main>
        </Container>

        <Container>
          <Header>Header</Header>
          <Container>
            <Aside width="200px">Aside</Aside>
            <Main>Main</Main>
          </Container>
        </Container>

        <Container>
          <Header>Header</Header>
          <Container>
            <Aside width="200px">Aside</Aside>
            <Container>
              <Main>Main</Main>
              <Footer>Footer</Footer>
            </Container>
          </Container>
        </Container>

        <Container>
          <Aside width="200px">Aside</Aside>
          <Container>
            <Header>Header</Header>
            <Main>Main</Main>
          </Container>
        </Container>

        <Container>
          <Aside width="200px">Aside</Aside>
          <Container>
            <Header>Header</Header>
            <Main>Main</Main>
            <Footer>Footer</Footer>
          </Container>
        </Container>
      </div>
    );
  }
}
