// Helper functions for order management
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatCurrency = (cost) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(cost);
};

export const getStatusText = (status) => {
  const statusMap = {
    PAID: "COMPLETE",
    PENDING: "PENDING",
    CANCELLED: "CANCELLED",
  };
  return statusMap[status] || status;
};

export const getPaymentMethodText = (method) => {
  const methodMap = {
    // credit_card: "Thẻ tín dụng",
    VNPAY: "VNPAY",
    // e_wallet: "Ví điện tử",
    // cash: "Tiền mặt",
  };
  return methodMap[method] || method;
};

export const exportToCSV = (orders) => {
  const headers = [
    "ID",
    "Course Title",
    "Username",
    "Status",
    "Payment Method",
    "Amount (VND)",
    "Order Date",
  ];

  const csvData = orders.map((order) => [
    order.id || "undefined",
    order.courseTitle || "",
    order.username || "",
    getStatusText(order.status),
    getPaymentMethodText(order.paymentMethod),
    order.amount?.toLocaleString("vi-VN") || "N/A",
    formatDate(order.createdAt),
  ]);

  // Add BOM (Byte Order Mark) for proper UTF-8 encoding in Excel
  const BOM = "\uFEFF";

  const csvContent =
    BOM +
    [headers, ...csvData]
      .map((row) =>
        row
          .map((field) => {
            // Handle null/undefined values and escape quotes properly
            const cleanField = String(field || "").replace(/"/g, '""');
            return `"${cleanField}"`;
          })
          .join(",")
      )
      .join("\r\n"); // Use \r\n for better compatibility with Excel

  // Use UTF-8 encoding explicitly
  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `course-orders-${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Alternative export function specifically for Excel compatibility
export const exportToExcelCSV = (orders) => {
  const headers = [
    "ID",
    "Course Title",
    "Username",
    "Status",
    "Payment Method",
    "Amount (VND)",
    "Order Date",
  ];

  const csvData = orders.map((order) => [
    order.id || "undefined",
    order.courseTitle || "",
    order.username || "",
    getStatusText(order.status),
    getPaymentMethodText(order.paymentMethod),
    order.amount?.toLocaleString("vi-VN") || "N/A",
    formatDate(order.createdAt),
  ]);

  // Create tab-separated values for better Excel compatibility
  const tsvContent = [headers, ...csvData]
    .map((row) => row.map((field) => String(field || "")).join("\t"))
    .join("\r\n");

  const blob = new Blob(["\uFEFF" + tsvContent], {
    type: "text/tab-separated-values;charset=utf-8;",
  });

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `course-orders-${new Date().toISOString().split("T")[0]}.tsv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
