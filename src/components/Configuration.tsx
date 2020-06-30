import React from "react"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import NewGame from "./NewGame"
import { TimerOptions } from "../types/TimerOptions"

interface Props {
    onNewGame: (timerOptions: TimerOptions) => void
}

class Configuration extends React.Component<Props> {
    handleNewConfig = (timerOptions: TimerOptions) => {
        this.props.onNewGame(timerOptions)
    }

    render() {
        return (
            <Container fluid>
                <Row className="centered-justification">
                    <NewGame onConfigComplete={this.handleNewConfig} />
                    <Button variant="success" className="margined">Pause</Button>
                </Row>
            </Container>
        )
    }
}

export default Configuration