import React from 'react';
import { Input } from 'antd';
import { toCurrency, unmask } from './format';


export default class InputCurrency extends React.Component {
  state = {
    value: 'value' in this.props ? this.props.value : '0.00',
    inputValue: 'value' in this.props ? toCurrency(this.props.value, true) : 0.0,
    addonBefore: 'addonBefore' in this.props ? this.props.addonBefore : 'R$',
  };

  static getDerivedStateFromProps(props, state) {
    if ('value' in props && props.value !== state.value) {
      return {
        value: props.value || '0.00',
        inputValue: toCurrency(props.value, true),
      };
    }
    return null;
  }

  get value() {
    return this.state.value;
  }

  getNumRacional = (num) => {
    let novoNum = num;
    if (this.props.value && this.props.value < 0) {
      novoNum = `-${num}`;
    }
    return novoNum;
  };

  handleChange = (event) => {
    const { onChange } = this.props;

    const inputValue = toCurrency(event.target.value);
    const value = unmask(inputValue);

    this.setState({ value, inputValue });

    if (onChange) {
      event.target.value = value; // eslint-disable-line
      event.persist();
      onChange(event, value);
    }
  };

  render() {
    return (
      <Input
        name={this.props.name}
        step="any"
        value={this.getNumRacional(this.state.inputValue)}
        addonBefore={this.state.addonBefore}
        onChange={this.handleChange}
        onFocus={this.props.onFocus}
        placeholder="0,00"
        disabled={this.props.disabled}
        readOnly={this.props.readOnly}
        style={{ textAlign: 'right', ...this.props.style }}
      />
    );
  }
}
