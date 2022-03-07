const { Op } = require("sequelize");
const filterKey = {
  user: "user.us_id",
};

const paginate = (filter, options) => {
  //console.log(filter);

  let condition;
  if (filter.filterBy == "user") {
    condition = { us_id: "%" + filter.filterValue + "%" };
  } else if (filter.filterBy == "cons") {
    condition = { us_id: "%" + filter.filterValue + "%" };
  }
  const filterObj = {
    [Op.like]: [condition],
  };

  //console.log(filterObj);

  return 0;
};

// if (page>1){
//     start = offset * (page -1);
// }

module.exports = {
  paginate,
};
