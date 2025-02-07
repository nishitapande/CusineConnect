import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { baseURL } from "../baseURL";
import { useNavigate, useParams } from "react-router-dom";
import { FaCircle } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { FaShareAlt } from "react-icons/fa";
import AuthContext from "../Context";
const RecipeDetailPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  let { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [steps, setSteps] = useState([]);
  const [mainIngridents, setMainIngridents] = useState([]);
  const [allIngridents, setAllIngridents] = useState([]);
  const [url, setUrl] = useState("");
  useEffect(() => {
    (async () => {
      let res = await axios.get(`${baseURL}/recipe/${id}`);
      console.log(res.data);

      setRecipe(res.data);
      setSteps(res.data.steps);
      setMainIngridents(res.data.mainIngredients);
      setAllIngridents(res.data.allIngredients);
      //console.log(steps);
    })();
  }, [setRecipe]);

  const saveRecipeHandler = async () => {
    try {
      if (isAuthenticated === true) {
        const res = await axios.patch(`${baseURL}/recipe/saverecipes/${id}`);
        if (res.status === 200) {
          alert("Recipe saved successfully!");
        }
      } else {
        alert("Please login to save the recipe!");
        navigate("/login");
      }
    } catch (error) {}
  };
  const shareHandler = async () => {
    try {
      const res = await axios.get(`${baseURL}/recipe/sharerecipe/${id}`);
      setUrl(res.data.recipeUrl);
      // console.log(res.data);
    } catch (error) {}
  };
  // console.log(url);
  return (
    <div className="mt-2 p-2">
      <div className="">
        <img
          src={recipe.coverImg}
          className="h-56 w-3/4 mx-auto object-cover"
        />
        <div className="flex mx-16">
          <div className="w-3/4 ">
            <div className="flex flex-col">
              <h2 className="text-4xl text-gray-900 text-black mt-4 ml-28 flex flex-row gap-4 flex items-center ">
                {" "}
                {recipe.title}
                {recipe.isVeg ? (
                  <FaCircle
                    style={{
                      color: "green",
                      fontSize: "20px",
                      padding: "4px",
                      border: "1px solid black",
                    }}
                  />
                ) : (
                  <FaCircle
                    style={{
                      color: "red",
                      fontSize: "20px",
                      padding: "4px",
                      border: "1px solid black",
                    }}
                  />
                )}
                <CiBookmark
                  onClick={saveRecipeHandler}
                  className="cursor-pointer"
                />
                <a
                  href="whatsapp://send?text= {url}"
                  data-action="share/whatsapp/share"
                >
                  <FaShareAlt
                    className="cursor-pointer"
                    onClick={shareHandler}
                  />
                </a>
              </h2>
              <span className="ml-28 mb-6 mt-4 text-s">
                By {recipe.createdBy}
              </span>
              <p className="ml-28 w-2/3"> {recipe.description} </p>
              <div className="w-3/4 ml-28">
                <h2 className="text-xl text-gray-900 my-4"> Instructions </h2>
                {steps.map((step, index) => {
                  return (
                    <div key={index} className="flex gap-4 mb-6 items-center">
                      <span class="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                        {index + 1}
                      </span>
                      <p>{step}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-1/4 mt-5">
            <div>
              <h2 className="text-xl mb-4">Main Ingridients</h2>
              {mainIngridents.map((mainingrident) => {
                return (
                  <div class="flex items-center mb-4 ">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 cursor-pointer"
                    />
                    <label
                      for="default-checkbox"
                      class="ms-2 text-sm font-medium text-black "
                    >
                      {" "}
                      {mainingrident}{" "}
                    </label>
                  </div>
                );
              })}
            </div>
            <div>
              <h2 className="text-xl mb-4 mt-8">All Ingridients</h2>
              <ul class="max-w-md space-y-1 text-black list-disc list-inside">
                {allIngridents.map((ingridients) => {
                  return <li> {ingridients} </li>;
                })}
              </ul>
            </div>
            <div className="mb-5">
              <h2 className="text-xl mb-4 mt-8">Other Information</h2>

              <div className="w-2/3">
                <div class="flex flex-1 border border-gray-500">
                  <p class="pe-6 pr-2 px-2 items-center py-1">Cuisine</p>
                  <div class="inline-block  h-8 w-0.5 self-stretch bg-neutral-100 bg-black/40"></div>
                  <p class="ps-6 py-1"> {recipe.cuisine} </p>
                </div>
              </div>
              <div className="w-2/3">
                <div class="flex flex-1 border border-gray-500">
                  <p class="pe-6 pr-2 px-2.5 items-center py-1">Course</p>
                  <div class="inline-block  h-8 w-0.5 self-stretch bg-neutral-100 bg-black/40"></div>
                  <p class="ps-6 py-1"> {recipe.course} </p>
                </div>
              </div>
              <div className="w-2/3">
                <div class="flex flex-1 border border-gray-500">
                  <p class="pe-6 pr-2 px-2 items-center py-1">Serving</p>
                  <div class="inline-block  h-8 w-0.5 self-stretch bg-neutral-100 bg-black/40"></div>
                  <p class="ps-6 py-1"> {recipe.serving} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
