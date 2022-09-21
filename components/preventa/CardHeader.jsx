import { Text } from "@nextui-org/react";
import React from "react";

const CardHeader = ({ model, title }) => {
  return (
    <div className="card-reserva-header">
      <Text h1 className="title">
        {title}
      </Text>
      <Text className="subtitle">
        {model.brand_name} | {model.model_name}
      </Text>
      <Text className="subtitle-version">{model.version_name}</Text>
    </div>
  );
};

export default CardHeader;
