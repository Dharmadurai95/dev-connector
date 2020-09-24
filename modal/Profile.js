const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    company: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: [String],
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    githubusername: {
      type: String,
      required: true,
      trim: true,
    },
    experience: [
      {
        title: {
          type: String,
          trim: true,
        },
        company: {
          type: String,
          trim: true,
        },
        location: {
          type: String,
          trim: true,
        },
        from: {
          type: Date,
        },
        to: {
          type: Date,
        },
        current: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
          trim: true,
        },
      },
    ],
    education: [
      {
        school: {
          type: String,
          required: true,
          trim: true,
        },
        degree: {
          type: String,
          required: true,
          trim: true,
        },
        from: {
          type: Date,
          required: true,
        },
        to: {
          type: Date,
        },
        current: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
        },
      },
    ],
    social: {
      facebook: { type: String, default: "https://facebook.com" },
      linkedin: { type: String, default: "https://linkedin.com" },
      youttube: { type: String, default: "https://youtube.com" },
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
