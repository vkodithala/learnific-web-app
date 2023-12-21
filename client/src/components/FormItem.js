import { Form } from "react-bootstrap";
import { useState } from "react";

export const FormItem = ({ item, onChange, answer }) => {
  // Initialize currentValue based on item.type
  const initialVal = item.type === 'areas' ? (answer || ['', '', '']) : (answer || '');
  const [currentValue, setCurrentValue] = useState(initialVal);

  const handleChange = (value, index = null) => {
    if (index !== null) {
      // Update one of the values in the array for 'areas'
      const updatedValues = [...currentValue];
      updatedValues[index] = value;
      setCurrentValue(updatedValues);
      onChange(updatedValues, item.value);
    } else {
      // Update the value for other types
      setCurrentValue(value);
      onChange(value, item.value);
    }
  };

  switch (item.type) {
    case 'areas':
      return (
        <>
          <Form.Label>{item.label}</Form.Label>
          {
            [0, 1, 2].map(index => (
              <Form.Control
                key={index}
                type="text"
                className="mb-3"
                id={`${item.label}-${index}`}
                onChange={(e) => handleChange(e.target.value, index)}
                value={currentValue[index] || ''}
              />
            ))
          }
        </>
      );

    case 'text':
      return (
        <>
          <Form.Label>{item.label}</Form.Label>
          <Form.Control
            type="text"
            id={item.label}
            onChange={(e) => handleChange(e.target.value)}
            value={currentValue}
          />
        </>
      );
      case 'password':
        return (
          <>
            <Form.Label htmlFor="inputPassword5">{item.label}</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              onChange={(e) => onChange(e.target.value, item.value)}
            />
          </>
        )
        break;
      case 'information':
        return (
          <p>
            {item.label}
          </p>
        )
      case 'select':
        return (
          <div className="mt-2">
            <Form.Label>{item.label}</Form.Label>
            <Form.Select aria-label={item.label} onChange={(e) => onChange(e.target.value, item.value)}>
              {
                item.options.map((opt, index) => {
                  return (
                    <option value={opt}>{opt}</option>
                  )
                })
              }
            </Form.Select>
          </div>
        )

      return (
        <></>
      )
    }
  };