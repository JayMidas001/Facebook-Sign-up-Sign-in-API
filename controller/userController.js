const myModel = require(`../model/userModel`)
const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)

const UserSignUp = async (req, res) => {
  try {
    const { firstName, surname, contact, password, dateOfBirth, gender, token } = req.body;

    if (!contact) {
      return res.status(400).json('Email or phone number is required.');
    }

    if (contact) {
      checkContact = await myModel.findOne({ contact });
      if (checkContact) {
        return res.status(400).json('User with email or phone number already exists.');
      }
    }

    const saltedPassword = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltedPassword);

    const data = {
      firstName,
      surname,
      contact,
      password: hashedPassword,
      dateOfBirth,
      gender: gender.toLowerCase(),
      token
    };

    const user = await myModel.create(data);
    res.status(201).json({ message: 'User created successfully.', data: user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const UserlogIn = async (req, res) => {
  try {
    const { contact, password } = req.body;

    const checkContact = await myModel.findOne({ contact })
    if (!checkContact) {
      return res.status(404).json(`User with email or phone number not found`)
    } else {
      // compare password
      const checkPassword = await bcrypt.compare(password, checkContact.password)
      if (!checkPassword) {
        return res.status(400).json(`Invalid password`)
      } else {
        const token = await jwt.sign({
          firstName: checkContact.firstName,
          surname: checkContact.surname,
          contact: checkContact.contact
        },
          process.env.jwt_secret, { expiresIn: '1h' }
        )
        checkContact.token = token
        const checkSignedUser = {
          firstName: checkContact.firstName,
          surname: checkContact.surname,
          contact: checkContact.contact,
          gender: checkContact.gender,
          token
        }
        res.status(200).json({ message: `Dear ${checkContact.firstName}, welcome on board!`, data: checkSignedUser });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { UserSignUp, UserlogIn }