import React, { useEffect } from "react";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@material-ui/core";
import { setOrderDetails } from "../../redux/Orders/orders.actions";
import { useDispatch } from "react-redux";

const columns = [
  { id: "productThumbnail", label: "" },
  { id: "productName", label: "Name" },
  { id: "productPrice", label: "Price" },
  { id: "quantity", label: "Quantity" },
];

const styles = {
  fontSize: "16px",
  width: "10%",
};

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case "productPrice":
      return `$${columnValue}`;
    case "productThumbnail":
      return <img src={columnValue} alt={columnName} width={250} />;
    default:
      return columnValue;
  }
};

const OrderDetails = ({ order }) => {
  const dispatch = useDispatch();
  const orderItems = order && order;

  useEffect(() => {
    return () => {
      dispatch(setOrderDetails({}));
    }
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, pos) => {
              return (
                <TableCell key={pos} style={styles}>
                  {column.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(orderItems) &&
            orderItems.length > 0 &&
            orderItems.map((row, pos) => {
              return (
                <TableRow key={pos}>
                  {columns.map((column, pos) => {
                    const columnName = column.id;
                    const columnValue = row[columnName];
                    const formattedText = formatText(columnName, columnValue);
                    return (
                      <TableCell key={pos} style={styles}>
                        {formattedText}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderDetails;

