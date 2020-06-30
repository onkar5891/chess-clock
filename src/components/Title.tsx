import React from "react"
import "../css/ChessClock.css";
import Container from "react-bootstrap/Container"
import Alert from "react-bootstrap/Alert";

const Title: React.FunctionComponent = () => {
    const keyStyle = (key: string) => <b style={{ color: "brown" }}>[{key}]</b>
    return (
        <Container fluid className="margined chess-clock-container centered-text">
            <Alert className="chess-clock-title">
                <span className="fas fa-chess-king"></span>
                <span> Chess Clock </span>
                <span className="fas fa-clock"></span>
            </Alert>
            <p className="lead">Listens to {keyStyle("Spacebar")} and {keyStyle("Return")} keys!</p>
        </Container>
    )
}

export default Title