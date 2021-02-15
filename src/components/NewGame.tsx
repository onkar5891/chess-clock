import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import NewGameForm, { FormState } from "./NewGameForm";
import { TimerOptions } from "../types/TimerOptions";

interface State {
  show: boolean;
}

interface Props {
  onConfigComplete: (timerOptions: TimerOptions) => void;
}

class NewGame extends React.Component<Props, State> {
  state: State = {
    show: false,
  };

  handleOpen = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleNewGameConfig = (state: FormState) => {
    this.setState({ show: false });
    this.props.onConfigComplete(state);
  };

  initialState = (): FormState => ({
    minutes: 0,
    seconds: 0,
    increment: 0,
  });

  render() {
    return (
      <div>
        <Button
          variant="primary"
          className="margined"
          onClick={this.handleOpen}
        >
          New
        </Button>
        <Modal
          show={this.state.show}
          animation={false}
          onHide={this.handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Match Time</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewGameForm onCloseHandler={this.handleNewGameConfig} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default NewGame;
