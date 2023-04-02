const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    email:  {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    admin: {
        type: Boolean,
        default: false
    }
})

UserSchema.pre('save', async function(next) {
    try {
        // check method of registration
        const user = this;
        if (!user.isModified('password')) next();
        // generate salt
        const salt = await bcrypt.genSalt(10);
        // hash the password
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // replace plain text password with hashed password
        this.password = hashedPassword;
        next();
        } catch (error) {
        return next(error);
    }
});

UserSchema.methods.matchPassword = async function (password) {
      try {
        return await bcrypt.compare(password, this.password);
      } catch (error) {
        throw new Error(error);
      }
    };

module.exports = mongoose.model('User', UserSchema)