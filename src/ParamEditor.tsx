import React from 'react';

interface Param {
    id: number;
    name: string;
    type: 'string';
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
    colors: Color[]
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    editedValues: { [key: string]: string };
}

class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const editedValues: { [key: string]: string } = {};
        props.params.forEach(param => {
            const paramValue = props.model.paramValues.find(pv => pv.paramId === param.id);
            editedValues[param.name] = paramValue ? paramValue.value : '';
        });

        this.state = { editedValues };
    }

    handleInputChange = (paramName: string, value: string) => {
        this.setState(prevState => ({
            editedValues: {
                ...prevState.editedValues,
                [paramName]: value
            }
        }));
    }

    getModel(): Model {
        const paramValues: ParamValue[] = this.props.params.map(param => ({
                paramId: param.id,
                value: this.state.editedValues[param.name]
            })
        );

        return { paramValues };
    }

    render() {
        return (
            <div>
                {this.props.params.map(param => (
                    <div key={param.id}>
                        <label>{param.name}:</label>
                        <input
                            type="text"
                            value={this.state.editedValues[param.name]}
                            onChange={(e) => this.handleInputChange(param.name, e.target.value)}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default ParamEditor;