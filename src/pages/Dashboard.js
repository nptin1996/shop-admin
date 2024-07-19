import { fetchData, formatPrice } from "../function";
import { json, useLoaderData } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import MainTable from "../components/MainTable";
function Dashboard() {
  const data = useLoaderData();
  const orders = data.orders;
  const total = orders.reduce((acc, order) => acc + order.total, 0);

  return (
    <>
      <DashboardHeader
        total={formatPrice(total)}
        users={data.users}
        orderNum={orders.length}
      />
      <MainTable
        head={[
          "ID User",
          "Name",
          "Phone",
          "Address",
          "Total",
          "Delivery",
          "Status",
          "Detail",
        ]}
        title="History"
      >
        {orders.map((order) => {
          return (
            <tr key={order._id}>
              <td>{order.user}</td>
              <td>{order.info.name}</td>
              <td>{order.info.phone}</td>
              <td>{order.info.address}</td>
              <td>{formatPrice(order.total)}</td>
              <td>{order.delivery}</td>
              <td>{order.status}</td>
              <td>
                <button className={`btn btn-green`}>View</button>
              </td>
            </tr>
          );
        })}
      </MainTable>
    </>
  );
}

export default Dashboard;

export async function loader() {
  try {
    const res = await fetchData("order/admin", "GET", null);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data;
  } catch {
    throw json({ message: "Tải dữ liệu không thành công!" }, { status: 222 });
  }
}
