// models/user.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    cpf: {
        type: Number,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    admissionDate: {
        type: Date,
        required: true
    },
    department: {
        type: String
    }, 
    role: {
        type: String
    },
    active: {
        type: Boolean
    }
});

// Método para hash da senha antes de salvar
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Método para verificar a senha
userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
