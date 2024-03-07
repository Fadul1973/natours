const Tour = require('./../models/tourModel');

// GET TOURS
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

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
