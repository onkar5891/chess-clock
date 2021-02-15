import React from "react";
import "../css/ChessClock.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Title from "./Title";
import Timer from "./Timer";
import Configuration from "./Configuration";
import { TimerOptions } from "../types/TimerOptions";
import { TimerState } from "../types/TimerState";
import TimerManager from "./TimerManager";
import AppNotification from "./AppNotification";
import { NotificationContent } from "../types/NotificationContent";
import { PieceColor } from "../types/PieceColor";

interface State {
  white: TimerState;
  black: TimerState;
  notification: NotificationContent;
}

class ChessClock extends React.Component {
  whiteTimerManager!: TimerManager;
  blackTimerManager!: TimerManager;
  state: State = {
    white: TimerManager.initial(),
    black: TimerManager.initial(),
    notification: {
      message: "Configure the clock to begin the game..",
      type: "info",
    },
  };

  configurationRequired = (timerOptions: TimerOptions) =>
    timerOptions.minutes === 0 && timerOptions.seconds === 0;

  handleNewGame = (timerOptions: TimerOptions) => {
    this.whiteTimerManager = new TimerManager(
      timerOptions,
      "White",
      this.resolveWhiteTimer
    );
    this.blackTimerManager = new TimerManager(
      timerOptions,
      "Black",
      this.resolveBlackTimer
    );
    this.setState({
      white: this.whiteTimerManager.current(),
      black: this.blackTimerManager.current(),
      notification: {
        message: "Clock configured.. White to play first..",
        type: "info",
      },
    });
  };

  resolveWhiteTimer = () => {
    this.setState({
      white: this.whiteTimerManager.current(),
    });

    if (this.state.white.indicator === "finished") {
      this.setState({
        notification: {
          message: "Black wins on time!",
          type: "info",
        },
      });
    }
  };

  resolveBlackTimer = () => {
    this.setState({
      black: this.blackTimerManager.current(),
    });

    if (this.state.black.indicator === "finished") {
      this.setState({
        notification: {
          message: "White wins on time!",
          type: "info",
        },
      });
    }
  };

  handleWhiteTimerUpdates = () => {
    if (
      this.state.white.indicator === "finished" ||
      this.state.black.indicator === "finished"
    ) {
      this.notifyClockConfig();
      return;
    }

    if (!this.configurationRequired(this.state.white.timerOptions)) {
      this.whiteTimerManager.handleTimerUpdates();
      if (this.whiteTimerManager.indicator === "stopped") {
        this.blackTimerManager.startTimer();
        this.notifyMoveFor("Black");
      } else if (this.whiteTimerManager.indicator === "started") {
        this.blackTimerManager.stopTimer();
        this.notifyMoveFor("White");
      }
    }
  };

  handleBlackTimerUpdates = () => {
    if (
      this.state.white.indicator === "finished" ||
      this.state.black.indicator === "finished"
    ) {
      this.notifyClockConfig();
      return;
    }

    if (!this.configurationRequired(this.state.black.timerOptions)) {
      if (this.whiteTimerManager.indicator === "not-started") {
        return;
      } else {
        this.blackTimerManager.handleTimerUpdates();
        if (this.blackTimerManager.indicator === "stopped") {
          this.whiteTimerManager.startTimer();
          this.notifyMoveFor("White");
        } else if (this.blackTimerManager.indicator === "started") {
          this.whiteTimerManager.stopTimer();
          this.notifyMoveFor("Black");
        }
      }
    }
  };

  private notifyClockConfig() {
    this.setState({
      notification: {
        message: "Configure the clock to begin the game..",
        type: "info",
      },
    });
  }

  private notifyMoveFor(color: PieceColor) {
    this.setState({
      notification: {
        message: `${color} to make the move..`,
        type: "info",
      },
    });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Title />
          </Col>
        </Row>
        <Row className="centered-justification">
          <Col xs={1} lg={1}></Col>
          <Col>
            <Row className="align-items-center">
              <Col xs={5} lg={5}>
                <Timer
                  color="White"
                  timerOptions={this.state.white.timerOptions}
                  onTimerClick={this.handleWhiteTimerUpdates}
                />
              </Col>
              <Col>
                <Configuration onNewGame={this.handleNewGame} />
              </Col>
              <Col xs={5} lg={5}>
                <Timer
                  color="Black"
                  timerOptions={this.state.black.timerOptions}
                  onTimerClick={this.handleBlackTimerUpdates}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={1} lg={1}></Col>
        </Row>
        <Row className="centered-justification">
          <AppNotification content={this.state.notification} />
        </Row>
      </Container>
    );
  }
}

export default ChessClock;
