const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameHi: { type: String, default: '' },
  description: { type: String, required: true },
  descriptionHi: { type: String, default: '' },
  category: {
    type: String,
    required: true,
    enum: ['Agriculture', 'Education', 'Health', 'Women Welfare', 'Pension', 'Startup', 'Housing', 'Financial Inclusion', 'Skill Development', 'Energy', 'Defence', 'Other']
  },
  minAge: { type: Number, default: 0 },
  maxAge: { type: Number, default: 100 },
  maxIncome: { type: Number, default: 0 }, // 0 means no limit
  gender: { type: String, default: 'All', enum: ['All', 'Male', 'Female', 'Transgender'] },
  states: { type: [String], default: ['All'] },
  categories: { type: [String], default: ['All'] }, // General, OBC, SC, ST
  status: { type: String, default: 'active', enum: ['active', 'upcoming', 'closed'] },
  launchDate: { type: Date },
  ministry: { type: String, default: '' },
  benefits: { type: String, default: '' },
  website: { type: String, default: '' },
  popular: { type: Boolean, default: false }
}, { timestamps: true });

schemeSchema.index({ category: 1, status: 1 });
schemeSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Scheme', schemeSchema);