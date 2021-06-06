import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer className='bg-dark bottom-0'>
            <Container>
                <Row className='d-flex justify-content-between align-items-center'>
                    <Col className="text-center py-3">
                        copy &copy; {new Date().getFullYear()}
                    </Col>
                    <Col>
                        <a href='mailto:sengineer889@gmail.com'>
                            Contact with Developer
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
