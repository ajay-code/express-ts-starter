import mongoose, { Document, Model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

interface IUserDocument extends IUser, Document {
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

interface IUserModel extends Model<IUserDocument> {}

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    validate: {
      message: "Please provide valid email",
      validator: validator.isEmail,
    },
    required: [true, "Please provide email"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlenght: 6,
  },
});

UserSchema.pre<IUserDocument>("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.comparePassword = async function (
  this: IUserDocument,
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model<IUserDocument, IUserModel>("User", UserSchema);
