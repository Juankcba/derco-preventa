import { Button, Grid, Text } from "@nextui-org/react";
import React from "react";

const SelectColor = ({ colors, setColor }) => {
  const invertColor = (color) => {
    return color.replace("#", "0x") > 0xffffff / 2 ? "black" : "white";
  };
  return (
    <Grid.Container css={{ width: "100%" }}>
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
              backgroundColor: color.color_hex,
            }}
            onClick={() => setColor(color)}
          >
            <Text
              className="color-btn"
              css={{
                textAlign: "center",
                lineHeight: "40px",
                color: invertColor(color.color_hex),
              }}
            >
              {color.stock}
            </Text>
          </div>
          <Text
            className={
              color.stock === 0
                ? "label-reserva-colors disable"
                : "label-reserva-colors"
            }
            css={{
              textTransform: "capitalize",
              maxWidth: "40px",
            }}
          >
            {color.color_name}
          </Text>
        </Grid>
      ))}
    </Grid.Container>
  );
};

export default SelectColor;
