import { useActionData } from "react-router-dom";
import classes from "./MainTable.module.css";

function MainTable({
  head,
  title,
  action = true,
  actionTxt = "Add New",
  fnAction,
  children,
}) {
  let actionData = useActionData();
  return (
    <div className={classes.tableContainer}>
      <div className={classes.title}>
        <h3>{title}</h3>
        {actionData?.message && (
          <span className={classes.message}>{actionData.message}</span>
        )}
        {action && (
          <button onClick={fnAction ? fnAction : null}>{actionTxt}</button>
        )}
      </div>
      <table className={classes.table}>
        <thead className={classes.head}>
          <tr>
            {head.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className={classes.body}>{children}</tbody>
      </table>
    </div>
  );
}

export default MainTable;
