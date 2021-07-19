import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Error from "./Error";

import { Container } from '../styled-components/Container.style';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
};

const SomeError = ({
  isError,
  redirect,
  redirectTime,
  children,
  path = null,
  errorHeader = null,
  errors = [],
}) => {
  const [timeLeft, setTimeLeft] = useState(+redirectTime);
  const history = useHistory();
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (isError && path && !timeLeft) {
      history.push(path);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (isError) {
      setTimeLeft(+redirectTime);
    }
  }, [isError]);
  return (
    <>
      {isError ? (
        <Container>
            <div className="some-error" style={styles.container}>
              <h1 style={{textAlign: 'center'}}>{errorHeader ? errorHeader : "Access Denied"}</h1>
              <Error errors={errors} />
              {redirect ? <span>Redirecting in... {timeLeft}</span> : ""}
            </div>
        </Container>
      ) : (
        children
      )}
    </>
  );
};

export default SomeError;
