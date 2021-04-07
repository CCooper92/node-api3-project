const Users = require("../users/users-model.js")

function logger(req, res, next) {
  // DO YOUR MAGIC
  // let current_datetime = new Date();
  // let formatted_date =
  //   current_datetime.getFullYear() +
  //   "-" +
  //   (current_datetime.getMonth() + 1) +
  //   "-" +
  //   current_datetime.getDate() +
  //   " " +
  //   current_datetime.getHours() +
  //   ":" +
  //   current_datetime.getMinutes() +
  //   ":" +
  //   current_datetime.getSeconds();
  // let method = req.method;
  // let url = req.url;
  // let status = res.statusCode;
  // let log = `[${formatted_date}] ${method}:${url} ${status}`;
  // console.log(log);
  // next();
}

const validateUserId  = async (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params
  try{
    const user = await Users.getById(id)
    if(!user){
      res.status(404).json({message: "user not found"})
    }else{
      req.user = user
      next()
    }
  }catch(e){
    res.status(500).json(e.message)
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.name){
    res.status(400).json({message: "missing required name field"})
  }else{
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.text){
    res.status(400).json({message: "missing required text field"})
  }else{
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  validateUserId,
  logger,
  validatePost,
  validateUser

}