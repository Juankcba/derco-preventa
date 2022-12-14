import React, { useEffect } from "react";
import DateTimeDisplay from "./DataTimeDisplay";
import { useCountdown } from "../../hooks/useCountdown";
import { Row } from "@nextui-org/react";

const CountdownTimer = ({ targetDate, setStart }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  useEffect(() => {
    //console.log("suma", days + hours + minutes + seconds);
    if (days + hours + minutes + seconds <= 0) {
      setStart(false);
    }
  }, [days, hours, minutes, seconds]);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <Row
      className="show-counter"
      css={{
        border: "1px solid #E0102C",
        background: "#fff",
        borderRadius: "6px",
        maxWidth: "350px",
        margin: "0 auto ",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <DateTimeDisplay value={days} type={"Dias"} isDanger={days <= 3} />
      <p>:</p>
      <DateTimeDisplay value={hours} type={"Horas"} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={seconds} type={"Segundos"} isDanger={false} />
    </Row>
  );
};

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Bienvenido!!!</span>
    </div>
  );
};

export default CountdownTimer;
