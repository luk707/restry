import httpStatuses from "./statuses";

export default ({ status = httpStatuses.ok, headers = {}, payload = {} }) => ({
  status,
  headers,
  payload
});
