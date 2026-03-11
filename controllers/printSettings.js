export const getProfile = async (req, res) => {
  try {
    const profile = await CompanyService.fetchProfile();
    return res.status(200).json(profile || {});
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching profile", error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    if (!req.body.companyName) {
      return res.status(400).json({ message: "Company Name is required" });
    }
    const updated = await CompanyService.saveOrUpdateProfile(req.body);
    return res
      .status(200)
      .json({ message: "Profile updated successfully", data: updated });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error updating profile", error: err.message });
  }
};
