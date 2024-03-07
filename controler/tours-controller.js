const Tour = require('./../models/tourModel');

// GET TOURS
exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    // BUILD AND FILTTER QUERIES
    // 1) Filtering
    const queryObj = { ...req.query };
    const execludedFields = ['page', 'sort', 'limit', 'fields'];
    execludedFields.forEach((el) => delete queryObj[el]);

    // 2) Advance filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = Tour.find(JSON.parse(queryStr));

    // EXECUTE QUERY
    const tours = await query;

    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json('ERR', err);
  }
};

// GET TOURS BY ID
exports.getTour = async (req, res) => {
  const id = req.params.id;
  const tour = await Tour.findById(id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

// CREATE TOURS
exports.createTours = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'seccess',
      message: 'Tour was created seccessfully!!',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Faild',
      message: err,
    });
  }
  // const newTour = new Tour({
  //   name: req.body.name,
  //   rating: req.body.rating,
  //   price: req.body.price,
  // });

  // newTour
  //   .save(newTour)
  //   .then((doc) => {
  //     console.log('Tour has created successfully!!' + doc);
  //     res.send(doc);
  //   })
  //   .catch((err) => {
  //     console.log('ERROR :', err);
  //   });
};

//Update tour
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'Tour updated seccessfuly!!',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Faild',
      message: 'Tour can not updated!!',
    });
  }
};

// Delete Tour
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: 'success',
      message: 'Tour deleted successfully!!',
    });
  } catch (err) {
    res.status(404).json({
      status: 'Faild',
      message: 'Tour can not delete!!',
    });
  }
};
