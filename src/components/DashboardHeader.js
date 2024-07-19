import classes from "./DashboardHeader.module.css";
import IconOrder from "./UI/IconOrder";
import IconUser from "./UI/IconUser";

function DashboardHeader(props) {
  return (
    <div className={classes.headContainer}>
      <h3>Dashboard</h3>
      <div className={`card ${classes.infoBoard}`}>
        <div className={classes.info}>
          <div>
            <h2>{props.users}</h2>
            <p>Clients</p>
          </div>
          <div className={classes.icon}>
            <IconUser />
          </div>
        </div>
        <div className={classes.info}>
          <div>
            <h2 className={classes.total}>
              {props.total} <span>VND</span>
            </h2>
            <p>Earnings of Month</p>
          </div>
          <div className={classes.icon}>
            <p>$</p>
          </div>
        </div>
        <div className={classes.info}>
          <div>
            <h2>{props.orderNum}</h2>
            <p>New Order</p>
          </div>
          <div className={classes.icon}>
            <IconOrder />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
