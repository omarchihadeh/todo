import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Image } from 'react-bootstrap';

function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="">Omar's Todo App</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Created By: Omar Chihadeh
            </Navbar.Text>
            &nbsp<Image src="logo.jpg" alt="Image description" width={165} height={85} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;