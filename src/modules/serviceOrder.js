import api from "../services/apiService";

export const getAllServiceOrders = async () => {
  const response = await api.get("/service_order");
  const { data } = response;
  return data;
};

export const getAllActiveServiceOrders = async () => {
  const response = await api.get("/service_order");
  const { data } = response;

  const activeServiceOrders = data.filter((serviceOrder) => {
    return serviceOrder.active === 1;
  });

  return activeServiceOrders;
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

export const deleteServiceOrder = async (
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
