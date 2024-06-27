import React from "react";

export class ContainerJS extends React.Component {
    constructor() {
        super();
    
        this.state = {
        number: 0
    }
}
    
    render() {
        const { number } = this.state;
        
        return (
        <div>
            <h1>{number}</h1>
            <button 
                onClick={() => {
                this.setState({ number: this.state.number + 1 }) 
                }}
            >
                +
            </button>
            <button
            onClick={() => {
                this.setState( {number: this.state.number - 1})
            }}
            >
                -
            </button>
            <button
            onClick={ () => {
                this.setState( {number: 0})
            }}
            >
                RESET
            </button>
        </div>
        )
    }
}

export default ContainerJS;