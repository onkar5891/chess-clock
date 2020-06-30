import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { TimerOptions } from "../types/TimerOptions"
import { PieceColor } from "../types/PieceColor"

interface Props {
  color: PieceColor,
  timerOptions: TimerOptions,
  onTimerClick: () => void
}

class Timer extends React.Component<Props> {
  formatTimer = () => {
    const timer = this.props.timerOptions
    const formattedMinutes = timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes
    const formattedSeconds = timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds
    return <p>{`${formattedMinutes}:${formattedSeconds}`}</p>
  }

  handleClick = () => this.props.onTimerClick()

  render() {
    const timerClass: string[] = ["timer", "centered-text"]
    if (this.props.color === "White") {
      timerClass.push("pl-white")
    } else {
      timerClass.push("pl-black")
    }

    return (
      <Container fluid className={timerClass.join(" ")} onClick={this.handleClick}>
        <Row>
          <Col>
            <span className="fas fa-chess-pawn"></span>
            <span> {this.props.color} </span>
            <span className="fas fa-chess-pawn"></span>
          </Col>
        </Row>
        <Row>
          <Col>{this.formatTimer()}</Col>
        </Row>
      </Container>
    )
  }
}

export default Timer