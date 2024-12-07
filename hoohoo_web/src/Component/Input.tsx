import React, {useState} from 'react';
import styled from 'styled-components';

const Field = styled.div`
  width: 100%;
  height: 56px;
  border-radius: 4px;
  position: relative;
  background-color: rgba(5, 5, 5, 0.3);
  transition:
    0.3s background-color ease-in-out,
    0.3s box-shadow ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.45);
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
  }

  &.active {
    background-color: #ffffff;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
  }

  &.locked {
    pointer-events: none;
  }
`;

const InputField = styled.input`
  width: 100%;
  height: 56px;
  position: relative;
  padding: 0px 16px;
  border: none;
  border-radius: 4px;
  font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  background-color: transparent;
  color: #1e1e1e;
  outline: none;
  box-shadow: 0px 4px 20px 0px transparent;
  transition:
    0.3s background-color ease-in-out,
    0.3s box-shadow ease-in-out,
    0.1s padding ease-in-out;
  -webkit-appearance: none;

  &::placeholder {
    color: rgba(0, 0, 0, 0.8);
  }

  &.active {
    padding: 24px 16px 8px 16px;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 24px;
  left: 16px;
  font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 24px;
  color: #1e1e1e;
  opacity: 0;
  pointer-events: none;
  transition: 0.1s all ease-in-out;

  &.error {
    color: #ec392f;
  }
`;

const PredictedText = styled.p`
  position: absolute;
  top: 8px;
  left: 16px;
  font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #1e1e1e;
  opacity: 1;
  pointer-events: none;
`;

type Props = {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'search' | 'url';
  name: string;
  predicted?: string;
  locked?: boolean;
  active?: boolean;
  placeholder?: string;
  value?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

const Input: React.FC<Props> = ({
  type,
  name,
  predicted,
  onChange,
  locked = false,
  active = false,
  placeholder,
  value: initialValue = '',
  error: initialError = '',
  required = false,
}) => {
  const [isActive, setActive] = useState((locked && active) || false);
  const [valueState, setValue] = useState(initialValue);
  const [errorState, setError] = useState(initialError);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && predicted) {
      setValue(predicted);
    }
  };

  return (
    <Field
      className={`${locked ? isActive : isActive || valueState ? 'active' : ''} ${locked && !isActive ? 'locked' : ''}`}>
      {isActive &&
        valueState &&
        predicted &&
        predicted.includes(valueState) && (
          <PredictedText>{predicted}</PredictedText>
        )}
      <InputField
        type={type}
        name={name}
        value={valueState}
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        onFocus={() => !locked && setActive(true)}
        onBlur={() => !locked && setActive(false)}
        required={required}
      />
      <Label htmlFor={'1'} className={errorState ? 'error' : ''}>
        {errorState || placeholder}
      </Label>
    </Field>
  );
};

export default Input;
