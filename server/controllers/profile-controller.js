import { validationResult } from "express-validator";
import request from "request";
import dotenv from "dotenv";

dotenv.config;

//components
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import { response } from "express";

//getMyProfile
export const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//createProfile
export const createProfile = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
  } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }

  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (facebook) profileFields.social.facebook = facebook;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //Update profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.status(200).json(profile);
    }

    //Create new
    profile = new Profile(profileFields);
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//getAllProfile
export const getAllProfile = async (req, res) => {
  try {
    const profiles = await Profile.find({}).populate("user", [
      "name",
      "avatar",
    ]);
    res.status(200).json(profiles);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//getOneProfile
export const getOneProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "profile not found" });

    res.status(200).json(profile);
  } catch (error) {
    if (error.kind == "ObjectId")
      return res.status(400).json({ msg: "profile not found" });
    console.log(error);
    res.status(500).json(error);
  }
};

//deleteProfile
export const deleteProfile = async (req, res) => {
  try {
    //@todo- remove all posts
    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.status(200).json({ msg: "User removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//addExperience
export const addExperience = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//deleteExperience
export const deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { experience: { _id: req.params.exp_id } } },
      { new: true }
    );
    await profile.save;
    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//addEducation
export const addEducation = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { school, degree, fieldofstudy, from, to, current, description } =
    req.body;
  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu);
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//deleteEducation
export const deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { education: { _id: req.params.edu_id } } },
      { new: true }
    );
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//getRepo
export const getRepo = async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_ID}&client_secret=${process.env.GITHUB_SECRET}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) console.log(error);
      if (response.statusCode !== 200) {
        return res.status(400).json({ msg: "github profile not found" });
      }
      res.status(200).json(JSON.parse(body));
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
