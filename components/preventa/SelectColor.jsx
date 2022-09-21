import { Button, Grid, Text } from "@nextui-org/react";
import React from "react";

const SelectColor = ({ colors, setColor }) => {
  return (
    <Grid.Container css={{ width: "503px" }}>
      {colors.map((color) => (
        <Grid
          xs={2}
          key={color.color_id}
          css={{ display: "flex", flexDirection: "column" }}
        >
          <div
            style={{
              cursor: "pointer",
              borderRadius: "100px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              width: "40px",
              height: "40px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
              backgroundColor: color.color_hex
                ? color.color_hex
                : Math.floor(Math.random() * 16777215).toString(16),
            }}
            onClick={() => setColor(color)}
          >
            <Text
              className="color-btn"
              css={{
                textAlign: "center",
                lineHeight: "40px",
                color: color.color_hex.indexOf("#F") ? "#FFFFFF" : "#000",
              }}
            >
              {color.stock}
            </Text>
          </div>
          <Text className="label-reserva-colors" css={{ maxWidth: "40px" }}>
            {color.color_name}
          </Text>
        </Grid>
      ))}
    </Grid.Container>
  );
};

export default SelectColor;
