export const SessionStoreKey = {
  ACCESS_TOKEN: "PERFURM_CMS_ACCESS_TOKEN",
};

export const LIMIT_PAGE_COMPONENT = 10;
export const LIMIT_PAGE_SPECIAL = 20;

export const statusEnum = [
  { label: "Mới", value: "PENDING" },
  { label: "Đang giao", value: "DELIVERY" },
  { label: "Hoàn thành", value: "COMPLETED" },
  { label: "Huỷ bỏ", value: "CENCELED" },
];

export const statusOb = {
  PENDING: "Mới",
  DELIVERY: "Đang giao",
  COMPLETED: "Hoàn thành",
  CENCELED: "Đã hủy",
};

export const statusTextColor = {
  PENDING: "text-info",
  DELIVERY: "text-warning",
  COMPLETED: "text-success",
  CENCELED: "text-danger",
};
