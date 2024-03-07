import Dtr from "../models/dtrModel.js"

// export const getDtrs = async (req,res) =>{
//     try{
//         const dtrs = await Dtr.find({}).sort({ startDate: -1 });
//         return res.status(200).json(dtrs)
//     }catch(error){
//         console.log(error.message)
//         res.status(500).json({error: error.message})
//     }
// }

export const getDtrs = async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10
      const skip = (page - 1) * limit;
      const searchQuery = req.query.search || ''

      let query = {};

      if (searchQuery) {
          query = {
              dtrNum: { $regex: new RegExp(searchQuery, 'i') },
          };
      }

      const totalDtrs = await Dtr.countDocuments(query);
      const totalPages = Math.ceil(totalDtrs / limit);

      const dtrs = await Dtr.find(query)
          .sort({ startDate: -1 })
          .skip(skip)
          .limit(limit);

      return res.status(200).json({
          dtrs,
          totalPages,
          currentPage: page
      });
  } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
  }
};


export const getDtr = async (req,res) => {
    try{
        const { id } = req.params
        const dtr = await Dtr.findById(id)
        return res.status(200).json(dtr)
    }catch(error){
        console.log(error.message)
        res.status(500).json({error: error.message})
    }
}

export const createDtr = async (req, res) => {
    try {
      const { dtrNum, startDate, endDate } = req.body;
      const errors = {};
  
      if (!dtrNum) {
        errors.dtrNum = 'DTR number is required';
      }
      if (!startDate) {
        errors.startDate = 'Start date is required';
      }
      if (!endDate) {
        errors.endDate = 'End date is required';
      }
  
      if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
      }

      const newDtr = {
        dtrNum,
        startDate,
        endDate,
      };
  

      const result = await Dtr.create(newDtr);
  
      return res.status(201).json(result);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
  

export const updateDtr = async (req,res) => {
    try{
      const { dtrNum, startDate, endDate } = req.body;
      const errors = {};
  
      if (!dtrNum) {
        errors.dtrNum = 'DTR number is required';
      }
      if (!startDate) {
        errors.startDate = 'Start date is required';
      }
      if (!endDate) {
        errors.endDate = 'End date is required';
      }
  
      if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
      }
        const {id} = req.params

        const result = await Dtr.findByIdAndUpdate(id,req.body)

        if(!result){
            return res.status(404).json({error: 'dtr not found'})
        }

        return res.status(200).json(result)

    }catch(error){
        console.log(error.message)
        res.status(500).json({error: error.message})
    }
}

export const deleteDtr = async (req,res) =>{
    try{
        const { id } = req.params
        const dtr = await Dtr.findByIdAndDelete(id)

        if(!dtr){
            return res.status(404).json({error: 'dtr not found'})
        }

        return res.status(200).json(dtr)
    }catch(error){
        console.log(error.message)
        res.status(500).json({error: error.message})
    }
}