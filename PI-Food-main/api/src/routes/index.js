const { Router } = require("express");
const axios = require("axios");

// console.log(process);
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const info = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information/?apiKey=d3b9705a4a944d0c8ed7d079afdd010e`
    );
    const { title, image, summary, healthScore, instructions, diets } =
      info.data;
    const receta = {
      title,
      image,
      summary,
      healthScore,
      instructions,
      diets,
    };
    res.send(receta);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/recipes", async (req, res) => {
  const name = req.query.query;
  try {
    const info = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=d3b9705a4a944d0c8ed7d079afdd010e&query=${name}&addRecipeInformation=true`
    );

    const recetas = info.data.results.map((el) => {
      return {
        title: el.title,
        image: el.image,
        diets: el.diets,
      };
    });
    res.send(recetas);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/todos", async (req, res) => {
  const info = await axios.get(
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=d3b9705a4a944d0c8ed7d079afdd010e&number=100&addRecipeInformation=true"
  );
  const recetasApi = info.data.results.map((el) => {
    return {
      title: el.title,
      image: el.image,
      diets: el.diets,
    };
  });

  res.send(recetasApi);
});
// router.post("/recipes", async (req, res) => {});

module.exports = router;
