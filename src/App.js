import styles from "./styles.module.scss";
import {Form} from "./components/form/form.component";

export const App = () => {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <Form />
      </header>
    </div>
  );
}

