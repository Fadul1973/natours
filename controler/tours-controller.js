const Tour = require('./../models/tourModel');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-reatingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
};
// GET TOURS
exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    // BUILD AND FILTTER QUERIES
    // 1A) Filtering
    const queryObj = { ...req.query };
    const execludedFields = ['page', 'sort', 'limit', 'fields'];
    execludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advance filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    let query = Tour.find(JSON.parse(queryStr));

    // 2) Sort query
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3) Filed limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist!!');
    }
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
    res.status(404).json({
      ststus: 'Faild',
      message: err,
    });
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
