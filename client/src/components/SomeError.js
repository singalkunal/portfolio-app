import { useEffect***REMOVED*** useState } from "react";
import { useHistory } from "react-router";
import Error from "./Error";

import { Container } from '../styled-components/Container.style';

const styles = {
  container: {
    display: 'flex'***REMOVED***
    flexDirection: 'column'***REMOVED***
    alignItems: 'center'
  }
};

const SomeError = ({
  isError***REMOVED***
  redirect***REMOVED***
  redirectTime***REMOVED***
  children***REMOVED***
  path = null***REMOVED***
  errorHeader = null***REMOVED***
  errors = []***REMOVED***
***REMOVED*** => {
  const [timeLeft***REMOVED*** setTimeLeft] = useState(+redirectTime);
  const history = useHistory();
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft((prev) => Math.max(0***REMOVED*** prev - 1));
***REMOVED******REMOVED*** 1000);
    return () => clearTimeout(timer);
  ***REMOVED***

  useEffect(() => {
    if (isError && path && !timeLeft) {
      history.push(path);
***REMOVED***
  }***REMOVED*** [timeLeft]);

  useEffect(() => {
    if (isError) {
      setTimeLeft(+redirectTime);
***REMOVED***
  }***REMOVED*** [isError]);
  return (
    <>
      {isError ? (
        <Container>
            <div className="some-error" style={styles.container}>
              <h1 style={{textAlign: 'center'}}>{errorHeader ? errorHeader : "Access Denied"}</h1>
              <Error errors={errors} />
  ***REMOVED***redirect ? <span>Redirecting in... {timeLeft}</span> : ""}
            </div>
        </Container>
      ) : (
        children
      )}
    </>
  );
};

export default SomeError;
