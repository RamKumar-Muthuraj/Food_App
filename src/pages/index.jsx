import HomePage from "./Home/HomePage";
import "./index.css"

const DefaultPage = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default DefaultPage;



  // const fetchCoffeeDataAPI = async () => {
  //   await DomoApi.FetchDatasetRecords("CoffeeData").then(([coffeeDataFlow]) => {
  //     console.log("CoffeeData", coffeeDataFlow);
  //   });
  // };

  // useEffect(() => {
  //   fetchCoffeeDataAPI();
  // }, []);