export const TEST_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  DRAFT: "Draft",
};

export const MODAL_TYPES = {
  ADD: "add",
  EDIT: "edit",
  VIEW: "view",
  DELETE_TEST: "deleteTest",
  DELETE_TEST_SET: "deleteTestSet",
};

export const FILE_TYPES = {
  JSON: "application/json",
};

export const DEFAULT_DURATION = "60 min";
export const DEFAULT_PAGE_SIZE = 10;
export const UNCATEGORIZED = "Uncategorized";

export const DURATION_OPTIONS = [
  { value: "45", label: "45 minutes" },
  { value: "60", label: "60 minutes" },
];

export const STATUS_OPTIONS = [
  { value: TEST_STATUS.ACTIVE, label: "Active" },
  { value: TEST_STATUS.INACTIVE, label: "Inactive" },
];

// constants cho test set
export const DEFAULT_TEST_SET = {
  name: "",
  skill: "",
  description: "",
};

export const SKILL_OPTIONS = [
  { value: "", label: "Select skill" },
  { value: "listening", label: "Listening" },
  { value: "reading", label: "Reading" },
];
