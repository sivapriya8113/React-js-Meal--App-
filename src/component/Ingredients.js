import React, { useEffect, useState } from "react";
import axios from "axios";
const Ingredients = () => {
  const [meal_data, setMealData] = useState([]);
  const [selected_meal, setSelectedMeal] = useState([])
  const[loading,setLoading] = useState(false)

  useEffect(() => {
    getIngredientData();
  }, []);

  const getIngredientData = () => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((res) => {
        if (res.data) {
          setMealData(res.data.meals);
          handleMeal(res.data.meals[0].strIngredient)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMeal = (data)=>{
    setLoading(true)
    axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?i="+ data)
    .then(res=>{
        setSelectedMeal(res.data.meals)
        setLoading(false)
    })
    .catch(err=>{
        console.log(err)
        setLoading(false)

    })
  }

  console.log(selected_meal);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-3  col-sm-3">
          <div className="ingredient-left">
            {meal_data.map((d, n) => {
              return (
                <div className="card my-3" onClick={()=>handleMeal(d.strIngredient)}>
                  <div className="card-body">{d.strIngredient}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-sm-9">
        {loading?
        <div className="text-center my-3">Loading....</div>:
        selected_meal.map((d, n) => {
              return (
                <div className="card my-3" >
                  <div className="card-body">
                    <div className="ingredient-img-container">
                    <img src ={d.strMealThumb} className="w-100 ingredient-img" />
                    </div>
                    <div className="text-center"><strong>{d.strMeal}</strong></div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      
    </div>
  );
};

export default Ingredients;
