import DomoApi from "@/API/domoAPI";
import "./index.css";
import { useEffect } from "react";

const DefaultPage = () => {
  const fetchCoffeeDataAPI = async () => {
    await DomoApi.FetchDatasetRecords("CoffeeData").then(([coffeeDataFlow]) => {
      console.log("CoffeeData", coffeeDataFlow);
    });
  };

  useEffect(() => {
    fetchCoffeeDataAPI();
  }, []);

  return <div>Hello</div>;
};

export default DefaultPage;
