import React, { FormEvent } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

interface FormProps {
    onCloseHandler: (state: FormState) => void
}

export interface FormState {
    minutes: number,
    seconds: number,
    increment: number
}

class NewGameForm extends React.Component<FormProps, FormState> {
    state: FormState = {
        minutes: 0,
        seconds: 0,
        increment: 0
    }

    handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        this.props.onCloseHandler(this.state)
    }
    
    render() {
        const [minuteOptions, secondOptions, incrementOptions] = utils.timerOptions()
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="minutes">
                    <Form.Label>Minutes</Form.Label>
                    <Form.Control as="select" value={this.state.minutes} onChange={event => this.setState({minutes: +event.target.value})} required>
                        {minuteOptions}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="seconds">
                    <Form.Label>Seconds</Form.Label>
                    <Form.Control as="select" value={this.state.seconds} onChange={event => this.setState({seconds: +event.target.value})} required>
                        {secondOptions}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="increment">
                    <Form.Label>Increment</Form.Label>
                    <Form.Control as="select" value={this.state.increment} onChange={event => this.setState({increment: +event.target.value})} required>
                        {incrementOptions}
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Set</Button>
            </Form>
        )
    }
}

const utils = {
    timerOptions(): JSX.Element[][] {
        let minuteOptions: JSX.Element[] = []
        let secondOptions: JSX.Element[] = []
        let incrementOptions: JSX.Element[] = []
        Array
            .from({ length: 59 }, (_, i) => i)
            .forEach(i => {
                minuteOptions.push(<option key={i}>{i}</option>)
                secondOptions.push(<option key={i}>{i}</option>)
            })
        Array
            .from({ length: 10 }, (_, i) => i)
            .forEach(i => {
                incrementOptions.push(<option key={i}>{i}</option>)
            })

        return [minuteOptions, secondOptions, incrementOptions]
    }
}

export default NewGameForm