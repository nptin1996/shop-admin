import { useActionData } from "react-router-dom";
import classes from "./MainTable.module.css";

function MainTable({
  head,
  title,
  action = false,
  actionTxt = "Add New",
  fnAction,
  children,
}) {
  let actionData = useActionData();
  return (
    <div className={`card ${classes.tableContainer}`}>
      <div className={classes.title}>
        <h3>{title}</h3>

        {action && (
          <button className="btn" onClick={fnAction ? fnAction : null}>
            {actionTxt}
          </button>
        )}
      </div>
      <table className={classes.table}>
        <thead>
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
