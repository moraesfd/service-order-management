import api from "../services/apiService";

export const getAllServiceOrders = async () => {
  const response = await api.get("/service_order");
  const { data } = response;
  return data;
};

export const getServiceOrderById = async (serviceOrderId) => {
  const response = await api.get(`/service_order/${serviceOrderId}`);
  const { data } = response;
  return data;
};

export const createServiceOrder = async (newServiceOrder) => {
  const response = await api.post("/service_order", newServiceOrder);
  const { data } = response;
  return data;
};

export const updateServiceOrder = async (
  serviceOrderId,
  updatedServiceOrder
) => {
  const response = await api.put(
    `/service_order/${serviceOrderId}`,
    updatedServiceOrder
  );
  const { data } = response;
  return data;
};
