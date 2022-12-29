const Schemes = require('./scheme-model.js')
const db = require("../../data/db-config")

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const {scheme_id} = req.params
  const result = await Schemes.findById(scheme_id)
  if (result) {
    next()
  } else {
    next({status: 404, message: `scheme with scheme_id ${scheme_id} not found`})
  }
  

}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async (req, res, next) => {
  const {scheme_name} = req.body;

  if (scheme_name && typeof scheme_name === "string" && scheme_name.trim().length) {
    const search = await db("schemes").where("scheme_name", scheme_name).first()
    if (!search) {
      next()
    } else{ 
      next({status: 400, message: "scheme_name taken"})

    }
  } else {
    next({status: 400, message: "invalid scheme_name"});

  }
  

}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const {instructions, step_number} = req.body;
  if (instructions && step_number && typeof step_number=== "number" && typeof instructions === "string" && step_number >= 1 && instructions.trim().length) {
    next()
  } else {
    next({status: 400, message: "invalid step"});

  }

  


}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
