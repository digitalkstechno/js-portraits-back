export const loginAdminHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      id: user._id,
      email: user.email,
      password: user.password,
      role: user.role,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
