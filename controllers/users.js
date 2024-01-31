export const getUser = async (req, res) => {
  const userId = req.params.id;

  try {
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};
