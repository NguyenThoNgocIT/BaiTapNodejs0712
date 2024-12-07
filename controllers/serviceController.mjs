import Service from '../models/service.mjs';  // Ensure the path is correct

// Function to get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();  // Assuming you're querying the database for services
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error });
  }
};



