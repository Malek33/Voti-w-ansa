const Organization = require("../models/Organization")
const jwt = require('jsonwebtoken')

const path = require("path")
const fs = require("fs")


const OrganizationCOntroller = {

  getAllOrganizations: async (req, res) => {
    try {
      const organizations = await Organization.find();
      res.json(organizations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getOrganization: async (req, res) => {
    try {
      let token = req.headers.token
      let decoded = jwt.decode(token, process.env.TOKENSECRETKEY)
      const organization = await User.find({_id: decoded.id});

      if (organization.length === 0) {
        return res.json({ error: 'no organizations found' });
      }

      const organization1 = organization[0];

      const orgClaims = {
        id: organization1.id,
        username: organization1.username,
        email: organization1.email,
        isVerified: organization1.isVerified,
        phoneNumb: organization1.phoneNumb,
        vote: organization1.vote,
        birthdate: organization1.birthdate,
        cin: organization1.cin
      }

    res.status(201).json({ orgClaims });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createOrganization: async (req, res) => {
    try {
      const { name, email, desc, phone, adress, userId } = req.body;
      const photo = req.file.filename

      const newOrganization = new Organization({ name, email, description: desc, phoneNumb: phone, adress, img: photo, owner: userId });
      await newOrganization.save();
      res.status(201).json({data: newOrganization});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};

module.exports = OrganizationCOntroller;
