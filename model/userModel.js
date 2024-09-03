import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
  },
  authProvider: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to hash password before saving user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Expose methods from UserDetails interface
UserSchema.methods.getAuthorities = function () {
  return [];
};

UserSchema.methods.getUsername = function () {
  return this.email;
};

UserSchema.methods.isAccountNonExpired = function () {
  return true;
};

UserSchema.methods.isAccountNonLocked = function () {
  return true;
};

UserSchema.methods.isCredentialsNonExpired = function () {
  return true;
};

UserSchema.methods.isEnabled = function () {
  return true;
};

// Update the updatedAt field before updating
UserSchema.pre('findOneAndUpdate', function (next) {
  this._update.updatedAt = Date.now();
  next();
});

// Create the User model
const User = mongoose.model('User', UserSchema);

export default User;
