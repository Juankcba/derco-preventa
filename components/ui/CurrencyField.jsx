import React, { useState } from "react";
import { TextField } from "@mui/material";
import NumberFormat from "react-number-format";

export const handleValueChange = (name, setFieldValue) => (val) =>
  setFieldValue(name, val.floatValue);

const CurrencyField = ({ currencySymbol, ...props }) => {
  const [displayValue, setDisplayValue] = useState();
  return (
    <NumberFormat
      customInput={TextField}
      variant="outlined"
      isNumericString={true}
      thousandSeparator={true}
      value={""}
      decimalScale={2}
      onValueChange={() => console.log("hola")}
      InputProps={{
        startAdornment: <span>{currencySymbol}</span>,
      }}
      {...props}
    />
  );
};

CurrencyField.defaultProps = {
  currencySymbol: "$",
};

export default CurrencyField;
