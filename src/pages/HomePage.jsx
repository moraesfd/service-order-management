import React, { useEffect, useState } from "react";
import { getAllServiceOrders } from "../modules/serviceOrder";

function HomePage() {
  const [serviceOrders, setServiceOrders] = useState([]);

  async function getAllServiceOrdersFromApi() {
    try {
      const response = await getAllServiceOrders();
      setServiceOrders(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllServiceOrdersFromApi();
  }, []);

  console.log(serviceOrders);

  return (
    <div>
      <h1>Página Inicial: Seja bem vindo ao Sistema!</h1>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        {serviceOrders.map(({ id, description }) => {
          return (
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                <p class="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #photography
                </span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #travel
                </span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #winter
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
